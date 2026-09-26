// ============================================================
//  旅行地球：点阵陆地 + 飞行航线动画（旅行 & 摄影页）
//  数据：flights.js（Flighty 导出生成）、assets/globe-land.js（陆地点阵）、albums.js（相册 GPS 位置）
//  纯 canvas，无依赖。拖动旋转；悬停机场显示名称；点击相册图钉打开相册。
// ============================================================
(() => {
  const F = window.FLIGHTS;
  if (!F || !window.GLOBE_LAND) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rad = (d) => (d * Math.PI) / 180;
  const unit = (lat, lon) => [Math.cos(rad(lat)) * Math.sin(rad(lon)), Math.sin(rad(lat)), Math.cos(rad(lat)) * Math.cos(rad(lon))];

  /* ---------- 陆地点阵 ---------- */
  const raw = atob(window.GLOBE_LAND);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  const dv = new DataView(bytes.buffer);
  const LN = bytes.length / 6;
  const land = new Float32Array(LN * 3), landCountry = new Uint16Array(LN);
  for (let i = 0; i < LN; i++) {
    const v = unit(dv.getInt16(i * 6, true) / 100, dv.getInt16(i * 6 + 2, true) / 100);
    land.set(v, i * 3);
    landCountry[i] = dv.getUint16(i * 6 + 4, true);
  }

  /* ---------- 航线 ---------- */
  const AP = F.airports;
  const apVec = Object.fromEntries(Object.entries(AP).map(([k, a]) => [k, unit(a[0], a[1])]));
  function slerpArc(A, B) {
    const dot = Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]));
    const w = Math.acos(dot), sw = Math.sin(w) || 1e-6;
    const S = Math.max(16, Math.round(w * 40));
    const lift = 0.025 + 0.13 * (w / Math.PI);
    const pts = new Float32Array((S + 1) * 3);
    for (let s = 0; s <= S; s++) {
      const t = s / S, a = Math.sin((1 - t) * w) / sw, b = Math.sin(t * w) / sw, h = 1 + lift * Math.sin(Math.PI * t);
      pts[s * 3] = (a * A[0] + b * B[0]) * h;
      pts[s * 3 + 1] = (a * A[1] + b * B[1]) * h;
      pts[s * 3 + 2] = (a * A[2] + b * B[2]) * h;
    }
    return { pts, S, w };
  }
  const arcCache = new Map();
  function routesFor(year) {
    const list = F.flights.filter((f) => year === "all" || f[2] === year);
    const m = new Map();
    list.forEach(([a, b], i) => {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (!m.has(key)) {
        if (!arcCache.has(key)) arcCache.set(key, slerpArc(apVec[a], apVec[b]));
        m.set(key, { key, a, b, n: 0, order: i, ...arcCache.get(key), phase: (i * 0.6180339) % 1 });
      }
      m.get(key).n++;
    });
    const airports = new Set(list.flatMap((f) => [f[0], f[1]]));
    const countries = new Set([...airports].map((c) => F.countries[AP[c][3]]));
    return { routes: [...m.values()], airports: [...airports], countries, count: list.length };
  }

  /* ---------- 渲染器 ---------- */
  function mount(canvas, opts = {}) {
    const ctx = canvas.getContext("2d");
    const tip = opts.tip;
    let W = 0, H = 0, R = 0, cx = 0, cy = 0, DPR = 1;
    const home = AP[F.home];
    let lon0 = home ? home[1] - 38 : 100, lat0 = 24;     // 视角中心：东京以西一点，略微俯视北半球
    let state = routesFor("all"), pins = [], born = performance.now();
    let dragging = null, vel = 0, idleUntil = 0, hover = null, running = false, raf = 0, last = 0;

    function resize() {
      const r = canvas.getBoundingClientRect();
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = Math.round(r.width * DPR); H = Math.round(r.height * DPR);
      canvas.width = W; canvas.height = H;
      R = Math.min(W, H) * 0.44; cx = W / 2; cy = H / 2;
      draw();
    }

    // 旋转：先绕 y 轴转到中心经度，再绕 x 轴俯仰到中心纬度
    let cl, sl, cp, sp;
    const setView = () => { cl = Math.cos(rad(lon0)); sl = Math.sin(rad(lon0)); cp = Math.cos(rad(lat0)); sp = Math.sin(rad(lat0)); };
    const P = new Float32Array(3);
    function project(x, y, z) {
      const x1 = x * cl - z * sl, z1 = x * sl + z * cl;
      const y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      P[0] = cx + R * x1; P[1] = cy - R * y2; P[2] = z2;
      return x1 * x1 + y2 * y2;            // 距中心的平方（>1 表示在球体轮廓之外）
    }
    // 正面可见；背面只保留紧贴轮廓外沿的一小段（航线“翻过”地平线），避免绕到背后形成大圈
    const visible = (d2) => P[2] > 0 || (d2 > 1 && P[2] > -0.12);
    const counts = new Int32Array(8), buckets = Array.from({ length: 8 }, () => new Float32Array(LN * 2));

    function draw(now = performance.now()) {
      setView();
      ctx.clearRect(0, 0, W, H);
      // 球体
      const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      g.addColorStop(0, "#23211e"); g.addColorStop(1, "#161615");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(241,236,226,0.10)"; ctx.lineWidth = DPR; ctx.stroke();

      // 陆地点阵：去过的国家更亮（一次投影，按亮度分组后绘制）
      const s = 1.4 * DPR;
      counts.fill(0);
      for (let i = 0; i < LN; i++) {
        project(land[i * 3], land[i * 3 + 1], land[i * 3 + 2]);
        if (P[2] <= 0) continue;
        const bucket = (state.countries.has(landCountry[i]) ? 4 : 0) + Math.min(3, (P[2] * 4) | 0);
        const n = counts[bucket]++;
        buckets[bucket][n * 2] = P[0]; buckets[bucket][n * 2 + 1] = P[1];
      }
      for (let b = 0; b < 8; b++) {
        ctx.fillStyle = b >= 4 ? `rgba(216,199,166,${0.35 + (b - 4) * 0.2})` : `rgba(241,236,226,${0.08 + b * 0.07})`;
        const arr = buckets[b];
        for (let n = 0; n < counts[b]; n++) ctx.fillRect(arr[n * 2] - s / 2, arr[n * 2 + 1] - s / 2, s, s);
      }

      // 航线：开场依次画出，之后每条线上有一颗“飞机”来回飞
      const t = (now - born) / 1000;
        ctx.lineCap = "round";
      for (const r of state.routes) {
        const start = reduce ? 0 : (r.order / Math.max(1, state.count)) * 1.8;
        const prog = reduce ? 1 : Math.max(0, Math.min(1, (t - start) / 0.9));
        if (prog <= 0) continue;
        const upto = Math.max(1, Math.floor(prog * r.S));
        ctx.strokeStyle = `rgba(241,236,226,${0.22 + Math.min(0.3, r.n * 0.05)})`;
        ctx.lineWidth = DPR * (0.8 + Math.min(1.4, Math.log2(r.n + 1) * 0.5));
        ctx.beginPath();
        let pen = false;
        for (let k = 0; k <= upto; k++) {
          const d2 = project(r.pts[k * 3], r.pts[k * 3 + 1], r.pts[k * 3 + 2]);
          if (visible(d2)) { pen ? ctx.lineTo(P[0], P[1]) : ctx.moveTo(P[0], P[1]); pen = true; } else pen = false;
        }
        ctx.stroke();
        // 飞行中的亮点（带一小段尾迹）
        if (!reduce && prog >= 1) {
          const period = 3 + r.w * 2.2;
          const f = ((t / period + r.phase) % 1);
          const head = Math.floor(f * r.S), tail = Math.max(0, head - Math.max(3, Math.round(r.S * 0.14)));
          for (let k = tail; k < head; k++) {
            const d1 = project(r.pts[k * 3], r.pts[k * 3 + 1], r.pts[k * 3 + 2]);
            if (!visible(d1)) continue;
            const x0 = P[0], y0 = P[1];
            project(r.pts[(k + 1) * 3], r.pts[(k + 1) * 3 + 1], r.pts[(k + 1) * 3 + 2]);
            ctx.strokeStyle = `rgba(255,246,228,${((k - tail) / (head - tail)) * 0.9})`;
            ctx.lineWidth = DPR * 1.6;
            ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(P[0], P[1]); ctx.stroke();
          }
        }
      }

      // 机场
      for (const c of state.airports) {
        const v = apVec[c];
        project(v[0], v[1], v[2]);
        if (P[2] <= 0) continue;
        const isHome = c === F.home, hov = hover?.kind === "ap" && hover.code === c;
        ctx.fillStyle = isHome ? "#f1ece2" : "#d8c7a6";
        ctx.strokeStyle = "#141414"; ctx.lineWidth = DPR;
        ctx.beginPath(); ctx.arc(P[0], P[1], (isHome ? 3.2 : hov ? 3.4 : 2.3) * DPR, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        if (isHome && !reduce) {
          const k = (t % 2.4) / 2.4;
          ctx.strokeStyle = `rgba(241,236,226,${(1 - k) * 0.7})`; ctx.lineWidth = DPR * 1.2;
          ctx.beginPath(); ctx.arc(P[0], P[1], (4 + k * 14) * DPR, 0, Math.PI * 2); ctx.stroke();
        }
      }

      // 相册图钉
      ctx.font = `${11 * DPR}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "middle";
      for (const p of pins) {
        project(p.v[0], p.v[1], p.v[2]);
        p.sx = P[0]; p.sy = P[1]; p.on = P[2] > 0.05;
        if (!p.on) continue;
        const hov = hover?.kind === "pin" && hover.pin === p, sz = (hov ? 9 : 7) * DPR;
        ctx.fillStyle = "#f1ece2"; ctx.strokeStyle = "#141414"; ctx.lineWidth = 1.5 * DPR;
        ctx.beginPath(); ctx.rect(P[0] - sz / 2, P[1] - sz / 2, sz, sz); ctx.fill(); ctx.stroke();
        const label = p.label, tw = ctx.measureText(label).width, lx = P[0] + 10 * DPR, ly = P[1] - 12 * DPR;
        ctx.fillStyle = "rgba(20,20,20,0.82)";
        ctx.fillRect(lx - 5 * DPR, ly - 9 * DPR, tw + 10 * DPR, 18 * DPR);
        ctx.fillStyle = hov ? "#ffffff" : "#f1ece2";
        ctx.fillText(label, lx, ly);
        p.box = [lx - 5 * DPR, ly - 9 * DPR, tw + 10 * DPR, 18 * DPR];
      }
    }

    function frame(now) {
      const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
      if (!dragging) {
        if (Math.abs(vel) > 0.01) { lon0 -= vel * dt; vel *= 0.94; }
        else if (now > idleUntil && !reduce) lon0 -= 5 * dt;       // 自动缓慢自转（约 72 秒一圈）
      }
      draw(now);
      raf = requestAnimationFrame(frame);
    }
    const start = () => { if (!running) { running = true; last = 0; raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    // 拖动旋转
    canvas.addEventListener("pointerdown", (e) => {
      dragging = { x: e.clientX, y: e.clientY, lon: lon0, lat: lat0, t: performance.now(), moved: false };
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      const mx = (e.clientX - r.left) * DPR, my = (e.clientY - r.top) * DPR;
      if (dragging) {
        const dx = e.clientX - dragging.x, dy = e.clientY - dragging.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) dragging.moved = true;
        const k = 180 / Math.PI / (R / DPR);
        const prev = lon0;
        lon0 = dragging.lon - dx * k;
        lat0 = Math.max(-60, Math.min(75, dragging.lat + dy * k));
        const nt = performance.now();
        vel = ((prev - lon0) / Math.max(1, nt - dragging.t)) * 1000;
        dragging.t = nt;
        if (reduce) draw();
        return;
      }
      hover = hitTest(mx, my);
      canvas.style.cursor = hover?.kind === "pin" ? "pointer" : "grab";
      if (tip) {
        if (hover) {
          tip.textContent = hover.kind === "pin" ? hover.pin.tip : `${hover.code} · ${AP[hover.code][2]}`;
          tip.style.left = `${mx / DPR}px`; tip.style.top = `${my / DPR}px`;
          tip.hidden = false;
        } else tip.hidden = true;
      }
      if (reduce) draw();
    });
    const end = (e) => {
      if (!dragging) return;
      const wasClick = !dragging.moved;
      dragging = null; idleUntil = performance.now() + 2500;
      if (wasClick) {
        const r = canvas.getBoundingClientRect();
        const h = hitTest((e.clientX - r.left) * DPR, (e.clientY - r.top) * DPR);
        if (h?.kind === "pin") opts.onPin?.(h.pin);
      }
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", () => { dragging = null; });
    canvas.addEventListener("pointerleave", () => { hover = null; if (tip) tip.hidden = true; });

    function hitTest(mx, my) {
      for (const p of pins) if (p.on && p.box && mx >= p.box[0] - 6 * DPR && mx <= p.box[0] + p.box[2] && my >= p.box[1] - 6 * DPR && my <= p.box[1] + p.box[3] + 6 * DPR) return { kind: "pin", pin: p };
      for (const p of pins) if (p.on && Math.hypot(mx - p.sx, my - p.sy) < 12 * DPR) return { kind: "pin", pin: p };
      let best = null, bd = 10 * DPR;
      for (const c of state.airports) {
        const v = apVec[c];
        project(v[0], v[1], v[2]);
        if (P[2] <= 0) continue;
        const d = Math.hypot(mx - P[0], my - P[1]);
        if (d < bd) { bd = d; best = { kind: "ap", code: c }; }
      }
      return best;
    }

    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(([en]) => (en.isIntersecting && !document.hidden ? start() : stop())).observe(canvas);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : canvas.isConnected && start()));
    resize();

    return {
      setYear(y) { state = routesFor(y); born = performance.now(); draw(); },
      setPins(list) { pins = list.map((p) => ({ ...p, v: unit(p.lat, p.lon) })); draw(); },
      focus(lat, lon) { lon0 = lon; lat0 = Math.max(-60, Math.min(75, lat)); idleUntil = performance.now() + 4000; draw(); },
    };
  }

  /* ---------- 统计 ---------- */
  function statsFor(year) {
    if (year === "all") return { ...F.stats };
    const list = F.flights.filter((f) => f[2] === year);
    const km = list.reduce((s, [a, b]) => {
      const A = apVec[a], B = apVec[b];
      return s + Math.acos(Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]))) * 6371.0088;
    }, 0);
    const airports = new Set(list.flatMap((f) => [f[0], f[1]]));
    return {
      flights: list.length,
      km: Math.round(km),
      minutes: null,
      airports: airports.size,
      airlines: new Set(list.map((f) => f[3]).filter(Boolean)).size,
      countries: new Set([...airports].map((c) => AP[c][3])).size,
    };
  }
  const years = [...new Set(F.flights.map((f) => f[2]))].sort((a, b) => b - a);

  window.TravelGlobe = { mount, statsFor, years };
})();
