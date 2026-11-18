import fs from 'fs';
import path from 'path';

const rawDump = JSON.parse(fs.readFileSync('scratch_docx_html.json', 'utf-8'));

const ARTICLES_META = [
  {
    docxKey: '05_남도예술정원_완도어반_김지태.docx',
    id: 'w24-wando-urban-grilled-fish',
    regionId: 'wando',
    slug: 'wando-urban',
    badge: '🐟 남도예술정원 지역 파트너 & 화덕생선구이 명소 | 완도',
    accentColor: 'amber',
    title: '완도맛집 추천 "완도어반"\n완도타워 여행코스로 즐기는 화덕생선구이 전문점',
    h1Top: '완도맛집 추천',
    h1Main: '“완도어반”',
    h1Sub: '완도타워 여행코스로 즐기는 화덕생선구이 전문점',
    subtitle: '완도타워 모노레일 승강장 바로 옆! 뜨거운 화덕에서 구워낸 겉바속촉 모둠 생선구이와 남도예술정원 여행주간 10% 할인 혜택까지',
    description: '완도타워와 스카이워크 관람 후 들르기 좋은 화덕생선구이·전복요리 전문점 완도어반! 남도예술정원 공식 지역파트너 10% 할인 혜택과 겉바속촉 모둠 생선구이, 정갈한 미역국 한 상 후기.',
    heroImgIndex: 2 // 사진-02_완도어반입구.jpg or 사진-01.jpg (01 is main dish table)
  },
  {
    docxKey: '02_남도예술정원_달스윗_김지태.docx',
    id: 'w25-wando-dalsweet-cafe',
    regionId: 'wando',
    slug: 'dalsweet',
    badge: '🥐 완도 핫플레이스 & 전복빵 시그니처 카페 | 완도읍·완도타워',
    accentColor: 'amber',
    title: '완도여행 필수코스, 전복빵과 비파 사이다로 유명한 "달스윗 카페"\n남도예술정원 여행주간 10% 할인 혜택!',
    h1Top: '완도여행 필수코스, 전복빵과 비파 사이다로 유명한',
    h1Main: '“달스윗 카페”',
    h1Sub: '남도예술정원 여행주간 10% 할인 혜택!',
    subtitle: '과거 국립수산물관리원을 리모델링한 감성 본점부터 다도해가 펼쳐지는 완도타워점까지, 장보고빵(전복빵)과 비파 사이다로 완성하는 완도 미식 여행',
    description: '전복 한 마리가 통째로 들어간 장보고빵(전복빵)과 상큼한 비파 사이다, 솔티드 버터크림라떼까지! 남도예술정원 여행주간 스탬프 투어 10% 할인 혜택을 누릴 수 있는 완도 달스윗 카페 본점 & 완도타워점 방문기.',
    heroImgIndex: 1
  },
  {
    docxKey: '03_남도예술정원_만남의 광장_김지태.docx',
    id: 'w26-wando-mannam-plaza',
    regionId: 'wando',
    slug: 'mannam-plaza',
    badge: '🍲 완도 아내의 정원 정원주 추천 로컬 맛집 | 완도',
    accentColor: 'emerald',
    title: '남도예술정원 완도 아내의 정원 지역파트너 "만남의 광장"\n현지인이 추천하는 로컬 닭코스 맛집',
    h1Top: '남도예술정원 완도 아내의 정원 지역파트너',
    h1Main: '“만남의 광장”',
    h1Sub: '현지인이 추천하는 남도 로컬 닭코스 맛집',
    subtitle: '사랑이 꽃피는 민간정원 아내의 정원에서 차로 1분! 닭육회부터 닭구이, 닭주물럭, 닭백숙, 녹두 닭죽까지 남도의 넉넉한 인심이 담긴 로컬 노포 미식회',
    description: '완도 아내의 정원 정원주님이 직접 추천한 현지인 로컬 맛집 만남의 광장! 신선한 닭육회, 담백한 닭구이, 매콤달콤 닭주물럭과 진한 닭백숙·녹두죽까지 풀코스로 즐기는 완도 보양 미식 여행.',
    heroImgIndex: 1
  },
  {
    docxKey: '04_남도예술정원_어반카페_김지태.docx',
    id: 'w27-wando-gugyedeung-urbancoffee',
    regionId: 'wando',
    slug: 'urban-coffee',
    badge: '🌊 다도해해상국립공원 & 지역파트너 카페 투어 | 완도 정도리·완도읍',
    accentColor: 'sky',
    title: '완도 가볼만한곳 다도해해상국립공원 "정도리 구계등"\n남도예술정원 지역파트너 완도어반·어반커피 여행 후기',
    h1Top: '완도 가볼만한곳 다도해해상국립공원 구계등과',
    h1Main: '“완도어반 · 어반커피”',
    h1Sub: '남도예술정원 지역파트너와 함께하는 바다 & 미식 여행 후기',
    subtitle: '갯돌이 파도에 속삭이는 정도리 구계등 해변 산책부터 화덕생선구이 맛집 완도어반, 루프탑 야외 테라스가 매력적인 어반커피까지 이어지는 힐링 코스',
    description: '다도해해상국립공원 정도리 구계등 갯돌해변의 고요한 산책과 남도예술정원 공식 지역파트너 완도어반 화덕생선구이, 그리고 2층 어반커피의 여유로운 티타임까지 한 번에 즐기는 완도 알짜 여행 코스.',
    heroImgIndex: 1
  },
  {
    docxKey: '06_남도예술정원여행주간_01_김지태.docx',
    id: 'h31-haenam-4est-jazz-concert',
    regionId: 'haenam',
    slug: 'travel-week-4est',
    badge: '🎸 남도예술정원 여행주간 예술무대 | 해남 포레스트(4est) 수목원',
    accentColor: 'emerald',
    title: '남도예술정원 여행주간 "해남 포레스트 수목원"\n귀촌 재즈기타리스트와 함께 가을 정원에서 즐기는 재즈 공연',
    h1Top: '남도예술정원 여행주간',
    h1Main: '“해남 포레스트 수목원”',
    h1Sub: '귀촌 재즈기타리스트와 함께하는 가을 정원 재즈 공연',
    subtitle: '6만 평 두륜산 숲을 물들인 가을빛 단풍 아래, 돗자리에 누워 감미로운 재즈 기타 선율에 귀 기울이는 로맨틱한 야외 정원 음악회',
    description: '전남 해남 포레스트(4est) 수목원에서 펼쳐진 남도예술정원 여행주간 특별 예술무대! 해남으로 귀촌한 재즈 기타리스트와 음악 친구들이 선사하는 가을 정원 속 야외 재즈 콘서트 현장 스케치.',
    heroImgIndex: 1
  },
  {
    docxKey: '07_남도예술정원여행주간_02_김지태.docx',
    id: 'h32-haenam-moongarden-exhibition',
    regionId: 'haenam',
    slug: 'travel-week-moongarden-art',
    badge: '🎨 남도예술정원 여행주간 특별 초대전 | 해남 민간정원 1호 문가든',
    accentColor: 'teal',
    title: '남도예술정원 여행주간, 해남 민간정원 1호 "문가든"\n자연과 동심이 어우러진 최순임 작가 초대전',
    h1Top: '남도예술정원 여행주간',
    h1Main: '해남 민간정원 1호 “문가든”',
    h1Sub: '정원 속 작은 미술관에서 만난 최순임 작가 초대전',
    subtitle: '〈보이는 것 모두 꽃, 생각하는 것 모두 달〉 — 아늑한 카페와 초록빛 앞마당 곳곳에 피어난 동화 같은 소녀와 고양이 조각·회화 전시',
    description: '남도예술정원 여행주간을 맞아 해남 민간정원 1호 문가든에서 열린 최순임 작가 초대전 〈보이는 것 모두 꽃, 생각하는 것 모두 달〉. 정원과 카페가 하나의 야외 미술관이 된 따뜻한 가을 예술 여행.',
    heroImgIndex: 1
  },
  {
    docxKey: '남08_도예술정원여행주간_03_김지태.docx',
    id: 'h33-haenam-moongarden-frame-craft',
    regionId: 'haenam',
    slug: 'travel-week-moongarden-craft',
    badge: '🖼️ 남도예술정원 여행주간 크리에이터 특화체험 | 해남 문가든',
    accentColor: 'emerald',
    title: '해남 가볼만한곳 "문가든" 남도예술정원 여행주간\n‘나만의 정원 액자 만들기’ 특별 체험 후기',
    h1Top: '해남 가볼만한곳 “문가든”',
    h1Main: '‘나만의 정원 액자 만들기’',
    h1Sub: '남도예술정원 여행주간 크리에이터 특화 체험 후기',
    subtitle: '숲속 아지트 같은 그린 타임 갤러리에서 파스텔과 문가든의 가을 들꽃, 세라믹 소품으로 세상에 하나뿐인 정원 액자를 완성하는 감성 클래스',
    description: '해남 민간정원 1호 문가든의 그린 타임 갤러리에서 진행된 남도예술정원 여행주간 특화 체험 ‘나만의 정원 액자 만들기’! 정원에서 직접 채집한 가을꽃과 파스텔로 나만의 작은 정원을 담아내는 힐링 체험기.',
    heroImgIndex: 1
  }
];

function buildArticleHtml(meta, rawHtml) {
  // Parse <p> blocks from mammoth HTML
  const pMatches = [...rawHtml.matchAll(/<p>(.*?)<\/p>/gs)].map(m => m[1].trim()).filter(Boolean);

  // Extract hashtags at the end
  let hashtags = [];
  const bodyBlocks = [];

  let inHashtags = false;
  for (const block of pMatches) {
    const plain = block.replace(/<[^>]+>/g, '').trim();
    if (!plain && !block.includes('__IMG_')) continue;

    // Skip title lines at the start
    if (plain.startsWith('제목') || plain === meta.h1Top || plain === meta.h1Main || plain === meta.h1Sub) {
      continue;
    }
    if (
      plain.includes('완도여행 필수코스') ||
      plain.includes('전복빵과 비파 사이다로 유명한') ||
      plain === '“달스윗 카페”' ||
      plain.includes('남도예술정원 여행주간 10% 할인 혜택!') ||
      plain === '“해남 포레스트 수목원”,' ||
      plain === '귀촌 재즈기타리스트와 함께하는' ||
      plain === '가을 정원에서 즐기는 재즈 공연' ||
      plain === '해남 민간정원 1호 “문가든”에서 만난' ||
      plain === '최순임 작가 초대전' ||
      plain === '남도예술정원 여행주간' ||
      plain === '‘나만의 정원 액자 만들기’ 체험 후기'
    ) {
      if (!block.includes('__IMG_')) continue;
    }

    if (plain === '해시태그' || plain.startsWith('#')) {
      inHashtags = true;
      const tags = plain.match(/#[^\s#]+/g);
      if (tags) hashtags.push(...tags);
      continue;
    }
    if (inHashtags) {
      const tags = plain.match(/#[^\s#]+/g);
      if (tags) hashtags.push(...tags);
      continue;
    }

    bodyBlocks.push(block);
  }

  // Group consecutive image-only blocks together so we can render 1 image wide, 2 images in 2-col grid
  const tokens = [];
  for (const b of bodyBlocks) {
    const imgs = [...b.matchAll(/__IMG_(\d+)__/g)].map(m => parseInt(m[1], 10));
    const textOnly = b.replace(/<img[^>]*>/g, '').replace(/<[^>]+>/g, '').trim();

    if (imgs.length > 0) {
      if (tokens.length > 0 && tokens[tokens.length - 1].type === 'images') {
        tokens[tokens.length - 1].indices.push(...imgs);
      } else {
        tokens.push({ type: 'images', indices: [...imgs] });
      }
    }
    if (textOnly) {
      if (textOnly.startsWith('소제목')) {
        const subTitleText = textOnly.replace(/^소제목-\d+\s*:\s*/, '').trim();
        tokens.push({ type: 'subheading', text: subTitleText });
      } else {
        tokens.push({ type: 'text', text: textOnly });
      }
    }
  }

  const colorMap = {
    amber: {
      badgeBg: 'bg-amber-500/10 text-amber-800',
      accentText: 'text-amber-700',
      boxBg: 'bg-[#fdfaf5] border-amber-100',
      numBg: 'bg-amber-700',
      tagHover: 'hover:bg-amber-50 hover:text-amber-700',
      outroAccent: 'text-amber-400'
    },
    emerald: {
      badgeBg: 'bg-emerald-500/10 text-emerald-800',
      accentText: 'text-emerald-700',
      boxBg: 'bg-[#f4faf6] border-emerald-100',
      numBg: 'bg-emerald-700',
      tagHover: 'hover:bg-emerald-50 hover:text-emerald-700',
      outroAccent: 'text-emerald-400'
    },
    teal: {
      badgeBg: 'bg-teal-500/10 text-teal-800',
      accentText: 'text-teal-700',
      boxBg: 'bg-[#f3faf9] border-teal-100',
      numBg: 'bg-teal-700',
      tagHover: 'hover:bg-teal-50 hover:text-teal-700',
      outroAccent: 'text-teal-400'
    },
    sky: {
      badgeBg: 'bg-sky-500/10 text-sky-800',
      accentText: 'text-sky-700',
      boxBg: 'bg-[#f3f9fc] border-sky-100',
      numBg: 'bg-sky-700',
      tagHover: 'hover:bg-sky-50 hover:text-sky-700',
      outroAccent: 'text-sky-400'
    }
  };
  const c = colorMap[meta.accentColor] || colorMap.emerald;

  const imgUrl = (idx) => `/images/${meta.slug}/${meta.slug}-${String(idx).padStart(2, '0')}.webp`;

  let bodyHtml = '';
  let sectionIdx = 1;

  for (let i = 0; i < tokens.length; i++) {
    const tk = tokens[i];
    if (tk.type === 'subheading') {
      const numStr = String(sectionIdx++).padStart(2, '0');
      bodyHtml += `
        <div class="flex items-center gap-3 pt-6">
          <span class="w-8 h-8 rounded-full ${c.numBg} text-white flex items-center justify-center font-bold text-sm">${numStr}</span>
          <h2 class="text-2xl md:text-3xl font-serif font-bold text-neutral-900">${tk.text}</h2>
        </div>`;
    } else if (tk.type === 'text') {
      if (i <= 1) {
        bodyHtml += `
        <div class="${c.boxBg} p-6 md:p-8 rounded-3xl border shadow-sm">
          <p class="text-base md:text-lg font-medium text-neutral-800 leading-relaxed">${tk.text}</p>
        </div>`;
      } else {
        bodyHtml += `
        <p class="text-neutral-700 text-base md:text-lg leading-relaxed">${tk.text}</p>`;
      }
    } else if (tk.type === 'images') {
      const indices = tk.indices;
      if (indices.length === 1) {
        bodyHtml += `
        <div class="rounded-3xl overflow-hidden shadow-lg border border-neutral-100 max-h-[580px]">
          <img src="${imgUrl(indices[0])}" alt="${meta.h1Main.replace(/[“”"]/g, '')} 현장 사진 ${indices[0]}" class="w-full h-full object-cover" loading="lazy" />
        </div>`;
      } else {
        // Pair them in 2-col grids, if odd number render the first or last wide
        let k = 0;
        if (indices.length % 2 === 1) {
          bodyHtml += `
        <div class="rounded-3xl overflow-hidden shadow-lg border border-neutral-100 max-h-[580px]">
          <img src="${imgUrl(indices[0])}" alt="${meta.h1Main.replace(/[“”"]/g, '')} 현장 사진 ${indices[0]}" class="w-full h-full object-cover" loading="lazy" />
        </div>`;
          k = 1;
        }
        if (k < indices.length) {
          bodyHtml += `\n        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
          for (; k < indices.length; k++) {
            bodyHtml += `
          <div class="rounded-2xl overflow-hidden shadow-md border border-neutral-100">
            <img src="${imgUrl(indices[k])}" alt="${meta.h1Main.replace(/[“”"]/g, '')} 현장 사진 ${indices[k]}" class="w-full h-72 md:h-80 object-cover" loading="lazy" />
          </div>`;
          }
          bodyHtml += `\n        </div>`;
        }
      }
    }
  }

  const hashtagsHtml = hashtags.map(tag =>
    `<span class="bg-surface px-3.5 py-1.5 rounded-full border border-neutral-100 ${c.tagHover} transition-colors">${tag}</span>`
  ).join('\n              ');

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
    author: '남도예술정원 서포터즈 (김지태)',
    readTime: '5분',
    image: imgUrl(meta.heroImgIndex),
    content: fullContent
  };
}

const generatedPosts = {};
const generatedRegions = [];

for (const meta of ARTICLES_META) {
  const raw = rawDump[meta.docxKey];
  if (!raw) {
    console.error('Missing docx dump for', meta.docxKey);
    continue;
  }
  const postObj = buildArticleHtml(meta, raw.html);
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
  console.log(`✓ Generated article [${meta.id}]: ${meta.title.replace(/\n/g, ' / ')}`);
}

// 1. Inject into src/data/postsMain.js
let postsMainContent = fs.readFileSync('src/data/postsMain.js', 'utf-8');
let newEntriesCode = '';
for (const [id, post] of Object.entries(generatedPosts)) {
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
console.log('✓ Updated src/data/postsMain.js with 7 new articles');

// 2. Inject into src/data/regions.json
const regionsArr = JSON.parse(fs.readFileSync('src/data/regions.json', 'utf-8'));
const existingIds = new Set(regionsArr.map(r => r.id));
const filteredNewRegions = generatedRegions.filter(r => !existingIds.has(r.id));
const updatedRegions = [...filteredNewRegions, ...regionsArr];
fs.writeFileSync('src/data/regions.json', JSON.stringify(updatedRegions, null, 2), 'utf-8');
console.log('✓ Updated src/data/regions.json with 7 new region gallery items');

// 3. Update src/pages/PostsArchive/index.jsx isFeatured list
let archiveContent = fs.readFileSync('src/pages/PostsArchive/index.jsx', 'utf-8');
const newIdsCode = ARTICLES_META.map(m => `        '${m.id}',`).join('\n');
archiveContent = archiveContent.replace(
  "const isFeatured = [\n",
  `const isFeatured = [\n${newIdsCode}\n`
);
fs.writeFileSync('src/pages/PostsArchive/index.jsx', archiveContent, 'utf-8');
console.log('✓ Updated src/pages/PostsArchive/index.jsx featured priority list');
