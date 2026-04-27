// Plots one or more functions on a single canvas.
//
// Usage:
//   plotFns(config, 'canvas-id', fn1, fn2, ...)
//   Each fn has signature: (x, t) => number
//
// Override config globally with window.PLOTFNS_CONFIG before the script loads.
//
// Example:
//   plotFns({ yMin: -2, yMax: 2 }, 'my-canvas',
//     (x, t) => Math.sin(x + t),
//     (x, t) => Math.cos(2 * x - t)
//   )

function plotFns(config, id, ...fns) {
  // ── CONFIG ───────────────────────────────────────────────────────────────
  const overrides = window.PLOTFNS_CONFIG || config || {};
  const CONFIG = {
    W: 560, H: 340,

    speed: 1.0,    // time multiplier

    xMin: -Math.PI * 2,
    xMax:  Math.PI * 2,
    yMin: -2.4,
    yMax:  2.4,

    // Colors
    bg:   '#1a1a2e',
    axis: '#e0e0e0',
    grid: '#e0e0e0',

    // Per-curve colors — cycles if fns.length > colors.length
    colors: ['#e94560', '#4fc3f7', '#81c784', '#ffb74d', '#ce93d8', '#80cbc4'],

    // Optional curve labels — shown as a legend if non-empty
    labels: [],

    xFilter:        'all',   // 'all' | 'negative' (x<=0) | 'positive' (x>=0)
    plotLabels:     true,    // y-axis numeric labels
    showPlayButton: true,    // set false for time-independent functions
    showIntersections: false,        // dot every point where two curves cross
    intersectionColor: '#ffffff',    // dot fill color
    intersectionRadius: 4,           // dot radius in px

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

  const { xMin, xMax, yMin, yMax } = CONFIG;

  // Resolve color for curve i
  function curveColor(i) {
    return CONFIG.colors[i % CONFIG.colors.length];
  }

  // ── Coordinate mapping ────────────────────────────────────────────────────
  const PAD = { l: 48, r: 18, t: 22, b: 36 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t  - PAD.b;

  function toSX(wx) { return PAD.l + (wx - xMin) / (xMax - xMin) * plotW; }
  function toSY(wy) { return PAD.t + (1 - (wy - yMin) / (yMax - yMin)) * plotH; }

  const ORIGIN_SX = toSX(0);
  const ORIGIN_SY = toSY(0);

  // ── Grid ──────────────────────────────────────────────────────────────────
  function drawGrid() {
    ctx.save();
    ctx.lineWidth   = 0.6;
    ctx.strokeStyle = CONFIG.grid;

    ctx.globalAlpha = 0.08;
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0) continue;
      ctx.beginPath();
      ctx.moveTo(PAD.l,     toSY(y));
      ctx.lineTo(W - PAD.r, toSY(y));
      ctx.stroke();
    }

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

  // ── Axes ──────────────────────────────────────────────────────────────────
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
    ctx.fillStyle   = CONFIG.axis;
    ctx.beginPath();
    ctx.moveTo(W - PAD.r,     ORIGIN_SY);
    ctx.lineTo(W - PAD.r - 7, ORIGIN_SY - 3.5);
    ctx.lineTo(W - PAD.r - 7, ORIGIN_SY + 3.5);
    ctx.closePath(); ctx.fill();

    // y-axis arrow
    ctx.beginPath();
    ctx.moveTo(ORIGIN_SX,       PAD.t);
    ctx.lineTo(ORIGIN_SX - 3.5, PAD.t + 7);
    ctx.lineTo(ORIGIN_SX + 3.5, PAD.t + 7);
    ctx.closePath(); ctx.fill();

    // x-axis ticks at multiples of π
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

    // y-axis ticks at integers
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

  // ── Y-axis numeric labels ─────────────────────────────────────────────────
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

  // ── Curve ─────────────────────────────────────────────────────────────────
  function drawCurve(fn, color, t) {
    const N      = 320;
    const filter = CONFIG.xFilter;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth   = 2.2;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    let penDown = false;
    for (let i = 0; i <= N; i++) {
      const wx      = xMin + (i / N) * (xMax - xMin);
      const wy      = fn(wx, t);
      const inBounds = wy >= yMin && wy <= yMax;
      const visible  = inBounds && (filter === 'all' || (filter === 'negative' ? wx <= 0 : wx >= 0));
      const sx      = toSX(wx);
      const sy      = toSY(wy);
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

  // ── Intersections ─────────────────────────────────────────────────────────
  // For each pair of functions, scan for sign changes in (fi - fj) then
  // bisect to find the crossing x, and draw a dot there.

  function findIntersections(fi, fj, t) {
    const N       = 640;   // finer scan than the curve for accuracy
    const results = [];
    let prev = fi(xMin, t) - fj(xMin, t);

    for (let k = 1; k <= N; k++) {
      const x    = xMin + (k / N) * (xMax - xMin);
      const curr = fi(x, t) - fj(x, t);

      if (prev * curr < 0) {
        // Sign change — bisect between x_prev and x
        let lo = x - (xMax - xMin) / N, hi = x;
        for (let b = 0; b < 24; b++) {
          const mid  = (lo + hi) / 2;
          const dMid = fi(mid, t) - fj(mid, t);
          if (dMid === 0) { lo = hi = mid; break; }
          (prev * dMid < 0) ? (hi = mid) : (lo = mid);
        }
        const xc = (lo + hi) / 2;
        const yc = (fi(xc, t) + fj(xc, t)) / 2;
        // Only keep points within the visible bounds
        if (yc >= yMin && yc <= yMax) results.push({ x: xc, y: yc });
      }

      prev = curr;
    }
    return results;
  }

  function drawIntersections(t) {
    if (!CONFIG.showIntersections || fns.length < 2) return;
    const r = CONFIG.intersectionRadius;
    ctx.save();
    ctx.fillStyle   = CONFIG.intersectionColor;
    ctx.globalAlpha = 0.9;
    for (let i = 0; i < fns.length - 1; i++) {
      for (let j = i + 1; j < fns.length; j++) {
        for (const { x, y } of findIntersections(fns[i], fns[j], t)) {
          const sx = toSX(x), sy = toSY(y);
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  // ── Legend ────────────────────────────────────────────────────────────────
  function drawLegend() {
    const labels = CONFIG.labels;
    if (!labels.length) return;
    ctx.save();
    ctx.font      = '11px monospace';
    ctx.textAlign = 'left';
    const lineH   = 16, swatchW = 10, gap = 6, pad = 8;
    const count   = Math.min(labels.length, fns.length);
    const boxH    = count * lineH + pad;
    const boxW    = 120;
    const bx      = W - PAD.r - boxW;
    const by      = PAD.t + 2;

    // Background
    ctx.globalAlpha = 0.45;
    ctx.fillStyle   = CONFIG.bg;
    ctx.fillRect(bx, by, boxW, boxH);

    for (let i = 0; i < count; i++) {
      const color = curveColor(i);
      const y     = by + pad / 2 + i * lineH + lineH / 2;

      // Swatch
      ctx.globalAlpha = 0.9;
      ctx.fillStyle   = color;
      ctx.fillRect(bx + pad, y - swatchW / 2, swatchW, swatchW);

      // Label
      ctx.globalAlpha = 0.7;
      ctx.fillStyle   = CONFIG.axis;
      ctx.fillText(labels[i], bx + pad + swatchW + gap, y + 4);
    }
    ctx.restore();
  }

  // ── Play/pause button ─────────────────────────────────────────────────────
  const BTN_X = W - 24, BTN_Y = 20, BTN_R = 13;
  let paused = false;

  function drawButton() {
    ctx.save();

    ctx.globalAlpha = 0.55;
    ctx.fillStyle   = CONFIG.bg;
    ctx.beginPath();
    ctx.arc(BTN_X, BTN_Y, BTN_R, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 0.30;
    ctx.strokeStyle = CONFIG.axis;
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.arc(BTN_X, BTN_Y, BTN_R, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.75;
    ctx.fillStyle   = CONFIG.axis;
    if (paused) {
      ctx.beginPath();
      ctx.moveTo(BTN_X - 3.5, BTN_Y - 5);
      ctx.lineTo(BTN_X + 6,   BTN_Y);
      ctx.lineTo(BTN_X - 3.5, BTN_Y + 5);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(BTN_X - 5, BTN_Y - 5, 3, 10);
      ctx.fillRect(BTN_X + 2, BTN_Y - 5, 3, 10);
    }

    ctx.restore();
  }

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
      if (!paused) {
        last = null;
        requestAnimationFrame(loop);
      } else {
        draw();   // redraw once so the button icon updates to ▶
      }
    });
    canvas.addEventListener('mousemove', function (e) {
      canvas.style.cursor = hitButton(e) ? 'pointer' : 'default';
    });
  }

  // ── Animation loop ────────────────────────────────────────────────────────
  let time = 0;
  let last = null;

  function draw() {
    ctx.fillStyle = CONFIG.bg;
    ctx.fillRect(0, 0, W, H);

    drawGrid();
    drawAxes();
    if (CONFIG.plotLabels) drawLabels();

    fns.forEach((fn, i) => drawCurve(fn, curveColor(i), time));
    drawIntersections(time);

    drawLegend();
    if (CONFIG.showPlayButton) drawButton();
  }

  function loop(ts) {
    const dt = last === null ? 0 : Math.min((ts - last) / 1000, 0.05);
    last = ts;
    time += dt * CONFIG.speed;
    draw();
    if (!paused) requestAnimationFrame(loop);
  }

  if (CONFIG.showPlayButton) {
    requestAnimationFrame(loop);
  } else {
    draw();
  }
}
