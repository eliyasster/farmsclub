/* Renders the 360° tour chips from window.FC_TOUR (declared inline in each farm
   page — that list is the only thing you edit) and drives <pano-viewer>.

   window.FC_TOUR = [
     { spot: "Entrance", views: [ ["Gate", "assets/gate.jpg"] ] },
     { spot: "Bedroom",  views: [ ["Room", "..."], ["Bathroom", "..."] ] },
   ]

   A spot with one view shows just its chip; two or more adds a second row of
   angle chips beneath. Nothing else needs touching. */
(() => {
  if (window.__fcTour) return; window.__fcTour = true;

  const chip = (label, on, sub) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = sub ? 'pano-view' : 'pano-tab';
    b.textContent = label;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', on ? 'true' : 'false');
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    return b;
  };

  const init = () => {
    const tour = window.FC_TOUR;
    const spotRow = document.getElementById('pano-tabs');
    const viewRow = document.getElementById('pano-views');
    const view = document.querySelector('pano-viewer');
    if (!Array.isArray(tour) || !tour.length || !spotRow || !viewRow || !view) return;

    let si = 0, vi = 0;
    const views = (i) => (tour[i] && tour[i].views) || [];

    const show = () => {
      const v = views(si)[vi];
      if (v && v[1]) view.setAttribute('src', v[1]);
      const label = tour[si].spot + (views(si).length > 1 && v ? ' · ' + v[0] : '');
      view.setAttribute('label', label);
    };

    const paintViews = () => {
      viewRow.textContent = '';
      const vs = views(si);
      viewRow.hidden = vs.length < 2;
      if (vs.length < 2) return;
      vs.forEach((v, i) => {
        const b = chip(v[0], i === vi, true);
        b.addEventListener('click', () => { vi = i; paintViews(); show(); });
        viewRow.appendChild(b);
      });
    };

    tour.forEach((s, i) => {
      const b = chip(s.spot, i === 0, false);
      b.addEventListener('click', () => {
        si = i; vi = 0;
        [...spotRow.children].forEach((x, j) => {
          x.setAttribute('aria-selected', j === i ? 'true' : 'false');
          x.setAttribute('aria-pressed', j === i ? 'true' : 'false');
        });
        paintViews(); show();
      });
      spotRow.appendChild(b);
    });

    paintViews(); show();
  };

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', init);
  else init();
})();
