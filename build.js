const fs = require('fs');
const path = require('path');

const PARTIALS_DIR = path.join(__dirname, 'src', 'partials');
const PAGES_DIR = path.join(__dirname, 'src', 'pages');
const DIST_DIR = path.join(__dirname, 'dist');

const pages = [
  { file: 'index.html', title: 'Inicio', desc: 'Agencia digital - Transformamos ideas en experiencias digitales', section: 'Inicio' },
  { file: 'servicios.html', title: 'Servicios', desc: 'Servicios de diseño y desarrollo digital', section: 'Servicios' },
  { file: 'trabajo.html', title: 'Trabajo', desc: 'Portfolio de proyectos digitales', section: 'Trabajo' },
];

function loadPartial(name) {
  return fs.readFileSync(path.join(PARTIALS_DIR, name), 'utf-8');
}

const head = loadPartial('head.html');
const header = loadPartial('header.html');
const footer = loadPartial('footer.html');

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

pages.forEach(({ file, title, desc, section }) => {
  const content = fs.readFileSync(path.join(PAGES_DIR, file), 'utf-8');

  let html = head
    .replace('__TITLE__', title)
    .replace('__DESC__', desc);

  html += header.replace('__SECTION__', section);
  html += content;
  html += footer;

  fs.writeFileSync(path.join(DIST_DIR, file), html, 'utf-8');
  console.log(`✓ Built ${file}`);
});

console.log('✓ styles.css already built by Tailwind CLI');

// Copy script
const srcJs = fs.readFileSync(path.join(__dirname, 'src', 'script.js'), 'utf-8');
fs.writeFileSync(path.join(DIST_DIR, 'script.js'), srcJs, 'utf-8');
console.log('✓ Copied script.js');

console.log('\n✅ Build complete!');
