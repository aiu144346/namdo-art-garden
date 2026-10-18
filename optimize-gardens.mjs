import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const BASE_DIR = path.resolve('public/images/gardens');
const RAW_BACKUP_DIR = path.resolve('raw_photos/gardens');

async function processGardenFolder(gardenId) {
  const gardenDir = path.join(BASE_DIR, gardenId);
  if (!fs.existsSync(gardenDir)) return;

  const backupDir = path.join(RAW_BACKUP_DIR, gardenId);
  fs.mkdirSync(backupDir, { recursive: true });

  const files = fs.readdirSync(gardenDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  if (imageFiles.length === 0) {
    console.log(`[${gardenId}] 변환할 원본 이미지(JPG/PNG)가 없습니다.`);
    return;
  }

  console.log(`\n========================================`);
  console.log(`🌿 [${gardenId}] 총 ${imageFiles.length}개 원본 사진 최적화 시작...`);
  console.log(`========================================`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let index = 1;

  for (const file of imageFiles) {
    const inputPath = path.join(gardenDir, file);
    const stat = fs.statSync(inputPath);
    totalOriginalSize += stat.size;

    // 네이밍: garden-[gardenId]-01.webp 형식 또는 원본파일명 매핑
    const numStr = String(index).padStart(2, '0');
    const outputFileName = `garden-${gardenId}-${numStr}.webp`;
    const outputPath = path.join(gardenDir, outputFileName);

    try {
      // 1920px 리사이즈 & WebP 품질 82% 압축
      await sharp(inputPath)
        .rotate() // EXIF 방향 자동 회전
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(outputPath);

      const outStat = fs.statSync(outputPath);
      totalOptimizedSize += outStat.size;

      const origMb = (stat.size / (1024 * 1024)).toFixed(1);
      const optKb = (outStat.size / 1024).toFixed(0);
      console.log(`✓ [${index}/${imageFiles.length}] ${file} (${origMb}MB) ➔ ${outputFileName} (${optKb}KB)`);

      // 원본은 raw_photos/ 백업 폴더로 안전하게 이동
      const backupPath = path.join(backupDir, file);
      fs.renameSync(inputPath, backupPath);

      index++;
    } catch (err) {
      console.error(`❌ ${file} 처리 중 오류:`, err.message);
    }
  }

  const origTotalMb = (totalOriginalSize / (1024 * 1024)).toFixed(1);
  const optTotalMb = (totalOptimizedSize / (1024 * 1024)).toFixed(1);
  const reductionRate = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);

  console.log(`\n🎉 [${gardenId}] 완료!`);
  console.log(`- 원본 총 용량: ${origTotalMb} MB`);
  console.log(`- 최적화 후 용량: ${optTotalMb} MB (${reductionRate}% 절감)`);
  console.log(`- 원본 안전 백업: raw_photos/gardens/${gardenId}/`);
}

async function main() {
  const targetGarden = process.argv[2]; // node optimize-gardens.mjs moon (특정 정원만) 또는 전체
  if (targetGarden) {
    await processGardenFolder(targetGarden);
  } else {
    if (!fs.existsSync(BASE_DIR)) {
      console.log('public/images/gardens 디렉토리가 없습니다.');
      return;
    }
    const subDirs = fs.readdirSync(BASE_DIR).filter(sub => {
      return fs.statSync(path.join(BASE_DIR, sub)).isDirectory();
    });
    for (const sub of subDirs) {
      await processGardenFolder(sub);
    }
  }
}

main().catch(console.error);
