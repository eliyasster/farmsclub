/* Makes any [data-sitenav] bar sit transparent (gradient scrim, light text) over
   the hero, then turn solid once the first fold has scrolled past. Purely
   imperative so the page paints correctly before this runs. */
(() => {
  if (window.__farmsclubNav) return; window.__farmsclubNav = true;
  const apply = () => {
    document.querySelectorAll('[data-sitenav]').forEach((n) => {
      const solid = window.scrollY > Math.max(60, window.innerHeight * 0.8 - n.offsetHeight - 8);
      n.toggleAttribute('data-solid', solid);
      n.style.background = solid
        ? 'color-mix(in srgb, var(--color-bg) 92%, transparent)'
        : 'linear-gradient(to bottom, rgba(28,26,22,.58), rgba(28,26,22,.18) 60%, rgba(28,26,22,0))';
      n.style.backdropFilter = solid ? 'blur(10px)' : 'none';
      n.style.boxShadow = solid ? '0 1px 0 color-mix(in srgb, var(--color-text) 12%, transparent)' : 'none';
      n.querySelectorAll('a').forEach((a) => { a.style.color = solid ? '' : '#fff'; });
      /* the wordmark is dark ink — flip it to cream while the bar is transparent */
      n.querySelectorAll('.nav-brand img').forEach((i) => { i.style.filter = solid ? 'none' : 'brightness(0) invert(1)'; });
    });
  };
  addEventListener('scroll', apply, { passive: true });
  addEventListener('resize', apply);
  apply();
  const t = setInterval(apply, 250);
  setTimeout(() => clearInterval(t), 6000);
})();
