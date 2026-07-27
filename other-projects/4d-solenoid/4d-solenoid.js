// <div id="solenoid-container" style="text-align:center; margin: 2em 0;">
//   <canvas id="solenoid-canvas"></canvas>
// </div>
// Override with window.SOLENOID_CONFIG before the script loads.
//
// Animation phases:
//   1. 3D ROTATION (0–2s):  Solenoid sits vertical, camera orbits around it
//      (~60°) to reveal the coil windings.  Field lines loop from pole to pole.
//   2. 4D TIME ROTATION (~10s, the key moment):  Camera slowly pitches up
//      so the solenoid's circular end faces the viewer.  Field lines transition
//      from 3D loops to a radial outward pattern in the x–y plane.
//   3. STEADY STATE:  Top-down view — solenoid = small sphere at center,
//      field lines radiate outward.  Labels indicate z = time.

(function () {
  // ── CONFIG ──────────────────────────────────────────────────────────────
  const overrides = window.SOLENOID_CONFIG || {};
  const CONFIG = {
    W: 600,
    H: 420,

    // Solenoid geometry (world units)
    coilTurns:   28,       // number of visible coil windings
    coilRadius:  0.18,     // coil wire radius (thin wire)
    solRadius:   0.5,      // solenoid body radius
    solLength:   3.0,      // solenoid body length

    // Field line geometry
    numFieldLines: 12,     // number of field lines
    fieldMaxR:     2.0,    // maximum radial extent of field loops
    fieldTopOffset:0.15,   // field line start offset above solenoid top
    fieldBotOffset:0.15,   // field line end offset below solenoid bottom

    // Coil / body appearance
    coilOpacity: 0.9,
    bodyOpacity: 0.12,     // solenoid body transparency
    bodyColor:   '#0f3460',

    // Field line appearance
    fieldWidth:  1.4,
    fieldColor:  '#e94560',

    // Phase timings (seconds)
    phase1Dur: 2.0,        // 3D rotation phase
    phase2Dur: 10.0,       // 4D time rotation (SLOW — key moment)
    phase3Dur: Infinity,   // steady state (never ends)

    // Phase 1: orbit angle (radians)
    phase1YawMax: Math.PI / 3,  // ~60° orbit

    // Phase 2: final camera pitch (looking down the solenoid axis)
    phase2Pitch: Math.PI * 0.42,  // ~76° — nearly top-down

    // Colors (matching the site palette)
    bg:          '#1a1a2e',
    coilColor:   '#e0e0e0',
    bodyColor:   '#0f3460',
    fieldColor:  '#e94560',
    axisColor:   '#64ffda',
    labelColor:  '#e0e0e0',

    // Axis indicator
    axisLen: 22,
    axisXColor: '#e94560',
    axisYColor: '#64ffda',
    axisZColor: '#e0e0e0',

    // Play/pause button
    showPlayButton: true,

    ...overrides,
  };
  // ─────────────────────────────────────────────────────────────────────────

  const { W, H } = CONFIG;
  const canvas = document.getElementById('solenoid-canvas');
  const ctx    = canvas.getContext('2d');
  const dpr    = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);

  // ── Phase definitions ───────────────────────────────────────────────────
  const PHASES = [
    { name: 'ROTATE3D',   dur: CONFIG.phase1Dur },
    { name: 'ROTATE4D',   dur: CONFIG.phase2Dur },
    { name: 'STEADY',     dur: CONFIG.phase3Dur },
  ];

  // ── Camera state ────────────────────────────────────────────────────────
  let camYaw   = 0;
  let camPitch = 0;
  let camScale = 70;
  let camCX    = W / 2;
  let camCY    = H / 2 + 10;

  // ── Math helpers ─────────────────────────────────────────────────────────
  function project(wx, wy, wz) {
    // Camera coordinate system:
    //   z = solenoid axis (vertical, up on screen)
    //   y = horizontal in the solenoid's reference frame
    //   x = points toward camera
    //
    // Rotate around z (yaw) — orbits the camera around the solenoid
    const rx = wx * Math.cos(camYaw) + wy * Math.sin(camYaw);
    const ry = -wx * Math.sin(camYaw) + wy * Math.cos(camYaw);
    const rz = wz;

    // Pitch — tilts the camera upward (rotates around X)
    const rY = ry;
    const rZ = rz * Math.cos(camPitch) - ry * Math.sin(camPitch);

    const sx = camCX + rx * camScale;
    const sy = camCY - rZ * camScale;  // z maps to screen-y (inverted)
    const depth = rZ;  // for painter's algorithm

    return { sx, sy, depth };
  }

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function clamp01(t) { return Math.max(0, Math.min(1, t)); }

  // ── Phase camera parameters ─────────────────────────────────────────────
  function getCameraParams(phaseIdx, progress) {
    const p = easeInOut(clamp01(progress));

    if (phaseIdx === 0) {
      // Phase 1: orbit around the solenoid (z stays up, camera circles around)
      // Start with a slight offset so the coil is visible (not edge-on).
      const baseYaw = Math.PI * 0.15;  // slight initial offset
      const sweep   = Math.sin(p * Math.PI) * CONFIG.phase1YawMax;
      return { yaw: baseYaw + sweep, pitch: 0 };
    }

    if (phaseIdx === 1) {
      // Phase 2: camera pitches up to look down the barrel (z axis)
      // Small yaw rotation makes the coil visible during the tilt.
      const pitch = p * CONFIG.phase2Pitch;
      const yaw   = Math.PI * 0.15 + p * Math.PI * 0.3;
      return { yaw, pitch };
    }

    // Phase 3: steady top-down, slow subtle rotation
    return { yaw: Math.PI * 0.45, pitch: CONFIG.phase2Pitch };
  }

  // ── 3D axis indicator (bottom-right corner) ─────────────────────────────
  function drawAxisIndicator(px, py, showTimeLabel) {
    const len = CONFIG.axisLen;
    const half = len / 2;

    ctx.save();
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.font = '10px monospace';

    const axes = [
      { dx: len,  dy: 0, dz: 0, color: CONFIG.axisXColor, label: 'x' },
      { dx: 0,   dy: -len, dz: 0, color: CONFIG.axisYColor, label: 'y' },
      { dx: 0,   dy: 0, dz: len, color: CONFIG.axisZColor, label: showTimeLabel ? 't' : 'z' },
    ];

    for (const ax of axes) {
      const end = project(px + ax.dx, py + ax.dy, py + ax.dz);
      const start = project(px, py, py);

      ctx.strokeStyle = ax.color;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(start.sx, start.sy);
      ctx.lineTo(end.sx, end.sy);
      ctx.stroke();

      // Arrowhead
      const angle = Math.atan2(end.sy - start.sy, end.sx - start.sx);
      ctx.fillStyle = ax.color;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(end.sx, end.sy);
      ctx.lineTo(
        end.sx - half * Math.cos(angle - 0.35),
        end.sy - half * Math.sin(angle - 0.35)
      );
      ctx.lineTo(
        end.sx - half * Math.cos(angle + 0.35),
        end.sy - half * Math.sin(angle + 0.35)
      );
      ctx.closePath();
      ctx.fill();

      // Label
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = ax.color;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(ax.label, end.sx + 3, end.sy - 2);
    }

    ctx.restore();
  }

  // ── Solenoid coil (helical winding) ─────────────────────────────────────
  // The solenoid is vertical (z-axis). Coil wraps around at radius R.
  // x = R·cos(θ), y = R·sin(θ), z = (t - 0.5)·L
  function drawCoil(alpha) {
    alpha = alpha !== undefined ? alpha : CONFIG.coilOpacity;
    const nTurns = CONFIG.coilTurns;
    const nPts = nTurns * 60;
    const L = CONFIG.solLength;
    const R = CONFIG.coilRadius;

    ctx.save();
    ctx.strokeStyle = CONFIG.coilColor;
    ctx.lineWidth = 1.2;

    // Collect segments for depth sorting
    const segments = [];

    for (let i = 0; i < nPts; i++) {
      const t  = i / nPts;
      const z  = (t - 0.5) * L;
      const ang = t * nTurns * Math.PI * 2;

      // World space: vertical solenoid, coil wraps around z-axis
      const wx = R * Math.cos(ang);
      const wy = R * Math.sin(ang);

      const t2 = (i + 1) / nPts;
      const z2 = (t2 - 0.5) * L;
      const ang2 = t2 * nTurns * Math.PI * 2;
      const wx2 = R * Math.cos(ang2);
      const wy2 = R * Math.sin(ang2);

      const p1 = project(wx, wy, z);
      const p2 = project(wx2, wy2, z2);

      segments.push({ p1, p2, midDepth: (p1.depth + p2.depth) / 2 });
    }

    // Sort by depth (painter's algorithm)
    segments.sort((a, b) => a.midDepth - b.midDepth);

    ctx.globalAlpha = alpha;
    for (const seg of segments) {
      ctx.beginPath();
      ctx.moveTo(seg.p1.sx, seg.p1.sy);
      ctx.lineTo(seg.p2.sx, seg.p2.sy);
      ctx.stroke();
    }

    ctx.restore();
  }

  // ── Solenoid body (semi-transparent cylinder) ────────────────────────────
  function drawBody(alpha) {
    alpha = alpha !== undefined ? alpha : CONFIG.bodyOpacity;
    const L = CONFIG.solLength;
    const R = CONFIG.solRadius;
    const steps = 40;

    ctx.save();
    ctx.fillStyle = CONFIG.bodyColor;
    ctx.globalAlpha = alpha;

    // Top cap (ellipse from current camera angle)
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const ang = (i / steps) * Math.PI * 2;
      const wx = R * Math.cos(ang);
      const wy = R * Math.sin(ang);
      const p = project(wx, wy, L / 2);
      if (i === 0) ctx.moveTo(p.sx, p.sy);
      else ctx.lineTo(p.sx, p.sy);
    }
    ctx.closePath();
    ctx.fill();

    // Bottom cap
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const ang = (i / steps) * Math.PI * 2;
      const wx = R * Math.cos(ang);
      const wy = R * Math.sin(ang);
      const p = project(wx, wy, -L / 2);
      if (i === 0) ctx.moveTo(p.sx, p.sy);
      else ctx.lineTo(p.sx, p.sy);
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // ── Magnetic field lines ────────────────────────────────────────────────
  // 3D field lines: loops from top of solenoid, curve outward, return to bottom.
  // Parametric: angle = lineIdx * 2π/numLines (which loop),
  //   radial extent peaks at solenoid equator, z extends slightly beyond ends.
  function getFieldLine3D(lineIdx, numLines, t) {
    const angleOffset = (lineIdx / numLines) * Math.PI * 2;
    const L = CONFIG.solLength;
    const maxR = CONFIG.fieldMaxR;
    const topOff = CONFIG.fieldTopOffset;
    const botOff = CONFIG.fieldBotOffset;

    const zNorm = 2 * t - 1;  // -1 to 1

    // Radial extent: zero at poles, maximum at equator
    const r = maxR * (1 + 0.5 * Math.cos(zNorm * Math.PI));

    // Axial position: extends slightly beyond solenoid ends
    const z = zNorm * (L / 2 + (topOff + botOff) / 2);

    // World space (solenoid vertical, z-axis)
    const wx = r * Math.cos(angleOffset);
    const wy = r * Math.sin(angleOffset);

    return { wx, wy, z };
  }

  // 4D field lines (top-down): radial lines from center in x-y plane.
  function getFieldLine4D(lineIdx, numLines, t) {
    const angleOffset = (lineIdx / numLines) * Math.PI * 2;
    const maxR = CONFIG.fieldMaxR;

    const r = t * maxR;
    const wx = r * Math.cos(angleOffset);
    const wy = r * Math.sin(angleOffset);
    const z = 0;

    return { wx, wy, z };
  }

  // Blend between 3D loops and 4D radial.
  function blendFieldLine(lineIdx, numLines, t, blend) {
    const f3d = getFieldLine3D(lineIdx, numLines, t);
    const f4d = getFieldLine4D(lineIdx, numLines, t);

    const wx = f3d.wx * (1 - blend) + f4d.wx * blend;
    const wy = f3d.wy * (1 - blend) + f4d.wy * blend;
    const z  = f3d.z  * (1 - blend) + f4d.z  * blend;

    return { wx, wy, z };
  }

  function drawFieldLines(blend) {
    const n = CONFIG.numFieldLines;
    const nPts = 80;

    ctx.save();

    // Collect all segments for depth sorting
    const allSegments = [];

    for (let i = 0; i < n; i++) {
      const pts = [];
      for (let j = 0; j <= nPts; j++) {
        const f = blendFieldLine(i, n, j / nPts, blend);
        const p = project(f.wx, f.wy, f.z);
        pts.push({ ...p });
      }

      // Split at depth=0 for proper depth sorting
      for (let j = 0; j < pts.length - 1; j++) {
        const isBack = pts[j].depth < 0 && pts[j + 1].depth < 0;
        const isFront = pts[j].depth >= 0 && pts[j + 1].depth >= 0;

        if (isBack) {
          allSegments.push({
            x1: pts[j].sx, y1: pts[j].sy,
            x2: pts[j + 1].sx, y2: pts[j + 1].sy,
            front: false,
          });
        } else if (isFront) {
          allSegments.push({
            x1: pts[j].sx, y1: pts[j].sy,
            x2: pts[j + 1].sx, y2: pts[j + 1].sy,
            front: true,
          });
        }
        // Crossings at depth=0 are ignored (thin at the solenoid center)
      }
    }

    // Draw back segments with glow
    ctx.lineWidth = CONFIG.fieldWidth;
    ctx.lineCap = 'round';

    for (const seg of allSegments) {
      if (seg.front) continue;

      // Glow
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = CONFIG.fieldColor;
      ctx.lineWidth = CONFIG.fieldWidth + 4;
      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
      ctx.stroke();

      // Main line
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = CONFIG.fieldColor;
      ctx.lineWidth = CONFIG.fieldWidth;
      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
      ctx.stroke();
    }

    ctx.restore();

    // Return front segments for drawing after body
    return allSegments.filter(s => s.front);
  }

  function drawFrontFieldLines(frontSegments) {
    ctx.save();
    ctx.lineWidth = CONFIG.fieldWidth;
    ctx.lineCap = 'round';

    for (const seg of frontSegments) {
      // Glow
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = CONFIG.fieldColor;
      ctx.lineWidth = CONFIG.fieldWidth + 4;
      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
      ctx.stroke();

      // Main line
      ctx.globalAlpha = 0.75;
      ctx.strokeStyle = CONFIG.fieldColor;
      ctx.lineWidth = CONFIG.fieldWidth;
      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
      ctx.stroke();
    }

    ctx.restore();
  }

  // ── Time label (bottom-right, indicates 4D phase) ───────────────────────
  function drawTimeLabel(phaseIdx) {
    if (phaseIdx < 1) return;

    ctx.save();
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';

    const pad = 16;
    const x = W - pad;
    const y = H - pad;

    // Background box
    const text = phaseIdx >= 2 ? 'z = time' : '4D TIME ROTATION';
    const metrics = ctx.measureText(text);
    const boxW = metrics.width + 12;
    const boxH = 16;

    ctx.globalAlpha = 0.5;
    ctx.fillStyle = CONFIG.bg;
    ctx.fillRect(x - boxW, y - boxH, boxW, boxH);

    // Text
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = CONFIG.labelColor;
    ctx.fillText(text, x - 6, y - 3);

    ctx.restore();
  }

  // ── Phase label (bottom-left) ───────────────────────────────────────────
  function drawPhaseLabel(phaseIdx) {
    ctx.save();
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';

    const pad = 16;
    const labels = ['3D ROTATION', '4D TIME ROTATION', 'STEADY STATE'];

    ctx.globalAlpha = 0.45;
    ctx.fillStyle = CONFIG.labelColor;
    ctx.fillText(labels[phaseIdx], pad, H - pad);

    ctx.restore();
  }

  // ── Play/pause button ───────────────────────────────────────────────────
  const BTN_X = W - 24, BTN_Y = 20, BTN_R = 13;
  let paused = false;

  function drawButton() {
    ctx.save();

    ctx.globalAlpha = 0.55;
    ctx.fillStyle = CONFIG.bg;
    ctx.beginPath();
    ctx.arc(BTN_X, BTN_Y, BTN_R, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 0.30;
    ctx.strokeStyle = CONFIG.labelColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(BTN_X, BTN_Y, BTN_R, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.75;
    ctx.fillStyle = CONFIG.labelColor;
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
    const cx = (e.clientX - rect.left) * (W / rect.width);
    const cy = (e.clientY - rect.top) * (H / rect.height);
    const dx = cx - BTN_X, dy = cy - BTN_Y;
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
        draw();
      }
    });
    canvas.addEventListener('mousemove', function (e) {
      canvas.style.cursor = hitButton(e) ? 'pointer' : 'default';
    });
  }

  // ── Main draw function ─────────────────────────────────────────────────
  let phaseIdx = 0;
  let phaseT = 0;

  function draw() {
    const phase = PHASES[phaseIdx];
    const p = clamp01(phaseT / phase.dur);

    ctx.fillStyle = CONFIG.bg;
    ctx.fillRect(0, 0, W, H);

    // Get camera parameters for current phase
    const params = getCameraParams(phaseIdx, p);
    camYaw   = params.yaw;
    camPitch = params.pitch;

    // Draw 3D axis indicator (always visible, bottom-right)
    drawAxisIndicator(W - 70, H - 70, phaseIdx >= 1);

    // Draw phase label (bottom-left)
    drawPhaseLabel(phaseIdx);

    // Draw time label (bottom-right, above axis)
    drawTimeLabel(phaseIdx);

    // ── Phase 1: 3D rotation (orbit around solenoid) ──
    if (phaseIdx === 0) {
      drawCoil();
      drawBody();
      const frontSegs = drawFieldLines(0);
      drawFrontFieldLines(frontSegs);
    }

    // ── Phase 2: 4D time rotation (SLOW — key moment) ──
    else if (phaseIdx === 1) {
      const blend = easeInOut(p);  // 0 = 3D, 1 = 4D

      // Coil (fades slightly as we approach top-down)
      const coilAlpha = CONFIG.coilOpacity * (1 - blend * 0.5);
      const bodyAlpha = CONFIG.bodyOpacity * (1 - blend * 0.7);
      drawCoil(coilAlpha);
      drawBody(bodyAlpha);

      // Field lines (blend from 3D loops to 4D radial)
      const frontSegs = drawFieldLines(blend);
      drawFrontFieldLines(frontSegs);
    }

    // ── Phase 3: steady top-down ──
    else {
      // Solenoid top face (circular end facing camera)
      const topCenter = project(0, 0, CONFIG.solLength / 2);

      // Draw the circular top face
      ctx.save();
      const steps = 40;
      ctx.strokeStyle = CONFIG.coilColor;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const ang = (i / steps) * Math.PI * 2;
        const wx = CONFIG.solRadius * Math.cos(ang);
        const wy = CONFIG.solRadius * Math.sin(ang);
        const p = project(wx, wy, CONFIG.solLength / 2);
        if (i === 0) ctx.moveTo(p.sx, p.sy);
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner sphere (the "top" of the solenoid)
      const sphereGrad = ctx.createRadialGradient(
        topCenter.sx - 2, topCenter.sy - 2, 0,
        topCenter.sx, topCenter.sy, 8
      );
      sphereGrad.addColorStop(0, CONFIG.coilColor);
      sphereGrad.addColorStop(0.5, CONFIG.bodyColor);
      sphereGrad.addColorStop(1, CONFIG.bg);
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(topCenter.sx, topCenter.sy, 6, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      ctx.globalAlpha = 0.15;
      const glowGrad = ctx.createRadialGradient(
        topCenter.sx, topCenter.sy, 0,
        topCenter.sx, topCenter.sy, 20
      );
      glowGrad.addColorStop(0, CONFIG.fieldColor);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(topCenter.sx, topCenter.sy, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Field lines (pure 4D radial)
      const frontSegs = drawFieldLines(1);
      drawFrontFieldLines(frontSegs);
    }

    // Draw button
    if (CONFIG.showPlayButton) drawButton();
  }

  // ── Animation loop ──────────────────────────────────────────────────────
  let last = null;

  function loop(ts) {
    if (last === null) last = ts;
    const dt = Math.min((ts - last) / 1000, 0.05);
    last = ts;

    if (!paused) {
      phaseT += dt;

      // Advance to next phase
      const phase = PHASES[phaseIdx];
      if (phaseT >= phase.dur) {
        phaseT = 0;
        phaseIdx++;
        if (phaseIdx >= PHASES.length) {
          phaseIdx = PHASES.length - 1;
          phaseT = phase.dur;  // hold at end
        }
      }
    }

    draw();

    if (!paused) {
      requestAnimationFrame(loop);
    }
  }

  requestAnimationFrame(loop);
})();
