import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import mammoth from 'mammoth';

async function getDHash(buf) {
  const { data } = await sharp(buf)
    .rotate()
    .resize(9, 8, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let hash = '';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      hash += data[r * 9 + c] < data[r * 9 + c + 1] ? '1' : '0';
    }
  }
  return hash;
}

function hamming(h1, h2) {
  let d = 0;
  for (let i = 0; i < h1.length; i++) if (h1[i] !== h2[i]) d++;
  return d;
}

const JINDO_ARTICLES = [
  {
    dir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (진도)/서포터즈 원고 (진도)/4. 진도 생태습지보호구역 사진모음',
    docxFile: '4. 진도갯벌습지보호지역 원고.docx',
    id: 'j14-jindo-tidal-flat-wetland',
    regionId: 'jindo',
    slug: 'jindo-wetland',
    badge: '🌊 진도 해안 드라이브 & 국가 생태습지 명소 | 진도 고군면·군내면',
    accentColor: 'teal',
    title: '진도 드라이브길에서 만난 보석 같은 자연 "진도갯벌습지보호지역"\n진도휴식 정원까지 이어지는 완벽한 하루 여행 코스',
    h1Top: '진도 드라이브길에서 만난 보석 같은 자연!',
    h1Main: '“진도갯벌습지보호지역”',
    h1Sub: '해안 나무데크 산책로와 주황빛 코스모스 언덕, 진도휴식 정원까지 이어지는 하루 코스',
    subtitle: '시원하게 뻗은 진도 해안도로 옆 청정 갯벌과 바다 위 나무데크길, 그리고 언덕 위 황홀한 주황빛 코스모스 꽃밭에서 만나는 남도의 여유',
    description: '진도 해안 드라이브 중 만나는 국가 보호구역 진도갯벌습지보호지역! 바다 위 나무데크길과 주황빛 코스모스 언덕, 민간정원 진도휴식까지 이어지는 완벽한 하루 힐링 코스를 소개합니다.',
    heroImgIndex: 12 // 습지보호구역 위 정자와 꽃밭.jpg
  },
  {
    dir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (진도)/서포터즈 원고 (진도)/5. 전첩비 사진 모음',
    docxFile: '5. 벽파진전첩비 원고.docx',
    id: 'j15-jindo-byeokpajin-monument',
    regionId: 'jindo',
    slug: 'jindo-byeokpajin',
    badge: '⚔️ 명량대첩 호국 성지 & 다도해 조망 명소 | 진도 고군면 벽파진',
    accentColor: 'sky',
    title: '진도의 바다를 품은 호국의 성지 "벽파진전첩비"\n벽파정부터 진도휴식 정원까지 이어지는 역사와 힐링의 여정',
    h1Top: '진도의 바다를 품은 호국의 성지',
    h1Main: '“이충무공 벽파진전첩비”',
    h1Sub: '벽파정부터 민간정원 ‘진도휴식’까지 이어지는 역사와 힐링의 여정',
    subtitle: '충무공 이순신 장군이 명량대첩을 앞두고 16일간 수군을 재건했던 역사의 바다, 벽파진전첩비와 벽파정에서 만나는 숭고한 울림',
    description: '1597년 명량대첩의 기적을 준비했던 진도 벽파진전첩비와 고풍스러운 벽파정 정자 탐방기. 호국의 바다 조망부터 민간정원 진도휴식까지 이어지는 당일치기·1박 2일 추천 코스.',
    heroImgIndex: 13 // 전첩비 정면 모습.jpg
  },
  {
    dir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (진도)/서포터즈 원고 (진도)/6. 용장성 사진모음',
    docxFile: '6. 진도 용장성 원고 및 사진.docx',
    id: 'j16-jindo-yongjangseong-fortress',
    regionId: 'jindo',
    slug: 'jindo-yongjangseong',
    badge: '🏯 고려 삼별초 대몽항쟁 사적 제126호 | 진도 군내면 용장성',
    accentColor: 'amber',
    title: '고려 삼별초의 기상이 숨 쉬는 "진도 용장성"\n진도휴식 정원까지 역사와 자연을 잇는 감성 여행 코스',
    h1Top: '고려 삼별초의 붉은 기상이 숨 쉬는 곳',
    h1Main: '“진도 용장성 & 정충사”',
    h1Sub: '배중손 장군의 호국 성지에서 진도휴식 정원까지, 역사와 자연을 잇는 감성 코스',
    subtitle: '몽골의 침략에 맞서 자주독립의 의지를 불태웠던 삼별초의 해상 왕국 수도, 계단식 궁궐 석축과 숭의문을 따라 걷는 천년의 시간',
    description: '고려 삼별초의 대몽항쟁 거점인 사적 제126호 진도 용장성과 배중손 장군 사당 정충사, 홍보전시관, 둘레길 산책로까지! 진도휴식 정원과 연계한 역사·자연 힐링 여행 가이드.',
    heroImgIndex: 1 // 고려항몽충혼탑.jpg
  },
  {
    dir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (진도)/서포터즈 원고 (진도)/7. 진도개테마파크 사진모음',
    docxFile: '7. 진도개 테마파크 원고.docx',
    id: 'j17-jindo-dog-theme-park',
    regionId: 'jindo',
    slug: 'jindo-dog-park',
    badge: '🐕 천연기념물 제53호 생태 체험 & 가족 나들이 명소 | 진도읍',
    accentColor: 'amber',
    title: '진도개의 사랑스러움과 정원의 아늑함이 만나는 "진도개 테마파크"\n진도휴식 정원까지 이어지는 가족 감성 여행 코스',
    h1Top: '진도개의 사랑스러움과 정원의 아늑함이 만나는 곳!',
    h1Main: '“진도개 테마파크”',
    h1Sub: '천연기념물 제53호 진도개 교감 체험부터 진도휴식 정원까지 이어지는 감성 여행',
    subtitle: '순하고 영특한 아기 백구들과의 다정한 교감, 신나는 사계절 인조잔디 썰매장과 미니 동물농장까지 온 가족이 행복한 무료 생태 테마공원',
    description: '천연기념물 제53호 진도개를 가까이서 만나고 교감할 수 있는 진도개 테마파크! 진도개 홍보관, 강아지 먹이체험장과 쉼터, 사계절 썰매장, 미니 동물농장부터 진도휴식 정원 연계 코스까지.',
    heroImgIndex: 9 // 강아지 먹이체험장 옆 진도개 강아지 쉼터.jpg
  },
  {
    dir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (진도)/서포터즈 원고 (진도)/8. 용장사 사진모음',
    docxFile: '8. 용장사 원고.docx',
    id: 'j18-jindo-yongjangsa-temple',
    regionId: 'jindo',
    slug: 'jindo-yongjangsa',
    badge: '☸️ 보물 석불좌상 & 서해랑길 진도 7코스 | 진도 고군면 용장사',
    accentColor: 'emerald',
    title: '역사와 자연이 호흡하는 숨은 힐링 명소 "진도 용장사"\n삼별초 산성 터부터 보물 석불의 단아한 미소까지 호국 역사 탐방기',
    h1Top: '역사와 자연이 호흡하는 진도 고군면의 숨은 힐링 명소',
    h1Main: '“진도 용장사 & 보물 석불좌상”',
    h1Sub: '삼별초 항몽 투쟁의 산성 터부터 서해랑길 진도 7코스까지 호국 역사 탐방기',
    subtitle: '옛 용장산성의 고즈넉한 돌담 계단을 올라 마주하는 보물 석조여래좌상의 온화한 미소와 분홍빛 꽃나무가 어우러진 산사 산책',
    description: '사적 제126호 진도 용장성 터에 자리한 고찰 용장사와 보물 석조여래좌상·석조비로자나불좌상! 코리아둘레길 서해랑길 진도 7코스와 삼별초 호국역사 탐방길을 따라 걷는 고요한 사색 여행.',
    heroImgIndex: 11 // 용장사 마당의 석탑.jpg
  },
  {
    dir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (진도)/서포터즈 원고 (진도)/9. 인문정원 사진',
    docxFile: '9. 인문 정원 여행 원고.docx',
    id: 'j19-namdo-humanities-garden-tour',
    regionId: 'jindo',
    slug: 'namdo-garden-bus',
    badge: '🚌 남도한바퀴 명품 정원 인문학 버스투어 | 완도·해남·진도 권역',
    accentColor: 'emerald',
    title: '운전 스트레스 제로! 버스만 타면 완성되는 "남도한바퀴 인문 정원 여행"\n바하정원·포레스트수목원·산이정원 전남 명품 정원 힐링 코스',
    h1Top: '운전 스트레스 제로! 뚜벅이도 완벽하게 즐기는 전남 명품 정원',
    h1Main: '“남도한바퀴 인문 정원 여행”',
    h1Sub: '정도리 구계등 · 바하정원 · 월송한우촌 · 4est수목원 · 산이정원 원데이 버스투어',
    subtitle: '광주송정역과 유스퀘어에서 출발해 정원주의 철학이 깃든 남도 대표 민간정원 3곳과 다도해 몽돌해변, 한우 불고기 전골 미식까지 하루에 만끽하는 정원 인문학 기행',
    description: '운전 걱정 없이 남도한바퀴 전용 버스로 떠나는 해남·완도 인문 정원 여행! 정도리 구계등 무장애 탐방로부터 바하정원 정원주와의 대화, 월송한우촌 점심, 포레스트(4est)수목원, 산이정원까지 36장의 현장 사진으로 담은 완벽 후기.',
    heroImgIndex: 31, // 산이정원 SANIGARDEN 입구 포토존.jpg
    defaultHashtags: [
      '#남도예술정원', '#남도한바퀴', '#인문정원여행', '#남도정원여행', '#완도바하정원',
      '#바하정원', '#정도리구계등', '#해남포레스트수목원', '#4est수목원', '#해남산이정원',
      '#산이정원', '#월송한우촌', '#남도예술정원지역파트너', '#광주송정역', '#유스퀘어버스투어',
      '#전남정원투어', '#완도여행', '#해남여행', '#진도여행', '#전남가볼만한곳',
      '#남도여행', '#정원여행자', '#스탬프투어', '#국내힐링여행'
    ]
  },
  {
    dir: 'C:/강좌/AGI-2026/11/주스컴퍼니/서포터즈 원고 (진도)/서포터즈 원고 (진도)/10. 수품어장 사진 모음',
    docxFile: '10. 수품어장 원고.docx',
    id: 'j20-jindo-supum-fishery',
    regionId: 'jindo',
    slug: 'jindo-supum',
    badge: '🐟 남도예술정원 공식 지역파트너 & 백반기행 맛집 | 진도읍 수품어장',
    accentColor: 'sky',
    title: '3대째 어부 집안의 자연산 한 상, 진도읍 맛집 "수품어장"\n남도예술정원 공식 지역파트너 10% 할인 혜택 방문기',
    h1Top: '3대째 어부 집안의 자연산 바다 한 상, 백반기행 진도 맛집',
    h1Main: '“진도읍 수품어장”',
    h1Sub: '남도예술정원 지역파트너 전 메뉴 10% 할인 혜택과 연계 카페·관광지 완벽 코스',
    subtitle: '수품항에서 매일 직접 조업한 싱싱한 자연산 회덮밥과 살얼음 수품물회, 생선구이백반, 전복장·간장게장 밑반찬까지 푸짐하게 차려지는 진도의 맛',
    description: '식객 허영만의 백반기행이 인정한 진도읍 자연산 횟집 수품어장! 3대째 어부 집안이 차려내는 자연산 회덮밥, 물회, 고등어구이백반 후기와 남도예술정원 공식 지역파트너 10% 할인 혜택 안내.',
    heroImgIndex: 13 // 반찬전체모음.jpg
  }
];

async function processAllJindo() {
  let grandOrigBytes = 0;
  let grandOptBytes = 0;
  let grandImgCount = 0;

  const generatedPosts = {};
  const generatedRegions = [];

  for (const meta of JINDO_ARTICLES) {
    const outDir = path.resolve(`public/images/${meta.slug}`);
    const backupDir = path.resolve(`raw_photos/${meta.slug}`);
    fs.mkdirSync(outDir, { recursive: true });
    fs.mkdirSync(backupDir, { recursive: true });

    const allFiles = fs.readdirSync(meta.dir);
    const imgFiles = allFiles.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    const fileHashes = [];
    for (const f of imgFiles) {
      const fullP = path.join(meta.dir, f);
      fileHashes.push({
        file: f,
        fullPath: fullP,
        hash: await getDHash(fullP)
      });
    }

    let idx = 0;
    const usedFolderFiles = new Set();
    let jobOrigBytes = 0;
    let jobOptBytes = 0;

    console.log(`\n=== [${meta.slug}] 원고 파싱 및 이미지 최적화 시작 ===`);

    const docxPath = path.join(meta.dir, meta.docxFile);
    const res = await mammoth.convertToHtml(
      { path: docxPath },
      {
        convertImage: mammoth.images.imgElement(async (image) => {
          idx++;
          const numStr = String(idx).padStart(2, '0');
          const outFileName = `${meta.slug}-${numStr}.webp`;
          const outPath = path.join(outDir, outFileName);

          const embeddedBuf = await image.read();
          const h = await getDHash(embeddedBuf);

          let best = null;
          let bestDist = 999;
          for (const fh of fileHashes) {
            const d = hamming(h, fh.hash);
            if (d < bestDist || (d === bestDist && !usedFolderFiles.has(fh.file))) {
              bestDist = d;
              best = fh;
            }
          }

          let sourceBufOrPath;
          let origSize = 0;
          let label = '';

          if (best && bestDist <= 12) {
            usedFolderFiles.add(best.file);
            sourceBufOrPath = best.fullPath;
            origSize = fs.statSync(best.fullPath).size;
            label = best.file;
            fs.copyFileSync(best.fullPath, path.join(backupDir, best.file));
          } else {
            sourceBufOrPath = embeddedBuf;
            origSize = embeddedBuf.length;
            label = `docx_embedded_${numStr}.jpg`;
            fs.writeFileSync(path.join(backupDir, label), embeddedBuf);
          }

          await sharp(sourceBufOrPath)
            .rotate()
            .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 82, effort: 4 })
            .toFile(outPath);

          const optSize = fs.statSync(outPath).size;
          jobOrigBytes += origSize;
          jobOptBytes += optSize;
          grandOrigBytes += origSize;
          grandOptBytes += optSize;
          grandImgCount++;

          return { src: `__IMG_${idx}__` };
        })
      }
    );

    console.log(`✓ [${meta.slug}] 사진 ${idx}장 변환 완료: ${(jobOrigBytes / (1024 * 1024)).toFixed(1)}MB ➔ ${(jobOptBytes / (1024 * 1024)).toFixed(2)}MB`);

    // Build Magazine HTML from res.value
    const postObj = buildJindoMagazineArticle(meta, res.value);
    generatedPosts[meta.id] = postObj;
    generatedRegions.push({
      id: meta.id,
      regionId: meta.regionId,
      title: meta.title.replace(/\n/g, ' — '),
      summary: meta.description,
      image: postObj.image,
      date: '2026-11-19',
      author: '남도예술정원 서포터즈'
    });
  }

  // 1. Update src/data/postsMain.js
  let postsMainContent = fs.readFileSync('src/data/postsMain.js', 'utf-8');
  let newEntriesCode = '';
  for (const [id, post] of Object.entries(generatedPosts)) {
    if (postsMainContent.includes(`"${id}":`)) continue;
    newEntriesCode += `  ${JSON.stringify(id)}: {\n`;
    newEntriesCode += `    "id": ${JSON.stringify(post.id)},\n`;
    newEntriesCode += `    "regionId": ${JSON.stringify(post.regionId)},\n`;
    newEntriesCode += `    "title": ${JSON.stringify(post.title)},\n`;
    newEntriesCode += `    "description": ${JSON.stringify(post.description)},\n`;
    newEntriesCode += `    "keywords": ${JSON.stringify(post.keywords)},\n`;
    newEntriesCode += `    "date": ${JSON.stringify(post.date)},\n`;
    newEntriesCode += `    "author": ${JSON.stringify(post.author)},\n`;
    newEntriesCode += `    "readTime": ${JSON.stringify(post.readTime)},\n`;
    newEntriesCode += `    "image": ${JSON.stringify(post.image)},\n`;
    newEntriesCode += `    "content": \`${post.content}\`\n`;
    newEntriesCode += `  },\n`;
  }
  postsMainContent = postsMainContent.replace(
    'export const postsMain = {\n',
    `export const postsMain = {\n${newEntriesCode}`
  );
  fs.writeFileSync('src/data/postsMain.js', postsMainContent, 'utf-8');
  console.log('\n✓ Updated src/data/postsMain.js with 7 new Jindo articles');

  // 2. Update src/data/regions.json
  const regionsArr = JSON.parse(fs.readFileSync('src/data/regions.json', 'utf-8'));
  const existingIds = new Set(regionsArr.map(r => r.id));
  const filteredNewRegions = generatedRegions.filter(r => !existingIds.has(r.id));
  fs.writeFileSync('src/data/regions.json', JSON.stringify([...filteredNewRegions, ...regionsArr], null, 2), 'utf-8');
  console.log('✓ Updated src/data/regions.json with 7 new Jindo items');

  // 3. Update src/pages/PostsArchive/index.jsx
  let archiveContent = fs.readFileSync('src/pages/PostsArchive/index.jsx', 'utf-8');
  const newIdsCode = JINDO_ARTICLES.map(m => `        '${m.id}',`).join('\n');
  archiveContent = archiveContent.replace(
    'const isFeatured = [\n',
    `const isFeatured = [\n${newIdsCode}\n`
  );
  fs.writeFileSync('src/pages/PostsArchive/index.jsx', archiveContent, 'utf-8');
  console.log('✓ Updated src/pages/PostsArchive/index.jsx featured list');

  console.log(`\n========================================`);
  console.log(`🎉 진도 7편 기사 사진 총 ${grandImgCount}장 WebP 변환 및 기사 등록 완료!`);
  console.log(`- 원본 총 용량: ${(grandOrigBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`- 최적화 총 용량: ${(grandOptBytes / (1024 * 1024)).toFixed(2)} MB (${((1 - grandOptBytes / grandOrigBytes) * 100).toFixed(1)}% 절감)`);
  console.log(`========================================`);
}

function buildJindoMagazineArticle(meta, rawHtml) {
  const colorMap = {
    amber: {
      badgeBg: 'bg-amber-500/10 text-amber-800',
      accentText: 'text-amber-700',
      boxBg: 'bg-[#fdfaf5] border-amber-100',
      infoBoxBg: 'bg-gradient-to-br from-amber-50/90 to-orange-50/40 border-amber-200/80',
      infoTitleText: 'text-amber-950',
      numBg: 'bg-amber-700',
      tagHover: 'hover:bg-amber-50 hover:text-amber-700'
    },
    emerald: {
      badgeBg: 'bg-emerald-500/10 text-emerald-800',
      accentText: 'text-emerald-700',
      boxBg: 'bg-[#f4faf6] border-emerald-100',
      infoBoxBg: 'bg-gradient-to-br from-emerald-50/90 to-teal-50/40 border-emerald-200/80',
      infoTitleText: 'text-emerald-950',
      numBg: 'bg-emerald-700',
      tagHover: 'hover:bg-emerald-50 hover:text-emerald-700'
    },
    teal: {
      badgeBg: 'bg-teal-500/10 text-teal-800',
      accentText: 'text-teal-700',
      boxBg: 'bg-[#f3faf9] border-teal-100',
      infoBoxBg: 'bg-gradient-to-br from-teal-50/90 to-cyan-50/40 border-teal-200/80',
      infoTitleText: 'text-teal-950',
      numBg: 'bg-teal-700',
      tagHover: 'hover:bg-teal-50 hover:text-teal-700'
    },
    sky: {
      badgeBg: 'bg-sky-500/10 text-sky-800',
      accentText: 'text-sky-700',
      boxBg: 'bg-[#f3f9fc] border-sky-100',
      infoBoxBg: 'bg-gradient-to-br from-sky-50/90 to-blue-50/40 border-sky-200/80',
      infoTitleText: 'text-sky-950',
      numBg: 'bg-sky-700',
      tagHover: 'hover:bg-sky-50 hover:text-sky-700'
    }
  };
  const c = colorMap[meta.accentColor] || colorMap.teal;
  const imgUrl = (idx) => `/images/${meta.slug}/${meta.slug}-${String(idx).padStart(2, '0')}.webp`;

  // Clean replacement characters ()
  let cleanedHtml = rawHtml.replace(/\uFFFD+/g, '📌 ').replace(/\u200B/g, '');

  // Extract top-level blocks: <table>...</table>, <ul>...</ul>, or <p>...</p>
  const blockRegex = /(<table[\s\S]*?<\/table>|<ul[\s\S]*?<\/ul>|<p>[\s\S]*?<\/p>)/g;
  const rawBlocks = [...cleanedHtml.matchAll(blockRegex)].map(m => m[1].trim());

  let hashtags = [];
  const tokens = [];
  let pCount = 0;

  for (const block of rawBlocks) {
    if (block.startsWith('<table')) {
      // Extract inner content of table cell
      const tdMatch = block.match(/<td>([\s\S]*?)<\/td>/);
      const inner = tdMatch ? tdMatch[1] : block;
      tokens.push({ type: 'infobox', html: inner });
      continue;
    }

    if (block.startsWith('<ul')) {
      tokens.push({ type: 'list', html: block });
      continue;
    }

    // It's a <p>...</p>
    const inner = block.replace(/^<p>|<\/p>$/g, '').trim();
    const plain = inner.replace(/<[^>]+>/g, '').trim();

    if (!plain && !inner.includes('__IMG_')) continue;

    // Skip raw title lines at start
    if (plain.startsWith('제목:') || plain.startsWith('제목 :')) continue;
    if (
      pCount < 3 &&
      !inner.includes('__IMG_') &&
      (plain.includes('진도개 테마파크부터 진도휴식 정원까지') ||
        plain.includes('영리하고 영특한 진도개의 매력에 빠지는') ||
        plain.includes('삼별초 항몽 투쟁의 장엄한 호국 역사가') ||
        plain.includes('역사와 자연이 호흡하는 숨은 힐링 명소!') ||
        plain.includes('운전 스트레스 제로! 뚜벅이도 완벽하게') ||
        plain.includes('버스만 타면 완성되는 해남·완도 인문 정원 여행!') ||
        plain.includes('정원에서 시작된 진도 여행의 즐거움이') ||
        plain.includes('백반기행이 인정한 수품항 자연산 횟집부터'))
    ) {
      pCount++;
      continue;
    }
    pCount++;

    if (plain === '해시태그' || plain.startsWith('#')) {
      const tags = plain.match(/#[^\s#]+/g);
      if (tags) hashtags.push(...tags);
      continue;
    }

    const imgs = [...inner.matchAll(/__IMG_(\d+)__/g)].map(m => parseInt(m[1], 10));
    const textOnly = inner.replace(/<img[^>]*>/g, '').trim();
    const plainOnly = textOnly.replace(/<[^>]+>/g, '').trim();

    if (imgs.length > 0) {
      if (tokens.length > 0 && tokens[tokens.length - 1].type === 'images') {
        tokens[tokens.length - 1].indices.push(...imgs);
      } else {
        tokens.push({ type: 'images', indices: [...imgs] });
      }
    }

    if (plainOnly) {
      if (
        plainOnly.startsWith('📌') ||
        plainOnly.startsWith('☕ 함께 들르기 좋은') ||
        plainOnly.includes('추천! 일정별 진도 여행 코스') ||
        plainOnly.includes('추천 당일치기 코스') ||
        plainOnly.includes('추천 1박 2일 코스') ||
        plainOnly.includes('함께 가기 좋은 주변 자연 관광지') ||
        plainOnly === '마치며' ||
        plainOnly === '진도휴식'
      ) {
        tokens.push({ type: 'subheading', text: plainOnly.replace(/^📌\s*/, '') });
      } else {
        tokens.push({ type: 'text', html: textOnly });
      }
    }
  }

  if (hashtags.length === 0 && meta.defaultHashtags) {
    hashtags = meta.defaultHashtags;
  }

  let bodyHtml = '';
  let textIdx = 0;

  for (let i = 0; i < tokens.length; i++) {
    const tk = tokens[i];
    if (tk.type === 'infobox') {
      const styledInner = tk.html
        .replace(/<p><strong>(.*?)<\/strong><\/p>/g, `<h3 class="text-lg md:text-xl font-serif font-bold ${c.infoTitleText} mb-3 flex items-center gap-2">$1</h3>`)
        .replace(/<p>(.*?)<\/p>/g, '<p class="text-sm md:text-base text-neutral-700 leading-relaxed mb-3">$1</p>')
        .replace(/<ul>/g, '<ul class="text-sm text-neutral-700 space-y-2 pl-4 list-disc">');
      bodyHtml += `
        <div class="${c.infoBoxBg} p-6 md:p-8 rounded-3xl border shadow-sm">
          ${styledInner}
        </div>`;
    } else if (tk.type === 'list') {
      const styledList = tk.html
        .replace(/<ul>/g, '<ul class="bg-neutral-50/90 p-6 rounded-2xl border border-neutral-200/70 space-y-2.5 text-sm md:text-base text-neutral-700 list-disc pl-8">');
      bodyHtml += `\n        ${styledList}`;
    } else if (tk.type === 'subheading') {
      bodyHtml += `
        <div class="pt-6 border-t border-neutral-100">
          <h2 class="text-xl md:text-2xl font-serif font-bold text-neutral-900 flex items-center gap-2.5">
            <span class="w-2 h-6 rounded-full ${c.numBg} inline-block"></span>
            ${tk.text}
          </h2>
        </div>`;
    } else if (tk.type === 'text') {
      if (textIdx === 0) {
        bodyHtml += `
        <div class="${c.boxBg} p-6 md:p-8 rounded-3xl border shadow-sm">
          <p class="text-base md:text-lg font-medium text-neutral-800 leading-relaxed">${tk.html}</p>
        </div>`;
      } else {
        bodyHtml += `
        <p class="text-neutral-700 text-base md:text-lg leading-relaxed">${tk.html}</p>`;
      }
      textIdx++;
    } else if (tk.type === 'images') {
      const indices = tk.indices;
      if (indices.length === 1) {
        bodyHtml += `
        <div class="rounded-3xl overflow-hidden shadow-lg border border-neutral-100 max-h-[580px]">
          <img src="${imgUrl(indices[0])}" alt="${meta.h1Main.replace(/[“”"]/g, '')} 사진 ${indices[0]}" class="w-full h-full object-cover" loading="lazy" />
        </div>`;
      } else {
        let k = 0;
        if (indices.length % 2 === 1) {
          bodyHtml += `
        <div class="rounded-3xl overflow-hidden shadow-lg border border-neutral-100 max-h-[580px]">
          <img src="${imgUrl(indices[0])}" alt="${meta.h1Main.replace(/[“”"]/g, '')} 사진 ${indices[0]}" class="w-full h-full object-cover" loading="lazy" />
        </div>`;
          k = 1;
        }
        if (k < indices.length) {
          bodyHtml += `\n        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
          for (; k < indices.length; k++) {
            bodyHtml += `
          <div class="rounded-2xl overflow-hidden shadow-md border border-neutral-100">
            <img src="${imgUrl(indices[k])}" alt="${meta.h1Main.replace(/[“”"]/g, '')} 사진 ${indices[k]}" class="w-full h-72 md:h-80 object-cover" loading="lazy" />
          </div>`;
          }
          bodyHtml += `\n        </div>`;
        }
      }
    }
  }

  const hashtagsHtml = hashtags
    .map(tag => `<span class="bg-surface px-3.5 py-1.5 rounded-full border border-neutral-100 ${c.tagHover} transition-colors">${tag}</span>`)
    .join('\n            ');

  const keywordsStr = hashtags.map(t => t.replace(/^#/, '')).join(', ');

  const fullContent = `
      <div class="max-w-4xl mx-auto space-y-8 text-neutral-800 leading-relaxed font-sans mt-4 px-2 md:px-0">
        <!-- Hero Banner / 최적 줄바꿈 타이틀 영역 -->
        <div class="space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${c.badgeBg} text-xs font-bold uppercase tracking-wider">
            ${meta.badge}
          </div>
          <h1 class="text-3xl md:text-5xl font-serif font-bold text-neutral-900 leading-tight">
            ${meta.h1Top}<br/>
            <span class="${c.accentText} font-sans block mt-1">${meta.h1Main}</span>
            <span class="text-xl md:text-2xl text-neutral-600 font-light font-sans block mt-2">${meta.h1Sub}</span>
          </h1>
          <p class="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
            ${meta.subtitle}
          </p>
        </div>

        ${bodyHtml}

        <!-- 해시태그 -->
        <div class="pt-8 border-t border-neutral-200">
          <div class="flex flex-wrap gap-2 text-xs font-medium text-neutral-600">
            ${hashtagsHtml}
          </div>
        </div>
      </div>
    `;

  return {
    id: meta.id,
    regionId: meta.regionId,
    title: meta.title,
    description: meta.description,
    keywords: keywordsStr,
    date: '2026. 11. 19',
    author: '남도예술정원 공식 서포터즈',
    readTime: '6분',
    image: imgUrl(meta.heroImgIndex),
    content: fullContent
  };
}

processAllJindo().catch(console.error);
