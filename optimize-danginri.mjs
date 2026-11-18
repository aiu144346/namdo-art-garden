import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (완도)/서포터즈 원고 (완도)/11-01 당인리포레스트/당인리포레스트';
const OUTPUT_DIR = 'c:/GL-AG-PJT/안티그래비티/public/images/danginri';
const BACKUP_DIR = 'c:/GL-AG-PJT/안티그래비티/raw_photos/danginri';

const FILE_LIST = [
  '사진-01_당인리포레스트입구.jpg',
  '사진-02_완도수목원입구.jpg',
  '사진-03_완도수목원.jpg',
  '사진-04_완도수목원온실.jpg',
  '사진-05_당인리포레스트주차장에서.jpg',
  '사진-06.jpg',
  '사진-07.jpg',
  '사진-08.jpg',
  '사진-09.jpg',
  '사진-10.jpg',
  '사진-11.jpg',
  '사진-12.jpg',
  '사진-13.jpg',
  '사진-14.jpg',
  '사진-15.jpg',
  '사진-16.jpg',
  '사진-17.jpg',
  '사진-18.jpg'
];

async function optimizeDanginri() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  console.log(`총 ${FILE_LIST.length}개 당인리포레스트 사진 최적화 시작...\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (let i = 0; i < FILE_LIST.length; i++) {
    const file = FILE_LIST[i];
    const numStr = String(i + 1).padStart(2, '0');
    const outName = `danginri-${numStr}.webp`;
    const inputPath = path.join(SOURCE_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, outName);

    const stat = fs.statSync(inputPath);
    totalOriginal += stat.size;

    fs.copyFileSync(inputPath, backupPath);

    await sharp(inputPath)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);

    const outStat = fs.statSync(outputPath);
    totalOptimized += outStat.size;

    console.log(`✓ [${numStr}/${FILE_LIST.length}] ${file} (${(stat.size / (1024 * 1024)).toFixed(2)}MB) ➔ ${outName} (${(outStat.size / 1024).toFixed(0)}KB)`);
  }

  console.log(`\n🎉 당인리포레스트 이미지 최적화 완료!`);
  console.log(`- 원본 총 용량: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`- 최적화 후 용량: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB (${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}% 절감)`);
}

optimizeDanginri().catch(console.error);
