import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = 'C:/강좌/AGI-2026/11/주스컴퍼니/완도/완도/08-해양치유센터';
const OUTPUT_DIR = 'c:/GL-AG-PJT/안티그래비티/public/images/healing-center';
const BACKUP_DIR = 'c:/GL-AG-PJT/안티그래비티/raw_photos/healing-center';

const FILE_LIST = [
  '해양치유센터_01_WANDO 조형물 포토존.jpg',
  '해양치유센터_02_센터 앞 해변 전경.jpg',
  '해양치유센터_03_센터 외관 전경.jpg',
  '해양치유센터_04_1층 로비 안내데스크.jpg',
  '해양치유센터_05_층별 시설 안내판.jpg',
  '해양치유센터_06_개인 건강 상태 측정.jpg',
  '해양치유센터_07_휴게 라운지 오션뷰.jpg',
  '해양치유센터_08_티테라피 차 코너.jpg',
  '해양치유센터_09_스마트워치 프로그램 알림.jpg',
  '해양치유센터_10_향기테라피.jpg',
  '해양치유센터_11_해조류 스파테라피.jpg',
  '해양치유센터_12_해조류거품테라피.jpg',
  '해양치유센터_13_머드테라피.jpg',
  '해양치유센터_14_딸라소풀 전경.jpg',
  '해양치유센터_15_딸라소풀 수압마사지.jpg',
  '해양치유센터_16_옥상 야외 휴게공간.jpg',
  '해양치유센터_17_1층 식당.jpg',
  '해양치유센터_18_1층 특산물 판매점.jpg'
];

async function optimizeHealingCenter() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  console.log(`총 ${FILE_LIST.length}개 해양치유센터 사진 최적화 시작...\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (let i = 0; i < FILE_LIST.length; i++) {
    const file = FILE_LIST[i];
    const numStr = String(i + 1).padStart(2, '0');
    const outName = `healing-center-${numStr}.webp`;
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

  console.log(`\n🎉 해양치유센터 이미지 최적화 완료!`);
  console.log(`- 원본 총 용량: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`- 최적화 후 용량: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB (${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}% 절감)`);
}

optimizeHealingCenter().catch(console.error);
