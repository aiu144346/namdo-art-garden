import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = 'C:/강좌/AGI-2026/11/주스컴퍼니/완도/완도/07-해양생태전시관';
const OUTPUT_DIR = 'c:/GL-AG-PJT/안티그래비티/public/images/marine-eco';
const BACKUP_DIR = 'c:/GL-AG-PJT/안티그래비티/raw_photos/marine-eco';

const FILE_MAPPING = [
  { src: '해양생태전시관_01_입구 앞 안내 리플릿.jpg', out: 'marine-eco-01.webp' },
  { src: '해양생태전시관_02_입구 전경.jpg', out: 'marine-eco-02.webp' },
  { src: '해양생태전시관_03_1층 로비 휴게공간.jpg', out: 'marine-eco-03.webp' },
  { src: '해양생태전시관_04_기획전시실.jpg', out: 'marine-eco-04.webp' },
  { src: '해양생태전시관_05_체험실 퀴즈 키오스크.jpg', out: 'marine-eco-05.webp' },
  { src: '해양생태전시관_06_체험실 내몸에 맞는 해조류 화면.jpg', out: 'marine-eco-06.webp' },
  { src: '해양생태전시관_07_체험실 물고기 나무 퍼즐.jpg', out: 'marine-eco-07.webp' },
  { src: '해양생태전시관_08_2층 트릭아트 포토존.jpg', out: 'marine-eco-08.webp' },
  { src: '해양생태전시관_09_청해진유적전시실 장도 조망 창.jpg', out: 'marine-eco-09.webp' },
  { src: '해양생태전시관_10_청해진유적전시실 장도 청해진 유적 안내도.jpg', out: 'marine-eco-10.webp' },
  { src: '해양생태전시관_11_청해진유적전시실 장보고 이순신 안내 패널.jpg', out: 'marine-eco-11.webp' },
  { src: '해양생태전시관_12_해양실 5대양 전시.jpg', out: 'marine-eco-12.webp' },
  { src: '해양생태전시관_13_생태실 ECOLOGY 전시.jpg', out: 'marine-eco-13.webp' },
  { src: '해양생태전시관_14_생태실 해양생물 원기둥 전시.jpg', out: 'marine-eco-14.webp' },
  { src: '해양생태전시관_15_미래실 DREAM 디지털 지도.jpg', out: 'marine-eco-15.webp' },
  { src: '해양생태전시관_16_미래실 소망 메모지 벽.jpg', out: 'marine-eco-16.webp' },
  { src: '해양생태전시관_17_장도 전경.jpg', out: 'marine-eco-17.webp' },
  { src: '해양생태전시관_18_건물 외관과 입간판.jpg', out: 'marine-eco-18.webp' },
  { src: '해양생태전시관_추가03_체험실 전복 키우기 화면.jpg', out: 'marine-eco-19.webp' },
  { src: '해양생태전시관_추가08_미래실 소망 메모지 벽.jpg', out: 'marine-eco-20.webp' },
  { src: '해양생태전시관_추가11_생태실 해양생물 전시.jpg', out: 'marine-eco-21.webp' },
];

async function optimizeMarineEco() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  console.log(`총 ${FILE_MAPPING.length}개 해양생태전시관 사진 최적화 시작...\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (let i = 0; i < FILE_MAPPING.length; i++) {
    const { src, out } = FILE_MAPPING[i];
    const inputPath = path.join(SOURCE_DIR, src);
    const backupPath = path.join(BACKUP_DIR, src);
    const outputPath = path.join(OUTPUT_DIR, out);

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

    console.log(`✓ [${String(i + 1).padStart(2, '0')}/${FILE_MAPPING.length}] ${src} (${(stat.size / (1024 * 1024)).toFixed(2)}MB) ➔ ${out} (${(outStat.size / 1024).toFixed(0)}KB)`);
  }

  console.log(`\n🎉 해양생태전시관 이미지 최적화 완료!`);
  console.log(`- 원본 총 용량: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`- 최적화 후 용량: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB (${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}% 절감)`);
}

optimizeMarineEco().catch(console.error);
