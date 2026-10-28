import fs from 'fs';
import path from 'path';

const dir = 'c:/GL-AG-PJT/안티그래비티/public/images/Uldol';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();

const cards = files.map((f, i) => {
  return `  <div class="card">
    <h3>#${i + 1} (${String(i + 1).padStart(2, '0')}): ${f}</h3>
    <img src="/images/Uldol/${f}" alt="${f}" />
  </div>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Uldol Photos Preview</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #18181b; color: #fff; padding: 30px; }
  h1 { margin-bottom: 24px; font-weight: 700; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; }
  .card { background: #27272a; padding: 14px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
  img { width: 100%; height: 260px; object-fit: cover; border-radius: 8px; }
  h3 { margin: 10px 0 6px; font-size: 15px; color: #38bdf8; }
</style>
</head>
<body>
<h1>Uldol Photos (${files.length} images)</h1>
<div class="grid">
${cards}
</div>
</body>
</html>`;

fs.writeFileSync('c:/GL-AG-PJT/안티그래비티/public/uldol_preview.html', html);
console.log('Preview written to public/uldol_preview.html');
