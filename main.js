(() => {
  const S = window.SITE;
  const UI = window.I18N;
  const PAGE = document.body.dataset.page || "home";
  const LANGS = ["zh", "en", "ja"];
  const HTML_LANG = { zh: "zh-CN", en: "en", ja: "ja" };
  // 顶栏 / 首页入口的页面顺序
  const PAGES = [
    { key: "experience", href: "experience.html" },
    { key: "photography", href: "photography.html" },
    { key: "projects", href: "projects.html" },
    { key: "blog", href: "blog.html" },
  ];
  // 点阵 K 标志（由 scratch 生成器输出；颜色交给 CSS：K 用当前文字色，句点用米色）
  const LOGO = `<svg class="logo-mark" viewBox="0 0 90 90" aria-hidden="true"><circle class="k" style="--i:0" cx="5" cy="5" r="4.3"/><circle class="k" style="--i:1" cx="15" cy="5" r="4.08"/><circle class="g" style="--i:2" cx="25" cy="5" r="0.95"/><circle class="g" style="--i:3" cx="35" cy="5" r="0.95"/><circle class="g" style="--i:4" cx="45" cy="5" r="0.95"/><circle class="k" style="--i:5" cx="55" cy="5" r="3.22"/><circle class="k" style="--i:6" cx="65" cy="5" r="3.01"/><circle class="g" style="--i:7" cx="75" cy="5" r="0.95"/><circle class="g" style="--i:8" cx="85" cy="5" r="0.95"/><circle class="k" style="--i:9" cx="5" cy="15" r="4.3"/><circle class="k" style="--i:10" cx="15" cy="15" r="4.08"/><circle class="g" style="--i:11" cx="25" cy="15" r="0.95"/><circle class="g" style="--i:12" cx="35" cy="15" r="0.95"/><circle class="k" style="--i:13" cx="45" cy="15" r="3.44"/><circle class="k" style="--i:14" cx="55" cy="15" r="3.22"/><circle class="g" style="--i:15" cx="65" cy="15" r="0.95"/><circle class="g" style="--i:16" cx="75" cy="15" r="0.95"/><circle class="g" style="--i:17" cx="85" cy="15" r="0.95"/><circle class="k" style="--i:18" cx="5" cy="25" r="4.3"/><circle class="k" style="--i:19" cx="15" cy="25" r="4.08"/><circle class="g" style="--i:20" cx="25" cy="25" r="0.95"/><circle class="k" style="--i:21" cx="35" cy="25" r="3.65"/><circle class="k" style="--i:22" cx="45" cy="25" r="3.44"/><circle class="g" style="--i:23" cx="55" cy="25" r="0.95"/><circle class="g" style="--i:24" cx="65" cy="25" r="0.95"/><circle class="g" style="--i:25" cx="75" cy="25" r="0.95"/><circle class="g" style="--i:26" cx="85" cy="25" r="0.95"/><circle class="k" style="--i:27" cx="5" cy="35" r="4.3"/><circle class="k" style="--i:28" cx="15" cy="35" r="4.08"/><circle class="k" style="--i:29" cx="25" cy="35" r="3.87"/><circle class="k" style="--i:30" cx="35" cy="35" r="3.65"/><circle class="g" style="--i:31" cx="45" cy="35" r="0.95"/><circle class="g" style="--i:32" cx="55" cy="35" r="0.95"/><circle class="g" style="--i:33" cx="65" cy="35" r="0.95"/><circle class="g" style="--i:34" cx="75" cy="35" r="0.95"/><circle class="g" style="--i:35" cx="85" cy="35" r="0.95"/><circle class="k" style="--i:36" cx="5" cy="45" r="4.3"/><circle class="k" style="--i:37" cx="15" cy="45" r="4.08"/><circle class="k" style="--i:38" cx="25" cy="45" r="3.87"/><circle class="g" style="--i:39" cx="35" cy="45" r="0.95"/><circle class="g" style="--i:40" cx="45" cy="45" r="0.95"/><circle class="g" style="--i:41" cx="55" cy="45" r="0.95"/><circle class="g" style="--i:42" cx="65" cy="45" r="0.95"/><circle class="g" style="--i:43" cx="75" cy="45" r="0.95"/><circle class="g" style="--i:44" cx="85" cy="45" r="0.95"/><circle class="k" style="--i:45" cx="5" cy="55" r="4.3"/><circle class="k" style="--i:46" cx="15" cy="55" r="4.08"/><circle class="k" style="--i:47" cx="25" cy="55" r="3.87"/><circle class="k" style="--i:48" cx="35" cy="55" r="3.65"/><circle class="g" style="--i:49" cx="45" cy="55" r="0.95"/><circle class="g" style="--i:50" cx="55" cy="55" r="0.95"/><circle class="g" style="--i:51" cx="65" cy="55" r="0.95"/><circle class="g" style="--i:52" cx="75" cy="55" r="0.95"/><circle class="g" style="--i:53" cx="85" cy="55" r="0.95"/><circle class="k" style="--i:54" cx="5" cy="65" r="4.3"/><circle class="k" style="--i:55" cx="15" cy="65" r="4.08"/><circle class="g" style="--i:56" cx="25" cy="65" r="0.95"/><circle class="k" style="--i:57" cx="35" cy="65" r="3.65"/><circle class="k" style="--i:58" cx="45" cy="65" r="3.44"/><circle class="g" style="--i:59" cx="55" cy="65" r="0.95"/><circle class="g" style="--i:60" cx="65" cy="65" r="0.95"/><circle class="g" style="--i:61" cx="75" cy="65" r="0.95"/><circle class="g" style="--i:62" cx="85" cy="65" r="0.95"/><circle class="k" style="--i:63" cx="5" cy="75" r="4.3"/><circle class="k" style="--i:64" cx="15" cy="75" r="4.08"/><circle class="g" style="--i:65" cx="25" cy="75" r="0.95"/><circle class="g" style="--i:66" cx="35" cy="75" r="0.95"/><circle class="k" style="--i:67" cx="45" cy="75" r="3.44"/><circle class="k" style="--i:68" cx="55" cy="75" r="3.22"/><circle class="g" style="--i:69" cx="65" cy="75" r="0.95"/><circle class="g" style="--i:70" cx="75" cy="75" r="0.95"/><circle class="g" style="--i:71" cx="85" cy="75" r="0.95"/><circle class="k" style="--i:72" cx="5" cy="85" r="4.3"/><circle class="k" style="--i:73" cx="15" cy="85" r="4.08"/><circle class="g" style="--i:74" cx="25" cy="85" r="0.95"/><circle class="g" style="--i:75" cx="35" cy="85" r="0.95"/><circle class="g" style="--i:76" cx="45" cy="85" r="0.95"/><circle class="k" style="--i:77" cx="55" cy="85" r="3.22"/><circle class="k" style="--i:78" cx="65" cy="85" r="3.01"/><circle class="g" style="--i:79" cx="75" cy="85" r="0.95"/><circle class="a" style="--i:80" cx="85" cy="85" r="4.3"/></svg>`;
  // 本次部署的版本号（部署时写进 main.js?v=…），图片也带上，替换同名图片后不会读到旧缓存
  const V = new URL(document.currentScript.src).searchParams.get("v") || "dev";
  const ver = (u) => (u && !/^(https?:|data:)/.test(u) ? `${u}${u.includes("?") ? "&" : "?"}v=${V}` : u);
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- 语言 ---------- */
  const store = {
    get() { try { return localStorage.getItem("lang"); } catch { return null; } },
    set(v) { try { localStorage.setItem("lang", v); } catch {} },
  };
  // 优先级：URL ?lang= → 上次选择 → 浏览器语言 → English
  function detectLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) { store.set(q); return q; }
    const saved = store.get();
    if (LANGS.includes(saved)) return saved;
    for (const l of navigator.languages || [navigator.language || ""]) {
      const p = l.toLowerCase().slice(0, 2);
      if (LANGS.includes(p)) return p;
    }
    return "en";
  }
  let lang = detectLang();

  // 界面文字：按 "a.b" 路径取当前语言，缺失时回退到 English
  const path = (obj, key) => key.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  const ui = (key) => path(UI[lang], key) ?? path(UI.en, key) ?? "";
  // 内容字段：字符串直接用；{ zh, en, ja } 取当前语言，回退 English → 中文
  const t = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.en ?? v.zh ?? "" : v ?? "");
  // 链接文字："@visit" 之类取 i18n.js 的 links.*
  const linkLabel = (l) => (typeof l === "string" && l.startsWith("@") ? ui(`links.${l.slice(1)}`) : t(l));
  const ext = (url, label) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
  const linkList = (links = []) => links.map((l) => ext(l.url, linkLabel(l.label))).join("");
  const domain = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  // 纯字符串（如英文项目名）在中日文页面里标记为英文
  const enAttr = (v) => (typeof v === "string" && lang !== "en" ? ' lang="en"' : "");

  /* ---------- 滚动出现 ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add("in"), io.unobserve(en.target))),
    { threshold: 0.12 }
  );
  const observeReveals = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  // 首次渲染后再切换语言，列表直接显示，不重复入场动画
  let revealed = false;
  const rv = () => (revealed ? "reveal in" : "reveal");

  /* ---------- 共用：顶栏 + 页脚 ---------- */
  function renderNav() {
    $("#site-nav").innerHTML = `
      <a href="index.html" class="logo" aria-label="${esc(ui("site.title"))}">${LOGO}</a>
      <nav>${PAGES.map((p) => `<a href="${p.href}"${PAGE === p.key || (PAGE === "post" && p.key === "blog") ? ' class="active" aria-current="page"' : ""}>${esc(ui(`nav.${p.key}`))}</a>`).join("")}</nav>
      <div class="nav-right">
        <div class="lang" role="group" aria-label="Language / 语言 / 言語">
          <button type="button" data-lang="zh" lang="zh-CN" aria-label="中文">中</button>
          <button type="button" data-lang="en" lang="en" aria-label="English">EN</button>
          <button type="button" data-lang="ja" lang="ja" aria-label="日本語">日</button>
        </div>
        <span class="clock mono" id="clock"></span>
      </div>`;
    $$(".lang button").forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on);
      b.addEventListener("click", () => setLang(b.dataset.lang));
    });
    tick();
  }

  function renderFooter() {
    $("#site-footer").innerHTML = `
      <p class="eyebrow mono">${esc(ui("footer.eyebrow"))}</p>
      <a class="big-mail" href="mailto:${esc(S.email)}">${esc(S.email)}</a>
      <div class="socials mono">${S.socials.map((s) => ext(s.url, t(s.label))).join("")}</div>
      <p class="copy mono">© ${new Date().getFullYear()} Kevin Sicong Gu. ${esc(ui("footer.made"))}</p>`;
  }

  function renderChrome() {
    document.documentElement.lang = HTML_LANG[lang];
    const pageTitle = PAGES.some((p) => p.key === PAGE) ? ui(`pages.${PAGE}.title`) : "";
    if (PAGE !== "post") document.title = pageTitle ? `${pageTitle} — ${ui("site.title")}` : ui("site.title");
    $('meta[name="description"]')?.setAttribute("content", PAGE === "home" ? ui("site.description") : ui(`pages.${PAGE}.intro`) || ui("site.description"));
    $$("[data-i18n]").forEach((el) => (el.textContent = ui(el.dataset.i18n)));
    $$("[data-i18n-html]").forEach((el) => (el.innerHTML = ui(el.dataset.i18nHtml)));
  }

  /* ---------- 首页 ---------- */
  const emoji = (i) => S.roleEmoji?.[i % (S.roleEmoji.length || 1)] ?? "";

  function renderHome() {
    // 名字末尾跟一个轮换的 emoji
    $("#hero-title").innerHTML = ui("hero.name").replace(
      /<\/span>$/,
      `<span class="emo" id="role-emo" aria-hidden="true">${emoji(0)}</span></span>`
    );
    $("#portrait").src = ver(S.portrait);
    $("#home-index").innerHTML = PAGES.map(
      (p) => `<li><a href="${p.href}"><span class="label">${esc(ui(`pages.${p.key}.title`))}</span><span class="alt" lang="en">${esc(ui(`pages.${p.key}.alt`))}</span><span class="arrow">→</span></a></li>`
    ).join("");
  }

  // 名字旁的 emoji 轮换（切换语言时重新计时）
  let ri = 0, rotTimer, rotSwap;
  function startRotator() {
    clearInterval(rotTimer);
    clearTimeout(rotSwap);
    ri = 0;
    rotTimer = setInterval(() => {
      const emo = $("#role-emo");
      const n = S.roleEmoji?.length || 0;
      if (!emo || n < 2) return;
      emo.classList.add("out");
      rotSwap = setTimeout(() => {
        ri = (ri + 1) % n;
        emo.textContent = emoji(ri);
        emo.classList.remove("out");
      }, 350);
    }, 2600);
  }

  /* ---------- 个人经历 ---------- */
  // 官方 logo（单个路径或数组）
  const logos = (src, alt) =>
    `<div class="row-logo">${[].concat(src || []).map((u) => `<img src="${esc(ver(u))}" alt="${esc(alt)}" loading="lazy" />`).join("")}</div>`;
  const row = (year, title, sub, links, titleAttr = "", logo = "") => `<li class="row ${rv()}">
      <span class="year mono">${esc(year)}</span>
      ${logo}
      <div><h3${titleAttr}>${esc(title)}</h3>${sub ? `<p class="row-sub">${sub}</p>` : ""}</div>
      <div class="plinks mono">${links}</div>
    </li>`;

  function renderExperience() {
    $("#profile-links").innerHTML = linkList(S.profileLinks);
    $("#timeline").innerHTML = S.timeline
      .map((x) => row(t(x.year), t(x.title), esc(t(x.org)), x.url ? ext(x.url, domain(x.url).replace(/^www\./, "")) : "", "", logos(x.logo, t(x.org))))
      .join("");
    // 代表项目：每个公司 / 机构一行，具体项目列在下面
    $("#projects-list").innerHTML = S.projects
      .map((g) => {
        const items = g.items
          .map(
            (it) => `<li><strong${enAttr(it.title)}>${esc(t(it.title))}</strong><span>${esc(t(it.desc))}</span>${
              it.links?.length ? `<span class="plinks mono">${linkList(it.links)}</span>` : ""
            }</li>`
          )
          .join("");
        return `<li class="row ${rv()}">
          <span class="year mono">${esc(t(g.years))}</span>
          ${logos(g.logo, t(g.org))}
          <div><h3${enAttr(g.org)}>${esc(t(g.org))}</h3><ul class="row-items">${items}</ul></div>
          <div></div>
        </li>`;
      })
      .join("");
  }

  /* ---------- 摄影旅行：按旅行分组 + 大图 ---------- */
  // 最新的旅行排在最前；筛选与大图都用排序后的序号
  const trips = () => [...(S.trips || [])].sort((a, b) => (a.date < b.date ? 1 : -1));
  const tripLabel = (tr) => `${tr.date} ${t(tr.place)}`;
  const photoCaption = (tr, p) => `${tripLabel(tr)}${p.caption ? ` — ${t(p.caption)}` : ""}`;
  let activeTrip = "all";
  function applyFilter() {
    $$("#filters button").forEach((b) => {
      const on = b.dataset.f === activeTrip;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on);
    });
    $$(".trip").forEach((sec) => sec.classList.toggle("hide", activeTrip !== "all" && sec.dataset.trip !== activeTrip));
  }

  function renderPhotos() {
    const list = trips();
    if (!list.length) {
      $("#filters").innerHTML = "";
      $("#trips").innerHTML = `<p class="empty mono">${esc(ui("pages.photography.empty"))}</p>`;
      return;
    }
    $("#filters").innerHTML = [
      `<button type="button" data-f="all">${esc(ui("pages.photography.all"))}</button>`,
      ...list.map((tr, ti) => `<button type="button" data-f="${ti}">${esc(tripLabel(tr))}</button>`),
    ].join("");
    $("#trips").innerHTML = list
      .map(
        (tr, ti) => `<section class="trip" data-trip="${ti}">
          <header class="trip-head ${rv()}">
            <span class="trip-date mono">${esc(tr.date)}</span>
            <h2>${esc(t(tr.place))}</h2>
            <span class="trip-count mono">${esc(ui("pages.photography.count").replace("{n}", tr.photos.length))}</span>
          </header>
          <div class="gallery">${tr.photos
            .map(
              (p, i) => `<figure class="shot ${p.ratio || ""}" data-trip="${ti}" data-i="${i}" tabindex="0" role="button">
                <img src="${esc(ver(p.src))}" alt="${esc(photoCaption(tr, p))}" loading="lazy" />
                <figcaption class="mono"><span>${esc(p.caption ? t(p.caption) : tripLabel(tr))}</span></figcaption>
              </figure>`
            )
            .join("")}</div>
        </section>`
      )
      .join("");
    applyFilter();
    if (lb?.classList.contains("open")) fillLightbox();
  }

  const lb = $("#lightbox");
  let lbTrip = -1, lbIndex = -1;
  function fillLightbox() {
    const tr = trips()[lbTrip];
    const p = tr?.photos[lbIndex];
    if (!p) return;
    const img = lb.querySelector("img");
    img.src = ver(p.src);
    img.alt = photoCaption(tr, p);
    lb.querySelector(".lb-cap").textContent = `${photoCaption(tr, p)} · ${lbIndex + 1}/${tr.photos.length}`;
  }
  function bindPhotos() {
    $("#filters").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      activeTrip = b.dataset.f;
      applyFilter();
    });
    const openShot = (e) => {
      const s = e.target.closest(".shot");
      if (!s) return;
      lbTrip = Number(s.dataset.trip);
      lbIndex = Number(s.dataset.i);
      fillLightbox();
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      lb.querySelector(".lb-close").focus();
    };
    $("#trips").addEventListener("click", openShot);
    $("#trips").addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openShot(e); }
    });
    const closeLb = () => {
      if (!lb.classList.contains("open")) return;
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      $(`.shot[data-trip="${lbTrip}"][data-i="${lbIndex}"]`)?.focus();
    };
    // 大图里用 ← → 在同一次旅行的照片之间切换
    const step = (d) => {
      const n = trips()[lbTrip]?.photos.length || 0;
      if (!n) return;
      lbIndex = (lbIndex + d + n) % n;
      fillLightbox();
    };
    lb.addEventListener("click", closeLb);
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    });
  }

  /* ---------- Vibe 项目 ---------- */
  function renderProjects() {
    $("#builds").innerHTML = S.builds
      .map(
        (b) => `<article class="build ${rv()}">
          <a class="frame" href="${esc(b.url)}" target="_blank" rel="noopener" aria-label="${esc(b.name)} — ${esc(domain(b.url))}">
            <span class="frame-bar mono"><i></i><i></i><i></i><span>${esc(domain(b.url))}</span></span>
            <img src="${esc(ver(b.image))}" alt="" loading="lazy" />
          </a>
          <div class="build-head">
            <h2 lang="en">${esc(b.name)}</h2>
            <span class="live mono"><i></i>${esc(ui("pages.projects.live"))}</span>
          </div>
          <p class="build-tag mono">${esc(t(b.tag))}</p>
          <p class="build-desc">${esc(t(b.desc))}</p>
          <div class="plinks mono">${ext(b.url, domain(b.url))}${b.github ? ext(b.github, "GitHub") : ""}</div>
        </article>`
      )
      .join("");
  }

  /* ---------- Blog ---------- */
  const posts = () => [...(S.posts || [])].sort((a, b) => (a.date < b.date ? 1 : -1));
  // 用 #slug（而不是 ?p=）：托管平台做 URL 重定向时 # 后面的部分不会丢
  const postHref = (p) => p.url || `post.html#${encodeURIComponent(p.slug)}`;

  function renderBlog() {
    const list = posts();
    $("#posts").innerHTML = list.length
      ? list
          .map((p) => {
            const outside = !!p.url;
            return `<li class="post ${rv()}"><a href="${esc(postHref(p))}"${outside ? ' target="_blank" rel="noopener"' : ""}>
              <span class="date mono">${esc(p.date)}</span>
              <div${p.lang ? ` lang="${HTML_LANG[p.lang] || p.lang}"` : ""}><h2>${esc(t(p.title))}${outside ? " ↗" : ""}</h2>${p.excerpt ? `<p>${esc(t(p.excerpt))}</p>` : ""}${p.source ? `<p class="source mono">${esc(t(p.source))}</p>` : ""}</div>
              <span class="tag mono">${esc(t(p.tag))}</span>
            </a></li>`;
          })
          .join("")
      : `<li class="empty mono">${esc(ui("pages.blog.empty"))}</li>`;
  }

  // 极简 Markdown：空行分段、## 小标题、[文字](网址)、**加粗**
  function md(src = "") {
    const inline = (s) =>
      esc(s)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return src
      .split(/\n\s*\n/)
      .map((b) => b.trim())
      .filter(Boolean)
      .map((b) => (b.startsWith("## ") ? `<h2>${inline(b.slice(3))}</h2>` : `<p>${inline(b).replace(/\n/g, "<br />")}</p>`))
      .join("");
  }

  function renderPost() {
    const slug = decodeURIComponent(location.hash.slice(1)) || new URLSearchParams(location.search).get("p");
    const p = (S.posts || []).find((x) => x.slug === slug);
    if (!p) {
      document.title = `${ui("pages.blog.missing")} — ${ui("site.title")}`;
      $("#post").innerHTML = `<p class="mono empty">${esc(ui("pages.blog.missing"))}</p>`;
      return;
    }
    document.title = `${t(p.title)} — ${ui("site.title")}`;
    $('meta[name="description"]')?.setAttribute("content", t(p.excerpt));
    $("#post").innerHTML = `
      <p class="post-meta mono"><span>${esc(p.date)}</span><span>${esc(t(p.tag))}</span></p>
      <h1 class="post-title">${esc(t(p.title))}</h1>
      <div class="post-body">${md(t(p.body))}</div>`;
  }

  /* ---------- 效果 ---------- */
  // 光标聚光灯
  window.addEventListener("pointermove", (e) => {
    document.documentElement.style.setProperty("--mx", e.clientX + "px");
    document.documentElement.style.setProperty("--my", e.clientY + "px");
  });

  // 顶栏滚动后加底色
  const onScroll = () => $("#site-nav")?.classList.toggle("scrolled", scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });

  // 东京时间
  function tick() {
    const el = $("#clock");
    if (!el) return;
    const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo" });
    el.textContent = `${time} ${ui("nav.city")}`;
  }
  setInterval(tick, 30000);

  /* ---------- 渲染 ---------- */
  const RENDER = {
    home: () => { renderHome(); startRotator(); },
    experience: renderExperience,
    photography: renderPhotos,
    projects: renderProjects,
    blog: renderBlog,
    post: renderPost,
  };

  function render() {
    renderChrome();
    renderNav();
    renderFooter();
    RENDER[PAGE]?.();
    observeReveals();
    revealed = true;
  }

  function setLang(l) {
    if (!LANGS.includes(l) || l === lang) return;
    lang = l;
    store.set(l);
    const url = new URL(location.href);
    url.searchParams.set("lang", l);
    history.replaceState(null, "", url);
    render();
  }

  if (PAGE === "photography" && lb) bindPhotos();
  if (PAGE === "post") window.addEventListener("hashchange", renderPost);
  render();
  onScroll();
})();
