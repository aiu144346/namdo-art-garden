import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('public/images/food-tour');
const BACKUP_DIR = path.resolve('raw_photos/food-tour');

async function optimizeFoodTour() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('Source directory does not exist:', SOURCE_DIR);
    return;
  }

  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const files = fs.readdirSync(SOURCE_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  // 숫자 기준 정렬 (1.JPG, 2.JPG, ... 22.JPG)
  imageFiles.sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
    const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
    return numA - numB;
  });

  console.log(`총 ${imageFiles.length}개 사진 최적화 시작...\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of imageFiles) {
    const num = parseInt(file.replace(/\D/g, ''), 10);
    const numStr = String(num).padStart(2, '0');
    const inputPath = path.join(SOURCE_DIR, file);
    const outputFileName = `food-tour-${numStr}.webp`;
    const outputPath = path.join(SOURCE_DIR, outputFileName);

    const stat = fs.statSync(inputPath);
    totalOriginal += stat.size;

    await sharp(inputPath)
      .rotate() // EXIF 방향 자동 회전
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);

    const outStat = fs.statSync(outputPath);
    totalOptimized += outStat.size;

    console.log(`✓ [${numStr}/22] ${file} (${(stat.size / (1024 * 1024)).toFixed(1)}MB) ➔ ${outputFileName} (${(outStat.size / 1024).toFixed(0)}KB)`);

    // 원본 파일은 raw_photos/food-tour/ 로 안전하게 이동
    const backupPath = path.join(BACKUP_DIR, file);
    fs.renameSync(inputPath, backupPath);
  }

  console.log(`\n🎉 완료!`);
  console.log(`- 원본 총 용량: ${(totalOriginal / (1024 * 1024)).toFixed(1)} MB`);
  console.log(`- 최적화 후 용량: ${(totalOptimized / (1024 * 1024)).toFixed(1)} MB (${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}% 절감)`);
  console.log(`- 원본 백업 위치: ${BACKUP_DIR}`);
}

optimizeFoodTour().catch(console.error);
