import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const JOBS = [
  {
    slug: 'wando-urban',
    sourceDir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (완도)/서포터즈 원고 (완도)/11-02 완도어반/완도어반',
    files: [
      '사진-01.jpg',
      '사진-02_완도어반입구.jpg',
      '사진-03_완도타워다도해일출공원.jpg',
      '사진-04_완도타워스카이워크.jpg',
      '사진-05_완도타워모노레일.jpg',
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
      '사진-18.jpg',
      '사진-19_완도어반특산물코너.jpg',
      '사진-20_완도어반특산물코너.jpg'
    ]
  },
  {
    slug: 'dalsweet',
    sourceDir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (완도)/서포터즈 원고 (완도)/11-03 달스윗/달스윗',
    files: [
      '사진-01_달스윗입구.jpg',
      '사진-02.jpg',
      '사진-03.jpg',
      '사진-04.jpg',
      '사진-05.jpg',
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
      '사진-17_달스윗야외테라스.jpg',
      '사진-18_달스윗야외테라스.jpg',
      '사진-19_완도타워.jpg',
      '사진-20_완도타워전망대에서바라본다도해일출공원.jpg',
      '사진-21_달스윗완도타워점.jpg',
      '사진-22.jpg'
    ]
  },
  {
    slug: 'mannam-plaza',
    sourceDir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (완도)/서포터즈 원고 (완도)/11-04 만남의 광장/만남의광장',
    files: [
      '사진-01.jpg',
      '사진-02_아내의정원.jpg',
      '사진-03_아내의정원.jpg',
      '사진-04_아내의정원.jpg',
      '사진-05_아내의정원.jpg',
      '사진-06_만남의광장입구.jpg',
      '사진-07_만남의광장.jpg',
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
      '사진-18.jpg',
      '사진-19.jpg',
      '사진-20.jpg',
      '사진-21.jpg',
      '사진-22.jpg',
      '사진-23.jpg',
      '사진-24.png'
    ]
  },
  {
    slug: 'urban-coffee',
    sourceDir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (완도)/서포터즈 원고 (완도)/11-05 어반카페/어반커피',
    files: [
      '사진-01_어반커피야외테라스.jpg',
      '사진-02_구계등입구.jpg',
      '사진-03_구계등.jpg',
      '사진-04.jpg',
      '사진-05.jpg',
      '사진-06.jpg',
      '사진-07.jpg',
      '사진-08_완도어반에서어반카페이동계단.jpg',
      '사진-09_어반커피입구.jpg',
      '사진-10.jpg',
      '사진-11.jpg',
      '사진-12.jpg',
      '사진-13.jpg',
      '사진-14.jpg',
      '사진-15.jpg',
      '사진-16.jpg',
      '사진-17.jpg',
      '사진-18_어반커피야외테라스.jpg',
      '사진-19_어반커피야외테라스.jpg',
      '사진-20_어반커피야외테라스.jpg'
    ]
  },
  {
    slug: 'travel-week-4est',
    sourceDir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (완도)/서포터즈 원고 (완도)/남도예술정원 여행주간-01/원고사진',
    files: [
      '사진-01-포레스트수목원입구.jpg',
      '사진-02-공연장.jpg',
      '사진-03-주차장 안내석.jpg',
      '사진-04-주차장에서입구가는길.jpg',
      '사진-05-매표소앞.jpg',
      '사진-06.jpg',
      '사진-07.jpg',
      '사진-08-매표소옆카페.jpg',
      '사진-09-카페테라스.jpg',
      '사진-10.jpg',
      '사진-10-치유의숲.jpg',
      '사진-11.jpg',
      '사진-12.jpg',
      '사진-13.jpg',
      '사진-14.jpg',
      '사진-15.jpg',
      '사진-16.jpg',
      '사진-17.jpg',
      '사진-18.jpg',
      '사진-19.jpg',
      '사진-20.jpg'
    ]
  },
  {
    slug: 'travel-week-moongarden-art',
    sourceDir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (완도)/서포터즈 원고 (완도)/남도예술정원 여행주간-02/원고사진',
    files: [
      '사진-01-문가든 주차장 꽃.jpg',
      '사진-02-최순임작가 작품과 팜플렛.jpg',
      '사진-03-정원 출입구 앞.jpg',
      '사진-04-문가든 간판.jpg',
      '사진-05-문가든 카페 입구.jpg',
      '사진-05-카페 출입구 앞.jpg',
      '사진-06- 카페 출입구 옆.jpg',
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
      '사진-18.jpg',
      '사진-19-정원 출입구 앞.jpg'
    ]
  },
  {
    slug: 'travel-week-moongarden-craft',
    sourceDir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (완도)/서포터즈 원고 (완도)/남도예술정원 여행주간-03/원고사진',
    files: [
      '사진-01.jpg',
      '사진-02.jpg',
      '사진-03-정원 간판.jpg',
      '사진-04-카페 2층에서 바라본 모습.jpg',
      '사진-05-카페출입구.jpg',
      '사진-06.jpg',
      '사진-07.jpg',
      '사진-08.jpg',
      '사진-09-그린타임갤러리.jpg',
      '사진-10-그린타임갤러리.jpg',
      '사진-11-그린타임갤러리.jpg',
      '사진-12-그린타임갤러리.jpg',
      '사진-13--그린타임갤러리.jpg',
      '사진-14.jpg',
      '사진-15.jpg',
      '사진-16.jpg',
      '사진-17.jpg',
      '사진-18.jpg',
      '사진-19.jpg',
      '사진-20.jpg',
      '사진-21.jpg',
      '사진-22.jpg',
      '사진-23.jpg'
    ]
  }
];

async function runBatchOptimization() {
  let grandOriginal = 0;
  let grandOptimized = 0;
  let grandCount = 0;

  for (const job of JOBS) {
    const outDir = path.resolve(`public/images/${job.slug}`);
    const backupDir = path.resolve(`raw_photos/${job.slug}`);
    fs.mkdirSync(outDir, { recursive: true });
    fs.mkdirSync(backupDir, { recursive: true });

    console.log(`\n=== [${job.slug}] (${job.files.length}장) 변환 시작 ===`);
    let jobOrig = 0;
    let jobOpt = 0;

    for (let i = 0; i < job.files.length; i++) {
      const file = job.files[i];
      const numStr = String(i + 1).padStart(2, '0');
      const outName = `${job.slug}-${numStr}.webp`;
      const inputPath = path.join(job.sourceDir, file);
      const backupPath = path.join(backupDir, file);
      const outputPath = path.join(outDir, outName);

      const stat = fs.statSync(inputPath);
      jobOrig += stat.size;
      grandOriginal += stat.size;
      grandCount++;

      fs.copyFileSync(inputPath, backupPath);

      await sharp(inputPath)
        .rotate()
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(outputPath);

      const outStat = fs.statSync(outputPath);
      jobOpt += outStat.size;
      grandOptimized += outStat.size;
    }

    console.log(`✓ [${job.slug}] 완료: ${(jobOrig / (1024 * 1024)).toFixed(1)}MB ➔ ${(jobOpt / (1024 * 1024)).toFixed(2)}MB (${((1 - jobOpt / jobOrig) * 100).toFixed(1)}% 절감)`);
  }

  console.log(`\n========================================`);
  console.log(`🎉 총 7개 기사 사진 ${grandCount}장 일괄 WebP 변환 완료!`);
  console.log(`- 원본 총 용량: ${(grandOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`- 최적화 총 용량: ${(grandOptimized / (1024 * 1024)).toFixed(2)} MB (${((1 - grandOptimized / grandOriginal) * 100).toFixed(1)}% 절감)`);
  console.log(`========================================`);
}

runBatchOptimization().catch(console.error);
