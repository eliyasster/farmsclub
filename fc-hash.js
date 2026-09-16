/* Cross-page deep links (e.g. index.html -> grand-haven.html#tour).
   A hash arriving with the document has to survive three things: images that
   change layout as they decode, the scroll-reveal pass that starts sections
   hidden, and the browser's own one-shot jump. So: force the target visible,
   then re-anchor it a few times while the page settles. */
(() => {
  if (window.__fcHash) return; window.__fcHash = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const OFFSET = 64;

  const show = (root) => {
    root.querySelectorAll('.fc-rise, .fc-mask, [style*="clip-path"]').forEach((el) => {
      el.classList.add('fc-in');
      el.setAttribute('data-fc-shown', '');
      el.classList.remove('fc-rise', 'fc-mask', 'fc-in');
      el.style.opacity = ''; el.style.transform = ''; el.style.clipPath = 'none'; el.style.transitionDelay = '';
    });
    root.setAttribute('data-fc-shown', '');
  };

  const land = (id, smooth) => {
    const t = document.getElementById(id);
    if (!t) return;
    show(t);
    const go = () => window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - OFFSET, behavior: smooth && !reduce ? 'smooth' : 'auto' });
    go();
    [120, 400, 900, 1600].forEach((ms) => setTimeout(() => { show(t); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - OFFSET, behavior: 'auto' }); }, ms));
  };

  const fromHash = () => { const id = location.hash.slice(1); if (id) land(id, false); };
  if (location.hash) {
    if (document.readyState === 'loading') addEventListener('DOMContentLoaded', fromHash);
    else fromHash();
    addEventListener('load', fromHash);
  }
  addEventListener('hashchange', () => { const id = location.hash.slice(1); if (id) land(id, true); });
})();
