import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'c:/GL-AG-PJT/안티그래비티/public/images/moongarden';
const backupDir = 'c:/GL-AG-PJT/안티그래비티/raw_photos/moongarden';

async function main() {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir);
  console.log(`Found ${files.length} files in ${inputDir}`);

  for (let i = 1; i <= 20; i++) {
    const rawFile = files.find(f => {
      const base = path.parse(f).name;
      return base === String(i);
    });

    if (!rawFile) {
      console.warn(`File for index ${i} not found!`);
      continue;
    }

    const inputPath = path.join(inputDir, rawFile);
    const backupPath = path.join(backupDir, rawFile);
    const numStr = String(i).padStart(2, '0');
    const outputPath = path.join(inputDir, `moongarden-${numStr}.webp`);

    console.log(`Processing ${rawFile} -> moongarden-${numStr}.webp...`);

    // Backup original
    fs.copyFileSync(inputPath, backupPath);

    // Convert to webp 1920px max width/height
    await sharp(inputPath)
      .rotate()
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 82 })
      .toFile(outputPath);

    // Remove original from public directory so public stays lightweight
    fs.unlinkSync(inputPath);
  }

  console.log('Optimization and backup complete!');
}

main().catch(console.error);
