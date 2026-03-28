const fs = require('fs');
const path = require('path');

const indexPath = 'src/pages/PostDetail/index.jsx';
const dataPath = 'src/data/postsData.js';

let content = fs.readFileSync(indexPath, 'utf8');

// 1. Extract image imports (they usually start with 'import img' or import something from '../../assets/images/')
// Let's get all imports that are specifically for the images used in POST_DATA
const importImgRegex = /^import\s+img[\w\d_]+\s+from\s+['"]\.\.\/\.\.\/assets\/images\/[^'"]+['"];?\s*$/gm;

let match;
let imageImports = [];
while ((match = importImgRegex.exec(content)) !== null) {
  imageImports.push(match[0]);
}

// 2. Extract POST_DATA object
// POST_DATA might contain nested braces, so simple regex is tricky. 
// However, since it ends right before `export default function PostDetail()`, 
// we can slice it efficiently.
const postDataStartStr = 'const POST_DATA = {';
const postDataStartIdx = content.indexOf(postDataStartStr);

const postDetailFnStr = 'export default function PostDetail() {';
const postDetailFnIdx = content.indexOf(postDetailFnStr);

if (postDataStartIdx === -1 || postDetailFnIdx === -1) {
  console.log("Could not find POST_DATA or PostDetail function");
  process.exit(1);
}

// Find the precise end of POST_DATA = {};
// We'll walk backwards from postDetailFnIdx to find `};`
let postDataStrChunk = content.substring(postDataStartIdx, postDetailFnIdx);
// Let's verify it ends with };
if (postDataStrChunk.trim().endsWith('};')) {
  // It's clean
} else {
  // Might have some extra stuff, but we can just take it as is.
}

// Create postsData.js content
let postsDataContent = `// Auto-extracted POST_DATA module
${imageImports.join('\n')}

${postDataStrChunk.replace('const POST_DATA =', 'const POST_DATA =')}
export default POST_DATA;
`;

// Remove the extracted parts from index.jsx
// First, remove the image imports
let newIndexContent = content.replace(importImgRegex, '');

// Then replace the POST_DATA chunk with the import statement
newIndexContent = newIndexContent.substring(0, postDataStartIdx) +
  "import POST_DATA from '../../data/postsData';\n\n" +
  newIndexContent.substring(postDetailFnIdx);

fs.writeFileSync(dataPath, postsDataContent, 'utf8');
fs.writeFileSync(indexPath, newIndexContent, 'utf8');

console.log('Extraction complete! Data written to src/data/postsData.js and index.jsx updated.');
