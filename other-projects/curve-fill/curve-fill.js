// <canvas id="curve-fill-canvas" data-autoinit></canvas>
// <script src="curve-fill.js"></script>
//
// Not bound to a single canvas — call the factory yourself for multiple
// independent instances with different configs:
//
//   const sim = CurveFill(canvasElementOrSelector, { W: 400, H: 400, ... });
//   sim.pause(); sim.resume(); sim.reset(); sim.destroy();
//
// Auto-init only fires for a <canvas data-autoinit> found by this script at
// load time (using window.CURVE_FILL_CONFIG, if set) — it's opt-in and keyed
// off the attribute, not the #curve-fill-canvas id, so a page that
// instantiates CurveFill() itself never gets a second, unconfigured instance
// silently running alongside it. Omit the attribute if you're calling
// CurveFill() yourself.
//
// A single explorer traces through the canvas. At each time in `splitTimes`
// every live explorer forks into two diverging paths (1s, 3s by default → 4
// explorers). At `explodeTime` (the "intelligence explosion") the population
// jumps to `explodeCount` explorers — the newly spawned ones move a little
// faster, existing ones keep their speed. Steering is a density-biased random
// walk: each explorer samples a shared grid of where explorers have already
// been and leans away from the crowded direction, which fills the canvas
// without hard collision rules — explorers still cross and overlap,
// especially as the grid slowly decays.

function CurveFill(canvasOrSelector, overrides = {}) {
  // ── CONFIG ───────────────────────────────────────────────────────────────
  const CONFIG = {
    // Sim box size — set to whatever aspect ratio you want (square, 16:9,
    // portrait, ...); every measurement below (grid, steering, timeline,
    // plot) is derived from W/H, nothing else assumes 600x450.
    W: 600, H: 450,

    startSpeed:       55,         // px/s for the original curve and its early forks
    splitTimes:       [0.1, 2, 4, 6, 8, 10, 12, 14], // seconds at which every live curve doubles (1→2→4→8)
    explodeTime:      10,         // seconds at which the population jumps up
    explodeCount:     256,         // total curve count after the explosion
    explodeSpeedMult: 1.35,       // speed multiplier applied only to newly-spawned explosion curves

    turnNoise:            8.4,  // rad/s scale of random heading jitter
    steerStrength:        0.01,  // how eagerly a curve turns toward the least-crowded direction
    lookahead:            16,   // px ahead sampled when choosing a direction
    steerAngles:          [-0.9, -0.45, 0, 0.45, 0.9],  // candidate offsets from current heading

    gridCell:      9,     // px per density-grid cell
    gridDecay:     0.997, // per-frame multiplicative decay so old trails eventually stop repelling
    gridDeposit:   1.4,   // density added per step at the curve's new position

    lineWidth:   1.5,
    lineAlpha:   0.85,

    bg: '#1a1a2e',

    // The playable box is inset from the sim area's edges, leaving a margin
    // ring of empty canvas around it. Every normal explorer is confined to
    // the box (walls, density grid, spawn point); the margin exists so the
    // breakout explorer has somewhere visible to go once it crosses the box
    // wall, instead of vanishing the instant it leaves the box.
    boxMargin:       28,
    showBoxOutline:  true,
    boxOutlineColor: 'rgba(224,224,224,0.3)',

    maxRuntime: 24,  // seconds before the canvas clears and the sequence restarts; 0 = never

    // Master switch — set false to hide both the progress timeline and the
    // curve-count plot below the sim, shrinking the canvas back down to just
    // the box. Clicking anywhere still pauses/resumes regardless. The
    // individual showTimeline/showCurveCountPlot flags still apply underneath.
    showPlots: true,

    // Progress timeline — a thin bar below the sim showing where we are in the
    // current cycle, with a tick per split and a dashed marker at explodeTime.
    // Only drawn when maxRuntime > 0 (it needs a total duration to scale against).
    showTimeline:         true,
    timelineHeight:       26,
    timelineGap:          10,     // px between sim area and the timeline strip
    timelineMargin:       10,     // horizontal inset of the bar from the canvas edges
    timelineTrackColor:   'rgba(224,224,224,0.25)',
    timelineFillColor:    '#64ffda',
    timelineTickColor:    'rgba(224,224,224,0.6)',
    timelineExplodeColor: '#e94560',

    // Curve-count plot — a short step chart under the timeline showing how
    // many curves are alive over the course of a cycle (log-scaled, since it
    // jumps from 1 to explodeCount). Shares the timeline's time axis and
    // explode marker so the two strips read as one continuous readout.
    showCurveCountPlot:  true,
    curveCountHeight:    50,
    curveCountGap:       6,      // px between the timeline strip and this plot
    curveCountLineColor: '#64ffda',
    curveCountDotColor:  '#e0e0e0',
    curveCountLabelColor: 'rgba(224,224,224,0.55)',

    // Clicking the timeline/plot strip pauses or resumes the whole animation.
    pauseHintColor: 'rgba(224,224,224,0.55)',

    // Breakout — near the end of the cycle, one explorer stops respecting
    // walls/density and beelines off-canvas while every other explorer
    // freezes in place. The count plot's final segment is highlighted to
    // match. breakoutLeadTime is how many seconds before maxRuntime this
    // happens (clamped to always land after the last scheduled split/explode).
    // Set showBreakout: false to skip the whole sequence — the cycle just
    // runs normally until maxRuntime resets it, no marker drawn either.
    showBreakout:      true,
    breakoutLeadTime:  4,
    breakoutSpeedMult: 1.6,
    breakoutTurnNoise: 0.4,    // radians of jitter applied around the outward heading each frame
    breakoutColor:     '#ffffff',
    breakoutLabel:     'breakout',
    breakoutPauseDelay: 1,     // seconds the breakout explorer gets to travel before auto-pausing

    ...overrides,
  };
  // ─────────────────────────────────────────────────────────────────────────

  const { W, H } = CONFIG;

  // The box that normal explorers are confined to — inset from the sim
  // area's true edges by boxMargin so there's visible room for the breakout
  // explorer to cross the wall before it actually leaves the canvas.
  const boxX0 = CONFIG.boxMargin;
  const boxY0 = CONFIG.boxMargin;
  const boxX1 = W - CONFIG.boxMargin;
  const boxY1 = H - CONFIG.boxMargin;

  const showTimeline = CONFIG.showPlots && CONFIG.showTimeline && CONFIG.maxRuntime > 0;
  const timelineY0   = H + CONFIG.timelineGap;
  const timelineY1   = showTimeline ? timelineY0 + CONFIG.timelineHeight : H;

  const showCurveCountPlot = CONFIG.showPlots && CONFIG.showCurveCountPlot && CONFIG.maxRuntime > 0;
  const curveCountY0 = timelineY1 + (showCurveCountPlot ? CONFIG.curveCountGap : 0);
  const curveCountY1 = showCurveCountPlot ? curveCountY0 + CONFIG.curveCountHeight : curveCountY0;

  const canvasH = curveCountY1;

  // Always after every scheduled split/explode, and never past maxRuntime.
  const lastScheduledEvent = Math.max(CONFIG.explodeTime, ...CONFIG.splitTimes);
  const breakoutTime = CONFIG.showBreakout && CONFIG.maxRuntime > 0
    ? Math.min(CONFIG.maxRuntime, Math.max(lastScheduledEvent + 1, CONFIG.maxRuntime - CONFIG.breakoutLeadTime))
    : Infinity;

  const canvas = typeof canvasOrSelector === 'string'
    ? document.querySelector(canvasOrSelector)
    : canvasOrSelector;
  if (!canvas) throw new Error('CurveFill: no canvas element found for ' + canvasOrSelector);
  const ctx    = canvas.getContext('2d');
  const dpr    = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;  canvas.height = canvasH * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = canvasH + 'px';
  ctx.scale(dpr, dpr);

  // ── Color palette ─────────────────────────────────────────────────────────
  // Vivid, evenly-spread hues at the saturation/lightness of the site's neon
  // accent colors (#e94560 red-pink, #64ffda mint), so any curve count reads
  // as part of the same palette instead of a generic rainbow.
  function paletteColor(i) {
    const hue = (350 + i * 137.508) % 360;   // golden-angle spread, anchored at the red accent
    return `hsl(${hue.toFixed(1)}, 68%, 64%)`;
  }

  // ── Density grid (shared across all curves, covers the box only) ─────────
  const cols = Math.ceil((boxX1 - boxX0) / CONFIG.gridCell);
  const rows = Math.ceil((boxY1 - boxY0) / CONFIG.gridCell);
  let grid = new Float32Array(cols * rows);

  function cellIndex(x, y) {
    const cx = Math.min(cols - 1, Math.max(0, ((x - boxX0) / CONFIG.gridCell) | 0));
    const cy = Math.min(rows - 1, Math.max(0, ((y - boxY0) / CONFIG.gridCell) | 0));
    return cy * cols + cx;
  }

  function densityAt(x, y) {
    if (x < boxX0 || y < boxY0 || x >= boxX1 || y >= boxY1) return 1e6;  // box walls read as maximally crowded
    return grid[cellIndex(x, y)];
  }

  function deposit(x, y) {
    grid[cellIndex(x, y)] += CONFIG.gridDeposit;
  }

  function decayGrid() {
    for (let i = 0; i < grid.length; i++) grid[i] *= CONFIG.gridDecay;
  }

  // ── Curves ────────────────────────────────────────────────────────────────
  let curves = [];
  let nextColorIndex = 0;

  function makeCurve(x, y, heading, speed) {
    return {
      x, y, heading, speed,
      color: paletteColor(nextColorIndex++),
    };
  }

  function angleDiff(a, b) {
    let d = (a - b) % (Math.PI * 2);
    if (d > Math.PI) d -= Math.PI * 2;
    if (d < -Math.PI) d += Math.PI * 2;
    return d;
  }

  function seedInitialCurve() {
    const inset   = 20;
    const heading = Math.PI + Math.random() * (Math.PI / 2);  // aimed into the box (up-left quadrant)
    curves = [makeCurve(boxX1 - inset, boxY1 - inset, heading, CONFIG.startSpeed)];
  }

  // Every live curve forks in place: the parent keeps its heading and speed,
  // the fork starts from the same point but diverges into a new direction.
  function splitAll() {
    const forks = [];
    for (const c of curves) {
      const offset = (0.9 + Math.random() * 0.7) * (Math.random() < 0.5 ? -1 : 1);
      forks.push(makeCurve(c.x, c.y, c.heading + offset, c.speed));
    }
    curves = curves.concat(forks);
  }

  // Jump straight to `count` curves by repeatedly cloning a random existing
  // curve. Clones get the boosted explosion speed; everything already alive
  // keeps whatever speed it had.
  function explodeTo(count) {
    const parents = curves.slice();
    while (curves.length < count) {
      const parent = parents[(Math.random() * parents.length) | 0];
      const offset = (0.7 + Math.random() * 1.1) * (Math.random() < 0.5 ? -1 : 1);
      curves.push(makeCurve(parent.x, parent.y, parent.heading + offset,
        CONFIG.startSpeed * CONFIG.explodeSpeedMult));
    }
  }

  // ── Stepping ──────────────────────────────────────────────────────────────
  function steer(c, dt) {
    let bestAngle = 0;
    let bestDensity = Infinity;
    for (const off of CONFIG.steerAngles) {
      const a  = c.heading + off;
      const px = c.x + Math.cos(a) * CONFIG.lookahead;
      const py = c.y + Math.sin(a) * CONFIG.lookahead;
      const d  = densityAt(px, py) + Math.random() * 0.5;  // small noise breaks ties
      if (d < bestDensity) { bestDensity = d; bestAngle = off; }
    }
    c.heading += bestAngle === 0 ? 0 : angleDiff(c.heading + bestAngle, c.heading) * CONFIG.steerStrength * dt;
    c.heading += (Math.random() - 0.5) * CONFIG.turnNoise * dt;
  }

  function stepCurve(c, dt) {
    steer(c, dt);

    let nx = c.x + Math.cos(c.heading) * c.speed * dt;
    let ny = c.y + Math.sin(c.heading) * c.speed * dt;

    // Defensive clamp — steering keeps this rare, but guarantees curves
    // never actually leave the box.
    if (nx < boxX0)  { nx = boxX0;  c.heading = Math.PI - c.heading; }
    if (nx > boxX1)  { nx = boxX1;  c.heading = Math.PI - c.heading; }
    if (ny < boxY0)  { ny = boxY0;  c.heading = -c.heading; }
    if (ny > boxY1)  { ny = boxY1;  c.heading = -c.heading; }

    ctx.strokeStyle = c.color;
    ctx.globalAlpha = CONFIG.lineAlpha;
    ctx.lineWidth   = CONFIG.lineWidth;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    deposit(nx, ny);
    c.x = nx;
    c.y = ny;
  }

  // Separate stepping fn for the one breakout explorer: no wall clamp, no
  // density steering (it's meant to leave the canvas). Heading is hardcoded
  // to point radially outward from the box center EVERY frame (plus a little
  // jitter so it reads as "wandering" rather than a laser) — recomputing it
  // fresh each step guarantees it keeps moving away and actually exits,
  // rather than trusting a one-time heading that jitter could wander back in.
  function stepBreakout(c, dt) {
    const boxCx = (boxX0 + boxX1) / 2;
    const boxCy = (boxY0 + boxY1) / 2;
    const outward = Math.atan2(c.y - boxCy, c.x - boxCx);
    c.heading = outward + (Math.random() - 0.5) * CONFIG.breakoutTurnNoise;

    const nx = c.x + Math.cos(c.heading) * c.speed * dt;
    const ny = c.y + Math.sin(c.heading) * c.speed * dt;

    ctx.strokeStyle = CONFIG.breakoutColor;
    ctx.globalAlpha = 1;
    ctx.lineWidth   = CONFIG.lineWidth * 1.6;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    c.x = nx;
    c.y = ny;
  }

  // ── Progress timeline ─────────────────────────────────────────────────────
  const timelineX0 = CONFIG.timelineMargin;
  const timelineX1 = W - CONFIG.timelineMargin;
  const timelineMidY = timelineY0 + CONFIG.timelineHeight / 2;

  function drawTimeline(t) {
    if (!showTimeline) return;

    ctx.globalAlpha = 1;
    ctx.fillStyle = CONFIG.bg;
    ctx.fillRect(0, H, W, timelineY1 - H);

    // Track
    ctx.strokeStyle = CONFIG.timelineTrackColor;
    ctx.lineWidth   = 3;
    ctx.lineCap     = 'round';
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(timelineX0, timelineMidY);
    ctx.lineTo(timelineX1, timelineMidY);
    ctx.stroke();

    // Filled progress
    const frac = Math.min(1, t / CONFIG.maxRuntime);
    ctx.strokeStyle = CONFIG.timelineFillColor;
    ctx.beginPath();
    ctx.moveTo(timelineX0, timelineMidY);
    ctx.lineTo(timelineX0 + (timelineX1 - timelineX0) * frac, timelineMidY);
    ctx.stroke();

    // Split ticks — short solid marks
    ctx.strokeStyle = CONFIG.timelineTickColor;
    ctx.lineWidth   = 2;
    for (const st of CONFIG.splitTimes) {
      const x = timelineX0 + (timelineX1 - timelineX0) * (st / CONFIG.maxRuntime);
      ctx.beginPath();
      ctx.moveTo(x, timelineMidY - 5);
      ctx.lineTo(x, timelineMidY + 5);
      ctx.stroke();
    }

    // Explode marker — dashed line spanning the full timeline strip
    const ex = timelineX0 + (timelineX1 - timelineX0) * (CONFIG.explodeTime / CONFIG.maxRuntime);
    ctx.strokeStyle = CONFIG.timelineExplodeColor;
    ctx.lineWidth   = 1.5;
    ctx.globalAlpha = 0.9;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(ex, timelineY0);
    ctx.lineTo(ex, timelineY0 + CONFIG.timelineHeight);
    ctx.stroke();
    ctx.setLineDash([]);

    // Breakout marker — dashed preview beforehand, solid + thicker once it
    // has actually happened (the whole point being to highlight it then).
    if (Number.isFinite(breakoutTime)) {
      const bx = timelineX0 + (timelineX1 - timelineX0) * (breakoutTime / CONFIG.maxRuntime);
      ctx.strokeStyle = CONFIG.breakoutColor;
      ctx.globalAlpha = breakoutStarted ? 0.95 : 0.4;
      ctx.lineWidth   = breakoutStarted ? 2.5 : 1.5;
      ctx.setLineDash(breakoutStarted ? [] : [4, 3]);
      ctx.beginPath();
      ctx.moveTo(bx, timelineY0);
      ctx.lineTo(bx, timelineY0 + CONFIG.timelineHeight);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Pause/resume hint — top-right of the timeline strip
    ctx.font         = '9px monospace';
    ctx.textAlign    = 'right';
    ctx.textBaseline = 'alphabetic';
    ctx.globalAlpha  = 1;
    ctx.fillStyle    = CONFIG.pauseHintColor;
    ctx.fillText(paused ? 'click to resume' : 'click to pause', timelineX1, timelineY0 + 9);
  }

  // ── Curve-count plot ──────────────────────────────────────────────────────
  // The schedule is deterministic, so the step chart can be precomputed once
  // and just re-stroked every frame. Splits and the explode jump are replayed
  // in true chronological order (mirroring applyTimeline()/explodeTo()), so
  // any split scheduled after explodeTime keeps doubling the exploded count
  // instead of being clobbered by it.
  const countEvents = CONFIG.splitTimes.map(time => ({ time, type: 'split' }))
    .concat([{ time: CONFIG.explodeTime, type: 'explode' }])
    .sort((a, b) => a.time - b.time);

  function curveCountAt(t) {
    let count = 1;
    for (const ev of countEvents) {
      if (t < ev.time) break;
      count = ev.type === 'split' ? count * 2 : Math.max(count, CONFIG.explodeCount);
    }
    return count;
  }

  const countPlotMaxLog = Math.log2(Math.max(2, curveCountAt(CONFIG.maxRuntime)));
  const countPlotPadTop = 10;   // room for the peak so the line doesn't touch the top edge

  function countToY(count) {
    const frac = Math.log2(Math.max(1, count)) / countPlotMaxLog;
    return (curveCountY1 - 4) - frac * (CONFIG.curveCountHeight - countPlotPadTop);
  }

  // Precomputed schedule step-path, in canvas x/y, built once at startup.
  let countStepPath = null;
  function buildCountStepPath() {
    const bps = Array.from(new Set([0, ...CONFIG.splitTimes, CONFIG.explodeTime, CONFIG.maxRuntime]))
      .filter(t => t >= 0 && t <= CONFIG.maxRuntime)
      .sort((a, b) => a - b);

    const pts = [];
    for (let i = 0; i < bps.length; i++) {
      const t     = bps[i];
      const count = curveCountAt(t);
      const x     = timelineX0 + (timelineX1 - timelineX0) * (t / CONFIG.maxRuntime);
      const y     = countToY(count);
      if (pts.length) pts.push({ x, y: pts[pts.length - 1].y });  // flat segment up to this jump
      pts.push({ x, y });
    }
    countStepPath = pts;
  }

  function drawCurveCountPlot(t, liveCount) {
    if (!showCurveCountPlot) return;
    if (!countStepPath) buildCountStepPath();

    ctx.globalAlpha = 1;
    ctx.fillStyle = CONFIG.bg;
    ctx.fillRect(0, timelineY1, W, curveCountY1 - timelineY1);

    // Schedule step line
    ctx.strokeStyle = CONFIG.curveCountLineColor;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth   = 1.5;
    ctx.lineJoin    = 'round';
    ctx.setLineDash([]);
    ctx.beginPath();
    countStepPath.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.stroke();

    // Breakout marker — vertical line only, spanning down from the timeline
    // strip above. Gets brighter/thicker once it has actually triggered.
    let bx = null;
    let by = null;
    if (Number.isFinite(breakoutTime)) {
      bx = timelineX0 + (timelineX1 - timelineX0) * (breakoutTime / CONFIG.maxRuntime);
      by = countToY(curveCountAt(breakoutTime));

      ctx.strokeStyle = CONFIG.breakoutColor;
      ctx.globalAlpha = breakoutStarted ? 0.95 : 0.4;
      ctx.lineWidth   = breakoutStarted ? 2.5 : 1.5;
      ctx.setLineDash(breakoutStarted ? [] : [4, 3]);
      ctx.beginPath();
      ctx.moveTo(bx, timelineY1);
      ctx.lineTo(bx, curveCountY1);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Explode marker, continuing the dashed line from the timeline above
    const ex = timelineX0 + (timelineX1 - timelineX0) * (CONFIG.explodeTime / CONFIG.maxRuntime);
    ctx.strokeStyle = CONFIG.timelineExplodeColor;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth   = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(ex, timelineY1);
    ctx.lineTo(ex, curveCountY1);
    ctx.stroke();
    ctx.setLineDash([]);

    // Live marker — current time / current curve count
    const cx = timelineX0 + (timelineX1 - timelineX0) * Math.min(1, t / CONFIG.maxRuntime);
    const cy = countToY(liveCount);
    ctx.globalAlpha = 1;
    ctx.fillStyle   = CONFIG.curveCountDotColor;
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.font         = '10px monospace';
    ctx.textAlign    = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.globalAlpha  = 1;
    ctx.fillStyle    = CONFIG.curveCountLabelColor;
    ctx.fillText(`${liveCount} explorers`, timelineX0, timelineY1 + 10);

    // "Intelligence explosion" label, tagging the dashed explode marker.
    // Flips to right-aligned (ending at the marker) if there isn't enough
    // room to the right of it — keeps narrow aspect ratios from clipping it.
    ctx.font        = '9px monospace';
    ctx.globalAlpha = 0.75;
    ctx.fillStyle   = CONFIG.timelineExplodeColor;
    const explodeLabel = 'intelligence explosion';
    const labelW = ctx.measureText(explodeLabel).width;
    if (ex + 5 + labelW <= timelineX1) {
      ctx.textAlign = 'left';
      ctx.fillText(explodeLabel, ex + 5, curveCountY1 - 6);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText(explodeLabel, ex - 5, curveCountY1 - 6);
    }

    // "Breakout" label — sits just below the breakout line itself (same
    // overflow-safe left/right placement trick as the explode label).
    if (bx !== null) {
      ctx.font        = '9px monospace';
      ctx.globalAlpha = breakoutStarted ? 1 : 0.6;
      ctx.fillStyle   = CONFIG.breakoutColor;
      const breakoutLabelW = ctx.measureText(CONFIG.breakoutLabel).width;
      const labelY = Math.min(by + 11, curveCountY1 - 2);
      if (bx + 5 + breakoutLabelW <= timelineX1) {
        ctx.textAlign = 'left';
        ctx.fillText(CONFIG.breakoutLabel, bx + 5, labelY);
      } else {
        ctx.textAlign = 'right';
        ctx.fillText(CONFIG.breakoutLabel, bx - 5, labelY);
      }
    }
  }

  // ── Timeline (curve-count schedule) ───────────────────────────────────────
  let splitsDone      = 0;
  let exploded        = false;
  let breakoutStarted = false;
  let breakoutCurve   = null;
  let breakoutStartAt = null;

  function clearCanvas() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = CONFIG.bg;
    ctx.fillRect(0, 0, W, canvasH);

    if (CONFIG.showBoxOutline) {
      ctx.strokeStyle = CONFIG.boxOutlineColor;
      ctx.lineWidth   = 1;
      ctx.setLineDash([]);
      ctx.strokeRect(boxX0, boxY0, boxX1 - boxX0, boxY1 - boxY0);
    }
  }

  function reset() {
    grid.fill(0);
    splitsDone      = 0;
    exploded        = false;
    breakoutStarted = false;
    breakoutCurve   = null;
    breakoutStartAt = null;
    nextColorIndex  = 0;
    seedInitialCurve();
    clearCanvas();
  }

  function applyTimeline(t) {
    while (splitsDone < CONFIG.splitTimes.length && t >= CONFIG.splitTimes[splitsDone]) {
      splitAll();
      splitsDone++;
    }
    if (!exploded && t >= CONFIG.explodeTime) {
      explodeTo(CONFIG.explodeCount);
      exploded = true;
    }
    if (!breakoutStarted && t >= breakoutTime) {
      breakoutStarted = true;
      breakoutStartAt = t;
      breakoutCurve = curves[(Math.random() * curves.length) | 0];
      breakoutCurve.speed = CONFIG.startSpeed * CONFIG.breakoutSpeedMult;
      // stepBreakout() recomputes an outward heading fresh every frame, so
      // no need to set one here.
    }
  }

  // Once the breakout explorer launches, the timeline/plot freeze at that
  // moment instead of continuing to creep toward maxRuntime — `time` itself
  // keeps advancing underneath (so the cycle still resets on schedule), but
  // nothing on screen should look like it's still counting up.
  function displayTime() {
    return breakoutStarted ? breakoutTime : time;
  }

  // ── Pause/resume by clicking anywhere on the canvas ───────────────────────
  let paused = false;

  function onClick() {
    paused = !paused;
    if (!paused) {
      last = null;
      requestAnimationFrame(loop);
    } else {
      drawTimeline(displayTime());
      drawCurveCountPlot(displayTime(), curves.length);
    }
  }
  canvas.addEventListener('click', onClick);
  canvas.style.cursor = 'pointer';

  // ── Loop ──────────────────────────────────────────────────────────────────
  let last = null;
  let time = 0;
  let destroyed = false;

  reset();

  function loop(ts) {
    if (destroyed) return;

    const dt = last === null ? 0 : Math.min((ts - last) / 1000, 0.05);
    last = ts;
    time += dt;

    if (CONFIG.maxRuntime > 0 && time >= CONFIG.maxRuntime) {
      time = 0;
      last = null;
      reset();
    } else {
      // applyTimeline() may flip breakoutStarted on this very frame — check
      // it AFTER calling applyTimeline so the newly-designated breakout
      // explorer gets stepBreakout() this frame instead of also being run
      // through the normal stepCurve()/steer() pass (which would immediately
      // steer it back inward and clamp it into the box).
      applyTimeline(time);
      if (breakoutStarted) {
        stepBreakout(breakoutCurve, dt);
        // Let the breakout explorer travel for a beat so it's actually
        // visible leaving the box, then auto-pause so it doesn't just
        // vanish off-screen.
        if (!paused && time - breakoutStartAt >= CONFIG.breakoutPauseDelay) {
          paused = true;
        }
      } else {
        decayGrid();
        for (const c of curves) stepCurve(c, dt);
      }
    }

    drawTimeline(displayTime());
    drawCurveCountPlot(displayTime(), curves.length);
    if (!paused) requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  return {
    pause() { if (!paused) onClick(); },
    resume() { if (paused) onClick(); },
    reset,
    destroy() {
      destroyed = true;
      canvas.removeEventListener('click', onClick);
    },
  };
}

if (typeof window !== 'undefined') {
  window.CurveFill = CurveFill;

  // Auto-init is opt-in via data-autoinit on the canvas — NOT just matching
  // the #curve-fill-canvas id — so a page that instantiates CurveFill()
  // itself never ends up with a second, unconfigured instance silently
  // running on top of it. index.html's canvas carries the attribute.
  const autoEl = document.querySelector('canvas[data-autoinit]');
  if (autoEl) CurveFill(autoEl, window.CURVE_FILL_CONFIG || {});
}
