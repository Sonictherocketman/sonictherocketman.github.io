// <div id="potential-well-container" style="text-align:center; margin: 2em 0;">
//   <canvas id="potential-well-canvas"></canvas>
// </div>
// Override styles with window.WELL_CONFIG before the script loads.

(function () {
  // ── CONFIG ───────────────────────────────────────────────────────────────
  const overrides = window.WELL_CONFIG || {};
  const CONFIG = {
    width:  600,
    height: 420,

    // Physics (sim units where well half-width = 1)
    k:          50,    // well stiffness (spring constant)
    friction:   0.55,   // viscous damping coefficient
    ballMass:   1.0,

    // Initial conditions — x0 is how far from center the ball starts
    x0:         0.78,   // starting position along well (−1 … 1)
    v0:         0.0,    // initial velocity along well

    // Ball appearance
    ballRadius: 14,     // px

    // Colors (matching the site palette)
    background:  '#1a1a2e',
    wellColor:   '#e0e0e0',
    ballColor:   '#e94560',

    // Y-axis label
    yLabel:      'V(x)',
    labelColor:  '#e0e0e0',

    // Label at the well minimum (x=0). Set to '' to hide.
    minValueLabel: '',

    // Well curve drawing
    wellWidth:   0.88,  // fraction of canvas width used by the well
    wellDepth:   0.52,  // fraction of canvas height for the well depth
    curvePoints: 200,

    ...overrides,
  };
  // ─────────────────────────────────────────────────────────────────────────

  const canvas = document.getElementById('potential-well-canvas');
  const ctx    = canvas.getContext('2d');
  const dpr    = window.devicePixelRatio || 1;

  canvas.width        = CONFIG.width  * dpr;
  canvas.height       = CONFIG.height * dpr;
  canvas.style.width  = CONFIG.width  + 'px';
  canvas.style.height = CONFIG.height + 'px';
  ctx.scale(dpr, dpr);

  const W = CONFIG.width;
  const H = CONFIG.height;

  // ── Well geometry ─────────────────────────────────────────────────────────
  // Sim x ∈ [−1, 1] maps to canvas x.  V(x) = k * x² / 2 maps to canvas y.
  const wellHalfW = W * CONFIG.wellWidth / 2;   // px from center
  const wellTopY  = H * 0.08;                    // y of well rim (top of parabola arms)
  const wellBotY  = H * (0.08 + CONFIG.wellDepth); // y of well bottom

  // V at rim: V(1) = k/2. Map V range [0, k/2] to y range [wellBotY, wellTopY].
  const Vmax = CONFIG.k / 2;

  function simToCanvas(x, V) {
    const cx = W / 2 + x * wellHalfW;
    const cy = wellBotY - (V / Vmax) * (wellBotY - wellTopY);
    return { cx, cy };
  }

  // ── Physics state ─────────────────────────────────────────────────────────
  let x  = CONFIG.x0;    // position along well
  let vx = CONFIG.v0;    // velocity along well
  let ballAngle = 0;     // visual rotation angle (radians)

  // ── RK4 ───────────────────────────────────────────────────────────────────
  function derivatives(x, vx) {
    const F = -CONFIG.k * x - CONFIG.friction * vx;
    const ax = F / CONFIG.ballMass;
    return { dx: vx, dvx: ax };
  }

  function rk4Step(x, vx, dt) {
    const k1 = derivatives(x,                    vx);
    const k2 = derivatives(x + k1.dx  * dt / 2, vx + k1.dvx * dt / 2);
    const k3 = derivatives(x + k2.dx  * dt / 2, vx + k2.dvx * dt / 2);
    const k4 = derivatives(x + k3.dx  * dt,      vx + k3.dvx * dt);

    return {
      x:  x  + (k1.dx  + 2*k2.dx  + 2*k3.dx  + k4.dx)  * dt / 6,
      vx: vx + (k1.dvx + 2*k2.dvx + 2*k3.dvx + k4.dvx) * dt / 6,
    };
  }

  // ── Tangent angle along the parabola at position x ───────────────────────
  // y(x) = wellBotY − (k * x² / 2) / Vmax * (wellBotY − wellTopY)
  // dy/dx (in canvas coords) with respect to canvas x:
  function wellTangentAngle(x) {
    // slope in sim space: dV/dx = k*x, so dcanvasY/dcanvasX = −(k*x/Vmax)*(wellBotY−wellTopY)/wellHalfW
    const dydx = -(CONFIG.k * x / Vmax) * (wellBotY - wellTopY) / wellHalfW;
    return Math.atan2(dydx, 1);  // angle of tangent from horizontal
  }

  // ── Draw well curve ────────────────────────────────────────────────────────
  function drawWell() {
    const n = CONFIG.curvePoints;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * 2 - 1;           // −1 … 1
      const V = CONFIG.k * t * t / 2;
      const { cx, cy } = simToCanvas(t, V);
      if (i === 0) ctx.moveTo(cx, cy);
      else          ctx.lineTo(cx, cy);
    }
    ctx.strokeStyle = CONFIG.wellColor;
    ctx.lineWidth   = 2.5;
    ctx.globalAlpha = 0.85;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Subtle filled region under the curve
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * 2 - 1;
      const V = CONFIG.k * t * t / 2;
      const { cx, cy } = simToCanvas(t, V);
      if (i === 0) ctx.moveTo(cx, cy);
      else          ctx.lineTo(cx, cy);
    }
    // close back along the bottom
    const { cx: rEdge, cy: rTop } = simToCanvas( 1, Vmax);
    const { cx: lEdge, cy: lTop } = simToCanvas(-1, Vmax);
    ctx.lineTo(rEdge, H);
    ctx.lineTo(lEdge, H);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, wellTopY, 0, wellBotY);
    grad.addColorStop(0, 'rgba(15,52,96,0.0)');
    grad.addColorStop(1, 'rgba(15,52,96,0.45)');
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // ── Draw ball ─────────────────────────────────────────────────────────────
  function drawBall(cx, cy, angle) {
    const R = CONFIG.ballRadius;

    ctx.save();

    // Ball body
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const ballGrad = ctx.createRadialGradient(-R * 0.3, -R * 0.3, R * 0.1, 0, 0, R);
    ballGrad.addColorStop(0, '#ff7a90');
    ballGrad.addColorStop(1, CONFIG.ballColor);
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.fillStyle = ballGrad;
    ctx.fill();

    // Rolling stripe — shows the rotation clearly
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(-R, 0);
    ctx.lineTo( R, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -R);
    ctx.lineTo(0,  R);
    ctx.stroke();

    // Specular highlight
    ctx.beginPath();
    ctx.arc(-R * 0.28, -R * 0.3, R * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.fill();

    ctx.restore();
  }

  // ── Draw Y-axis label ─────────────────────────────────────────────────────
  function drawYLabel() {
    if (!CONFIG.yLabel) return;
    ctx.save();
    ctx.font         = '13px monospace';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha  = 0.6;
    ctx.fillStyle    = CONFIG.labelColor;
    ctx.translate(14, (wellTopY + wellBotY) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(CONFIG.yLabel, 0, 0);
    ctx.restore();
  }

  // ── Draw min-value arrow + label ─────────────────────────────────────────
  function drawMinLabel() {
    if (!CONFIG.minValueLabel) return;
    const { cx, cy } = simToCanvas(0, 0);   // well bottom is at x=0, V=0
    const arrowLen  = 28;
    const tipY      = cy - CONFIG.ballRadius - 18;
    const tailY     = tipY - arrowLen;

    ctx.save();
    ctx.strokeStyle = CONFIG.labelColor;
    ctx.fillStyle   = CONFIG.labelColor;
    ctx.globalAlpha = 0.7;
    ctx.lineWidth   = 1.5;

    // Label
    ctx.font         = '12px monospace';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(CONFIG.minValueLabel, cx, tailY - 2);

    // Shaft
    ctx.beginPath();
    ctx.moveTo(cx, tailY);
    ctx.lineTo(cx, tipY - 6);
    ctx.stroke();

    // Arrowhead pointing down
    ctx.beginPath();
    ctx.moveTo(cx, tipY);
    ctx.lineTo(cx - 5, tipY - 9);
    ctx.lineTo(cx + 5, tipY - 9);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // ── Main draw ─────────────────────────────────────────────────────────────
  function draw() {
    ctx.fillStyle = CONFIG.background;
    ctx.fillRect(0, 0, W, H);

    drawWell();
    drawYLabel();
    drawMinLabel();

    // Ball position on the well surface
    const V  = CONFIG.k * x * x / 2;
    const { cx, cy } = simToCanvas(x, V);
    const tangent     = wellTangentAngle(x);

    // Shift ball to sit on top of the curve (offset along outward normal).
    // Outward normal of parabola in canvas coords (y-down): (slope, -1)/||...||
    // which equals (sin(tangent), -cos(tangent)) — ball lifts off the surface upward.
    const R   = CONFIG.ballRadius;
    const bx  = cx + Math.sin(tangent) * R;
    const by  = cy - Math.cos(tangent) * R;

    drawBall(bx, by, ballAngle);
  }

  // ── Animation loop ────────────────────────────────────────────────────────
  const dt  = 1 / 240;   // physics timestep
  let last  = null;

  function loop(ts) {
    if (last !== null) {
      const elapsed = Math.min((ts - last) / 1000, 0.05);
      const steps   = Math.max(1, Math.round(elapsed / dt));
      for (let i = 0; i < steps; i++) {
        const prev = x;
        const next = rk4Step(x, vx, dt);
        x  = next.x;
        vx = next.vx;

        // Arc-length traveled on the parabola → rolling angle
        // ds ≈ dx * sqrt(1 + (dV/dx)²) in canvas space → simplify to ds ≈ |dx_canvas|
        // For rolling without slipping: dθ = ds / R
        const dxCanvas = (x - prev) * wellHalfW;
        ballAngle += dxCanvas / CONFIG.ballRadius;
      }
    }
    last = ts;
    draw();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();
