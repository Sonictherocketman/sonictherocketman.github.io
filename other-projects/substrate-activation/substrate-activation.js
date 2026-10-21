// <div id="substrate-activation-container" style="text-align:center; margin: 2em 0;">
//   <canvas id="substrate-activation-canvas"></canvas>
// </div>
// Override styles with window.SUB_CONFIG before the script loads.

(function () {
  // ── CONFIG ───────────────────────────────────────────────────────────────
  const overrides = window.SUB_CONFIG || {};
  const CONFIG = {
    width:       600,
    height:      600,

    // Wave parameters
    waveSpeed:   120,    // px/s

    // Substrate colors
    bgInactive:  '#0a0a14',
    bgActive:    '#0f3460',

    // Wave ring appearance
    waveColor:   '#e94560',
    waveWidth:   3,
    waveGlow:    '#e94560',
    waveGlowRadius: 24,

    // Ripple echoes (secondary rings behind front)
    rippleCount: 4,
    rippleSpacing: 0.06,  // fraction of maxRadius behind main wave
    rippleAlpha: 0.25,

    // Transition width for water fill (fraction of canvas)
    transitionWidth: 0.12,

    // Shape outline
    shapeColor:  '#e0e0e0',
    shapeWidth:  1.5,

    // Fill color inside shape (before activation)
    fillInactive:'#0d0d1a',

    // Text label
    label:       'substrate activation',
    labelColor:  '#e0e0e0',
    labelSize:   12,
    labelOpacity: 0.4,

    // Animation timing
    sourceDelay: 1.0,     // seconds after shape draws before wave fires
    shapeDrawTime: 1.2,   // seconds to draw the shape outline

    ...overrides,
  };
  // ─────────────────────────────────────────────────────────────────────────

  const canvas = document.getElementById('substrate-activation-canvas');
  const ctx    = canvas.getContext('2d');
  const dpr    = window.devicePixelRatio || 1;

  canvas.width        = CONFIG.width  * dpr;
  canvas.height       = CONFIG.height * dpr;
  canvas.style.width  = CONFIG.width  + 'px';
  canvas.style.height = CONFIG.height + 'px';
  ctx.scale(dpr, dpr);

  const W = CONFIG.width;
  const H = CONFIG.height;

  // ── Shape: winding polygon (corridor-like floor plan) ─────────────────
  // Single closed loop — chambers and corridors forming an enclosed shape.
  const SHAPE = [
    // Upper edge
    { x: 140, y: 100 },   // 0: upper-left corner
    { x: 320, y: 100 },   // 1: upper-right corner
    // Right side — upper chamber
    { x: 380, y: 120 },   // 2: right bulge top
    { x: 380, y: 200 },   // 3: right wall
    { x: 300, y: 200 },   // 4: inner corner
    { x: 300, y: 260 },   // 5: up into chamber
    { x: 360, y: 260 },   // 6: right wall
    // Right corridor
    { x: 360, y: 340 },   // 7: down right side
    // Lower-right chamber
    { x: 280, y: 340 },   // 8: inner corner
    { x: 280, y: 400 },   // 9: down
    { x: 340, y: 400 },   // 10: right wall
    // Bottom
    { x: 340, y: 460 },   // 11: bottom-right corner
    // Bottom-left chamber
    { x: 200, y: 460 },   // 12: across bottom
    { x: 200, y: 380 },   // 13: up right side
    { x: 120, y: 380 },   // 14: left wall
    { x: 120, y: 320 },   // 15: up
    // Left corridor
    { x: 140, y: 320 },   // 16: right into corridor
    // Upper-left chamber
    { x: 140, y: 240 },   // 17: down left side
    { x: 160, y: 240 },   // 18: right wall
    { x: 160, y: 180 },   // 19: up
    { x: 220, y: 180 },   // 20: right wall
    { x: 220, y: 100 },   // 21: up to upper edge
    // Close back to start — connects to vertex 0 (140, 100)
  ];

  // ── Point-in-polygon (ray casting) ────────────────────────────────────
  function pointInPolygon(px, py) {
    let inside = false;
    for (let i = 0, j = SHAPE.length - 1; i < SHAPE.length; j = i++) {
      const xi = SHAPE[i].x, yi = SHAPE[i].y;
      const xj = SHAPE[j].x, yj = SHAPE[j].y;
      if (((yi > py) !== (yj > py)) &&
          (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  }

  // ── Source point (find interior point) ────────────────────────────────
  function findInteriorPoint() {
    const cx = W / 2, cy = H / 2;
    for (let r = 0; r < 100; r++) {
      for (let s = 0; s < 100; s++) {
        const px = cx + (r - 50) * 2;
        const py = cy + (s - 50) * 2;
        if (pointInPolygon(px, py)) return { x: px, y: py };
      }
    }
    return { x: cx, y: cy };
  }

  const src = findInteriorPoint();

  // ── Wall reflection: mirror sources ──────────────────────────────────
  // Mirror the source across each edge to simulate wave reflections.
  function mirrorPointAcrossEdge(point, edgeA, edgeB) {
    const dx = edgeB.x - edgeA.x;
    const dy = edgeB.y - edgeA.y;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return point;
    const t = ((point.x - edgeA.x) * dx + (point.y - edgeA.y) * dy) / len2;
    const projX = edgeA.x + t * dx;
    const projY = edgeA.y + t * dy;
    return {
      x: 2 * projX - point.x,
      y: 2 * projY - point.y,
    };
  }

  const mirrors = [{ sx: src.x, sy: src.y }]; // direct source

  for (let i = 0; i < SHAPE.length; i++) {
    const j = (i + 1) % SHAPE.length;
    const mirror = mirrorPointAcrossEdge(src, SHAPE[i], SHAPE[j]);
    const d = Math.sqrt((mirror.x - src.x) ** 2 + (mirror.y - src.y) ** 2);
    if (d < W * 1.5) {
      mirrors.push(mirror);
    }
  }

  // ── Max radius: distance to farthest point in shape ───────────────────
  let maxRadius = 0;
  for (const v of SHAPE) {
    const d = Math.sqrt((v.x - src.x) ** 2 + (v.y - src.y) ** 2);
    if (d > maxRadius) maxRadius = d;
  }

  // ── Bounding box ─────────────────────────────────────────────────────
  let sMinX = Infinity, sMinY = Infinity, sMaxX = -Infinity, sMaxY = -Infinity;
  for (const v of SHAPE) {
    if (v.x < sMinX) sMinX = v.x;
    if (v.y < sMinY) sMinY = v.y;
    if (v.x > sMaxX) sMaxX = v.x;
    if (v.y > sMaxY) sMaxY = v.y;
  }
  const shapeW = sMaxX - sMinX;
  const shapeH = sMaxY - sMinY;

  // ── Draw shape outline (animated draw-on) ─────────────────────────────
  function drawShapeOutline(progress) {
    const totalLen = SHAPE.reduce((sum, v, i) => {
      const j = (i + 1) % SHAPE.length;
      return sum + Math.sqrt((SHAPE[j].x - v.x) ** 2 + (SHAPE[j].y - v.y) ** 2);
    }, 0);

    const drawLen = progress * totalLen;

    ctx.strokeStyle = CONFIG.shapeColor;
    ctx.lineWidth   = CONFIG.shapeWidth;
    ctx.globalAlpha = 0.7;

    let remaining = drawLen;
    for (let i = 0; i < SHAPE.length && remaining > 0; i++) {
      const j = (i + 1) % SHAPE.length;
      const elen = Math.sqrt((SHAPE[j].x - SHAPE[i].x) ** 2 + (SHAPE[j].y - SHAPE[i].y) ** 2);
      const frac = Math.min(remaining / elen, 1);

      ctx.beginPath();
      ctx.moveTo(SHAPE[i].x, SHAPE[i].y);
      ctx.lineTo(
        SHAPE[i].x + (SHAPE[j].x - SHAPE[i].x) * frac,
        SHAPE[i].y + (SHAPE[j].y - SHAPE[i].y) * frac
      );
      ctx.stroke();

      remaining -= elen;
    }

    ctx.globalAlpha = 1;
  }

  // ── Fill shape interior ───────────────────────────────────────────────
  function fillShape(color) {
    ctx.beginPath();
    ctx.moveTo(SHAPE[0].x, SHAPE[0].y);
    for (let i = 1; i < SHAPE.length; i++) {
      ctx.lineTo(SHAPE[i].x, SHAPE[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = color || CONFIG.fillInactive;
    ctx.fill();
  }

  // ── Clip to shape ────────────────────────────────────────────────────
  function clipToShape() {
    ctx.beginPath();
    ctx.moveTo(SHAPE[0].x, SHAPE[0].y);
    for (let i = 1; i < SHAPE.length; i++) {
      ctx.lineTo(SHAPE[i].x, SHAPE[i].y);
    }
    ctx.closePath();
    ctx.clip();
  }

  // ── Draw activated fill (water behind wavefront) ──────────────────────
  // Fills area behind the wave with active color. At the wavefront edge,
  // fades from active → inactive to show the water line.
  function drawActivatedFill(waveR) {
    const transW = CONFIG.transitionWidth * W;

    ctx.save();
    clipToShape();

    // First, paint the entire shape with the active color (water filled)
    ctx.fillStyle = CONFIG.bgActive;
    ctx.fillRect(sMinX, sMinY, shapeW, shapeH);

    // Then erase the area ahead of the wave back to inactive color
    // by drawing inactive circles at the wavefront position
    for (const ms of mirrors) {
      // Area ahead of wave (radius > waveR): paint inactive
      // We do this by drawing a large inactive circle centered at the mirror
      // with radius = max possible, then punching out the filled area
    }

    // Better approach: draw inactive color everywhere, then fill active
    // inside the wave radius using a clip circle
    // Reset and use composite operations
    ctx.restore();

    // Paint inactive base
    fillShape(CONFIG.fillInactive);

    // Clip to shape, then paint active color inside wave radius
    ctx.save();
    clipToShape();

    for (const ms of mirrors) {
      if (waveR <= 0) continue;

      // Active fill inside wave radius
      const grad = ctx.createRadialGradient(ms.sx, ms.sy, Math.max(0, waveR - transW), ms.sx, ms.sy, waveR);
      grad.addColorStop(0, CONFIG.bgActive);
      grad.addColorStop(1, CONFIG.bgActive);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ms.sx, ms.sy, waveR, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // ── Draw radiating wave rings (all mirror sources) ───────────────────
  // Concentric rings that expand outward, simulating water waves.
  function drawWaveRings(waveR) {
    clipToShape();
    ctx.save();

    for (let m = 0; m < mirrors.length; m++) {
      const ms = mirrors[m];

      // Main wave front — thick, bright, glowing
      ctx.shadowColor = CONFIG.waveGlow;
      ctx.shadowBlur  = CONFIG.waveGlowRadius;
      ctx.strokeStyle = CONFIG.waveColor;
      ctx.lineWidth   = CONFIG.waveWidth;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(ms.sx, ms.sy, waveR, 0, Math.PI * 2);
      ctx.stroke();

      // Bright inner core
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#ff7a90';
      ctx.lineWidth   = 1.2;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(ms.sx, ms.sy, waveR, 0, Math.PI * 2);
      ctx.stroke();

      // Ripple echoes behind the main front
      for (let r = 1; r <= CONFIG.rippleCount; r++) {
        const echoR = waveR - r * CONFIG.rippleSpacing * maxRadius;
        if (echoR <= 0) continue;

        ctx.shadowBlur = 0;
        ctx.strokeStyle = CONFIG.waveColor;
        ctx.lineWidth   = 1.5;
        ctx.globalAlpha = CONFIG.rippleAlpha / r;
        ctx.beginPath();
        ctx.arc(ms.sx, ms.sy, echoR, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // ── Draw source marker ────────────────────────────────────────────────
  function drawSource() {
    const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 300);
    const r = 3 + pulse * 2;

    ctx.save();
    ctx.shadowColor = CONFIG.waveGlow;
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.arc(src.x, src.y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ff7a90';
    ctx.fill();

    ctx.restore();

    // Outer ring
    ctx.beginPath();
    ctx.arc(src.x, src.y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = CONFIG.waveColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // ── Draw label ────────────────────────────────────────────────────────
  function drawLabel() {
    if (!CONFIG.label) return;

    ctx.save();
    ctx.font = `${CONFIG.labelSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.globalAlpha = CONFIG.labelOpacity;
    ctx.fillStyle = CONFIG.labelColor;
    ctx.fillText(CONFIG.label, W / 2, 12);
    ctx.restore();
  }

  // ── Main draw ─────────────────────────────────────────────────────────
  let lastTime = null;
  let elapsed = 0;
  let shapeDrawn = false;
  let shapeProgress = 0;
  let waveStarted = false;
  let waveElapsed = 0;

  function draw(ts) {
    if (!lastTime) lastTime = ts;
    const dt = (ts - lastTime) / 1000;
    lastTime = ts;

    // Phase 1: draw shape outline
    if (!shapeDrawn) {
      shapeProgress += dt / CONFIG.shapeDrawTime;
      if (shapeProgress >= 1) {
        shapeProgress = 1;
        shapeDrawn = true;
      }
    }

    // Phase 2: wait at source, then fire wave
    if (shapeDrawn && !waveStarted) {
      elapsed += dt;
      if (elapsed >= CONFIG.sourceDelay) {
        waveStarted = true;
        waveElapsed = 0;
        elapsed = 0;
      }
    }

    // Phase 3: wave propagates
    if (waveStarted) {
      waveElapsed += dt;
    }

    // Loop when wave is done
    if (waveElapsed > maxRadius / CONFIG.waveSpeed * 2.5) {
      shapeDrawn = false;
      shapeProgress = 0;
      waveStarted = false;
      waveElapsed = 0;
      elapsed = 0;
    }

    // ── Render ─────────────────────────────────────────────────────────
    // Clear canvas
    ctx.fillStyle = CONFIG.bgInactive;
    ctx.fillRect(0, 0, W, H);

    // Draw shape outline
    drawShapeOutline(shapeProgress);

    // Fill shape interior (dark base)
    if (shapeDrawn) {
      fillShape();
    }

    // Draw activated fill (water behind wavefront)
    if (waveStarted) {
      drawActivatedFill(waveElapsed);
    }

    // Draw radiating wave rings
    if (waveStarted) {
      drawWaveRings(waveElapsed);
    }

    // Draw source dot (visible after shape is drawn)
    if (shapeDrawn) {
      drawSource();
    }

    drawLabel();

    requestAnimationFrame(draw);
  }

  // ── Click to restart ───────────────────────────────────────────────────
  canvas.addEventListener('click', () => {
    shapeDrawn = false;
    shapeProgress = 0;
    waveStarted = false;
    waveElapsed = 0;
    elapsed = 0;
    lastTime = null;
  });

  // ── Start ──────────────────────────────────────────────────────────────
  requestAnimationFrame(draw);
})();
