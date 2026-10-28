import fs from 'fs';
import path from 'path';

const dir = 'c:/GL-AG-PJT/안티그래비티/public/images/Uldol';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp')).sort();

const cards = files.map((f, i) => {
  return `  <div style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1); border:1px solid #e5e7eb;">
    <div style="padding:12px; font-weight:bold; font-size:16px; background:#f9fafb; border-bottom:1px solid #e5e7eb;">
      [사진 ${i + 1}] 파일명: ${f}
    </div>
    <img src="/images/Uldol/${f}" style="width:100%; height:340px; object-fit:contain; background:#f3f4f6;" />
  </div>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Uldol 21장 사진 내용 검토</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f3f4f6; color: #111; padding: 30px; margin: 0; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 24px; }
  h1 { margin-bottom: 24px; font-size: 24px; }
</style>
</head>
<body>
<h1>Uldol 폴더 21장 사진 상세 내용 검토 갤러리</h1>
<div class="grid">
${cards}
</div>
</body>
</html>`;

fs.writeFileSync('c:/GL-AG-PJT/안티그래비티/public/inspect_uldol.html', html);
console.log('inspect_uldol.html successfully created!');
