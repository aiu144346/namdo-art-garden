// 8대 정원 포토갤러리 데이터베이스
export const GARDENS_GALLERY = {
  moon: {
    id: 'moon',
    gardenName: '문가든',
    enName: 'Moon Garden',
    postId: 'h26-haenam-moongarden-guide',
    description: '달빛이 머무는 조용한 치유의 정원, 문가든의 사계절 풍경과 드론 항공뷰 34선',
    images: Array.from({ length: 34 }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      let title = `문가든 풍경 ${i + 1}`;
      if (i < 5) title = `문가든 항공 파노라마 #${i + 1}`;
      else if (i < 15) title = `정원 산책로와 수목 #${i - 4}`;
      else if (i < 25) title = `야생화와 정원 오브제 #${i - 14}`;
      else title = `치유의 숲과 정원 전경 #${i - 24}`;

      return {
        id: `moon-${num}`,
        src: `/images/gardens/moon/garden-moon-${num}.webp`,
        thumb: `/images/gardens/moon/garden-moon-${num}.webp`,
        title: title,
        alt: `해남 문가든 전경 사진 ${num}`
      };
    })
  },
  baha: {
    id: 'baha',
    gardenName: '바하가든',
    enName: 'Baha Garden',
    postId: 'w14-wando-baha-garden',
    description: '소유보다 존재의 의미를 찾는 바람의 언덕, 완도 바하가든의 몽돌 해변과 비단잉어 연못 풍경 23선',
    images: Array.from({ length: 23 }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      let title = `바하가든 풍경 ${i + 1}`;
      if (i < 5) title = `바하가든 항공 파노라마 #${i + 1}`;
      else if (i < 12) title = `정원 잔디광장과 연못 풍경 #${i - 4}`;
      else if (i < 18) title = `산책로와 테라스 쉼터 #${i - 11}`;
      else title = `정원 식생과 감성 디테일 #${i - 17}`;

      return {
        id: `baha-${num}`,
        src: `/images/gardens/baha/garden-baha-${num}.webp`,
        thumb: `/images/gardens/baha/garden-baha-${num}.webp`,
        title: title,
        alt: `완도 바하가든 전경 사진 ${num}`
      };
    })
  },
  biwon: {
    id: 'biwon',
    gardenName: '비원',
    enName: 'Secret Garden',
    postId: 'h25-haenam-secret-garden',
    description: '산비탈 다랑이논의 아름다운 비밀, 해남 비원의 계단식 정원과 구룡폭포 풍경 37선',
    images: Array.from({ length: 37 }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      let title = `비원 풍경 ${i + 1}`;
      if (i < 6) title = `비원 항공 파노라마 #${i + 1}`;
      else if (i < 20) title = `다랑이 정원 및 구룡폭포 풍경 #${i - 5}`;
      else if (i < 30) title = `비밀의 숲 산책로 및 돌담길 #${i - 19}`;
      else title = `사계절 야생화 및 정원 디테일 #${i - 29}`;

      return {
        id: `biwon-${num}`,
        src: `/images/gardens/biwon/garden-biwon-${num}.webp`,
        thumb: `/images/gardens/biwon/garden-biwon-${num}.webp`,
        title: title,
        alt: `해남 비원 전경 사진 ${num}`
      };
    })
  },
  sani: {
    id: 'sani',
    gardenName: '산이정원',
    enName: 'Sani Garden',
    postId: 'h3-haenam-sanigarden-guide',
    description: '미래세대를 위한 꿈의 씨앗, 해남 산이정원의 16만 평 탄소중립 테마정원과 조형물 풍경 32선',
    images: Array.from({ length: 32 }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      let title = `산이정원 풍경 ${i + 1}`;
      if (i < 12) title = `산이정원 항공 파노라마 #${i + 1}`;
      else if (i < 22) title = `산이탑 및 예술 조형물 테마 #${i - 11}`;
      else if (i < 28) title = `서든힐 잔디광장 및 평지 산책로 #${i - 21}`;
      else title = `생태 수변 및 정원 디테일 #${i - 27}`;

      return {
        id: `sani-${num}`,
        src: `/images/gardens/sani/garden-sani-${num}.webp`,
        thumb: `/images/gardens/sani/garden-sani-${num}.webp`,
        title: title,
        alt: `해남 산이정원 전경 사진 ${num}`
      };
    })
  },
  wife: {
    id: 'wife',
    gardenName: '아내의 정원',
    enName: 'Home of Florist',
    postId: 'w7-wando-wife-garden',
    description: '아내를 향한 남편의 숲속 유럽형 정원, 완도 아내의 정원의 목조 온실과 빈티지 카라반 풍경 60선',
    images: Array.from({ length: 60 }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      let title = `아내의 정원 풍경 ${i + 1}`;
      if (i < 7) title = `아내의 정원 드론 항공 파노라마 #${i + 1}`;
      else if (i < 23) title = `목조 온실 카페 및 카라반 풍경 #${i - 6}`;
      else if (i < 43) title = `유럽풍 정원 산책로 및 숲길 #${i - 22}`;
      else title = `사계절 꽃과 감성 오브제 #${i - 42}`;

      return {
        id: `wife-${num}`,
        src: `/images/gardens/wife/garden-wife-${num}.webp`,
        thumb: `/images/gardens/wife/garden-wife-${num}.webp`,
        title: title,
        alt: `완도 아내의 정원 전경 사진 ${num}`
      };
    })
  },
  jindo: {
    id: 'jindo',
    gardenName: '진도휴식',
    enName: 'Jindo Rest',
    postId: 'j11-jindo-hyusik',
    description: '동백 숲과 바다가 건네는 오감의 환대, 진도휴식의 지중해풍 화이트 건축과 오션 둘레길 풍경 55선',
    images: Array.from({ length: 55 }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      let title = `진도휴식 풍경 ${i + 1}`;
      if (i < 5) title = `진도휴식 드론 항공 파노라마 #${i + 1}`;
      else if (i < 20) title = `지중해풍 화이트 건축 및 테라스 풍경 #${i - 4}`;
      else if (i < 38) title = `동백 숲길 및 해안 오션 산책로 #${i - 19}`;
      else title = `카페 휴식 공간 및 감성 디테일 #${i - 37}`;

      return {
        id: `jindo-${num}`,
        src: `/images/gardens/jindo/garden-jindo-${num}.webp`,
        thumb: `/images/gardens/jindo/garden-jindo-${num}.webp`,
        title: title,
        alt: `진도휴식 전경 사진 ${num}`
      };
    })
  },
  pine: {
    id: 'pine',
    gardenName: '파인클라우드',
    enName: 'Pine Cloud',
    postId: 's2-pinecloud-photo',
    description: '소나무와 구름 사이 사유의 즐거움, 파인클라우드의 명품 소나무와 100년 소철꽃 풍경 24선',
    images: Array.from({ length: 24 }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      let title = `파인클라우드 풍경 ${i + 1}`;
      if (i < 7) title = `파인클라우드 드론 항공 파노라마 #${i + 1}`;
      else if (i < 16) title = `명품 소나무 정원 및 연못 풍경 #${i - 6}`;
      else title = `소철 온실 및 9m 그네 산책로 #${i - 15}`;

      return {
        id: `pine-${num}`,
        src: `/images/gardens/pine/garden-pine-${num}.webp`,
        thumb: `/images/gardens/pine/garden-pine-${num}.webp`,
        title: title,
        alt: `신안 파인클라우드 전경 사진 ${num}`
      };
    })
  },
  '4est': {
    id: '4est',
    gardenName: '4est(포레스트)수목원',
    enName: '4est Arboretum',
    postId: 'h23-haenam-4est-arboretum',
    description: '별, 돌, 이야기, 배움이 있는 인생의 숲, 4est(포레스트)수목원의 트리하우스와 수국 군락 풍경 40선',
    images: Array.from({ length: 40 }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      let title = `4est(포레스트)수목원 풍경 ${i + 1}`;
      if (i < 9) title = `4est(포레스트)수목원 드론 항공 파노라마 #${i + 1}`;
      else if (i < 25) title = `트리하우스 및 숲속 데크 산책로 #${i - 8}`;
      else title = `수국 테마정원 및 사계절 쉼터 #${i - 24}`;

      return {
        id: `4est-${num}`,
        src: `/images/gardens/4est/garden-4est-${num}.webp`,
        thumb: `/images/gardens/4est/garden-4est-${num}.webp`,
        title: title,
        alt: `해남 4est(포레스트)수목원 전경 사진 ${num}`
      };
    })
  }
};

// 하위 호환 매핑
Object.defineProperty(GARDENS_GALLERY, 'forest', {
  value: GARDENS_GALLERY['4est'],
  enumerable: false,
  writable: true,
  configurable: true
});

// postId를 기반으로 정원 갤러리 매핑 검색
export const getGalleryByPostId = (postId) => {
  return Object.values(GARDENS_GALLERY).find(g => g.postId === postId);
};

export default GARDENS_GALLERY;
