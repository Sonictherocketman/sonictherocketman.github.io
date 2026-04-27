// <div id="wave-function-container" style="text-align:center; margin: 2em 0;">
//   <canvas id="wave-function-canvas"></canvas>
// </div>
// Override with window.WF_CONFIG before the script loads.

function plotFn(config, id, fn) {
  // ── CONFIG ───────────────────────────────────────────────────────────────
  const overrides = window.WF_CONFIG || config || {};
  const CONFIG = {
    W: 560, H: 340,

    a:     1.0,    // spatial frequency of sin term
    b:     1.0,    // spatial frequency of cos term
    speed: 1.0,    // time multiplier

    xMin: -Math.PI * 2,
    xMax:  Math.PI * 2,
    yMin: -2.4,
    yMax:  2.4,

    // Colors
    bg:    '#1a1a2e',
    curve: '#e94560',
    axis:  '#e0e0e0',
    grid:  '#e0e0e0',
    dot:   '#e94560',
    trail: '#e94560',

    trailLength: 180,   // frames of f(0,t) history to keep
    xFilter: 'all',  // 'all' | 'negative' (x <= 0) | 'positive' (x >= 0)
    plotLabels: true,
    showPlayButton: true,  // set false for time-independent functions

    ...overrides,
  };
  // ─────────────────────────────────────────────────────────────────────────

  const { W, H } = CONFIG;
  const canvas = document.getElementById(id);
  const ctx    = canvas.getContext('2d');
  const dpr    = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;  canvas.height = H * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);

  const { a, b, xMin, xMax, yMin, yMax } = CONFIG;

  function f(x, t) {
    if (fn) {
        return fn(x, t)
    }
    // Default
    // f(x, t) = sin(ax + t) + cos(bx + t)
    return Math.sin(a * x + t) + Math.cos(b * x + t);
  }

  // ── Coordinate mapping ────────────────────────────────────────────────────
  const PAD = { l: 48, r: 18, t: 22, b: 36 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t  - PAD.b;

  function toSX(wx) { return PAD.l + (wx - xMin) / (xMax - xMin) * plotW; }
  function toSY(wy) { return PAD.t + (1 - (wy - yMin) / (yMax - yMin)) * plotH; }

  // Screen x of x=0, y-axis
  const ORIGIN_SX = toSX(0);
  const ORIGIN_SY = toSY(0);

  // ── Drawing helpers ───────────────────────────────────────────────────────
  function drawGrid() {
    ctx.save();
    ctx.lineWidth   = 0.6;
    ctx.strokeStyle = CONFIG.grid;

    // Horizontal grid lines at integer y values
    ctx.globalAlpha = 0.08;
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0) continue;
      ctx.beginPath();
      ctx.moveTo(PAD.l, toSY(y));
      ctx.lineTo(W - PAD.r, toSY(y));
      ctx.stroke();
    }

    // Vertical grid lines at multiples of π
    const step = Math.PI;
    for (let x = Math.ceil(xMin / step) * step; x <= xMax + 1e-9; x += step) {
      if (Math.abs(x) < 1e-9) continue;
      ctx.beginPath();
      ctx.moveTo(toSX(x), PAD.t);
      ctx.lineTo(toSX(x), H - PAD.b);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawAxes() {
    ctx.save();
    ctx.strokeStyle = CONFIG.axis;
    ctx.lineWidth   = 1.0;
    ctx.globalAlpha = 0.35;

    // x-axis
    ctx.beginPath();
    ctx.moveTo(PAD.l,     ORIGIN_SY);
    ctx.lineTo(W - PAD.r, ORIGIN_SY);
    ctx.stroke();

    // y-axis
    ctx.beginPath();
    ctx.moveTo(ORIGIN_SX, PAD.t);
    ctx.lineTo(ORIGIN_SX, H - PAD.b);
    ctx.stroke();

    // x-axis arrow
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.moveTo(W - PAD.r,     ORIGIN_SY);
    ctx.lineTo(W - PAD.r - 7, ORIGIN_SY - 3.5);
    ctx.lineTo(W - PAD.r - 7, ORIGIN_SY + 3.5);
    ctx.closePath(); ctx.fill();

    // y-axis arrow
    ctx.beginPath();
    ctx.moveTo(ORIGIN_SX,     PAD.t);
    ctx.lineTo(ORIGIN_SX - 3.5, PAD.t + 7);
    ctx.lineTo(ORIGIN_SX + 3.5, PAD.t + 7);
    ctx.closePath(); ctx.fill();

    // Tick marks — x-axis at multiples of π
    ctx.lineWidth   = 0.8;
    ctx.globalAlpha = 0.3;
    const xStep = Math.PI;
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax + 1e-9; x += xStep) {
      const sx = toSX(x);
      ctx.beginPath();
      ctx.moveTo(sx, ORIGIN_SY - 4);
      ctx.lineTo(sx, ORIGIN_SY + 4);
      ctx.stroke();
    }

    // Tick marks — y-axis at integers
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0) continue;
      const sy = toSY(y);
      ctx.beginPath();
      ctx.moveTo(ORIGIN_SX - 4, sy);
      ctx.lineTo(ORIGIN_SX + 4, sy);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Small y-axis labels
  function drawLabels() {
    ctx.save();
    ctx.fillStyle   = CONFIG.axis;
    ctx.globalAlpha = 0.38;
    ctx.font        = '11px monospace';
    ctx.textAlign   = 'right';
    for (const y of [-2, -1, 1, 2]) {
      if (y < yMin || y > yMax) continue;
      ctx.fillText(String(y), ORIGIN_SX - 7, toSY(y) + 4);
    }
    ctx.restore();
  }

  // The main curve
  function drawCurve(t) {
    const N      = 320;
    const filter = CONFIG.xFilter;
    ctx.save();
    ctx.strokeStyle = CONFIG.curve;
    ctx.lineWidth   = 2.2;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    let penDown = false;
    for (let i = 0; i <= N; i++) {
      const wx      = xMin + (i / N) * (xMax - xMin);
      const wy      = f(wx, t);
      const visible = filter === 'all' || (filter === 'negative' ? wx <= 0 : wx >= 0);
      const sx      = toSX(wx);
      const sy      = toSY(Math.max(yMin, Math.min(yMax, wy)));
      if (visible) {
        penDown ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy);
        penDown = true;
      } else {
        penDown = false;
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  // Dot at (0, f(0, t)) with a dashed drop-line to the x-axis
  function drawOriginDot(t) {
    const wy = f(0, t);
    const sy = toSY(Math.max(yMin, Math.min(yMax, wy)));

    ctx.save();

    // Drop line from x-axis to dot
    ctx.setLineDash([3, 5]);
    ctx.lineWidth   = 1.0;
    ctx.strokeStyle = CONFIG.dot;
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(ORIGIN_SX, ORIGIN_SY);
    ctx.lineTo(ORIGIN_SX, sy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glow halo
    ctx.globalAlpha = 0.22;
    const g = ctx.createRadialGradient(ORIGIN_SX, sy, 0, ORIGIN_SX, sy, 16);
    g.addColorStop(0, CONFIG.dot);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(ORIGIN_SX, sy, 16, 0, Math.PI * 2);
    ctx.fill();

    // Core dot
    ctx.globalAlpha = 1.0;
    ctx.fillStyle   = CONFIG.dot;
    ctx.beginPath();
    ctx.arc(ORIGIN_SX, sy, 5.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  const history  = [];               // ring buffer of f(0, t) values

  // ── Play/pause button ─────────────────────────────────────────────────────
  const BTN_X = W - 24, BTN_Y = 20, BTN_R = 13;
  let paused = false;

  function drawButton() {
    ctx.save();

    // Background circle
    ctx.globalAlpha = 0.55;
    ctx.fillStyle   = CONFIG.bg;
    ctx.beginPath();
    ctx.arc(BTN_X, BTN_Y, BTN_R, 0, Math.PI * 2);
    ctx.fill();

    // Border ring
    ctx.globalAlpha = 0.30;
    ctx.strokeStyle = CONFIG.axis;
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.arc(BTN_X, BTN_Y, BTN_R, 0, Math.PI * 2);
    ctx.stroke();

    // Icon
    ctx.globalAlpha = 0.75;
    ctx.fillStyle   = CONFIG.axis;
    if (paused) {
      // Play triangle ▶
      ctx.beginPath();
      ctx.moveTo(BTN_X - 3.5, BTN_Y - 5);
      ctx.lineTo(BTN_X + 6,   BTN_Y);
      ctx.lineTo(BTN_X - 3.5, BTN_Y + 5);
      ctx.closePath();
      ctx.fill();
    } else {
      // Pause bars ⏸
      ctx.fillRect(BTN_X - 5,   BTN_Y - 5, 3, 10);
      ctx.fillRect(BTN_X + 2,   BTN_Y - 5, 3, 10);
    }

    ctx.restore();
  }

  // Hit-test helper (accounts for CSS scaling of the canvas)
  function hitButton(e) {
    const rect = canvas.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) * (W / rect.width);
    const cy   = (e.clientY - rect.top)  * (H / rect.height);
    const dx   = cx - BTN_X, dy = cy - BTN_Y;
    return dx * dx + dy * dy <= BTN_R * BTN_R;
  }

  if (CONFIG.showPlayButton) {
    canvas.addEventListener('click', function (e) {
      if (!hitButton(e)) return;
      paused = !paused;
      if (!paused) last = null;   // prevent time jump on resume
    });

    canvas.addEventListener('mousemove', function (e) {
      canvas.style.cursor = hitButton(e) ? 'pointer' : 'default';
    });
  }

  // ── Animation loop ────────────────────────────────────────────────────────
  let time = 0;
  let last = null;

  function loop(ts) {
    const dt = last === null ? 0 : Math.min((ts - last) / 1000, 0.05);
    last  = ts;

    if (!paused) {
      time += dt * CONFIG.speed;

      // Record f(0, t) for the trail
      history.push(f(0, time));
      if (history.length > CONFIG.trailLength) history.shift();
    }

    ctx.fillStyle = CONFIG.bg;
    ctx.fillRect(0, 0, W, H);

    drawGrid();
    drawAxes();
    if (CONFIG.plotLabels) {
        drawLabels();
    }
    drawCurve(time);
    drawOriginDot(time);
    if (CONFIG.showPlayButton) drawButton();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
};

// Example
// plotFn(null, 'wave-function-canvas', (x, t)=> (Math.sin(2*x+10*t)))
