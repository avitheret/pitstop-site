# Pit-Stop website

Static Hebrew (RTL) site. Every page is pre-rendered into plain HTML at build time.

## Run it locally

You need Node.js 18 or newer (`node -v` to check; install from nodejs.org or `brew install node`).

```bash
cd pitstop-site
npm install      # first time only
npm run dev      # opens http://localhost:3000
```

Leave `npm run dev` running. When you save any file in `src/`, the site rebuilds and the browser reloads by itself.

## Where things live

| To change… | Edit |
|---|---|
| Products, prices, specs, categories, compatible cars | `src/assets/data.js` |
| Page layouts and text (home, about, dyno, contact) | `src/assets/app.js` |
| Colors, fonts, spacing | `src/assets/style.css` (tokens at the top) |
| Header, footer, `<head>` | `src/template.html` |
| Logo | `src/assets/logo.png`, `src/assets/helmet.png` |

Adding a product to `data.js` creates its page (`product-<id>.html`) automatically. A new category in `CATS` gets its `category-<key>.html` page the same way.

`npm run build` writes the finished site to `dist/`. Don't edit `dist/`, because every build regenerates it.

## Online version (GitHub Pages, deploys automatically)

One-time setup:

1. On GitHub, create a new empty repository, for example `pitstop-site`. Don't add a README.
2. In this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial Pit-Stop site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/pitstop-site.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

After about a minute the site is live at `https://<your-username>.github.io/pitstop-site/`. The address also appears under **Actions → Deploy site**.

From then on, publishing a change is just:

```bash
git add .
git commit -m "Describe the change"
git push
```

Each push to `main` builds the site and publishes it again (`.github/workflows/deploy.yml`).

On a free GitHub plan, the repository has to be public for Pages to work. To use your own domain (for example `pitstop.co.il`), go to **Settings → Pages → Custom domain** and point the domain's DNS to GitHub as shown there.
