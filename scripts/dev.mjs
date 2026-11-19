// Local dev server: builds the site, serves dist/ at http://localhost:3000,
// and rebuilds + reloads the browser whenever anything in src/ changes.
import browserSync from 'browser-sync';
import { build } from './build.mjs';

build();
const bs = browserSync.create();
bs.init({ server: 'dist', port: 3000, open: true, notify: false, ui: false });

let timer;
bs.watch('src/**/*', { ignoreInitial: true }, (event, file) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    try {
      console.log(`↻ ${event}: ${file}`);
      build();
      bs.reload();
    } catch (err) {
      console.error('✗ build failed:', err.message);
      bs.notify('Build failed, see the terminal', 5000);
    }
  }, 120);
});
