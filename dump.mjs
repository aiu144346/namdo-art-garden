import { fileURLToPath } from 'url';
import fs from 'fs';

const content = fs.readFileSync('src/pages/PostDetail/index.jsx', 'utf8');
const lines = content.split('\n');
const startIndex = lines.findIndex(l => l.includes('"m2-food"'));
let result = "";
for(let i=startIndex; i<startIndex+50; i++) {
   result += lines[i] + "\n";
}
console.log(result);
