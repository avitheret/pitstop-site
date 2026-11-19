# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A pitch/demo website that PitStop Digital is building for a client: Pit-Stop, a motorsport tuning shop in Holon. It is meant to win the client and may later become their real site. It is a static, pre-rendered multi-page site. **The site is Hebrew and right-to-left** (`<html lang="he" dir="rtl">`). All user-facing copy is Hebrew; layout and CSS must work RTL (prefer logical properties such as `padding-inline`, `inset-inline-start`).

## Owner's working rules

- **Hebrew copy:** Claude may write and rewrite site copy freely, with no approval step. Write natural Israeli Hebrew in the existing voice: direct and expert, a shop talking to car people. Keep brand and model names in Latin script (APR, KW, Golf R).
- **Product data:** realistic invented demo data (products, prices, specs, compatible cars) is fine. Keep it plausible: real brands, sensible prices and power figures.
- **Design:** the current look (dark "night garage", red/ember glow, Karantina display font, specs set like a dyno sheet) is the starting point, not a lock. Visual improvements are welcome; keep the site consistent and change the tokens in `style.css` rather than hard-coding values.
- **Images:** keep the SVG drawings for now; draw a new SVG in the `ART` map for any new product. No photos, stock or AI images.
- **Check both screens:** verify every visual change on desktop and on mobile (~375px wide), with no horizontal scroll and no clipped Hebrew text.
- **Cart:** visual only today (`localStorage`, no backend, no payments). Real ordering is planned for later, so keep cart logic tidy and in one place (the cart section of `app.js`) so a real order flow can plug in. Don't build payments unless asked.

## Commands

```bash
npm install        # first time
npm run dev        # build + serve dist/ at http://localhost:3000, rebuild & reload on any src/ change
npm run build      # write the finished site to dist/
npm run preview    # build, then serve dist/ statically
```

No tests, linter or formatter are configured. Verify a change by running `npm run build` (it fails loudly on render errors) and checking the page in the dev server.

## Architecture

- **`src/assets/data.js`**: all products and prices live here. It holds the catalogue as plain top-level consts: `CARS` (compatible cars), `CATS` (categories), `DYNO` (dyno curve points) and `P` (products: `id`, `cat`, `brand`, `art`, `price`, `was`, `installPrice`, `fit` car keys, `dyno` key, `desc`, `features`, `specs`…).
- **`src/assets/app.js`**: all rendering and behaviour. View functions (`Home`, `Products`, `ProductPage`, `About`, `Dyno`, `Contact`) return HTML strings. `render()` picks a view from `document.body.dataset.page` (plus `data-cat` / `data-id`) and writes it into `#app`. Cart and selected car persist in `localStorage` (`pitstop-cart`, `pitstop-car`).
- **`src/template.html`**: shared shell (head, header, footer, cart drawer). It has placeholders `{{TITLE}}`, `{{DESC}}`, `{{BODY_ATTRS}}` and `{{CONTENT}}`.
- **`scripts/build.mjs`**: pre-renders every page by loading the template in jsdom and `eval`-ing `data.js + app.js` **as one script**, then saving `#app`'s HTML into `dist/<page>.html`. The browser later runs the same code again over that HTML.
  - Because of this, `data.js` and `app.js` must stay classic browser scripts (no `import`/`export`, no bundler); `app.js` relies on `data.js`'s top-level consts being in scope.
  - Code that runs at load must tolerate jsdom: there is no canvas, and `requestAnimationFrame`/`matchMedia` are stubbed.
  - Static page titles and meta descriptions (Hebrew) are hard-coded in the `pages` list in `build.mjs`. Every product gets `product-<id>.html` and every `CATS` key gets `category-<key>.html` automatically.
- **`dist/` is generated: never edit it.** Every build deletes and regenerates it (it is also git-ignored).

## Content notes

- Product images are still placeholder drawings: inline SVG illustrations in the `ART` map in `app.js`, chosen by each product's `art` key (`art()` adds the `v-glow` / `v-detail` variants). They use the shared gradients defined in `template.html` (`gGlow`, `gHalo`, `gMetal`, `gChrome`).
- Prices are integer shekels, formatted by `ils()`. Use `bd()` to wrap Latin/number runs inside Hebrew text in `<bdi>` so they don't flip in RTL. For inline LTR content (phone numbers, SKUs), use the `.mono` and `.ltr` classes.
- Design tokens (colors, fonts) are CSS custom properties at the top of `src/assets/style.css`.
- Search engines are blocked on purpose: `src/template.html` has `<meta name="robots" content="noindex, nofollow, noarchive">` on every page. Don't remove it unless the owner asks (e.g. when launching on the real domain). A `robots.txt` would not work here: on a GitHub Pages project site it would sit at `/pitstop-site/robots.txt`, and crawlers only read the root one.
- The footer marks the site as a demo: products, prices and performance figures are illustrative only.

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`: every push to `main` runs `npm ci && npm run build` and publishes `dist/`. Repo: https://github.com/avitheret/pitstop-site, live at https://avitheret.github.io/pitstop-site/.

**Standing rule from the owner:** when a task is finished and works locally (`npm run build` passes and the page checks out in the dev server), commit and push to `main` without asking, which deploys it. Then confirm the "Deploy site" run passed (`gh run watch`). Don't push half-finished or broken work.
