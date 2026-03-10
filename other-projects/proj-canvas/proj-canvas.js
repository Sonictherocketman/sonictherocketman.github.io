(function () {
  // ── CONFIG ──────────────────────────────────────────────────────────────
  const overrides = window.P_CONFIG || {};
  const CONFIG = {
    W: 320, H: 480,
    bg:      '#1a1a2e',
    surface: '#e0e0e0',   // grid lines
    point:   '#e94560',   // moving dot
    trail:   '#e94560',
    arrow:   '#e0e0e0',
    shadow:  '#e0e0e0',   // projected (flat) path
    text:    '#e0e0e0',
    accent:  '#e94560',
    fill:    '#0f3460',   // surface face fill
    ...overrides,
  };
  // ────────────────────────────────────────────────────────────────────────

  const { W, H } = CONFIG;
  const canvas = document.getElementById('proj-canvas');
  const ctx    = canvas.getContext('2d');
  const dpr    = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);

  // ── World geometry ───────────────────────────────────────────────────────
  const CLIFF_X  = 3.6;
  const X_START  = -3.8;
  const X_END    = CLIFF_X + 1.8;   // path goes past cliff
  const T_CLIFF  = (CLIFF_X - X_START) / (X_END - X_START); // ~0.79

  function surfaceZ(x, y) {
    if (x >= CLIFF_X) return null;
    return 0.55 * Math.sin(x * 0.85 + 0.4)
         + 0.45 * Math.cos(y * 1.1  + x * 0.35)
         + 0.22 * Math.sin(x * 1.7  - 0.6);
  }

  // Path: t 0→1
  function pathX(t) { return X_START + t * (X_END - X_START); }
  function pathY(t) { return 0.65 * Math.sin(t * Math.PI * 2.2); }
  function pathZ(t) {
    const x = pathX(t), y = pathY(t);
    if (x >= CLIFF_X) {
      const ez = surfaceZ(CLIFF_X - 0.02, pathY(T_CLIFF)) || 0;
      const d  = x - CLIFF_X;
      return ez - d * d * 2.2;          // accelerating fall
    }
    return surfaceZ(x, y) || 0;
  }

  // Precompute surface grid lines
  const GMIN = -3.2, GYMIN = -2.4, GYMAX = 2.4, GSTEP = 0.4;
  const xLines = [], yLines = [];
  for (let x = GMIN; x <= CLIFF_X + 0.001; x += GSTEP) {
    const pts = [];
    for (let y = GYMIN; y <= GYMAX + 0.001; y += GSTEP) {
      const z = surfaceZ(x, y);
      if (z !== null) pts.push({ x, y, z });
    }
    if (pts.length) xLines.push(pts);
  }
  for (let y = GYMIN; y <= GYMAX + 0.001; y += GSTEP) {
    const pts = [];
    for (let x = GMIN; x <= CLIFF_X + 0.001; x += GSTEP) {
      const z = surfaceZ(x, y);
      if (z !== null) pts.push({ x, y, z });
    }
    if (pts.length) yLines.push(pts);
  }

  // ── Camera & projection ──────────────────────────────────────────────────
  // pitch=0 → top-down (Z hidden), pitch=PI/3 → isometric-ish
  // yaw: slight horizontal rotation
  const CAM_PITCH_3D = Math.PI / 3.1;
  const CAM_YAW_3D   = Math.PI / 8;
  const SCALE_2D = 40, SCALE_3D = 38;
  const CX_2D = 170, CY_2D = H / 2;
  const CX_3D = 170, CY_3D = H / 2 + 28;

  let camPitch = 0, camYaw = 0;
  let camScale = SCALE_2D, camCX = CX_2D, camCY = CY_2D;

  function project(wx, wy, wz) {
    // Yaw (rotate around Z)
    const rx = wx * Math.cos(camYaw) + wy * Math.sin(camYaw);
    const ry = -wx * Math.sin(camYaw) + wy * Math.cos(camYaw);
    const rz = wz;
    // Pitch (tilt around screen-X)
    const sx = camCX + rx * camScale;
    const sy = camCY - (ry * Math.cos(camPitch) - rz * Math.sin(camPitch)) * camScale;
    const depth = ry * Math.sin(camPitch) + rz * Math.cos(camPitch);
    return { sx, sy, depth };
  }

  // ── Draw helpers ─────────────────────────────────────────────────────────
  function easeInOut(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
  function lerp(a, b, t){ return a + (b - a) * t; }

  function drawSurface(alpha) {
    if (alpha <= 0) return;
    ctx.save();
    ctx.lineWidth = 0.7;

    function drawLines(lines, a) {
      ctx.strokeStyle = CONFIG.surface;
      ctx.globalAlpha = a;
      for (const line of lines) {
        if (line.length < 2) continue;
        ctx.beginPath();
        let first = true;
        for (const p of line) {
          const s = project(p.x, p.y, p.z);
          if (first) { ctx.moveTo(s.sx, s.sy); first = false; }
          else        { ctx.lineTo(s.sx, s.sy); }
        }
        ctx.stroke();
      }
    }

    drawLines(xLines, alpha * 0.28);
    drawLines(yLines, alpha * 0.28);
    ctx.restore();
  }

  function drawTrail(pts, alpha) {
    if (pts.length < 2) return;
    ctx.save();
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    for (let i = 1; i < pts.length; i++) {
      const a = (i / pts.length) * alpha;
      ctx.globalAlpha = a;
      const p0 = project(pts[i-1].x, pts[i-1].y, pts[i-1].z);
      const p1 = project(pts[i].x,   pts[i].y,   pts[i].z);
      ctx.strokeStyle = CONFIG.trail;
      ctx.beginPath();
      ctx.moveTo(p0.sx, p0.sy);
      ctx.lineTo(p1.sx, p1.sy);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawShadowTrail(pts, alpha) {
    // Project path onto flat z=surfaceZ_floor plane (dashed)
    const FLOOR = -1.6;
    if (pts.length < 2 || alpha <= 0) return;
    ctx.save();
    ctx.setLineDash([4, 5]);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = CONFIG.shadow;
    ctx.globalAlpha = alpha * 0.45;
    ctx.beginPath();
    let first = true;
    for (const p of pts) {
      const s = project(p.x, p.y, FLOOR);
      if (first) { ctx.moveTo(s.sx, s.sy); first = false; }
      else        { ctx.lineTo(s.sx, s.sy); }
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawDropLines(pts, alpha) {
    // Thin vertical lines connecting path to its shadow
    const FLOOR = -1.6;
    if (alpha <= 0) return;
    ctx.save();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = CONFIG.shadow;
    ctx.globalAlpha = alpha * 0.2;
    const step = Math.max(1, Math.floor(pts.length / 20));
    for (let i = 0; i < pts.length; i += step) {
      const p3 = project(pts[i].x, pts[i].y, pts[i].z);
      const pf = project(pts[i].x, pts[i].y, FLOOR);
      ctx.beginPath();
      ctx.moveTo(p3.sx, p3.sy);
      ctx.lineTo(pf.sx, pf.sy);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawPoint(pt, alpha) {
    if (alpha <= 0) return;
    const p = project(pt.x, pt.y, pt.z);
    ctx.save();

    // Glow
    ctx.globalAlpha = alpha * 0.25;
    const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, 14);
    grd.addColorStop(0, CONFIG.point);
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(p.sx, p.sy, 14, 0, Math.PI * 2);
    ctx.fill();

    // Dot
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(p.sx, p.sy, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = CONFIG.point;
    ctx.fill();

    ctx.restore();
  }

  // Build trail array for a given pathT
  function buildTrail(maxT, steps, zScale) {
    zScale = (zScale === undefined) ? 1 : zScale;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxT;
      pts.push({ x: pathX(t), y: pathY(t), z: pathZ(t) * zScale });
    }
    return pts;
  }

  // ── Phase state machine ──────────────────────────────────────────────────
  const PHASES = [
    { name: 'PATH2D',   dur: 5.2 },
    { name: 'PAUSE',    dur: 0.7 },
    { name: 'ROTATE',   dur: 1.6 },
    { name: 'REVEAL',   dur: 2.5 },
    { name: 'FADEOUT',  dur: 1.5 },
  ];
  let phaseIdx = 0, phaseT = 0;

  // ── Main draw ────────────────────────────────────────────────────────────
  function draw(dt) {
    phaseT += dt;
    const phase = PHASES[phaseIdx];
    const p = Math.min(phaseT / phase.dur, 1); // progress 0→1 in phase

    ctx.fillStyle = CONFIG.bg;
    ctx.fillRect(0, 0, W, H);

    if (phase.name === 'PATH2D') {
      camPitch = 0; camYaw = 0;
      camScale = SCALE_2D; camCX = CX_2D; camCY = CY_2D;

      const pathT = p * T_CLIFF * 0.96;
      const trail = buildTrail(pathT, 80, 0); // z=0 in 2D view
      const pt  = { x: pathX(pathT), y: pathY(pathT), z: 0 };

      drawTrail(trail, 0.85);
      drawPoint(pt, 1);

    } else if (phase.name === 'PAUSE') {
      camPitch = 0; camYaw = 0;
      camScale = SCALE_2D; camCX = CX_2D; camCY = CY_2D;

      const pT = T_CLIFF * 0.96;
      const trail = buildTrail(pT, 80, 0);
      const pt = { x: pathX(pT), y: pathY(pT), z: 0 };

      // point fades out toward end of pause so there's no snap into ROTATE
      const pointAlpha = Math.max(0, 1 - Math.max(0, (p - 0.6) / 0.4));

      drawTrail(trail, 0.65);
      drawPoint(pt, null, pointAlpha);

    } else if (phase.name === 'ROTATE') {
      const e = easeInOut(p);

      camPitch = lerp(0,          CAM_PITCH_3D, e);
      camYaw   = lerp(0,          CAM_YAW_3D,   e);
      camScale = lerp(SCALE_2D,   SCALE_3D,     e);
      camCX    = lerp(CX_2D,      CX_3D,        e);
      camCY    = lerp(CY_2D,      CY_3D,        e);

      const pT   = T_CLIFF * 0.96;
      const trail = buildTrail(pT, 80, e);  // z fades in as e grows

      drawSurface(e);
      drawTrail(trail, 0.8);
      // point hidden during rotation — reappears in REVEAL

    } else if (phase.name === 'REVEAL') {
      camPitch = CAM_PITCH_3D; camYaw = CAM_YAW_3D;
      camScale = SCALE_3D; camCX = CX_3D; camCY = CY_3D;

      const pT   = T_CLIFF * 0.96;
      const trail = buildTrail(pT, 100, 1);
      const pt   = { x: pathX(pT), y: pathY(pT), z: pathZ(pT) };

      drawSurface(1);
      drawShadowTrail(trail, p);
      drawDropLines(trail, p);
      drawTrail(trail, 0.9);
      drawPoint(pt, null, Math.min(p * 2.5, 1));

    } else if (phase.name === 'FADEOUT') {
      camPitch = CAM_PITCH_3D; camYaw = CAM_YAW_3D;
      camScale = SCALE_3D; camCX = CX_3D; camCY = CY_3D;

      // Hold the REVEAL frame, then fade out
      const pT   = T_CLIFF * 0.96;
      const trail = buildTrail(pT, 100, 1);
      const pt   = { x: pathX(pT), y: pathY(pT), z: pathZ(pT) };
      const fade = 1 - easeInOut(p);
      drawSurface(fade);
      drawShadowTrail(trail, fade);
      drawDropLines(trail, fade);
      drawTrail(trail, fade * 0.9);
      drawPoint(pt, null, fade);

      // Fade overlay
      ctx.save();
      ctx.globalAlpha = easeInOut(p);
      ctx.fillStyle = CONFIG.bg;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    // Phase advance
    if (phaseT >= phase.dur) {
      phaseIdx = (phaseIdx + 1) % PHASES.length;
      phaseT   = 0;
    }
  }

  // ── Loop ─────────────────────────────────────────────────────────────────
  let last = null;
  function loop(ts) {
    const dt = last === null ? 0 : Math.min((ts - last) / 1000, 0.05);
    last = ts;
    draw(dt);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
