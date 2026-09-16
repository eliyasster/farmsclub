/* Farmsclub motion — scroll-driven reveals and micro-interactions.
   Auto-targets ordinary markup so pages stay clean:
     · headings          split into words that rise behind a mask
     · text + cards      fade + rise, staggered per section
     · images            unmask (clip-path) with a slow settle, hero parallax
     · numbers           count up when the stat row first appears
     · hover states      buttons lift, cards lift, nav links underline, images zoom
   The whole pass is idempotent and re-runs whenever the page re-renders (the
   design-component runtime re-renders with React and wipes imperative classes),
   with already-revealed elements remembered so nothing re-animates.
   Opt out with [data-no-motion]; prefers-reduced-motion disables the file. */
(() => {
  const VERSION = 5;
  if (window.__fcVersion >= VERSION) return;
  window.__fcVersion = VERSION;
  window.__farmsclubMotion = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css = `
.fc-word{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.06em;margin-bottom:-.06em}
.fc-word > span{display:inline-block;transform:translateY(110%);transition:transform .85s cubic-bezier(.19,1,.22,1)}
.fc-in .fc-word > span{transform:translateY(0)}
.fc-rise{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.fc-rise.fc-in{opacity:1;transform:none}
.fc-mask{clip-path:inset(0 0 100% 0);transition:clip-path 1.05s cubic-bezier(.76,0,.24,1)}
.fc-mask.fc-in{clip-path:inset(0 0 0 0)}
.fc-mask img,.fc-zoom img{transform:scale(1.12);transition:transform 1.4s cubic-bezier(.19,1,.22,1)}
.fc-mask.fc-in img{transform:scale(1)}
.fc-zoom{overflow:hidden}
.fc-zoom:hover img{transform:scale(1.05);transition:transform .9s cubic-bezier(.19,1,.22,1)}
.btn{transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s ease,background-color .3s ease,color .3s ease}
.btn:hover{transform:translateY(-2px);box-shadow:0 10px 22px -12px rgba(32,30,29,.55)}
.btn:active{transform:translateY(0)}
.card{transition:transform .45s cubic-bezier(.19,1,.22,1),box-shadow .45s ease}
.card:hover{transform:translateY(-5px);box-shadow:0 18px 40px -26px rgba(32,30,29,.6)}
[data-sitenav] a{position:relative;transition:opacity .25s ease}
[data-sitenav] a::after{content:"";position:absolute;left:0;right:0;bottom:-5px;height:1.5px;background:currentColor;transform:scaleX(0);transform-origin:right;transition:transform .4s cubic-bezier(.19,1,.22,1)}
[data-sitenav] a:hover::after{transform:scaleX(1);transform-origin:left}
details summary span{transition:transform .35s cubic-bezier(.19,1,.22,1)}
details[open] summary span{transform:rotate(45deg)}
details{transition:background-color .3s ease}
.fc-cue{position:absolute;left:50%;bottom:20px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:7px;color:#fff;font:600 11px/1 Figtree,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;opacity:.9;pointer-events:none;z-index:2}
.fc-cue i{display:block;width:1px;height:34px;background:currentColor;transform-origin:top;animation:fc-cue 2.1s cubic-bezier(.76,0,.24,1) infinite}
@keyframes fc-cue{0%{transform:scaleY(0);opacity:0}35%{transform:scaleY(1);opacity:1}70%,100%{transform:scaleY(1);opacity:0;transform-origin:bottom}}
@media (prefers-reduced-motion:reduce){.fc-word > span,.fc-rise,.fc-mask{transition:none!important;transform:none!important;opacity:1!important;clip-path:none!important}.fc-cue i{animation:none}}
`;
  const style = document.createElement('style');
  style.id = 'fc-motion-style';
  style.textContent = css;
  const addStyle = () => { if (!document.getElementById('fc-motion-style')) (document.head || document.documentElement).appendChild(style); };
  addStyle();

  /* Nodes already revealed keep their state across re-renders: React can strip
     our classes, but the node identity survives, so a WeakSet is enough. */
  const shown = new WeakSet();
  const observed = new WeakSet();
  let busy = false;

  /* Once an element has played, it is released: the animation classes are
     stripped and it is never touched again. That matters in the design-component
     runtime, where React re-renders can reset className — a released element
     simply renders in its natural state instead of snapping back to hidden. */
  const reveal = (el) => {
    el.classList.add('fc-in');
    settle(el);
  };

  const settle = (el) => {
    shown.add(el);
    el.setAttribute('data-fc-shown', '');
    setTimeout(() => {
      /* A split heading loses its word animation with the class, so flatten it
         back to plain text first — otherwise the words would snap out of view. */
      if (el.querySelector('.fc-word')) el.textContent = el.textContent;
      el.classList.remove('fc-rise', 'fc-mask', 'fc-in');
      el.style.transitionDelay = '';
      el.style.clipPath = 'none';
      el.style.opacity = '';
      el.style.transform = '';
    }, 1400);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      reveal(e.target);
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  const done = (el) => shown.has(el) || el.hasAttribute('data-fc-shown');

  const watch = (el) => {
    if (done(el)) return;
    if (observed.has(el)) return;
    observed.add(el);
    io.observe(el);
  };

  const splitHeading = (h) => {
    if (done(h) || h.querySelector('.fc-word')) return;
    const words = h.textContent.trim().split(/\s+/);
    if (!words[0]) return;
    /* Keep the unsplit string: the language switch translates from this, and in
       RTL the per-word spans would lay out backwards, so skip splitting there. */
    if (!h.hasAttribute('data-fc-text')) h.setAttribute('data-fc-text', h.textContent.trim());
    if (document.documentElement.getAttribute('dir') === 'rtl') return;
    h.textContent = '';
    words.forEach((w, i) => {
      const outer = document.createElement('span');
      outer.className = 'fc-word';
      const inner = document.createElement('span');
      inner.textContent = w;
      inner.style.transitionDelay = (i * 55) + 'ms';
      outer.appendChild(inner);
      h.appendChild(outer);
      if (i < words.length - 1) h.appendChild(document.createTextNode(' '));
    });
  };

  const riseSel = 'section p, section li, section dl > div, .card, form, details, section .btn, section span.tag, footer a, footer span';

  function apply() {
    if (busy) return;
    busy = true;
    try { applyInner(); } catch (err) { window.__fcErr = String(err && err.stack || err); }
    busy = false;
  }

  function applyInner() {
    addStyle();
    const skip = (el) => el.closest('[data-no-motion]');

    document.querySelectorAll('h1, h2').forEach((h) => { if (!skip(h)) splitHeading(h); });

    document.querySelectorAll(riseSel).forEach((el) => {
      if (skip(el) || done(el) || el.closest('h1, h2')) return;
      if (el.closest('.card') && !el.classList.contains('card')) return;
      el.classList.add('fc-rise');
    });

    document.querySelectorAll('section img, header img').forEach((el) => {
      if (skip(el)) return;
      const box = el.parentElement;
      if (!box || done(box)) return;
      box.classList.add('fc-mask', 'fc-zoom');
      watch(box);
    });

    /* Reveal on scroll, staggered by order within each section. */
    document.querySelectorAll('section, footer, header').forEach((sec) => {
      sec.querySelectorAll('h1, h2, .fc-rise, .fc-mask').forEach((el, i) => {
        if (el.classList.contains('fc-rise')) el.style.transitionDelay = Math.min(i * 60, 420) + 'ms';
        watch(el);
      });
    });

    /* Hero: entrance without waiting for a scroll. */
    const hero = document.querySelector('header');
    if (hero) {
      hero.querySelectorAll('h1, p, span.tag').forEach((el, i) => {
        if (el.tagName !== 'H1' && !el.closest('h1') && !done(el)) {
          el.classList.add('fc-rise');
          el.style.transitionDelay = (160 + i * 110) + 'ms';
        }
      });
      const heroImg = hero.querySelector('img');
      if (heroImg && heroImg.parentElement && !done(heroImg.parentElement)) heroImg.parentElement.classList.add('fc-mask');
      const enter = () => {
        hero.querySelectorAll('h1, .fc-rise, .fc-mask').forEach((el) => {
          if (done(el)) return;
          reveal(el);
        });
      };
      setTimeout(enter, 80);
      if (heroImg && !heroImg.__fcPar && !reduce) {
        heroImg.__fcPar = true;
        heroImg.style.willChange = 'transform';
        let ticking = false;
        const par = () => {
          ticking = false;
          const y = Math.min(window.scrollY, innerHeight);
          heroImg.style.transform = 'translate3d(0,' + (y * 0.22) + 'px,0) scale(' + (1 + y / innerHeight * 0.06) + ')';
        };
        addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(par); } }, { passive: true });
        par();
      }
      if (!hero.querySelector('.fc-cue')) {
        const cue = document.createElement('div');
        cue.className = 'fc-cue';
        cue.innerHTML = '<i></i><span>Scroll</span>';
        hero.appendChild(cue);
      }
    }

    /* Stat numbers count up the first time they appear. */
    if (!reduce) {
      [...document.querySelectorAll('div')].filter((d) =>
        /^\d+°?$/.test(d.textContent.trim()) && d.children.length === 0 &&
        !d.__fcCount && parseFloat(getComputedStyle(d).fontSize) > 26
      ).forEach((d) => {
        d.__fcCount = true;
        const sio = new IntersectionObserver((es) => {
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            sio.disconnect();
            const raw = e.target.textContent.trim();
            const target = parseInt(raw, 10);
            const suffix = raw.replace(/[\d]/g, '');
            const t0 = performance.now(), dur = 1100;
            const step = (t) => {
              const k = Math.min(1, (t - t0) / dur);
              e.target.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
              if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          });
        }, { threshold: 0.6 });
        sio.observe(d);
      });
    }

    /* Eased anchor scrolling. */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      if (a.__fcAnchor) return;
      a.__fcAnchor = true;
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href').slice(1);
        const t = id && document.getElementById(id);
        if (!t) return;
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 64, behavior: reduce ? 'auto' : 'smooth' });
        history.replaceState(null, '', '#' + id);
      });
    });
  }

  /* Failsafe — content must never stay invisible because a transition or an
     observer got stuck: a few seconds in, everything still carrying the
     animation classes is released outright. */
  const releaseAll = () => {
    document.querySelectorAll('.fc-rise, .fc-mask, [class*="fc-"]').forEach((el) => {
      if (!el.classList.contains('fc-rise') && !el.classList.contains('fc-mask')) return;
      reveal(el);
    });
  };
  setTimeout(releaseAll, 4000);
  addEventListener('load', () => setTimeout(releaseAll, 1500));

  let queued = 0;
  const schedule = () => { clearTimeout(queued); queued = setTimeout(apply, 80); };

  const start = () => {
    apply();
    /* Re-apply after every re-render (React commits wipe imperative classes). */
    new MutationObserver(() => { if (!busy) schedule(); })
      .observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    addEventListener('load', schedule);
  };
  const boot = () => {
    if (!document.body) { setTimeout(boot, 30); return; }
    start();
    /* The design-component runtime mounts its tree asynchronously and can
       replace <head>, so re-scan for a few seconds after boot as well. */
    let n = 0;
    const t = setInterval(() => { schedule(); if (++n > 24) clearInterval(t); }, 250);
  };
  addEventListener('DOMContentLoaded', schedule);
  boot();
})();
