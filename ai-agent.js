/* <ask-agent farm="Grand Haven"> — the floating "Select any questions" helper.
   NOT an AI: a curated, branching question tree. Guests pick a topic, then a
   question, and get a written answer plus related follow-up questions. Anything
   about price, dates or payment routes straight to the farm manager.

   >>> Edit TOPICS below when the full question list arrives. <<<  */
(() => {
  if (window.customElements.get('ask-agent')) return;

  const MANAGER = { name: 'Farm manager', phone: '+971 52 366 9957', whatsapp: '971523669957', email: 'stay@farmsclub.ae' };

  /* Per-farm contact + "things to know" facts. EDIT HERE ONLY — keyed by page
     filename. Give a farm its own whatsapp/phone/email and that farm's widget
     uses it; leave the field out and it falls back to MANAGER above.
     nearby rows are plain [label, answer] text: add, remove or reorder them
     freely. An empty or missing row is skipped, so partial data is fine. */
  const FARM = {
    'grand-haven.html': {
      nearby: [
        ['Supermarket', 'Kalba town — 12 min'],
        ['Pharmacy', 'Kalba town — 12 min'],
        ['Hospital', 'Kalba Hospital — 15 min'],
        ['Restaurants', 'Kalba corniche — 14 min'],
        ['Petrol', 'ADNOC — 9 min'],
        ['ATM', 'Kalba town centre — 12 min']
      ]
    },
    'happy-haven.html': {
      nearby: [
        ['Supermarket', '8 min'],
        ['Pharmacy', '8 min'],
        ['Hospital', 'Ras Al Khaimah — 25 min'],
        ['Restaurants', '10 min'],
        ['Petrol', 'ENOC — 6 min'],
        ['ATM', '8 min']
      ]
    },
    'green-haven.html': {
      nearby: [
        ['Supermarket', '10 min'],
        ['Pharmacy', '10 min'],
        ['Hospital', 'Ras Al Khaimah — 20 min'],
        ['Restaurants', '12 min'],
        ['Petrol', 'ADNOC — 7 min'],
        ['ATM', '10 min']
      ]
    }
  };
  const PAGE = () => FARM[(location.pathname.split('/').pop() || 'index.html').toLowerCase()] || {};
  const CONTACT = () => Object.assign({}, MANAGER, PAGE());

  /* id, q, a, more: [ids of follow-up questions], call: true => show the contact card */
  const Q = {
    about: { q: 'What is Farmsclub?', a: 'Farmsclub keeps three private farmhouses in the UAE — Grand Haven in Kalba, Sharjah, and Happy Haven and Green Haven in Ras Al Khaimah. Each farm is booked whole: the house, the pool, the lawns and the animal yard are yours for the stay, with a caretaker on site who stays out of the way.', more: ['where', 'whole', 'guests'] },
    where: { q: 'Where are the three farms?', a: 'Grand Haven sits in Kalba on the Sharjah east coast, near the mangroves and about 1h45 from Dubai. Happy Haven and Green Haven are both in Ras Al Khaimah, roughly an hour from Dubai and 25–40 minutes from RAK city. Every farm page has a map and a pin you can open in Google Maps.', more: ['about', 'which', 'parking'] },
    which: { q: 'Which farm should I pick?', a: 'Grand Haven is the big one — widest lawns, longest pool, best for large family gatherings. Happy Haven is the playful one: play area, football pitch and the animal yard the children never leave, and it is the pet-friendly farm. Green Haven is the quiet one — orchard, shaded pool, built for slow evenings.', more: ['guests', 'pets', 'events'] },
    whole: { q: 'Do we get the whole farm to ourselves?', a: 'Yes. One booking, one group — never shared and never by the room. The house, both pools where there are two, the barbecue yard, the lawns and the animal area are all yours. Only the caretaker remains on site, in the service quarters.', more: ['guests', 'rules', 'checkin'] },
    guests: { q: 'How many guests can stay?', a: 'Grand Haven sleeps 18 and hosts up to 60 for a day event. Happy Haven sleeps 14 and hosts 40. Green Haven sleeps 10 and hosts 30. Larger groups are sometimes possible — the farm manager confirms it case by case.', more: ['beds', 'events', 'checkin'] },
    beds: { q: 'What are the bedrooms like?', a: 'Every bedroom is air-conditioned with an attached or shared bathroom, made up with fresh linen before arrival. Grand Haven has 8 bedrooms, Happy Haven 6, Green Haven 4. Extra mattresses can be laid out in the majlis on request.', more: ['guests', 'house', 'checkin'] },
    house: { q: 'What is inside the house?', a: 'A majlis that seats 30–60 depending on the farm, a full kitchen with fridge, oven, hob and service pantry, Wi-Fi throughout, a sound system and a smart TV. Crockery, cutlery, pots and pans are all there — bring food, not equipment.', more: ['bbq', 'beds', 'housekeeping'] },
    pool: { q: 'Tell me about the pools.', a: 'All three farms have a private pool. Grand Haven and Happy Haven each have a heated main pool plus a shaded children\u2019s pool; Green Haven has one heated pool under a pergola. Pools are cleaned the morning of every check-in and heating runs from November to March.', more: ['play', 'towels', 'rules'] },
    bbq: { q: 'Is there a barbecue area?', a: 'Yes — a covered barbecue yard on every farm with charcoal grills, prep counters, long tables and string lights. Charcoal and firelighters are provided. Bring your own food, or ask the farm manager to arrange a caterer or a live grill chef.', more: ['house', 'events', 'call'] },
    animals: { q: 'What animals are on the farms?', a: 'Goats, sheep, chickens and rabbits at all three. Grand Haven also keeps two horses and a camel with a handler for guided sunset rides. Feeding is at 7am and 5pm and children are welcome to help — it is the part every guest remembers.', more: ['play', 'pets', 'which'] },
    play: { q: 'What is there for children?', a: 'A play area on every farm — swings, a climbing frame and a sand pit — plus a grass football pitch. Happy Haven adds a trampoline and a cycling track. The children\u2019s pool is shaded and shallow, and the animal yard is open all day.', more: ['animals', 'pool', 'guests'] },
    pets: { q: 'Can we bring our pets?', a: 'At Happy Haven, yes — on request, and that is the pet-friendly farm. The other two keep livestock loose in parts of the plot, so guests\u2019 animals stay home.', more: ['animals', 'which', 'rules'] },
    checkin: { q: 'What are the check-in and check-out times?', a: 'Overnight stays check in at 3pm and out at 12pm. Day bookings run 10am to 10pm. Early check-in is often possible when the farm is free the night before — the farm manager confirms on the day.', more: ['whole', 'housekeeping', 'call'] },
    housekeeping: { q: 'Is there staff on site?', a: 'A caretaker lives on site and is reachable the whole stay — gates, pool, animals, gas, water. Daytime housekeeping tidies the outdoor areas and the pool. Cooking and serving staff can be arranged in advance.', more: ['whole', 'towels', 'call'] },
    towels: { q: 'What should we bring?', a: 'Bath towels, bed linen and basic toiletries are provided. Bring pool towels, food and drink, and anything you need for babies. Charcoal, ice boxes, plates and glassware are already on the farm.', more: ['house', 'bbq', 'pool'] },
    events: { q: 'Can we host an event?', a: 'Birthdays, family gatherings, corporate days, school trips and photo shoots are all welcome. Grand Haven takes the largest events. Amplified music must be down by 10pm, and weddings or anything ticketed needs written approval from the farm manager first.', more: ['guests', 'rules', 'call'] },
    rules: { q: 'What are the house rules?', a: 'No smoking indoors, no fireworks, no alcohol on the farms, no unregistered overnight guests, and music down by 10pm out of respect for neighbouring farms. Please leave the animal yard gates as you found them.', more: ['whole', 'pets', 'events'] },
    parking: { q: 'How do we get there and where do we park?', a: 'All three farms are reachable on tarmac the whole way — no off-road driving. Gated parking for 10–20 cars sits inside the plot. The farm manager sends a live location pin and gate instructions once a booking is confirmed.', more: ['where', 'checkin', 'call'] },
    nearby: { q: 'What is nearby — shops, pharmacy, hospital?', a: 'Here is what sits closest to the gate, by car:', nearby: true, more: ['parking', 'towels', 'checkin'] },
    tour: { q: 'How do the 360° tours work?', a: 'Open a farm page and pick a spot — entrance, swimming pool, play area, barbecue yard or the animal area — then drag the image to look around and scroll to zoom, like street view. It is the same view you will walk into.', more: ['which', 'where', 'call'] },
    price: { q: 'What does it cost?', a: 'Rates depend on the farm, the dates and whether it is a day booking or an overnight stay, so we quote them on the phone rather than list them here. One call and the farm manager gives you the number straight away.', call: true, more: ['availability', 'which'] },
    availability: { q: 'Is a date available?', a: 'Live availability is held by the farm manager — a self-serve availability calendar is coming to this site in the next phase. For now, call or WhatsApp with your dates and you will get an answer within the hour.', call: true, more: ['price', 'checkin'] },
    book: { q: 'How do I book?', a: 'Call or WhatsApp the farm manager with the farm, the dates and the number of guests. The farm is held for 24 hours while you confirm, and a refundable security deposit locks it in.', call: true, more: ['availability', 'cancel'] },
    cancel: { q: 'What if we need to cancel?', a: 'Free cancellation up to 7 days before arrival, and the security deposit comes back in full. Inside 7 days the farm manager reviews each case individually.', call: true, more: ['book', 'price'] },
    call: { q: 'I want to speak to someone.', a: 'Of course — the farm manager answers 8am to 10pm every day, in Arabic or English.', call: true, more: ['price', 'availability'] }
  };

  const TOPICS = [
    { t: 'The farms', ids: ['about', 'where', 'which', 'whole'] },
    { t: 'Staying there', ids: ['guests', 'beds', 'house', 'checkin', 'towels', 'housekeeping'] },
    { t: 'Pools, play & animals', ids: ['pool', 'play', 'animals', 'bbq', 'pets'] },
    { t: 'Events & rules', ids: ['events', 'rules', 'parking', 'tour'] },
    { t: 'Things to know', ids: ['nearby', 'checkin', 'housekeeping', 'rules'] },
    { t: 'Price & booking', ids: ['price', 'availability', 'book', 'cancel'] }
  ];

  const C = { ink: '#201e1d', bg: '#f5ead8', surface: '#ebddc5', accent: '#c67139', sage: '#7a8a5e', font: 'Figtree, system-ui, sans-serif', head: 'Caprasimo, Georgia, serif' };

  class AskAgent extends HTMLElement {
    connectedCallback() {
      if (this._built) return; this._built = true;
      this.farm = this.getAttribute('farm') || '';
      // Host layout lives in shadow CSS: mounted inside a React tree that
      // strips inline styles from the host element.
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `<style>:host{position:fixed!important;right:clamp(16px,3vw,32px);bottom:clamp(16px,3vw,32px);z-index:60;display:block!important;font-family:${C.font}}
[data-toggle] [data-mark]{transition:transform .2s ease, box-shadow .2s ease}
[data-toggle]:hover [data-mark]{transform:rotate(45deg) scale(1.07);box-shadow:0 14px 30px rgba(46,43,37,.36)}
[data-toggle]:focus-visible{outline:2px solid ${C.sage};outline-offset:4px;border-radius:14px}
[data-tip]{position:absolute;right:70px;bottom:22px;width:max-content;max-width:min(230px,calc(100vw - 110px));padding:9px 12px;border-radius:12px;background:#2e2b25;color:#f9f4ed;font-size:13px;line-height:1.4;text-align:left;opacity:0;transform:translateX(6px);transition:opacity .16s ease, transform .16s ease;pointer-events:none;box-shadow:0 8px 20px rgba(46,43,37,.28)}
[data-tip][data-show]{opacity:1;transform:none}\n:host-context([dir="rtl"]) [data-tip]{right:auto;left:70px;transform:translateX(-6px);text-align:right}\n:host-context([dir="rtl"]) [data-tip][data-show]{transform:none}\n:host-context([dir="rtl"]) [data-panel]{right:auto;left:0}\n:host-context([dir="rtl"]) [data-log],:host-context([dir="rtl"]) [data-panel]{direction:rtl;text-align:right}
@media (hover: none){[data-tip]{display:none}}
@media (prefers-reduced-motion: reduce){[data-toggle]:hover [data-mark]{transform:rotate(45deg)}}</style>
<div data-panel style="position:absolute;right:0;bottom:76px;width:min(380px,calc(100vw - 32px));max-height:min(580px,calc(100vh - 140px));display:none;flex-direction:column;background:${C.bg};border-radius:28px;box-shadow:0 18px 48px rgba(46,43,37,.28);overflow:hidden">
  <div style="display:flex;align-items:center;gap:10px;padding:16px 18px;background:${C.surface}">
    <span style="width:24px;height:24px;flex:none;border-radius:6px;background:${C.accent};transform:rotate(45deg)"></span>
    <span style="font-family:${C.head};font-size:17px;color:${C.ink}">Select any questions</span>
    <button type="button" data-close aria-label="Close" style="margin-left:auto;width:30px;height:30px;border:0;border-radius:999px;background:rgba(32,30,29,.08);color:${C.ink};font-size:16px;cursor:pointer">×</button>
  </div>
  <div data-log style="flex:1;overflow-y:auto;padding:16px 18px;display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:1.55;color:${C.ink}"></div>
  <div data-foot style="padding:10px 18px 16px;border-top:1px solid rgba(32,30,29,.12);display:flex;gap:8px;align-items:center">
    <button type="button" data-all style="flex:1;min-height:36px;border:1px solid rgba(32,30,29,.18);border-radius:999px;background:transparent;color:${C.ink};font:inherit;font-size:13px;cursor:pointer">All questions</button>
    <a href="https://wa.me/${CONTACT().whatsapp}" target="_blank" rel="noopener" style="min-height:36px;display:grid;place-items:center;padding:0 16px;border-radius:999px;background:${C.sage};color:${C.bg};text-decoration:none;font-size:13px">WhatsApp us</a>
  </div>
</div>
<button type="button" data-toggle aria-label="Things to know — open the question list" style="width:66px;height:66px;border:0;padding:0;background:transparent;cursor:pointer;display:grid;place-items:center">
  <span data-mark style="position:absolute;width:48px;height:48px;border-radius:12px;background:${C.accent};transform:rotate(45deg);box-shadow:0 10px 24px rgba(46,43,37,.3)"></span>
  <span style="position:relative;font-family:${C.head};font-size:20px;color:${C.bg}">?</span>
</button>
<span data-tip role="tooltip" aria-hidden="true">Things to know — nearby places, arrival, rules and the rest</span>`;
      this.panel = root.querySelector('[data-panel]');
      this.log = root.querySelector('[data-log]');
      const tog = root.querySelector('[data-toggle]');
      const tip = root.querySelector('[data-tip]');
      const showTip = (on) => { if (tip) { if (on && this.panel.style.display === 'none') tip.setAttribute('data-show', ''); else tip.removeAttribute('data-show'); } };
      tog.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'touch') showTip(true); });
      tog.addEventListener('pointerleave', () => showTip(false));
      tog.addEventListener('focus', () => showTip(true));
      tog.addEventListener('blur', () => showTip(false));
      this._showTip = showTip;
      tog.addEventListener('click', () => this.toggle());
      root.querySelector('[data-close]').addEventListener('click', () => this.toggle(false));
      root.querySelector('[data-all]').addEventListener('click', () => this.menu());
      addEventListener('keydown', (e) => { if (e.key === 'Escape') this.toggle(false); });
      this.menu(true);
    }
    toggle(force) {
      const open = force === undefined ? this.panel.style.display === 'none' : force;
      this.panel.style.display = open ? 'flex' : 'none';
      const t = this.shadowRoot.querySelector('[data-toggle]');
      if (open) t.setAttribute('data-open', ''); else t.removeAttribute('data-open');
      if (this._showTip) this._showTip(false);
    }
    bubble(text, mine) {
      const b = document.createElement('div');
      b.style.cssText = mine
        ? `align-self:flex-end;max-width:85%;padding:9px 14px;border-radius:18px 18px 4px 18px;background:${C.accent};color:${C.bg}`
        : `align-self:flex-start;max-width:92%;padding:10px 14px;border-radius:18px 18px 18px 4px;background:${C.surface}`;
      b.textContent = text;
      this.log.appendChild(b); this.log.scrollTop = this.log.scrollHeight;
      return b;
    }
    chips(ids, heading) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'align-self:stretch;display:flex;flex-direction:column;gap:6px;margin:2px 0 6px';
      if (heading) {
        const h = document.createElement('div');
        h.textContent = heading;
        h.style.cssText = 'font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;opacity:.55;margin-top:4px';
        wrap.appendChild(h);
      }
      ids.forEach((id) => {
        if (!Q[id]) return;
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = Q[id].q;
        b.style.cssText = `text-align:left;padding:8px 14px;border:1px solid ${C.accent};border-radius:16px;background:transparent;color:#8c491a;font:inherit;font-size:13px;line-height:1.4;cursor:pointer`;
        b.addEventListener('click', () => this.pick(id));
        wrap.appendChild(b);
      });
      this.log.appendChild(wrap); this.log.scrollTop = this.log.scrollHeight;
    }
    menu(first) {
      this.log.innerHTML = '';
      this.bubble('Pick a question below — these are the answers we give most often.' + (this.farm ? ' You are looking at ' + this.farm + '.' : ''));
      TOPICS.forEach((t) => this.chips(t.ids, t.t));
      if (!first) this.log.scrollTop = 0;
    }
    callCard() {
      const c = document.createElement('div');
      c.style.cssText = `align-self:stretch;padding:14px;border-radius:20px;background:#f0fae1;border:1px solid ${C.sage}`;
      c.innerHTML = `<div style="font-family:${C.head};font-size:15px;margin-bottom:4px">Call the farm manager</div>
<div style="font-size:13px;opacity:.85;margin-bottom:10px">${CONTACT().name} · 8am–10pm · Arabic or English</div>
<div style="display:flex;flex-wrap:wrap;gap:8px">
  <a href="https://wa.me/${CONTACT().whatsapp}" target="_blank" rel="noopener" style="padding:6px 14px;border-radius:999px;background:${C.sage};color:${C.bg};text-decoration:none;font-size:13px">WhatsApp</a>
  <a href="tel:${CONTACT().phone.replace(/ /g, '')}" style="padding:6px 14px;border-radius:999px;border:1px solid rgba(32,30,29,.2);color:${C.ink};text-decoration:none;font-size:13px">${CONTACT().phone}</a>
  <a href="mailto:${CONTACT().email}" style="padding:6px 14px;border-radius:999px;border:1px solid rgba(32,30,29,.2);color:${C.ink};text-decoration:none;font-size:13px">Email</a>
</div>`;
      this.log.appendChild(c); this.log.scrollTop = this.log.scrollHeight;
    }
    nearbyCard() {
      const rows = (PAGE().nearby || []).filter((r) => r && r[0] && r[1]);
      if (!rows.length) {
        this.bubble('We are still writing these down for this farm — ask the farm manager and you will get the exact spots and drive times.');
        this.callCard();
        return;
      }
      const c = document.createElement('div');
      c.style.cssText = 'align-self:stretch;padding:4px 14px 10px;border-radius:20px;background:#f9f4ed;border:1px solid rgba(32,30,29,.12)';
      c.innerHTML = rows.map(([k, v]) =>
        '<div style="display:flex;gap:12px;padding:9px 0;border-top:1px solid rgba(32,30,29,.12);font-size:13.5px;line-height:1.45">'
        + '<span style="flex:0 0 44%;font-family:' + C.head + '">' + k + '</span>'
        + '<span style="opacity:.85">' + v + '</span></div>').join('');
      this.log.appendChild(c); this.log.scrollTop = this.log.scrollHeight;
    }
    pick(id) {
      const e = Q[id]; if (!e) return;
      this.toggle(true);
      this.bubble(e.q, true);
      this.bubble(e.a);
      if (e.nearby) this.nearbyCard();
      if (e.call) this.callCard();
      if (e.more && e.more.length) this.chips(e.more.filter((m) => m !== id), 'Related');
    }
  }
  customElements.define('ask-agent', AskAgent);
  /* keep the old tag working if a page still uses it */
  if (!window.customElements.get('ai-agent')) customElements.define('ai-agent', class extends AskAgent {});
})();
