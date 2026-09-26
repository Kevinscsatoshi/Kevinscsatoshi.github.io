// ============================================================
//  Flighty 导出 → flights.js（旅行 & 摄影页的飞行地球）
//
//  用法（在网站根目录运行）：
//    node tools/flighty.mjs ~/Downloads/FlightyExport-2026-09-25.csv --time 27d5h --km 457629
//  --time / --km 可选：填 Flighty Passport 上显示的总飞行时间 / 总里程（导出文件里没有起降时间）。
//
//  只输出航线、年份和机场，不输出航班号、日期、订座号、座位等个人信息；
//  取消的航班与今天之后的航班不会公开。机场坐标来自 OurAirports（公开数据，运行时下载）。
// ============================================================
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const csvPath = args.find((a) => !a.startsWith("--") && !/^\d/.test(a));
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
if (!csvPath) { console.error("用法：node tools/flighty.mjs <FlightyExport.csv> [--time 27d5h] [--km 457629] [--home HND]"); process.exit(1); }

// ---------- CSV ----------
function parseCSV(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") { if (ch === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.some((c) => c !== ""));
  const h = head.map((x) => x.replace(/^﻿/, "").trim().toLowerCase());
  return body.map((r) => Object.fromEntries(h.map((k, i) => [k, (r[i] || "").trim()])));
}

// ---------- 机场坐标（OurAirports） ----------
const cache = path.join(ROOT, "node_modules", ".cache", "ourairports.csv");
let oaText;
if (fs.existsSync(cache)) oaText = fs.readFileSync(cache, "utf8");
else {
  const res = await fetch("https://davidmegginson.github.io/ourairports-data/airports.csv");
  if (!res.ok) throw new Error(`下载 OurAirports 失败：${res.status}`);
  oaText = await res.text();
  fs.mkdirSync(path.dirname(cache), { recursive: true });
  fs.writeFileSync(cache, oaText);
}
const OA = new Map(parseCSV(oaText).filter((r) => r.iata_code).map((r) => [r.iata_code, r]));
const ISO = JSON.parse(fs.readFileSync(path.join(ROOT, "tools", "iso-numeric.json"), "utf8"));

// ---------- 航班 ----------
const today = new Date().toISOString().slice(0, 10);
const all = parseCSV(fs.readFileSync(csvPath, "utf8"));
const flights = all.filter((r) => r.canceled !== "true" && r.date && r.date <= today);
const skipped = { canceled: all.filter((r) => r.canceled === "true").length, future: all.filter((r) => r.canceled !== "true" && r.date > today).length };
const leg = (r) => [r.from, r["diverted to"] || r.to];                      // 备降：以实际降落机场为准
const codes = [...new Set(flights.flatMap(leg))].sort();
const missing = codes.filter((c) => !OA.has(c));
if (missing.length) throw new Error(`找不到这些机场的坐标：${missing.join(", ")}`);

const R = 6371.0088, rad = (d) => (d * Math.PI) / 180;
const dist = (a, b) => {
  const [la1, lo1, la2, lo2] = [a.latitude_deg, a.longitude_deg, b.latitude_deg, b.longitude_deg].map(Number).map(rad);
  const h = Math.sin((la2 - la1) / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin((lo2 - lo1) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const km = flights.reduce((s, r) => { const [f, t] = leg(r); return s + dist(OA.get(f), OA.get(t)); }, 0);
const airports = Object.fromEntries(codes.map((c) => {
  const a = OA.get(c);
  return [c, [Number(Number(a.latitude_deg).toFixed(4)), Number(Number(a.longitude_deg).toFixed(4)), a.municipality || a.name, a.iso_country]];
}));
const countries = [...new Set(codes.map((c) => airports[c][3]))].sort();
const t = opt("--time");
const minutes = t ? ((m) => (Number(m[1] || 0) * 1440 + Number(m[2] || 0) * 60 + Number(m[3] || 0)))(t.match(/(?:(\d+)d)?\s*(?:(\d+)h)?\s*(?:(\d+)m)?/)) : null;

const data = {
  source: "Flighty",
  updated: path.basename(csvPath).match(/\d{4}-\d{2}-\d{2}/)?.[0] || today,
  home: opt("--home") || "HND",
  stats: {
    flights: flights.length,
    km: opt("--km") ? Number(opt("--km")) : Math.round(km),
    minutes,
    airports: codes.length,
    airlines: new Set(flights.map((r) => r.airline).filter(Boolean)).size,
    countries: countries.length,
  },
  countries: Object.fromEntries(countries.map((c) => [c, ISO[c] || 0])),
  airports,
  // [出发, 到达, 年份, 航空公司代码]，按时间排序（不含航班号、具体日期、座位等）
  flights: flights.sort((a, b) => (a.date < b.date ? -1 : 1)).map((r) => [...leg(r), Number(r.date.slice(0, 4)), r.airline]),
};
fs.writeFileSync(path.join(ROOT, "flights.js"), `// 由 tools/flighty.mjs 从 Flighty 导出生成，请不要手动编辑\nwindow.FLIGHTS = ${JSON.stringify(data)};\n`);
console.log(`flights.js · ${data.stats.flights} flights · ${data.stats.airports} airports · ${data.stats.airlines} airlines · ${countries.length} countries · ${Math.round(km).toLocaleString()} km (computed)` +
  ` · skipped ${skipped.canceled} canceled, ${skipped.future} future`);
