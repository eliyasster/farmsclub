# Farmsclub

Marketing site for Farmsclub — three private farmhouses in the UAE: **Grand Haven** (Kalba, Sharjah), **Happy Haven** and **Green Haven** (Ras Al Khaimah).

Static HTML, CSS and vanilla JavaScript. No build step, no dependencies — open `index.html` in a browser, or serve the folder.

```bash
python3 -m http.server 8000
```

## Pages

| File | Page |
| --- | --- |
| `index.html` | Landing page — the three farms, how we run them, club FAQs, contact |
| `grand-haven.html` | Grand Haven — 12 acres, sleeps 18, 60 day guests |
| `happy-haven.html` | Happy Haven — 8 acres, sleeps 14, pet friendly |
| `green-haven.html` | Green Haven — 5 acre orchard, sleeps 10, the quiet one |

Each farm page carries the same section order: hero → 360° tour (`#tour`) → about → details → before you come (`#arrival`) → FAQs (`#faqs`) → contact (`#visit`).

## Scripts

| File | Does |
| --- | --- |
| `styles.css` | Design tokens, component classes, RTL rules, Arabic type |
| `pano-viewer.js` | `<pano-viewer>` — drag-to-look 360° panorama with pinch zoom |
| `fc-tour.js` | Builds the tour chips from each page's `FC_TOUR` list and swaps the panorama |
| `ai-agent.js` | `<ask-agent>` — the floating "Things to know" helper. A curated Q&A tree, **not** an AI. Per-farm contact details and nearby places live in the `FARM` object at the top |
| `fc-i18n.js` | English ⇄ العربية switch. Dictionary keyed by the English string as it appears on the page; anything missing stays English |
| `fc-motion.js` | Scroll reveals, hero parallax, word-reveal headings. Respects `prefers-reduced-motion` |
| `fc-hash.js` | Cross-page deep links — "Walk it in 360°" lands inside a farm's tour section |
| `nav-scroll.js` | Sticky nav state on scroll |

## Editing content

Most copy is plain HTML — edit the page directly. Three things live in JS instead:

- **WhatsApp numbers and nearby places** → the `FARM` object at the top of `ai-agent.js`, keyed by page filename. Each farm can carry its own `whatsapp`, `phone` and `email`; omit a field and it falls back to the shared number. `nearby` rows are `[label, answer]` text pairs — add, remove or reorder freely; empty rows are skipped.
- **Arabic translations** → the `AR` dictionary at the top of `fc-i18n.js`.
- **360° spots and angles** → the `window.FC_TOUR` list in the `<script>` just above the tour on each farm page. One line per spot; `views` holds that spot's angles as `["Label", "assets/file.jpg"]`. One view shows only the spot chip; two or more adds a second row of angle chips under it — that is how a Bedroom carries room, bathroom and balcony. Add, remove or reorder lines freely. Use equirectangular (flat, 2:1) JPGs for a true 360° look.
- **Logo and favicon** → `assets/logo.png` and `assets/favicon.png`. The nav flips the logo to cream while the bar is transparent over the hero, so supply dark artwork on transparency.

## SEO and AI discovery

- Per-page titles, descriptions, keywords, canonicals, Open Graph and Twitter tags
- JSON-LD: `Organization` + `ItemList` on the landing page, `LodgingBusiness` per farm (with the tour as a `VirtualLocation`), `FAQPage` per farm
- `robots.txt` allows GPTBot, ClaudeBot and PerplexityBot
- `sitemap.xml`, plus `llms.txt` summarising the farms in plain text for AI crawlers

Canonicals and the sitemap assume `https://www.farmsclub.ae` — update if the domain differs.

## Known TODO

- Images are all `assets/farm-generic.jpg` placeholders — replace with real photos (compress first)
- Per-farm WhatsApp numbers (all three currently share one)
- Real nearby details: supermarket, hospital, restaurant, pharmacy, petrol
- Drive times and road descriptions need confirming against reality
- Google Maps iframe URLs per farm
- Arabic copy should be read by a native speaker before launch
- Guest reviews section — not built yet
- Booking calendar and availability (phase two)

## Deploying

Static, so anything works. For GitHub Pages: Settings → Pages → deploy from `main`, root. `index.html` is at the root.

`i18n-strings.json` is the extracted English source list, kept for translators. Safe to delete.
