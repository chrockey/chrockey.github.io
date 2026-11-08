/* Homepage hero: the name as a scanned 3D object.
   Points are sampled inside the letters as a thin slab and drawn as small
   softly shaded spheres. The view turns toward the pointer, and points near it
   scatter and spring back. */
(function () {
  const canvas = document.getElementById('hero-cloud');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!ctx) return;
  // Softly lit particles have volume while preserving space between samples.
  const LIT = [183, 188, 195], SHADE = [30, 34, 40], HOT = [88, 112, 138];
  const SHADES = 16, HEATS = 5;
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const sprites = [];
  for (let h = 0; h < HEATS; h++) {
    for (let s = 0; s < SHADES; s++) {
      const color = mix(mix(SHADE, LIT, s / (SHADES - 1)), HOT, h / (HEATS - 1));
      const c = document.createElement('canvas'); c.width = c.height = 48;
      const g = c.getContext('2d');
      // Shade a sphere from its surface normals, rather than a flat radial disc.
      const pixels = g.createImageData(48, 48);
      for (let y = 0; y < 48; y++) {
        for (let x = 0; x < 48; x++) {
          const nx = (x + 0.5 - 24) / 23, ny = (y + 0.5 - 24) / 23;
          const radius = Math.hypot(nx, ny);
          if (radius >= 1) continue;
          const nz = Math.sqrt(1 - radius * radius);
          const diffuse = Math.max(0, nx * -0.45 + ny * -0.55 + nz * 0.704);
          const specular = Math.pow(Math.max(0, nx * -0.244 + ny * -0.298 + nz * 0.923), 20);
          const offset = (y * 48 + x) * 4;
          for (let channel = 0; channel < 3; channel++) {
            pixels.data[offset + channel] = Math.min(255,
              color[channel] * (0.12 + 1.05 * diffuse) + 235 * specular);
          }
          pixels.data[offset + 3] = Math.min(1, (1 - radius) * 23) * 255;
        }
      }
      g.putImageData(pixels, 0, 0);
      sprites.push(c);
    }
  }

  let W = 0, H = 0, dpr = 1, pts = [], dot = 1;
  const pointer = { x: -1e4, y: -1e4, active: false };
  let yaw = 0, pitch = 0, tYaw = 0, tPitch = 0, t0 = performance.now(), last = 0;

  function sample() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);

    // Rasterise the name off-screen in the heading font
    const ow = Math.round(W), oh = Math.round(H);
    const off = document.createElement('canvas'); off.width = ow; off.height = oh;
    const o = off.getContext('2d');
    let size = Math.min(H * 0.57, W / 7);
    const setFont = () => { o.font = `600 ${size}px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif`; };
    setFont();
    const text = 'Chunghyun Park';
    const tw = o.measureText(text).width;
    if (tw > W * 0.91) { size *= (W * 0.91) / tw; setFont(); }
    o.textBaseline = 'middle'; o.textAlign = 'center';
    o.fillText(text, ow / 2, oh / 2);
    const a = o.getImageData(0, 0, ow, oh).data;
    const inside = (x, y) => x >= 0 && y >= 0 && x < ow && y < oh && a[(y * ow + x) * 4 + 3] > 127;

    const gap = Math.max(2.1, size / 32);          // spacing between samples
    const depth = size * 0.17;                      // a shallow cloud keeps the name clean
    dot = Math.max(1.05, gap * 0.48);              // point radius: leave air between neighbours
    const prev = pts;
    pts = [];
    const jit = () => (Math.random() - 0.5) * gap * 0.65;
    for (let gy = 0; gy < oh; gy += gap) {
      for (let gx = 0; gx < ow; gx += gap) {
        const x = gx + jit(), y = gy + jit();
        if (!inside(Math.round(x), Math.round(y))) continue;
        const old = prev[pts.length];
        pts.push({
          bx: x - ow / 2, by: y - oh / 2, bz: (Math.random() - 0.5) * depth,
          x: old ? old.x : x - ow / 2 + (Math.random() - 0.5) * W * 0.18,
          y: old ? old.y : y - oh / 2 + (Math.random() - 0.5) * H * 0.6,
          z: old ? old.z : (Math.random() - 0.5) * W * 0.2,
          vx: 0, vy: 0, vz: 0, heat: 0,
        });
      }
    }
    if (reduceMotion) pts.forEach(p => { p.x = p.bx; p.y = p.by; p.z = p.bz; });
  }

  function frame(now) {
    const t = (now - t0) / 1000;
    // physics is tuned for 60 fps; scale it so 120 Hz screens move at the same speed
    const k60 = last ? Math.min(3, (now - last) / 16.7) : 1; last = now;
    const spring = 0.045 * k60, damp = Math.pow(0.82, k60), ease = 1 - Math.pow(0.94, k60);
    // idle sway, overridden by the pointer when it moves
    if (!pointer.active && !reduceMotion) { tYaw = Math.sin(t * 0.35) * 0.045; tPitch = Math.sin(t * 0.27) * 0.018; }
    yaw += (tYaw - yaw) * ease; pitch += (tPitch - pitch) * ease;
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const f = Math.max(W * 1.1, 900);
    const R = Math.max(35, H * 0.25);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const proj = new Array(pts.length);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.vx += (p.bx - p.x) * spring; p.vy += (p.by - p.y) * spring; p.vz += (p.bz - p.z) * spring;
      // rotate (yaw about y, then pitch about x) and project
      const x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
      const y2 = p.y * cp - z1 * sp, z2 = p.y * sp + z1 * cp;
      const s = f / (f + z2);
      const sx = W / 2 + x1 * s, syy = H / 2 + y2 * s;
      // pointer pushes nearby points away in screen space and toward the viewer
      const dx = sx - pointer.x, dy = syy - pointer.y, d2 = dx * dx + dy * dy;
      if (!reduceMotion && d2 < R * R) {
        const d = Math.sqrt(d2) || 1, k = (1 - d / R) * 0.65 * k60;
        p.vx += (dx / d) * k; p.vy += (dy / d) * k; p.vz -= k * 1.4;
        p.heat = Math.min(1, p.heat + 0.2);
      }
      p.vx *= damp; p.vy *= damp; p.vz *= damp;
      p.x += p.vx * k60; p.y += p.vy * k60; p.z += p.vz * k60;
      p.heat *= Math.pow(0.965, k60);
      const depthRange = Math.max(20, H * 0.3);
      const near = Math.min(1, Math.max(0, 0.5 - z2 / (depthRange * 2)));
      const shade = Math.round(near * (SHADES - 1));
      const heat = Math.min(HEATS - 1, Math.round(p.heat * (HEATS - 1)));
      proj[i] = [z2, sx, syy, s, heat * SHADES + shade];
    }
    proj.sort((a, b) => b[0] - a[0]);   // far to near, so the front face covers the walls behind it
    for (let i = 0; i < proj.length; i++) {
      const q = proj[i], r = dot * q[3];
      ctx.drawImage(sprites[q[4]], q[1] - r, q[2] - r, r * 2, r * 2);
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  canvas.addEventListener('pointermove', e => {
    if (reduceMotion) return;
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left; pointer.y = e.clientY - rect.top;
    pointer.active = true;
    // Interaction stays within the artwork.
    tYaw = ((pointer.x / W) - 0.5) * 0.12;
    tPitch = Math.max(-0.06, Math.min(0.06, (pointer.y / H - 0.5) * 0.12));
  }, { passive: true });
  canvas.addEventListener('pointerleave', () => { pointer.active = false; pointer.x = pointer.y = -1e4; });
  document.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') { pointer.x = pointer.y = -1e4; pointer.active = false; } });

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { sample(); if (reduceMotion) frame(performance.now()); }, 150); });

  sample();
  canvas.closest('.hero').classList.add('ready');
  requestAnimationFrame(frame);
})();
