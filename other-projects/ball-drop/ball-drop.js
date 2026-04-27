// <div id="ball-drop-container" style="text-align:center; margin: 2em 0;">
//   <canvas id="ball-drop-canvas"></canvas>
// </div>
// Override with window.BALL_CONFIG before the script loads.

(function () {
  // ── CONFIG ───────────────────────────────────────────────────────────────
  const overrides = window.BALL_CONFIG || {};
  const CONFIG = {
    W: 540, H: 420,

    numBalls:          200,      // active (non-stuck) balls at any time
    ballRadius:        4,        // px

    gravity:           280,      // px/s²  downward
    forceMagMin:       10,       // px/s²  personal upward force range
    forceMagMax:       180,
    forceAngleSpread:  0.28,     // ± radians from vertical

    thresholdFraction: 0.9,      // top fraction of box where balls can stick
    stickDelay:        0.1,      // seconds above threshold before sticking

    wallThickness:     2,

    // Colors
    bg:        '#1a1a2e',
    wallColor: '#e0e0e0',
    ballColor: '#e94560',
    glowColor: '#64ffda',        // pale teal / green-blue

    lifetimeMin: 6,              // seconds before a ball expires and is replaced
    lifetimeMax: 14,

    logScale: false,             // if true, compress y-axis logarithmically (floor=dense, top=expanded)

    showForceVectors:  true,
    showThresholdLine: true,
    thresholdLabel:    '"Success"',   // text drawn at center of threshold line; '' = none

    // Box expansion — widens the box from one width to another over time
    expandBox:          false,   // enable box width animation
    boxStartFraction:   0.3,     // initial box width as fraction of canvas width (0–1)
    boxEndFraction:     1.0,     // final box width as fraction of canvas width (0–1)
    expandDelay:        2,       // seconds before expansion begins
    expandDuration:     4,       // seconds for the expansion to complete

    // Play/pause button
    showPlayButton: true,

    maxRuntime: 0,   // seconds before simulation resets; 0 = never

    ...overrides,
  };
  // ─────────────────────────────────────────────────────────────────────────

  const { W, H } = CONFIG;
  const canvas = document.getElementById('ball-drop-canvas');
  const ctx    = canvas.getContext('2d');
  const dpr    = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;  canvas.height = H * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);

  const WT      = CONFIG.wallThickness;
  const boxBot  = H - WT;
  const R       = CONFIG.ballRadius;
  const threshY = H - H * CONFIG.thresholdFraction;  // y-coordinate of threshold line

  // Current box horizontal bounds — updated each frame via updateBoxBounds()
  let curBoxL = WT;
  let curBoxR = W - WT;

  function updateBoxBounds(t) {
    if (!CONFIG.expandBox) {
      curBoxL = WT;
      curBoxR = W - WT;
      return;
    }
    let p = 0;
    if (t >= CONFIG.expandDelay + CONFIG.expandDuration) {
      p = 1;
    } else if (t > CONFIG.expandDelay) {
      const raw = (t - CONFIG.expandDelay) / CONFIG.expandDuration;
      p = raw * raw * (3 - 2 * raw);   // smoothstep easing
    }
    const frac   = CONFIG.boxStartFraction + (CONFIG.boxEndFraction - CONFIG.boxStartFraction) * p;
    const innerW = (W - 2 * WT) * frac;
    curBoxL = W / 2 - innerW / 2;
    curBoxR = W / 2 + innerW / 2;
  }

  // Seed bounds at t=0 before balls are created
  updateBoxBounds(0);

  // Maps a physical y to a screen y. Physics always runs in linear space;
  // log mode only affects rendering.
  function displayY(y) {
    if (!CONFIG.logScale) return y;
    return boxBot * Math.log(y + 1) / Math.log(boxBot + 1);
  }

  // ── Ball factory ──────────────────────────────────────────────────────────
  function makeBall() {
    const mag = CONFIG.forceMagMin + Math.random() * (CONFIG.forceMagMax - CONFIG.forceMagMin);
    return {
      x:  curBoxL + R + Math.random() * (curBoxR - curBoxL - 2 * R),
      y:  threshY + R + Math.random() * (boxBot - threshY - 2 * R),
      vx: (Math.random() - 0.5) * 60,
      vy: (Math.random() - 0.5) * 60,
      r:  R,
      fx: 0, fy: 0,                 // recomputed each frame from angle
      forceMag:   mag,
      anglePhase: Math.random() * Math.PI * 2,   // random start phase
      angleFreq:  0.3 + Math.random() * 0.7,     // 0.3–1.0 Hz oscillation
      magPhase:   Math.random() * Math.PI * 2,   // independent phase for magnitude wobble
      magFreq:    0.2 + Math.random() * 0.5,     // 0.2–0.7 Hz
      magWobble:  0.15 + Math.random() * 0.15,   // ±15–30% of forceMag
      stuck:      false,
      timeAbove:  0,
      age:        0,
      lifetime:   CONFIG.lifetimeMin + Math.random() * (CONFIG.lifetimeMax - CONFIG.lifetimeMin),
    };
  }

  const balls = [];
  for (let i = 0; i < CONFIG.numBalls; i++) {
    balls.push(makeBall());
  }

  // ── Physics ───────────────────────────────────────────────────────────────
  function update(dt, t) {
    const g = CONFIG.gravity;

    for (const b of balls) {
      b.age += dt;
    }

    // Remove expired balls and spawn replacements
    for (let i = balls.length - 1; i >= 0; i--) {
      if (balls[i].age >= balls[i].lifetime) {
        balls.splice(i, 1);
        balls.push(makeBall());
      }
    }

    for (const b of balls) {
      if (b.stuck) continue;

      // Oscillate angle within ±forceAngleSpread and magnitude within ±magWobble
      const angle = Math.sin(t * b.angleFreq * Math.PI * 2 + b.anglePhase) * CONFIG.forceAngleSpread;
      const mag   = b.forceMag * (1 + Math.sin(t * b.magFreq * Math.PI * 2 + b.magPhase) * b.magWobble);
      b.fx = mag * Math.sin(angle);
      b.fy = -mag * Math.cos(angle);

      // Net acceleration = personal force + gravity
      b.vx += b.fx * dt;
      b.vy += (b.fy + g) * dt;
      b.x  += b.vx * dt;
      b.y  += b.vy * dt;

      // Box wall collisions (elastic reflection)
      if (b.x - b.r < curBoxL) { b.x = curBoxL + b.r; if (b.vx < 0) b.vx = -b.vx; }
      if (b.x + b.r > curBoxR) { b.x = curBoxR - b.r; if (b.vx > 0) b.vx = -b.vx; }
      if (b.y + b.r > boxBot)  { b.y = boxBot   - b.r; if (b.vy > 0) b.vy = -b.vy; }
      if (b.y - b.r < 0)       { b.y = b.r;            if (b.vy < 0) b.vy = -b.vy; }

      // Threshold: glow while above, stick after delay
      if (b.y - b.r < threshY) {
        b.timeAbove += dt;
        if (b.timeAbove >= CONFIG.stickDelay) {
          b.stuck = true;
          balls.push(makeBall());
        }
      } else {
        b.timeAbove = 0;
      }
    }

    // Ball-ball collisions  (O(n²), fine for small n)
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i], b = balls[j];

        const dx  = b.x - a.x, dy = b.y - a.y;
        const d2  = dx * dx + dy * dy;
        const min = a.r + b.r;
        if (d2 >= min * min || d2 === 0) continue;

        const d   = Math.sqrt(d2);
        const nx  = dx / d, ny = dy / d;   // unit normal a→b
        const ov  = min - d;

        // ── Separate ──
        if (!a.stuck && !b.stuck) {
          a.x -= nx * ov * 0.5;  a.y -= ny * ov * 0.5;
          b.x += nx * ov * 0.5;  b.y += ny * ov * 0.5;
        } else if (a.stuck) {
          b.x += nx * ov;  b.y += ny * ov;
        } else {
          a.x -= nx * ov;  a.y -= ny * ov;
        }

        // ── Velocity (perfectly elastic) ──
        if (!a.stuck && !b.stuck) {
          // Equal-mass: exchange velocity components along the normal
          const dvn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
          if (dvn > 0) {
            a.vx -= dvn * nx;  a.vy -= dvn * ny;
            b.vx += dvn * nx;  b.vy += dvn * ny;
          }
        } else if (a.stuck) {
          // b bounces off immovable a: reflect b along normal
          const vn = b.vx * nx + b.vy * ny;
          if (vn < 0) { b.vx -= 2 * vn * nx;  b.vy -= 2 * vn * ny; }
        } else {
          // a bounces off immovable b: reflect a along normal
          const vn = a.vx * nx + a.vy * ny;
          if (vn > 0) { a.vx -= 2 * vn * nx;  a.vy -= 2 * vn * ny; }
        }
      }
    }
  }

  // ── Draw ──────────────────────────────────────────────────────────────────
  function drawBall(b) {
    ctx.save();
    const isGlowing = !b.stuck && b.timeAbove > 0;
    const frac      = isGlowing ? Math.min(b.timeAbove / CONFIG.stickDelay, 1) : 0;

    // Fade out during the last 20% of lifetime
    const lifeFrac  = b.age / b.lifetime;
    const fadeMult  = lifeFrac > 0.8 ? 1 - (lifeFrac - 0.8) / 0.2 : 1;

    const dy = displayY(b.y);

    if (b.stuck || isGlowing) {
      // Halo
      const haloR = b.r * (b.stuck ? 2.8 : 2.2);
      const alpha = (b.stuck ? 0.35 : frac * 0.28) * fadeMult;
      const grad  = ctx.createRadialGradient(b.x, dy, 0, b.x, dy, haloR);
      grad.addColorStop(0, CONFIG.glowColor);
      grad.addColorStop(1, 'transparent');
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = grad;
      ctx.beginPath();
      ctx.arc(b.x, dy, haloR, 0, Math.PI * 2);
      ctx.fill();
    }

    // Core
    ctx.globalAlpha = 0.92 * fadeMult;
    ctx.fillStyle   = (b.stuck || isGlowing) ? CONFIG.glowColor : CONFIG.ballColor;
    ctx.beginPath();
    ctx.arc(b.x, dy, b.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawForceVector(b) {
    const scale = 0.10;
    const fdx = b.fx * scale, fdy = b.fy * scale;
    const len = Math.sqrt(fdx * fdx + fdy * fdy);
    if (len < 3) return;

    const sx = b.x,            sy = displayY(b.y);
    const ex = b.x + fdx,      ey = displayY(b.y + fdy);
    const dx = ex - sx,        dy = ey - sy;
    const dlen = Math.sqrt(dx * dx + dy * dy) || len;
    const ux = dx / dlen, uy = dy / dlen;
    const hLen = 5, hAng = 0.42;

    ctx.save();
    ctx.strokeStyle = CONFIG.ballColor;
    ctx.lineWidth   = 1.5;
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    // Arrowhead
    ctx.fillStyle   = CONFIG.ballColor;
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(
      ex - hLen * (ux * Math.cos( hAng) - uy * Math.sin( hAng)),
      ey - hLen * (uy * Math.cos( hAng) + ux * Math.sin( hAng))
    );
    ctx.lineTo(
      ex - hLen * (ux * Math.cos(-hAng) - uy * Math.sin(-hAng)),
      ey - hLen * (uy * Math.cos(-hAng) + ux * Math.sin(-hAng))
    );
    ctx.closePath();
    ctx.fill();
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
    ctx.strokeStyle = CONFIG.wallColor;
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.arc(BTN_X, BTN_Y, BTN_R, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.75;
    ctx.fillStyle   = CONFIG.wallColor;
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
        draw();   // redraw once so button icon updates to ▶
      }
    });
    canvas.addEventListener('mousemove', function (e) {
      canvas.style.cursor = hitButton(e) ? 'pointer' : 'default';
    });
  }

  function draw() {
    ctx.fillStyle = CONFIG.bg;
    ctx.fillRect(0, 0, W, H);

    // Threshold line
    if (CONFIG.showThresholdLine) {
      ctx.save();
      ctx.strokeStyle = CONFIG.glowColor;
      ctx.lineWidth   = 1;
      ctx.globalAlpha = 0.18;
      ctx.setLineDash([5, 7]);
      const tsy = displayY(threshY);
      ctx.beginPath();
      ctx.moveTo(curBoxL, tsy);
      ctx.lineTo(curBoxR, tsy);
      ctx.stroke();

      if (CONFIG.thresholdLabel) {
        ctx.setLineDash([]);
        ctx.font         = '11px monospace';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'bottom';
        const mid     = (curBoxL + curBoxR) / 2;
        const metrics = ctx.measureText(CONFIG.thresholdLabel);
        const pad     = 6;
        ctx.globalAlpha = 1;
        ctx.fillStyle   = CONFIG.bg;
        ctx.fillRect(mid - metrics.width / 2 - pad, tsy - 14, metrics.width + pad * 2, 12);
        ctx.globalAlpha = 0.55;
        ctx.fillStyle   = CONFIG.glowColor;
        ctx.fillText(CONFIG.thresholdLabel, mid, tsy - 2);
      }

      ctx.restore();
    }

    // Balls (stuck first so active balls render on top)
    for (const b of balls) if ( b.stuck) drawBall(b);
    for (const b of balls) if (!b.stuck) drawBall(b);

    // Force vectors on active balls
    if (CONFIG.showForceVectors) {
      for (const b of balls) if (!b.stuck) drawForceVector(b);
    }

    // Box walls (drawn last so they sit on top of clipped balls)
    ctx.save();
    ctx.strokeStyle = CONFIG.wallColor;
    ctx.lineWidth   = WT * 2;   // stroke is centered on the line, so double to fill inward
    ctx.globalAlpha = 0.45;
    ctx.lineCap     = 'square';
    ctx.beginPath();
    ctx.moveTo(curBoxL, 0);
    ctx.lineTo(curBoxL, boxBot);
    ctx.lineTo(curBoxR, boxBot);
    ctx.lineTo(curBoxR, 0);
    ctx.stroke();
    ctx.restore();

    if (CONFIG.showPlayButton) drawButton();
  }

  // ── Loop ──────────────────────────────────────────────────────────────────
  let last = null;
  let time = 0;

  function reset() {
    time = 0;
    last = null;
    balls.length = 0;
    updateBoxBounds(0);
    for (let i = 0; i < CONFIG.numBalls; i++) balls.push(makeBall());
  }

  function loop(ts) {
    const dt = last === null ? 0 : Math.min((ts - last) / 1000, 0.05);
    last = ts;
    time += dt;
    if (CONFIG.maxRuntime > 0 && time >= CONFIG.maxRuntime) reset();
    updateBoxBounds(time);
    update(dt, time);
    draw();
    if (!paused) requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
