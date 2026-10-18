import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'c:/GL-AG-PJT/안티그래비티/public/images/haeyang';
const backupDir = 'c:/GL-AG-PJT/안티그래비티/raw_photos/haeyang';

async function main() {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg')).sort();
  console.log(`Found ${files.length} JPG files in ${inputDir}`);

  for (let i = 0; i < files.length; i++) {
    const rawFile = files[i];
    const inputPath = path.join(inputDir, rawFile);
    const backupPath = path.join(backupDir, rawFile);
    const numStr = String(i + 1).padStart(2, '0');
    const outputPath = path.join(inputDir, `haeyang-${numStr}.webp`);

    console.log(`Processing [${i + 1}/${files.length}] ${rawFile} -> haeyang-${numStr}.webp...`);

    // Backup original
    fs.copyFileSync(inputPath, backupPath);

    // Convert to 1920px WebP
    await sharp(inputPath)
      .rotate()
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 82 })
      .toFile(outputPath);

    // Remove original JPG from public
    fs.unlinkSync(inputPath);
  }

  console.log('Haeyang image optimization & backup complete!');
}

main().catch(console.error);
