# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Pit-Stop motorsport shop website: a static, pre-rendered multi-page site. **The site is Hebrew and right-to-left** (`<html lang="he" dir="rtl">`). All user-facing copy is Hebrew; layout and CSS must work RTL (prefer logical properties such as `padding-inline`, `inset-inline-start`).

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

- Product images are still placeholder drawings: inline SVG illustrations in the `ART` map in `app.js`, chosen by each product's `art` key (`art()` adds the `v-glow` / `v-detail` variants). There are no real product photos yet. A new product needs an existing `ART` key or a new drawing.
- Prices are integer shekels, formatted by `ils()`. Use `bd()` to wrap Latin/number runs inside Hebrew text in `<bdi>` so they don't flip in RTL. For inline LTR content (phone numbers, SKUs), use the `.mono` and `.ltr` classes.
- Design tokens (colors, fonts) are CSS custom properties at the top of `src/assets/style.css`.
- The footer marks the site as a demo: products, prices and performance figures are illustrative only.

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`: every push to `main` runs `npm ci && npm run build` and publishes `dist/`. The folder is not a git repo yet; see the README for the one-time setup.
