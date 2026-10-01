/* Homepage hero: the name as a scanned 3D object.
   Points are sampled inside the letters as a thin slab, coloured by depth and drawn as small
   shaded spheres. The view turns toward the pointer, and points near it
   scatter and spring back. */
(function () {
  const canvas = document.getElementById('hero-cloud');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = getComputedStyle(document.documentElement);
  const hex = v => {
    const h = css.getPropertyValue(v).trim().replace('#', '');
    return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  };
  const LIT = [150, 196, 184];       // surface facing the light: light sage
  const SHADE = hex('--accent');     // surface turned away: deep sage
  const HOT = hex('--award');        // points kicked by the pointer: mustard
  const SHADES = 12, HEATS = 4;
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  // Each point is drawn as a small shaded sphere: a pre-rendered sprite per colour,
  // lit from the upper left with a soft highlight and a darker rim
  const SPRITE = 48;
  const sprites = [];
  for (let h = 0; h < HEATS; h++) {
    for (let s = 0; s < SHADES; s++) {
      const base = mix(mix(SHADE, LIT, s / (SHADES - 1)), HOT, h / (HEATS - 1));
      const c = document.createElement('canvas'); c.width = c.height = SPRITE;
      const g = c.getContext('2d'), r = SPRITE / 2;
      const grad = g.createRadialGradient(r * 0.68, r * 0.62, r * 0.05, r, r, r);
      const rgb = v => `rgb(${v[0]},${v[1]},${v[2]})`;
      grad.addColorStop(0, rgb(mix(base, [255, 255, 255], 0.75)));
      grad.addColorStop(0.35, rgb(base));
      grad.addColorStop(1, rgb(mix(base, [10, 25, 22], 0.45)));
      g.fillStyle = grad; g.beginPath(); g.arc(r, r, r - 0.5, 0, Math.PI * 2); g.fill();
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
    let size = Math.min(H * 0.66, W / 7);
    const setFont = () => { o.font = `small-caps 400 ${size}px Lora, Georgia, serif`; };
    setFont();
    const text = 'Chunghyun Park';
    const tw = o.measureText(text).width;
    if (tw > W * 0.86) { size *= (W * 0.86) / tw; setFont(); }
    o.textBaseline = 'middle'; o.textAlign = 'center';
    o.fillText(text, ow / 2, oh / 2);
    const a = o.getImageData(0, 0, ow, oh).data;
    const inside = (x, y) => x >= 0 && y >= 0 && x < ow && y < oh && a[(y * ow + x) * 4 + 3] > 127;

    const gap = Math.max(1.4, size / 44);          // spacing between samples
    const depth = size * 0.12;                      // the letters are a thin slab of spheres
    dot = Math.max(0.85, gap * 0.62);              // sphere radius: neighbours just touch
    const prev = pts;
    pts = [];
    const jit = () => (Math.random() - 0.5) * gap * 0.9;
    for (let gy = 0; gy < oh; gy += gap) {
      for (let gx = 0; gx < ow; gx += gap) {
        const x = gx + jit(), y = gy + jit();
        if (!inside(Math.round(x), Math.round(y))) continue;
        const old = prev[pts.length];
        pts.push({
          bx: x - ow / 2, by: y - oh / 2, bz: (Math.random() - 0.5) * depth,
          // first load: start in a wide 3D cloud and fly into place
          x: old ? old.x : (Math.random() - 0.5) * W * 1.4,
          y: old ? old.y : (Math.random() - 0.5) * H * 3,
          z: old ? old.z : (Math.random() - 0.5) * W * 0.8,
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
    if (!pointer.active) { tYaw = Math.sin(t * 0.5) * 0.25; tPitch = Math.sin(t * 0.37) * 0.12; }
    yaw += (tYaw - yaw) * ease; pitch += (tPitch - pitch) * ease;
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const f = Math.max(W * 1.1, 900);
    const R = Math.max(50, H * 0.45);
    const depth3 = Math.max(20, H * 0.3);   // depth range used for colouring

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
      if (d2 < R * R) {
        const d = Math.sqrt(d2) || 1, k = (1 - d / R) * 2.2 * k60;
        p.vx += (dx / d) * k; p.vy += (dy / d) * k; p.vz -= k * 1.4;
        p.heat = Math.min(1, p.heat + 0.2);
      }
      p.vx *= damp; p.vy *= damp; p.vz *= damp;
      p.x += p.vx * k60; p.y += p.vy * k60; p.z += p.vz * k60;
      p.heat *= Math.pow(0.965, k60);
      // nearer spheres are lighter, farther ones deeper sage
      const near = Math.min(1, Math.max(0, 0.5 - z2 / (depth3 * 2)));
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

  window.addEventListener('pointermove', e => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left; pointer.y = e.clientY - rect.top;
    pointer.active = true;
    // the whole window steers the view, so the name follows the pointer from anywhere on the page
    tYaw = ((e.clientX / window.innerWidth) - 0.5) * 0.7;
    tPitch = -((e.clientY - (rect.top + rect.height / 2)) / window.innerHeight) * 0.5;
  }, { passive: true });
  window.addEventListener('pointerleave', () => { pointer.active = false; pointer.x = pointer.y = -1e4; });
  document.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') { pointer.x = pointer.y = -1e4; pointer.active = false; } });

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(sample, 150); });

  const start = () => { sample(); requestAnimationFrame(frame); };
  (document.fonts && document.fonts.load ? document.fonts.load('400 48px Lora').then(start, start) : start());
})();
