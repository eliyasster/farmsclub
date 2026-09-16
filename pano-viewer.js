/* <pano-viewer src="assets/pano-360.jpg">
   Equirectangular 360° viewer: drag to look around, scroll to zoom.
   Give it a flat/stretched (equirectangular) JPG via `src` — it is projected
   onto a sphere, Street-View style. Changing `src` swaps the panorama.
   To use your own photo for a spot, replace the file in assets/ (or point the
   src at a new file) — there is no in-page upload. */
(() => {
  if (window.customElements.get('pano-viewer')) return;
  let threeP = null;
  const loadThree = () => (threeP = threeP || import('https://unpkg.com/three@0.160.0/build/three.module.js'));

  class PanoViewer extends HTMLElement {
    static get observedAttributes() { return ['src', 'label']; }
    constructor() {
      super();
      this.lon = 0; this.lat = 0; this.fov = 74; this._raf = 0; this._on = false;
    }
    connectedCallback() {
      if (this._built) return; this._built = true;
      // Host layout lives in shadow CSS, not the style attribute: this element is
      // mounted inside a React tree that strips inline styles from the host.
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `<style>:host{position:relative!important;display:block!important;width:100%;height:100%;border-radius:28px;overflow:hidden;background:#ebddc5;touch-action:none;user-select:none}</style>
<canvas style="display:block;width:100%;height:100%;cursor:grab"></canvas>
<div data-hint style="position:absolute;left:14px;bottom:14px;display:flex;gap:8px;align-items:center;padding:6px 12px;border-radius:999px;background:rgba(32,30,29,.55);color:#f5ead8;font:600 12px Figtree,system-ui,sans-serif;letter-spacing:.04em;pointer-events:none">Drag to look around · scroll to zoom</div>`;
      this.canvas = root.querySelector('canvas');
      this.bindDrag();
      this.io = new IntersectionObserver((es) => { this._on = es[0].isIntersecting; this.tick(); }, { threshold: 0.05 });
      this.io.observe(this);
      this.ro = new ResizeObserver(() => requestAnimationFrame(() => this.resize())); this.ro.observe(this);
      this.load();
    }
    disconnectedCallback() { this.io && this.io.disconnect(); this.ro && this.ro.disconnect(); cancelAnimationFrame(this._raf); this._raf = 0; }
    attributeChangedCallback(n, o, v) { if (this._built && n === 'src' && o !== v) this.load(); }

    bindDrag() {
      let down = false, px = 0, py = 0;
      this.canvas.addEventListener('pointerdown', (e) => { down = true; px = e.clientX; py = e.clientY; this.canvas.style.cursor = 'grabbing'; this.canvas.setPointerCapture(e.pointerId); });
      this.canvas.addEventListener('pointermove', (e) => {
        if (!down) return;
        this.lon -= (e.clientX - px) * this.fov / 900;
        this.lat = Math.max(-85, Math.min(85, this.lat + (e.clientY - py) * this.fov / 900));
        px = e.clientX; py = e.clientY;
      });
      const up = () => { down = false; this.canvas.style.cursor = 'grab'; };
      this.canvas.addEventListener('pointerup', up);
      this.canvas.addEventListener('pointercancel', up);
      /* two-finger pinch to zoom on touch devices */
      const pts = new Map(); let pinch0 = 0, fov0 = 0;
      this.canvas.__pinch = true;
      const dist = () => { const [a, b] = [...pts.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
      this.canvas.addEventListener('pointerdown', (e) => { pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); if (pts.size === 2) { pinch0 = dist(); fov0 = this.fov; } });
      this.canvas.addEventListener('pointermove', (e) => {
        if (!pts.has(e.pointerId)) return;
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pts.size === 2 && pinch0) { down = false; this.fov = Math.max(38, Math.min(96, fov0 * pinch0 / dist())); }
      });
      const drop = (e) => { pts.delete(e.pointerId); if (pts.size < 2) pinch0 = 0; };
      this.canvas.addEventListener('pointerup', drop);
      this.canvas.addEventListener('pointercancel', drop);
      this.canvas.addEventListener('wheel', (e) => { e.preventDefault(); this.fov = Math.max(38, Math.min(96, this.fov + Math.sign(e.deltaY) * 3)); }, { passive: false });
    }

    load() { const s = this.getAttribute('src'); if (s) this.show(s); }

    async show(src) {
      const img = new Image(); img.crossOrigin = 'anonymous';
      try { await new Promise((r, j) => { img.onload = r; img.onerror = j; img.src = src; }); } catch (e) { return; }
      try {
        const THREE = await loadThree();
        if (!this.renderer) {
          this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, preserveDrawingBuffer: true });
          this.renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
          this.scene3 = new THREE.Scene();
          this.camera = new THREE.PerspectiveCamera(this.fov, 2, 0.1, 200);
          const geo = new THREE.SphereGeometry(60, 64, 40); geo.scale(-1, 1, 1);
          this.mat = new THREE.MeshBasicMaterial();
          this.scene3.add(new THREE.Mesh(geo, this.mat));
          this.THREE = THREE;
        }
        const tex = new this.THREE.Texture(img);
        if ('colorSpace' in tex) tex.colorSpace = this.THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        if (this.mat.map) this.mat.map.dispose();
        this.mat.map = tex; this.mat.needsUpdate = true;
        this.lon = 0; this.lat = 0;
        this.resize(); this.tick();
      } catch (e) {
        // WebGL or three.js unavailable: fall back to a flat draggable pan
        this.flat = img; this.resize(); this.tick();
      }
    }
    resize() {
      const w = this.clientWidth || 800, h = this.clientHeight || 450;
      if (this.renderer) { this.renderer.setSize(w, h, false); this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); }
      else if (this.flat) { this.canvas.width = w * (devicePixelRatio || 1); this.canvas.height = h * (devicePixelRatio || 1); }
    }
    tick() {
      cancelAnimationFrame(this._raf);
      if (!this._on) return;
      this._raf = requestAnimationFrame(() => this.tick());
      if (this.renderer && this.mat && this.mat.map) {
        const phi = this.THREE.MathUtils.degToRad(90 - this.lat), th = this.THREE.MathUtils.degToRad(this.lon);
        this.camera.fov = this.fov; this.camera.updateProjectionMatrix();
        this.camera.lookAt(
          100 * Math.sin(phi) * Math.cos(th),
          100 * Math.cos(phi),
          100 * Math.sin(phi) * Math.sin(th)
        );
        this.renderer.render(this.scene3, this.camera);
      } else if (this.flat) {
        const ctx = this.canvas.getContext('2d'), W = this.canvas.width, H = this.canvas.height;
        const s = H / this.flat.naturalHeight * (96 / this.fov) * 1.6;
        const iw = this.flat.naturalWidth * s;
        let x = (-this.lon / 360) * iw % iw; if (x > 0) x -= iw;
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < 3; i++) ctx.drawImage(this.flat, x + i * iw, (H - this.flat.naturalHeight * s) / 2 + this.lat * 3, iw, this.flat.naturalHeight * s);
      }
    }
  }
  customElements.define('pano-viewer', PanoViewer);
})();
