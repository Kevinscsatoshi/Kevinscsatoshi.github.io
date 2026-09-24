// ============================================================
//  首页点阵艺术：生成式漩涡（Maelstrom）
//  十几万个像素点按亮度场随机撒布，缓慢旋转、向中心流动；鼠标靠近会把点推开。
//  纯 canvas，无依赖。画布按 CSS 尺寸绘制，再用 pixelated 放大，保证点是方形像素。
// ============================================================
(() => {
  const canvas = document.getElementById("art");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: false });
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const BG = [20, 20, 20];        // #141414
  const FG = [241, 236, 226];     // #f1ece2
  const DENSITY = 0.28;           // 每个像素平均的点数
  const OMEGA = 0.05;             // 旋转速度（弧度/秒）

  // ---------- 值噪声 ----------
  const hash = (x, y) => {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const smooth = (t) => t * t * (3 - 2 * t);
  function noise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = smooth(x - xi), yf = smooth(y - yi);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  }
  const fbm = (x, y) => 0.55 * noise(x, y) + 0.3 * noise(x * 2.1, y * 2.1) + 0.15 * noise(x * 4.3, y * 4.3);
  const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  let W = 0, H = 0, cx = 0, cy = 0, rx = 1, ry = 1;
  let img, buf, dots = [];

  // 亮度场：q = 椭圆归一化半径，psi = 随旋转的角度（0 = 全黑，1 = 最亮）
  function brightness(q, psi, x, y) {
    const n = fbm(x * 0.014, y * 0.014);
    let b;
    if (q < 0.27) {
      b = 0.004;                                                            // 漩涡中心：深黑
    } else if (q < 0.78) {
      const wall = sstep(0.26, 0.52, q);
      const lit = 0.5 + 0.5 * Math.cos(psi - 2.4);                           // 左上方受光的漩涡壁
      const streak = 0.5 + 0.5 * Math.sin(34 * Math.log(q) + 5 * psi + 3 * n);  // 螺旋条纹
      b = wall * (0.18 + 0.82 * lit) * (0.35 + 0.65 * streak);
    } else if (q < 1.15) {
      const churn = 0.5 + 0.5 * Math.sin(28 * q + 3 * psi + 7 * n);          // 翻涌的水面
      b = 0.35 + 0.6 * churn * (0.6 + 0.4 * n);
    } else {
      const waves = 0.5 + 0.5 * Math.sin(18 * q - 2 * psi + 6 * n);
      b = (0.12 + 0.6 * waves * n * n) * sstep(2.1, 1.1, q);                // 外圈泡沫，向边缘变暗
    }
    return Math.min(1, b) ** 1.35;                                          // 提高对比
  }

  const omega = (q) => OMEGA * (1 + 1.2 * Math.max(0, 1 - q));           // 越靠近中心转得越快

  function spawn(d, t) {
    for (let tries = 0; tries < 200; tries++) {
      const x = Math.random() * W, y = Math.random() * H;
      const ex = (x - cx) / rx, ey = (y - cy) / ry;
      const q = Math.hypot(ex, ey);
      const theta = Math.atan2(ey, ex);
      const psi = theta - omega(q) * t;
      if (Math.random() < brightness(q, psi, x, y)) {
        d.q = q; d.psi = psi; d.born = t;
        d.life = 3 + Math.random() * 7;
        d.k = 0.82 + 0.18 * Math.random();
        return;
      }
    }
    d.q = 0.1; d.psi = 0; d.born = t; d.life = 0.1; d.k = 0;
  }

  function setup() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    canvas.width = W; canvas.height = H;
    cx = W * 0.62; cy = H * 0.47;
    rx = Math.max(W * 0.36, H * 0.55); ry = H * 0.46;
    img = ctx.createImageData(W, H);
    buf = new Uint32Array(img.data.buffer);
    const n = Math.round(W * H * DENSITY);
    const t = now();
    dots = Array.from({ length: n }, () => {
      const d = {};
      spawn(d, t);
      d.born = t - Math.random() * d.life;                                 // 错开寿命，避免同时闪烁
      return d;
    });
  }

  const pack = (r, g, b) => (255 << 24) | (b << 16) | (g << 8) | r;
  const BGC = pack(...BG);
  const shade = new Uint32Array(33);
  for (let i = 0; i <= 32; i++) {
    const a = i / 32;
    shade[i] = pack(...BG.map((c, j) => Math.round(c + (FG[j] - c) * a)));
  }

  const t0 = performance.now();
  const now = () => (performance.now() - t0) / 1000;
  const mouse = { x: -1e4, y: -1e4 };

  function frame() {
    const t = now();
    buf.fill(BGC);
    const R = Math.min(W, H) * 0.16, R2 = R * R;
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      let age = t - d.born;
      if (!reduce && age > d.life) { spawn(d, t); age = 0; }
      const q = reduce ? d.q : Math.max(0.05, d.q - 0.006 * age);            // 缓慢被吸向中心
      const th = d.psi + omega(q) * t;
      let x = cx + Math.cos(th) * q * rx;
      let y = cy + Math.sin(th) * q * ry;
      const dx = x - mouse.x, dy = y - mouse.y, dd = dx * dx + dy * dy;
      if (dd < R2) {                                                        // 鼠标附近的点被推开
        const f = (1 - Math.sqrt(dd) / R) ** 2 * 18 / (Math.sqrt(dd) + 0.001);
        x += dx * f; y += dy * f;
      }
      const xi = x | 0, yi = y | 0;
      if (xi < 0 || yi < 0 || xi >= W || yi >= H) continue;
      const fade = reduce ? 1 : Math.min(1, age / 0.8, (d.life - age) / 0.8);
      buf[yi * W + xi] = shade[Math.max(0, Math.min(32, Math.round(fade * d.k * 32)))];
    }
    ctx.putImageData(img, 0, 0);
  }

  // 只在可见时动画
  let running = false, raf = 0;
  const loop = () => { frame(); raf = requestAnimationFrame(loop); };
  const start = () => { if (!running && !reduce) { running = true; loop(); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); };

  new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop())).observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  canvas.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * W;
    mouse.y = ((e.clientY - r.top) / r.height) * H;
  });
  canvas.addEventListener("pointerleave", () => { mouse.x = mouse.y = -1e4; });

  let resizeTimer;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { setup(); frame(); }, 120);
  }).observe(canvas);

  setup();
  frame();
})();
