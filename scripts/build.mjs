// Builds the static site from src/ into dist/.
// Every page is pre-rendered (full HTML in the file) using the same
// render code the browser runs, so pages work without JS and index well.
import { JSDOM, VirtualConsole } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath decodes %20 etc., so paths with spaces work
const SELF = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(SELF), '..');
const SRC = path.join(root, 'src');
const DIST = path.join(root, 'dist');

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function build() {
  const t0 = Date.now();
  const template = fs.readFileSync(path.join(SRC, 'template.html'), 'utf8');
  const dataJs = fs.readFileSync(path.join(SRC, 'assets/data.js'), 'utf8');
  const appJs = fs.readFileSync(path.join(SRC, 'assets/app.js'), 'utf8');

  const quiet = new VirtualConsole(); // jsdom has no canvas; ignore those notices
  const render = (attrs) => {
    const html = template.replace('{{TITLE}}', '').replace('{{DESC}}', '').replace('{{BODY_ATTRS}}', attrs).replace('{{CONTENT}}', '')
      .replace(/<script src="[^"]+"><\/script>/g, '');
    const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/', virtualConsole: quiet });
    // jsdom lacks these browser APIs; the pre-render doesn't need them
    Object.assign(dom.window, { cancelAnimationFrame() {}, requestAnimationFrame() {}, matchMedia: () => ({ matches: true }) });
    // one eval so app.js sees data.js's top-level consts (as in the browser)
    dom.window.eval(dataJs + '\n' + appJs + '\nwindow.__catalog = { P, CATS };');
    const out = { content: dom.window.document.getElementById('app').innerHTML, win: dom.window };
    return out;
  };

  // Read the catalogue from data.js so new products/categories get pages automatically.
  const probe = render('data-page="home"');
  const P = probe.win.__catalog.P.map(p => ({ id: p.id, name: p.name, short: p.short, brand: p.brand }));
  const CATS = Object.entries(probe.win.__catalog.CATS).map(([k, c]) => ({ k, name: c.name }));

  const pages = [
    ['index.html', 'פיטסטופ ספורט מוטורי | חלקי ביצועים, התקנה ודיינו', 'סדנה לשיפור ביצועים וספורט מוטורי בחולון מאז 2002. נציגים רשמיים של KW, ST, REMUS, APR, PCP, OMP ו-HOOSIER.', 'data-page="home"'],
    ['products.html', 'כל המוצרים | פיטסטופ', 'קטלוג חלקי ביצועים: תוכנה, יניקה, טורבו, פליטה, מתלים, בלמים והצתה.', 'data-page="products"'],
    ['about.html', 'אודות | פיטסטופ', 'פיטסטופ: סדנה, יבואן ושותף לדרך בספורט מוטורי מאז 2002.', 'data-page="about"'],
    ['dyno.html', 'דיינו וכיוון מנוע | פיטסטופ', 'בדיקת כוח, כיוון מנוע מותאם אישית ורישום נתונים על דיינו DynoJet בחולון.', 'data-page="dyno"'],
    ['contact.html', 'צור קשר | פיטסטופ', 'החורטים 6, חולון. טלפון 03-6884836.', 'data-page="contact"'],
    ...CATS.map(c => [`category-${c.k}.html`, `${c.name} | פיטסטופ`, `${c.name} מהמותגים המובילים, עם התאמה לרכב והתקנה בסדנה.`, `data-page="category" data-cat="${c.k}"`]),
    ...P.map(p => [`product-${p.id}.html`, `${p.name} | ${p.brand} | פיטסטופ`, p.short, `data-page="product" data-id="${p.id}"`]),
  ];

  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });
  fs.cpSync(path.join(SRC, 'assets'), path.join(DIST, 'assets'), { recursive: true });

  for (const [file, title, desc, attrs] of pages) {
    const { content } = render(attrs);
    const html = template.replace('{{TITLE}}', esc(title)).replace('{{DESC}}', esc(desc))
      .replace('{{BODY_ATTRS}}', attrs).replace('{{CONTENT}}', () => content);
    fs.writeFileSync(path.join(DIST, file), html);
  }
  console.log(`✓ built ${pages.length} pages into dist/ in ${Date.now() - t0} ms`);
  return pages.length;
}

if (process.argv[1] && path.resolve(process.argv[1]) === SELF) build();
