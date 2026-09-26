// ============================================================
//  网站构建脚本（GitHub Actions 部署时自动运行；本地也可以运行）
//
//  相册：在 photos/ 里每次旅行建一个文件夹，名字用「年-月-地点」，例如
//      photos/2024-12-russia/01.jpg
//  可选：文件夹里放 album.json 设置多语言地名、封面和照片说明：
//      {
//        "place": { "zh": "俄罗斯", "en": "Russia", "ja": "ロシア" },
//        "cover": "05.jpg",
//        "captions": { "05.jpg": { "zh": "莫斯科", "en": "Moscow", "ja": "モスクワ" } },
//        "location": [55.7558, 37.6173]   ← 可选；不写则用照片里 GPS 的平均位置（显示在旅行地球上）
//      }
//
//  用法：
//    node tools/build.mjs --out _site --resize   # 部署：生成网页用的小图（自动旋转、去掉 EXIF/GPS），输出到 _site
//    node tools/build.mjs                        # 本地预览：只更新 albums.js，直接引用 photos/ 里的原图
// ============================================================
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const outArg = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;
const OUT = outArg ? path.resolve(ROOT, outArg) : null;
const RESIZE = args.includes("--resize");
const BASE = "https://kevinscsatoshi.github.io/";
const PHOTOS = path.join(ROOT, "photos");
const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const SIZES = { full: 2000, thumb: 900 };

let sharp = null;
if (RESIZE) {
  const require = createRequire(path.join(ROOT, "package.json"));
  sharp = require(process.env.SHARP_PATH || "sharp");
}

/* ---------- 读取图片尺寸（本地预览用，不依赖任何库） ---------- */
function imageSize(file) {
  const b = fs.readFileSync(file);
  if (b[0] === 0x89 && b.toString("ascii", 1, 4) === "PNG") return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const kind = b.toString("ascii", 12, 16);
    if (kind === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (kind === "VP8L") { const n = b.readUInt32LE(21); return { w: (n & 0x3fff) + 1, h: ((n >> 14) & 0x3fff) + 1 }; }
    return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2, w = 0, h = 0, orient = 1;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1], len = b.readUInt16BE(i + 2);
      if (m === 0xe1 && b.toString("ascii", i + 4, i + 8) === "Exif") orient = exifOrientation(b, i + 10) || orient;
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) { h = b.readUInt16BE(i + 5); w = b.readUInt16BE(i + 7); break; }
      i += 2 + len;
    }
    return orient >= 5 && orient <= 8 ? { w: h, h: w } : { w, h };
  }
  return { w: 0, h: 0 };
}
function exifOrientation(b, t) {
  const le = b.toString("ascii", t, t + 2) === "II";
  const u16 = (o) => (le ? b.readUInt16LE(o) : b.readUInt16BE(o));
  const u32 = (o) => (le ? b.readUInt32LE(o) : b.readUInt32BE(o));
  const ifd = t + u32(t + 4), n = u16(ifd);
  for (let k = 0; k < n; k++) { const e = ifd + 2 + k * 12; if (u16(e) === 0x0112) return u16(e + 8); }
  return 0;
}

/* ---------- 读取照片的 GPS（EXIF）；返回 [纬度, 经度] 或 null ---------- */
function exifGps(file) {
  const b = fs.readFileSync(file);
  if (b[0] !== 0xff || b[1] !== 0xd8) return null;
  let i = 2;
  while (i < b.length - 4) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1], len = b.readUInt16BE(i + 2);
    if (m === 0xe1 && b.toString("ascii", i + 4, i + 8) === "Exif") return parseGps(b, i + 10);
    if (m === 0xda) break;
    i += 2 + len;
  }
  return null;
}
function parseGps(b, t) {
  const le = b.toString("ascii", t, t + 2) === "II";
  const u16 = (o) => (le ? b.readUInt16LE(o) : b.readUInt16BE(o));
  const u32 = (o) => (le ? b.readUInt32LE(o) : b.readUInt32BE(o));
  const tags = (ifd) => { const n = u16(ifd), out = {}; for (let k = 0; k < n; k++) { const e = ifd + 2 + k * 12; out[u16(e)] = e; } return out; };
  const ifd0 = tags(t + u32(t + 4));
  if (!ifd0[0x8825]) return null;
  const g = tags(t + u32(ifd0[0x8825] + 8));
  const rat3 = (e) => { const o = t + u32(e + 8); return [0, 1, 2].map((k) => u32(o + k * 8) / u32(o + k * 8 + 4)); };
  const ref = (e) => String.fromCharCode(b[e + 8]);
  if (!g[2] || !g[4]) return null;
  const dms = ([d, m, s]) => d + m / 60 + s / 3600;
  let lat = dms(rat3(g[2])), lon = dms(rat3(g[4]));
  if (g[1] && ref(g[1]) === "S") lat = -lat;
  if (g[3] && ref(g[3]) === "W") lon = -lon;
  return Number.isFinite(lat) && Number.isFinite(lon) ? [Number(lat.toFixed(5)), Number(lon.toFixed(5))] : null;
}

/* ---------- 相册 ---------- */
const titleCase = (s) => s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();

async function buildAlbums() {
  if (!fs.existsSync(PHOTOS)) return [];
  const dirs = fs.readdirSync(PHOTOS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !/^[._]/.test(d.name))
    .map((d) => d.name).sort().reverse();                      // 新的在前
  const albums = [];
  for (const slug of dirs) {
    const dir = path.join(PHOTOS, slug);
    let meta = {};
    try {
      if (fs.existsSync(path.join(dir, "album.json"))) meta = JSON.parse(fs.readFileSync(path.join(dir, "album.json"), "utf8"));
    } catch (e) {
      console.warn(`⚠️  ${slug}/album.json 格式有误，已忽略（${e.message}）`);   // 写错也不会让部署失败
    }
    const m = slug.match(/^(\d{4})-(\d{2})-?(.*)$/);
    const files = fs.readdirSync(dir).filter((f) => IMG_EXT.has(path.extname(f).toLowerCase()) && !f.startsWith(".")).sort();
    const skipped = fs.readdirSync(dir).filter((f) => /\.(heic|heif|dng|raw|cr2|nef|arw)$/i.test(f));
    if (skipped.length) console.warn(`⚠️  ${slug}: 跳过不支持的格式 ${skipped.join(", ")}（请导出为 JPEG）`);
    if (!files.length) continue;
    const photos = [];
    // 同名不同格式（01.jpg / 01.png）时加上扩展名，避免输出文件互相覆盖
    const stems = files.map((f) => path.parse(f).name);
    const outName = (f) => { const { name, ext } = path.parse(f); return stems.filter((x) => x === name).length > 1 ? `${name}-${ext.slice(1)}` : name; };
    for (const f of files) {
      const src = path.join(dir, f);
      const caption = meta.captions?.[f];
      const gps = exifGps(src);
      if (sharp) {
        const base = path.join("photos", slug, outName(f));
        const outDir = path.join(OUT, "photos", slug);
        fs.mkdirSync(outDir, { recursive: true });
        const img = () => sharp(src).rotate();                   // 按 EXIF 自动旋转；输出不带 EXIF/GPS
        const full = await img().resize({ width: SIZES.full, height: SIZES.full, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(OUT, `${base}-${SIZES.full}.webp`));
        await img().resize({ width: SIZES.thumb, height: SIZES.thumb, fit: "inside", withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT, `${base}-${SIZES.thumb}.webp`));
        photos.push({ file: f, src: `${base}-${SIZES.thumb}.webp`, full: `${base}-${SIZES.full}.webp`, w: full.width, h: full.height, ...(caption && { caption }), ...(gps && { gps }) });
      } else {
        const { w, h } = imageSize(src);
        photos.push({ file: f, src: `photos/${slug}/${f}`, full: `photos/${slug}/${f}`, w, h, ...(caption && { caption }), ...(gps && { gps }) });
      }
    }
    const coverIdx = Math.max(0, photos.findIndex((p) => p.file === meta.cover));
    const withGps = photos.filter((p) => p.gps);
    const location = meta.location || (withGps.length
      ? [0, 1].map((k) => Number((withGps.reduce((sum, p) => sum + p.gps[k], 0) / withGps.length).toFixed(4)))
      : null);
    albums.push({
      slug,
      date: meta.date || (m ? `${m[1]}/${m[2]}` : ""),
      place: meta.place || titleCase(m ? m[3] : slug),
      cover: coverIdx,
      ...(location && { location }),
      photos: photos.map(({ file, ...p }) => p),
    });
    console.log(`album ${slug}: ${photos.length} photos`);
  }
  return albums;
}

/* ---------- sitemap（有相册时才收录摄影页） ---------- */
function sitemap(hasAlbums) {
  const pages = ["", "experience.html", ...(hasAlbums ? ["photography.html"] : []), "projects.html", "blog.html"];
  const esc = (s) => s.replace(/&/g, "&amp;");
  const urls = pages.flatMap((p) => {
    const loc = BASE + p;
    const alts = [["en", loc], ["zh-CN", `${loc}?lang=zh`], ["ja", `${loc}?lang=ja`], ["x-default", loc]];
    const links = alts.map(([h, u]) => `    <xhtml:link rel="alternate" hreflang="${h}" href="${esc(u)}" />`).join("\n");
    return alts.slice(0, 3).map(([, u]) => `  <url>\n    <loc>${esc(u)}</loc>\n${links}\n  </url>`);
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

/* ---------- 复制网站文件到输出目录 ---------- */
const SKIP = new Set(["photos", "tools", "node_modules", "_site", "README.md", "serve.json", "package.json", "package-lock.json"]);
function copySite() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  for (const e of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (e.name.startsWith(".") || SKIP.has(e.name)) continue;
    fs.cpSync(path.join(ROOT, e.name), path.join(OUT, e.name), { recursive: true });
  }
}

const albumsJs = (albums) =>
  `// 由 tools/build.mjs 自动生成，请不要手动编辑；照片放在 photos/ 文件夹里\nwindow.ALBUMS = ${JSON.stringify(albums, null, 1)};\n`;

if (OUT) {
  copySite();
  const albums = await buildAlbums();
  fs.writeFileSync(path.join(OUT, "albums.js"), albumsJs(albums));
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemap(albums.length > 0));
  // 资源版本号：让浏览器在每次部署后加载新的 CSS / JS / 图片
  let v = (process.env.GITHUB_SHA || "").slice(0, 7);
  if (!v) { try { v = execSync("git rev-parse --short=7 HEAD", { cwd: ROOT }).toString().trim(); } catch { v = String(Date.now()); } }
  for (const f of fs.readdirSync(OUT).filter((f) => f.endsWith(".html"))) {
    const p = path.join(OUT, f);
    fs.writeFileSync(p, fs.readFileSync(p, "utf8").replaceAll("?v=dev", `?v=${v}`));
  }
  console.log(`built ${OUT} · version ${v} · ${albums.length} album(s)`);
} else {
  const albums = await buildAlbums();
  fs.writeFileSync(path.join(ROOT, "albums.js"), albumsJs(albums));
  console.log(`updated albums.js · ${albums.length} album(s) (local preview uses original photos)`);
}
