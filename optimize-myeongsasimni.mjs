import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = 'C:/강좌/AGI-2026/11/주스컴퍼니/완도/완도/06-명사십리';
const OUTPUT_DIR = 'c:/GL-AG-PJT/안티그래비티/public/images/myeongsasimni';
const BACKUP_DIR = 'c:/GL-AG-PJT/안티그래비티/raw_photos/myeongsasimni';

async function optimizeMyeongsasimni() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('Source directory does not exist:', SOURCE_DIR);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const files = fs.readdirSync(SOURCE_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  // 번호 기준 정렬 (명사십리_01_... ~ 명사십리_18_...)
  files.sort((a, b) => {
    const matchA = a.match(/_(\d+)_/);
    const matchB = b.match(/_(\d+)_/);
    const numA = matchA ? parseInt(matchA[1], 10) : 0;
    const numB = matchB ? parseInt(matchB[1], 10) : 0;
    return numA - numB;
  });

  console.log(`총 ${files.length}개 신지 명사십리 사진 최적화 시작...\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const match = file.match(/_(\d+)_/);
    const num = match ? parseInt(match[1], 10) : i + 1;
    const numStr = String(num).padStart(2, '0');

    const inputPath = path.join(SOURCE_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    const outputFileName = `myeongsasimni-${numStr}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    const stat = fs.statSync(inputPath);
    totalOriginal += stat.size;

    // Backup original
    fs.copyFileSync(inputPath, backupPath);

    // Convert to 1920px WebP
    await sharp(inputPath)
      .rotate() // EXIF 방향 자동 회전
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);

    const outStat = fs.statSync(outputPath);
    totalOptimized += outStat.size;

    console.log(`✓ [${numStr}/${files.length}] ${file} (${(stat.size / (1024 * 1024)).toFixed(2)}MB) ➔ ${outputFileName} (${(outStat.size / 1024).toFixed(0)}KB)`);
  }

  console.log(`\n🎉 신지 명사십리 이미지 최적화 완료!`);
  console.log(`- 원본 총 용량: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`- 최적화 후 용량: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB (${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}% 절감)`);
  console.log(`- 웹 배포 경로: ${OUTPUT_DIR}`);
  console.log(`- 원본 백업 경로: ${BACKUP_DIR}`);
}

optimizeMyeongsasimni().catch(console.error);
