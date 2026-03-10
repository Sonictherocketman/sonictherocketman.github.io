// <div id="double-pendulum-container" style="text-align:center; margin: 2em 0;">
//   <canvas id="double-pendulum-canvas"></canvas>
// </div>
// Override styles with window.CONFIG in each post.

(function () {
  // ── CONFIG ───────────────────────────────────────────────────────────────
  const overrides = window.CONFIG || {};
  const CONFIG = {
    width:  600,
    height: 500,

    // Physics
    g:      9.81,   // gravity (m/s²)
    l1:     1.4,    // arm 1 length  (sim units)
    l2:     1.0,    // arm 2 length  (sim units)
    m1:     1.0,    // bob 1 mass
    m2:     1.0,    // bob 2 mass
    theta1: Math.PI * 0.6,   // initial angle of arm 1 (radians from vertical)
    theta2: Math.PI * 0.4,   // initial angle of arm 2

    // Trail
    trailLength: 300,        // number of trail points to keep

    // Colors — change these to match your blog theme
    background:   '#1a1a2e',
    armColor:     '#e0e0e0',
    bob1Color:    '#e94560',
    bob2Color:    '#0f3460',
    trailColor:   '#e94560',  // trail start color (fades to transparent)
    bobRadius:    8,
    armWidth:     2,

    ...overrides,
  };
  // ─────────────────────────────────────────────────────────────────────────

  const canvas = document.getElementById('double-pendulum-canvas');
  const ctx    = canvas.getContext('2d');

  // Scale canvas for HiDPI screens
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = CONFIG.width  * dpr;
  canvas.height = CONFIG.height * dpr;
  canvas.style.width  = CONFIG.width  + 'px';
  canvas.style.height = CONFIG.height + 'px';
  ctx.scale(dpr, dpr);

  // Sim units → pixels: fit both arms with some padding
  const scale = (CONFIG.height * 0.7) / (CONFIG.l1 + CONFIG.l2);
  const ox = CONFIG.width  / 2;   // pivot origin x
  const oy = CONFIG.height * 0.12; // pivot origin y

  // State: [θ1, ω1, θ2, ω2]
  let state = [CONFIG.theta1, 0, CONFIG.theta2, 0];
  const trail = [];

  // ── RK4 integration ──────────────────────────────────────────────────────
  function derivatives([th1, w1, th2, w2]) {
    const { g, l1, l2, m1, m2 } = CONFIG;
    const d = th1 - th2;
    const denom = 2 * m1 + m2 - m2 * Math.cos(2 * d);

    const a1 = (
      -g * (2 * m1 + m2) * Math.sin(th1)
      - m2 * g * Math.sin(th1 - 2 * th2)
      - 2 * Math.sin(d) * m2 * (w2 * w2 * l2 + w1 * w1 * l1 * Math.cos(d))
    ) / (l1 * denom);

    const a2 = (
      2 * Math.sin(d) * (
        w1 * w1 * l1 * (m1 + m2)
        + g * (m1 + m2) * Math.cos(th1)
        + w2 * w2 * l2 * m2 * Math.cos(d)
      )
    ) / (l2 * denom);

    return [w1, a1, w2, a2];
  }

  function rk4(state, dt) {
    const k1 = derivatives(state);
    const k2 = derivatives(state.map((s, i) => s + k1[i] * dt / 2));
    const k3 = derivatives(state.map((s, i) => s + k2[i] * dt / 2));
    const k4 = derivatives(state.map((s, i) => s + k3[i] * dt));
    return state.map((s, i) => s + (k1[i] + 2*k2[i] + 2*k3[i] + k4[i]) * dt / 6);
  }

  // ── Coordinate helpers ───────────────────────────────────────────────────
  function positions([th1, , th2]) {
    const x1 = ox + Math.sin(th1) * CONFIG.l1 * scale;
    const y1 = oy + Math.cos(th1) * CONFIG.l1 * scale;
    const x2 = x1 + Math.sin(th2) * CONFIG.l2 * scale;
    const y2 = y1 + Math.cos(th2) * CONFIG.l2 * scale;
    return { x1, y1, x2, y2 };
  }

  // ── Parse color for trail gradient ───────────────────────────────────────
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  }
  const trailRgb = CONFIG.trailColor.startsWith('#')
    ? hexToRgb(CONFIG.trailColor)
    : '233,69,96'; // fallback

  // ── Draw ─────────────────────────────────────────────────────────────────
  function draw() {
    const { width, height, armColor, bob1Color, bob2Color, armWidth, bobRadius, background } = CONFIG;
    const { x1, y1, x2, y2 } = positions(state);

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    // Pivot dot
    ctx.beginPath();
    ctx.arc(ox, oy, 4, 0, Math.PI * 2);
    ctx.fillStyle = armColor;
    ctx.fill();

    // Trail
    if (trail.length > 1) {
      for (let i = 1; i < trail.length; i++) {
        const alpha = (i / trail.length) * 0.8;
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.strokeStyle = `rgba(${trailRgb},${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    // Arm 1
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = armColor;
    ctx.lineWidth = armWidth;
    ctx.stroke();

    // Arm 2
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = armColor;
    ctx.lineWidth = armWidth;
    ctx.stroke();

    // Bob 1
    ctx.beginPath();
    ctx.arc(x1, y1, bobRadius, 0, Math.PI * 2);
    ctx.fillStyle = bob1Color;
    ctx.fill();

    // Bob 2
    ctx.beginPath();
    ctx.arc(x2, y2, bobRadius, 0, Math.PI * 2);
    ctx.fillStyle = bob2Color;
    ctx.fill();
  }

  // ── Animation loop ───────────────────────────────────────────────────────
  const dt = 1 / 120;
  let last = null;

  function loop(ts) {
    if (last !== null) {
      const elapsed = Math.min((ts - last) / 1000, 0.05); // cap at 50ms
      const steps   = Math.round(elapsed / dt);
      for (let i = 0; i < steps; i++) {
        state = rk4(state, dt);
        const { x2, y2 } = positions(state);
        trail.push({ x: x2, y: y2 });
        if (trail.length > CONFIG.trailLength) trail.shift();
      }
    }
    last = ts;
    draw();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();
