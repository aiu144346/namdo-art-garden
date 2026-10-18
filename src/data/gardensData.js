// 8대 정원 공식 마스터 데이터베이스 (프리미엄 랜딩페이지용)
export const GARDENS_MASTER = {
  moon: {
    id: 'moon',
    number: '01',
    name: '문가든',
    enName: 'Moon Garden',
    officialTitle: '전라남도 제14호 민간정원',
    area: '10,689㎡ (약 3,230평)',
    region: '해남',
    regionEn: 'Haenam',
    slogan: '달빛이 머무는 조용한 치유의 정원',
    summary: '인위적인 조형물 대신 오류제의 잔잔한 호수 풍경과 계룡산 능선의 지형을 그대로 살린 1만 ㎡ 규모의 자연주의 정원입니다.',
    heroImages: [
      '/images/gardens/moon/garden-moon-01.webp',
      '/images/gardens/moon/garden-moon-02.webp',
      '/images/gardens/moon/garden-moon-06.webp',
      '/images/gardens/moon/garden-moon-14.webp'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=OchvsecQrpg',
    storyPostId: 'h26-haenam-moongarden-guide',
    
    // 핵심 방문 정보
    visitorInfo: {
      address: '전라남도 해남군 계곡면 오류골길 64',
      addressShort: '해남군 계곡면 오류골길 64',
      openHours: '10:00 ~ 18:00 (라스트오더 17:30)',
      closedDays: '매주 월요일 정기휴무',
      admission: '카페 1인 1음료 주문 시 정원 무료 관람',
      parking: '카페 전용 주차장 완비 (무료 이용)',
      petPolicy: '정원 식생 보호를 위해 반려동물 동반 불가',
      facilities: ['전망 카페', '호수 산책 데크', '숲속 오두막', '야외 힐링 벤치', '남녀 분리 화장실', '무선 인터넷']
    },

    // 3대 핵심 매력
    highlights: [
      {
        tag: 'Lake & Forest',
        title: '오류제 호수를 품은 워터프론트 뷰',
        desc: '정원 어느 곳에서나 잔잔한 오류제 저수지와 수변 식생이 어우러지는 파노라마 풍경을 감상할 수 있습니다.'
      },
      {
        tag: 'Naturalist Garden',
        title: '자연의 지형을 살린 1만 ㎡ 산책로',
        desc: '인공 구조물을 최소화하고 자연적인 굴곡과 계곡, 숲의 숨결을 그대로 유지하여 걷는 것만으로 깊은 치유를 선사합니다.'
      },
      {
        tag: 'Healing Space',
        title: '통창 카페와 숲속 감성 오두막',
        desc: '향긋한 커피와 함께 정원 전경을 내려다보는 통창 카페와 동화 같은 야외 오두막 쉼터가 마련되어 있습니다.'
      }
    ],

    // 포토스팟 가이드
    photoSpots: [
      {
        spot: 'Spot 01',
        title: '오류제 호수 전망 데크',
        desc: '물안개가 피어오르는 아침이나 석양이 지는 늦은 오후, 잔잔한 수면과 정원이 한 폭의 수채화처럼 담기는 메인 포토존입니다.',
        img: '/images/gardens/moon/garden-moon-02.webp'
      },
      {
        spot: 'Spot 02',
        title: '비밀의 숲 오두막 쉼터',
        desc: '나무 숲속에 아늑하게 자리 잡은 목조 오두막. 동화 속 요정의 쉼터 같은 따뜻한 감성 사진을 연출할 수 있습니다.',
        img: '/images/gardens/moon/garden-moon-06.webp'
      },
      {
        spot: 'Spot 03',
        title: '초록 터널 산책길',
        desc: '사계절 야생화와 수목이 감싸 안은 오솔길. 걷는 뒷모습이나 자연스러운 산책 장면을 담기에 가장 아름답습니다.',
        img: '/images/gardens/moon/garden-moon-14.webp'
      }
    ],

    // 철학 및 스토리
    philosophy: {
      quote: '정원은 인위적으로 만드는 것이 아니라, 대자연이 써 내려간 시나리오에 사람이 쉼표 하나를 얹는 일입니다.',
      author: '문가든 정원주',
      content: `문가든은 '문(Moon)' 씨 성을 가진 정원주가 오랜 세월 흙과 나무를 어루만지며 가꾼 결실입니다. 
처음부터 관광지를 목표로 인공물을 세우지 않고, 본래 그 자리에 있던 소나무와 지형, 저수지의 물결을 존중하며 한 그루 한 포기 정성을 더했습니다.
봄에는 수선화와 야생화가 깨어나고, 여름에는 짙은 녹음이 오류제 호수를 푸르게 물들이며, 가을에는 은빛 억새와 단풍이, 겨울에는 고요한 눈 덮인 숲이 사색의 시간을 선사합니다.`
    },

    // 34장 사진 갤러리 메타
    gallery: {
      categories: [
        { id: 'all', name: '전체 (34)' },
        { id: 'aerial', name: '드론 항공뷰 (5)' },
        { id: 'trail', name: '산책로 & 수목 (10)' },
        { id: 'flower', name: '야생화 & 오브제 (10)' },
        { id: 'scenery', name: '호수 & 전경 (9)' }
      ],
      items: Array.from({ length: 34 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        let category = 'scenery';
        let title = `문가든 풍경 ${i + 1}`;

        if (i < 5) {
          category = 'aerial';
          title = `문가든 드론 항공 파노라마 #${i + 1}`;
        } else if (i < 15) {
          category = 'trail';
          title = `정원 숲길 및 산책로 풍경 #${i - 4}`;
        } else if (i < 25) {
          category = 'flower';
          title = `정원 야생화 및 감성 디테일 #${i - 14}`;
        } else {
          category = 'scenery';
          title = `오류제 호수와 정원 쉼터 #${i - 24}`;
        }

        return {
          id: `moon-${num}`,
          num: num,
          category: category,
          src: `/images/gardens/moon/garden-moon-${num}.webp`,
          thumb: `/images/gardens/moon/garden-moon-${num}.webp`,
          title: title,
          alt: `해남 문가든 고화질 전경 사진 ${num}`
        };
      })
    },

    // 인접 연계 정원
    nearbyGardens: [
      { id: 'sani', name: '산이정원', region: '해남', distance: '차량 25분', desc: '미래세대를 위한 친환경 정원', img: '/images/gardens/sani/garden-sani-01.webp' },
      { id: '4est', name: '4est(포레스트)수목원', region: '해남', distance: '차량 30분', desc: '사계절 꽃과 이야기가 있는 숲', img: '/images/gardens/4est/garden-4est-01.webp' },
      { id: 'biwon', name: '비원', region: '해남', distance: '차량 35분', desc: '산비탈 다랑이논의 비밀 정원', img: '/images/gardens/biwon/garden-biwon-01.webp' }
    ]
  },

  // 다른 7개 정원 기본 뼈대
  baha: {
    id: 'baha',
    number: '02',
    name: '바하가든',
    enName: 'Baha Garden',
    officialTitle: '전남 예쁜정원 콘테스트 우수상',
    area: '약 2,640㎡ (약 800평)',
    region: '완도',
    regionEn: 'Wando',
    slogan: '소유보다 존재의 의미를 찾는 바람의 언덕',
    summary: '국가 명승 제3호 정도리 구계등의 몽돌 해변 곁에 자리한 800평 규모의 열린 정원으로, 다도해의 바람과 비단잉어 연못이 어우러진 완도 최고의 힐링 명소입니다.',
    heroImages: [
      '/images/gardens/baha/garden-baha-01.webp',
      '/images/gardens/baha/garden-baha-02.webp',
      '/images/gardens/baha/garden-baha-06.webp',
      '/images/gardens/baha/garden-baha-13.webp'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=v-NpCjFLGfk',
    storyPostId: 'w14-wando-baha-garden',

    // 방문 정보
    visitorInfo: {
      address: '전라남도 완도군 완도읍 구계등길 36',
      addressShort: '완도군 완도읍 구계등길 36',
      openHours: '09:00 ~ 19:00 (사계절 상시 개방)',
      closedDays: '연중무휴',
      admission: '무료 관람 (민간 정원 개방 정책)',
      parking: '전용 주차장 완비 (무료 이용)',
      petPolicy: '목줄 착용 시 정원 산책 가능',
      facilities: ['감성 카페', '바하펜션', '비단잉어 연못', '인공폭포', '달구경대 전망대', '잔디 소공연장', '무선 인터넷']
    },

    // 3대 핵심 매력
    highlights: [
      {
        tag: 'Coast & Breeze',
        title: '명승 구계등 몽돌 해변과 맞닿은 힐링',
        desc: '파도에 몽돌 구르는 소리가 들려오는 정도리 구계등 해변 곁에 위치하여, 바다 내음과 숲의 정취를 동시에 누릴 수 있습니다.'
      },
      {
        tag: 'Living Waters',
        title: '비단잉어 연못과 시원한 인공폭포',
        desc: '화려한 비단잉어들이 유영하는 맑은 연못과 자연석 사이로 흐르는 폭포 물소리가 마음을 편안하게 씻어줍니다.'
      },
      {
        tag: 'Open Garden',
        title: '누구나 자유롭게 머무는 열린 정원',
        desc: '2024~2025 전남 예쁜정원 콘테스트 우수상을 수상한 800평 정원으로, 카페 이용 부담 없이 누구나 산책할 수 있습니다.'
      }
    ],

    // 포토스팟 가이드
    photoSpots: [
      {
        spot: 'Spot 01',
        title: '달구경대 오션뷰 테라스',
        desc: '정원 가장 높은 곳에 위치한 전망대로, 푸른 다도해와 완도 앞바다가 파노라마처럼 펼쳐지는 황금 포토존입니다.',
        img: '/images/gardens/baha/garden-baha-02.webp'
      },
      {
        spot: 'Spot 02',
        title: '비단잉어 연못 & 돌다리',
        desc: '화려한 잉어들이 모여드는 연못 위 아담한 돌다리와 폭포를 배경으로 그림 같은 풍경을 담을 수 있습니다.',
        img: '/images/gardens/baha/garden-baha-06.webp'
      },
      {
        spot: 'Spot 03',
        title: '잔디광장 & 이국적 건축 전경',
        desc: '정갈하게 가꿔진 푸른 잔디와 붉은 지붕 건축물이 어우러져 유럽의 작은 휴양지에 온 듯한 분위기를 연출합니다.',
        img: '/images/gardens/baha/garden-baha-13.webp'
      }
    ],

    // 철학 및 스토리
    philosophy: {
      quote: '정원은 소유하는 것이 아니라, 바람처럼 스쳐 가는 모든 이들과 함께 나누는 존재의 공간입니다.',
      author: '바하가든 정원주',
      content: `바하가든은 헤어디자이너이자 플로리스트인 정원주가 오랜 시간 손수 나무를 심고 돌을 쌓아 가꾼 800평의 정원입니다.
완도 정도리의 거친 바닷바람 속에서도 계절마다 고운 꽃을 피워내는 식물들을 보며, 삶의 소중한 위로를 얻었습니다.
정원을 담장 안에 가두지 않고 여행자 누구에게나 활짝 열어둔 이유는, 
이곳을 찾는 모든 이들이 잠시 일상의 짐을 내려놓고 바람과 파도 소리에 귀 기울이기를 바라는 마음 때문입니다.`
    },

    // 23장 사진 갤러리 메타
    gallery: {
      categories: [
        { id: 'all', name: '전체 (23)' },
        { id: 'aerial', name: '드론 항공뷰 (5)' },
        { id: 'scenery', name: '정원 전경 & 연못 (7)' },
        { id: 'trail', name: '산책로 & 쉼터 (6)' },
        { id: 'flower', name: '야생화 & 디테일 (5)' }
      ],
      items: Array.from({ length: 23 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        let category = 'scenery';
        let title = `바하가든 풍경 ${i + 1}`;

        if (i < 5) {
          category = 'aerial';
          title = `바하가든 드론 항공 파노라마 #${i + 1}`;
        } else if (i < 12) {
          category = 'scenery';
          title = `정원 잔디광장 및 연못 풍경 #${i - 4}`;
        } else if (i < 18) {
          category = 'trail';
          title = `산책로 및 테라스 쉼터 #${i - 11}`;
        } else {
          category = 'flower';
          title = `정원 식생 및 감성 디테일 #${i - 17}`;
        }

        return {
          id: `baha-${num}`,
          num: num,
          category: category,
          src: `/images/gardens/baha/garden-baha-${num}.webp`,
          thumb: `/images/gardens/baha/garden-baha-${num}.webp`,
          title: title,
          alt: `완도 바하가든 고화질 전경 사진 ${num}`
        };
      })
    },

    // 인접 연계 정원
    nearbyGardens: [
      { id: 'wife', name: '아내의 정원', region: '완도', distance: '차량 15분', desc: '아내를 향한 남편의 숲속 유럽형 정원', img: '/images/main-intro-14.webp' },
      { id: 'moon', name: '문가든', region: '해남', distance: '차량 45분', desc: '달빛이 머무는 조용한 치유의 정원', img: '/images/gardens/moon/garden-moon-01.webp' },
      { id: 'sani', name: '산이정원', region: '해남', distance: '차량 50분', desc: '미래세대를 위한 꿈의 씨앗', img: '/images/main-intro-13.webp' }
    ]
  },
  biwon: {
    id: 'biwon',
    number: '03',
    name: '비원',
    enName: 'Secret Garden',
    officialTitle: '전라남도 제28호 민간정원',
    area: '다랑이 논 개간 층상 구조 (약 3,000평)',
    region: '해남',
    regionEn: 'Haenam',
    slogan: '산비탈 다랑이논의 아름다운 비밀',
    summary: '산비탈 다랑이 논의 지형을 그대로 보존하여 계단식으로 빚어낸 독특한 층상 구조의 정원으로, 1,600여 종의 수목과 시원한 구룡폭포의 물소리가 완벽한 힐링을 선사합니다.',
    heroImages: [
      '/images/gardens/biwon/garden-biwon-01.webp',
      '/images/gardens/biwon/garden-biwon-02.webp',
      '/images/gardens/biwon/garden-biwon-07.webp',
      '/images/gardens/biwon/garden-biwon-12.webp'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=pvljDsnK7Os',
    storyPostId: 'h25-haenam-secret-garden',

    // 방문 정보
    visitorInfo: {
      address: '전라남도 해남군 삼산면 가재길 171',
      addressShort: '해남군 삼산면 가재길 171',
      openHours: '10:00 ~ 18:00 (사계절 상시 운영)',
      closedDays: '연중무휴 (기상 악화 시 변동 가능)',
      admission: '카페 1인 1메뉴 주문 시 정원 관람 포함',
      parking: '입구 전용 주차장 완비 (대형 버스/승용차 무료)',
      petPolicy: '정원 식생 보호를 위해 반려동물 동반 제한',
      facilities: ['숲속 힐링 카페', '구룡폭포', '한울정원', '바람의 정원', '비밀의 숲 산책로', '야외 테라스 쉼터', '무선 인터넷']
    },

    // 3대 핵심 매력
    highlights: [
      {
        tag: 'Terraced Garden',
        title: '다랑이논의 굴곡을 살린 계단식 층상 정원',
        desc: '한국 전통 다랑이 논의 유려한 능선과 자연석 돌담을 따라 1,600여 종의 야생화와 수목이 층층이 펼쳐집니다.'
      },
      {
        tag: 'Waterfall & Forest',
        title: '구룡폭포의 시원한 물소리와 비움의 미학',
        desc: '기암괴석 사이로 시원하게 쏟아지는 구룡폭포의 물줄기가 오감을 깨우며 자연 속 온전한 사색의 시간을 선사합니다.'
      },
      {
        tag: 'Scenic Cafe',
        title: '숲속 힐링 카페와 파노라마 전망 쉼터',
        desc: '정원 최상단에서 다랑이 정원 전체와 해남의 푸른 산세를 내려다보며 여유로운 차 한 잔을 즐길 수 있습니다.'
      }
    ],

    // 포토스팟 가이드
    photoSpots: [
      {
        spot: 'Spot 01',
        title: '구룡폭포 앞 수변 데크',
        desc: '수직으로 시원하게 떨어지는 폭포수와 자연석 바위가 어우러지는 비원의 가장 대표적인 메인 포토존입니다.',
        img: '/images/gardens/biwon/garden-biwon-07.webp'
      },
      {
        spot: 'Spot 02',
        title: '다랑이 테라스 산책로',
        desc: '계단식 층상 구조의 정원과 다채로운 초목들이 한눈에 담기는 뷰포인트로 이국적인 정취를 자랑합니다.',
        img: '/images/gardens/biwon/garden-biwon-02.webp'
      },
      {
        spot: 'Spot 03',
        title: '비밀의 숲 돌담길',
        desc: '수목이 울창하게 우거진 오솔길과 고즈넉한 돌담 사이로 쏟아지는 아침 햇살을 담기에 최적의 장소입니다.',
        img: '/images/gardens/biwon/garden-biwon-12.webp'
      }
    ],

    // 철학 및 스토리
    philosophy: {
      quote: '자연의 지형을 거스르지 않고, 흙의 높낮이와 돌의 결을 따라 길을 낼 때 비로소 정원은 살아 숨 쉽니다.',
      author: '비원 정원주',
      content: `비원은 조상들이 척박한 산비탈을 일구어 만든 다랑이 논의 역사와 지형을 고스란히 품고 있습니다.
평지로 밀어버리는 현대적 개발 대신, 흙과 바위의 단차를 그대로 살려 층층마다 서로 다른 매력의 수목과 꽃을 심었습니다.
봄이면 산비탈을 따라 1,600여 종의 야생화가 물결치고, 여름이면 구룡폭포의 시원한 물보라가 더위를 식혀주며, 
가을에는 울창한 단풍이 산등성이를 붉게 물들여 사계절 내내 자연의 경이로움을 선물합니다.`
    },

    // 37장 사진 갤러리 메타
    gallery: {
      categories: [
        { id: 'all', name: '전체 (37)' },
        { id: 'aerial', name: '드론 항공뷰 (6)' },
        { id: 'waterfall', name: '다랑이 정원 & 폭포 (14)' },
        { id: 'trail', name: '산책로 & 숲길 (10)' },
        { id: 'flower', name: '야생화 & 디테일 (7)' }
      ],
      items: Array.from({ length: 37 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        let category = 'waterfall';
        let title = `비원 풍경 ${i + 1}`;

        if (i < 6) {
          category = 'aerial';
          title = `비원 드론 항공 파노라마 #${i + 1}`;
        } else if (i < 20) {
          category = 'waterfall';
          title = `다랑이 정원 및 구룡폭포 풍경 #${i - 5}`;
        } else if (i < 30) {
          category = 'trail';
          title = `비밀의 숲 산책로 및 돌담길 #${i - 19}`;
        } else {
          category = 'flower';
          title = `사계절 야생화 및 정원 디테일 #${i - 29}`;
        }

        return {
          id: `biwon-${num}`,
          num: num,
          category: category,
          src: `/images/gardens/biwon/garden-biwon-${num}.webp`,
          thumb: `/images/gardens/biwon/garden-biwon-${num}.webp`,
          title: title,
          alt: `해남 비원 고화질 전경 사진 ${num}`
        };
      })
    },

    // 인접 연계 정원
    nearbyGardens: [
      { id: 'moon', name: '문가든', region: '해남', distance: '차량 25분', desc: '달빛이 머무는 조용한 치유의 정원', img: '/images/gardens/moon/garden-moon-01.webp' },
      { id: '4est', name: '4est(포레스트)수목원', region: '해남', distance: '차량 15분', desc: '별, 돌, 이야기, 배움이 있는 인생의 숲', img: '/images/gardens/4est/garden-4est-01.webp' },
      { id: 'sani', name: '산이정원', region: '해남', distance: '차량 35분', desc: '미래세대를 위한 꿈의 씨앗', img: '/images/gardens/sani/garden-sani-01.webp' }
    ]
  },
  sani: {
    id: 'sani',
    number: '04',
    name: '산이정원',
    enName: 'Sani Garden',
    officialTitle: '전라남도 제1호 탄소중립 테마정원',
    area: '약 520,000㎡ (약 16만 평 규모)',
    region: '해남',
    regionEn: 'Haenam',
    slogan: '미래세대를 위한 꿈의 씨앗',
    summary: '솔라시도 스마트시티의 중심에 피어난 16만 평 규모의 미래형 복합정원으로, 탄소중립 생태 철학과 현대적 예술 조형물, 드넓은 잔디언덕이 어우러진 대한민국 최고의 생태정원입니다.',
    heroImages: [
      '/images/gardens/sani/garden-sani-01.webp',
      '/images/gardens/sani/garden-sani-04.webp',
      '/images/gardens/sani/garden-sani-07.webp',
      '/images/gardens/sani/garden-sani-15.webp'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=9Pj4yPWcZrg',
    storyPostId: 'h3-haenam-sanigarden-guide',

    // 방문 정보
    visitorInfo: {
      address: '전라남도 해남군 산이면 산이로 173',
      addressShort: '해남군 산이면 산이로 173',
      openHours: '09:00 ~ 18:00 (입장 마감 17:00)',
      closedDays: '연중무휴',
      admission: '성인 10,000원 / 청소년·어린이 8,000원 (해남군민 50% 할인)',
      parking: '초대형 무료 전용 주차장 (전기차 급속 충전소 완비)',
      petPolicy: '목줄 및 배변봉투 지참 시 정원 산책 가능',
      facilities: ['방문자 센터', '전망 갤러리 카페', '산이탑 조형물', '서든힐 잔디언덕', '미로정원', '어린이 생태놀이터', '유모차·휠체어 무료 대여']
    },

    // 3대 핵심 매력
    highlights: [
      {
        tag: 'Carbon Neutral',
        title: '16만 평 영암호 간척지의 기적, 탄소중립 랜드마크',
        desc: '불모의 간척지를 생태계가 살아 숨 쉬는 푸른 숲과 수변 정원으로 탈바꿈시킨 미래형 친환경 복합정원입니다.'
      },
      {
        tag: 'Barrier-Free',
        title: '교통약자도 편안한 전 구간 무장애 평지 동선',
        desc: '턱이 없는 완만한 평지 산책로와 유모차·휠체어 무료 대여로 3대가 함께 쾌적하게 거닐 수 있습니다.'
      },
      {
        tag: 'Art & Play',
        title: '현대 미술과 대자연의 하모니, 산이탑 & 조형 테마존',
        desc: '세계적 설치 미술 조형물과 서든힐 잔디언덕, 신비로운 미로정원이 끝없는 포토제닉한 순간을 선사합니다.'
      }
    ],

    // 포토스팟 가이드
    photoSpots: [
      {
        spot: 'Spot 01',
        title: '산이탑 & 서든힐 잔디언덕',
        desc: '푸른 하늘과 끝없이 펼쳐진 잔디언덕, 상징 조형물인 산이탑이 어우러지는 광활한 파노라마 뷰포인트입니다.',
        img: '/images/gardens/sani/garden-sani-07.webp'
      },
      {
        spot: 'Spot 02',
        title: '미로정원 & 조형 산책길',
        desc: '동화 속 비밀 공간 같은 초록빛 미로와 감각적인 예술 조형물을 배경으로 인생샷을 남길 수 있습니다.',
        img: '/images/gardens/sani/garden-sani-15.webp'
      },
      {
        spot: 'Spot 03',
        title: '호수 수변 산책로 & 반영 뷰',
        desc: '영암호와 맞닿은 수변 데크에서 잔잔한 수면에 비치는 정원과 뭉게구름을 담기에 가장 아름답습니다.',
        img: '/images/gardens/sani/garden-sani-04.webp'
      }
    ],

    // 철학 및 스토리
    philosophy: {
      quote: '우리가 심는 한 그루의 나무는 지금의 풍경이 아니라, 100년 뒤 미래세대가 뛰어놀 푸른 지구가 될 것입니다.',
      author: '산이정원 설립 철학',
      content: `산이정원은 기후변화 위기 속에서 지속가능한 생태계와 자연의 소중함을 일깨우기 위해 탄생했습니다.
과거 바다를 메워 만든 영암호 간척지 위에, 나무를 심고 흙을 살려 수많은 생명들이 깃드는 거대한 생태 안식처를 조성했습니다.
태양과 바람의 청정에너지를 활용하고 탄소 배출을 줄이는 미래형 정원의 표준을 제시하며,
아이들에게는 자연 속 신나는 배움터가 되고, 어른들에게는 삶의 쉼표가 되는 공존의 미래를 열어갑니다.`
    },

    // 32장 사진 갤러리 메타
    gallery: {
      categories: [
        { id: 'all', name: '전체 (32)' },
        { id: 'aerial', name: '드론 항공뷰 (12)' },
        { id: 'sculpture', name: '조형물 & 건축 (10)' },
        { id: 'trail', name: '산책로 & 잔디광장 (6)' },
        { id: 'nature', name: '생태 & 디테일 (4)' }
      ],
      items: Array.from({ length: 32 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        let category = 'sculpture';
        let title = `산이정원 풍경 ${i + 1}`;

        if (i < 12) {
          category = 'aerial';
          title = `산이정원 드론 항공 파노라마 #${i + 1}`;
        } else if (i < 22) {
          category = 'sculpture';
          title = `산이탑 및 예술 조형물 테마 #${i - 11}`;
        } else if (i < 28) {
          category = 'trail';
          title = `서든힐 잔디광장 및 평지 산책로 #${i - 21}`;
        } else {
          category = 'nature';
          title = `생태 수변 및 정원 디테일 #${i - 27}`;
        }

        return {
          id: `sani-${num}`,
          num: num,
          category: category,
          src: `/images/gardens/sani/garden-sani-${num}.webp`,
          thumb: `/images/gardens/sani/garden-sani-${num}.webp`,
          title: title,
          alt: `해남 산이정원 고화질 전경 사진 ${num}`
        };
      })
    },

    // 인접 연계 정원
    nearbyGardens: [
      { id: 'moon', name: '문가든', region: '해남', distance: '차량 25분', desc: '달빛이 머무는 조용한 치유의 정원', img: '/images/gardens/moon/garden-moon-01.webp' },
      { id: 'biwon', name: '비원', region: '해남', distance: '차량 35분', desc: '산비탈 다랑이논의 아름다운 비밀', img: '/images/gardens/biwon/garden-biwon-01.webp' },
      { id: '4est', name: '4est(포레스트)수목원', region: '해남', distance: '차량 40분', desc: '별, 돌, 이야기, 배움이 있는 인생의 숲', img: '/images/gardens/4est/garden-4est-01.webp' }
    ]
  },
  wife: {
    id: 'wife',
    number: '05',
    name: '아내의 정원',
    enName: 'Home of Florist',
    officialTitle: '2025 전라남도 예쁜정원 콘테스트 우수상',
    area: '약 49,500㎡ (약 15,000평 규모)',
    region: '완도',
    regionEn: 'Wando',
    slogan: '아내를 향한 남편의 숲속 유럽형 정원',
    summary: '플로리스트 아내를 위해 남편이 십수 년간 척박한 땅을 일궈 만든 15,000평 규모의 로맨틱한 민간정원으로, 목조 온실 카페와 빈티지 카라반, 감성적인 숲속 유럽풍 정원이 어우러진 공간입니다.',
    heroImages: [
      '/images/gardens/wife/garden-wife-01.webp',
      '/images/gardens/wife/garden-wife-08.webp',
      '/images/gardens/wife/garden-wife-13.webp',
      '/images/gardens/wife/garden-wife-20.webp'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=FrlTdCYDydw',
    storyPostId: 'w7-wando-wife-garden',

    // 방문 정보
    visitorInfo: {
      address: '전라남도 완도군 완도읍 중도길 15-50',
      addressShort: '완도군 완도읍 중도길 15-50',
      openHours: '10:00 ~ 18:00 (사계절 상시 운영)',
      closedDays: '연중무휴 (기상 악화 시 변동 가능)',
      admission: '카페 1인 1음료 주문 시 정원 무료 관람',
      parking: '전용 무료 주차장 완비',
      petPolicy: '목줄 착용 시 정원 산책 가능 (실내 온실 제외)',
      facilities: ['목조 온실 카페', '빈티지 카라반 포토존', '유럽풍 잔디정원', '숲속 산책로', '동물 먹이주기 체험장', '야외 테라스', '무선 인터넷']
    },

    // 3대 핵심 매력
    highlights: [
      {
        tag: 'Romantic Story',
        title: '15,000평에 새긴 가장 아름다운 사랑의 서사',
        desc: '플로리스트 아내를 위해 남편이 손수 흙을 고르고 꽃나무를 심어 완성한 감동적인 러브스토리의 정원입니다.'
      },
      {
        tag: 'European Mood',
        title: '동화 속 유럽 같은 목조 온실 카페 & 빈티지 카라반',
        desc: '유리창 너머로 쏟아지는 따스한 햇살과 이국적인 카라반이 끝없는 감성 인생샷을 선사합니다.'
      },
      {
        tag: 'Family & Healing',
        title: '온 가족이 함께하는 동물 교감 & 숲속 힐링 산책',
        desc: '동물 먹이주기 체험과 완만하고 푸른 숲길 산책로가 있어 남녀노소 모두가 편안한 휴식을 즐길 수 있습니다.'
      }
    ],

    // 포토스팟 가이드
    photoSpots: [
      {
        spot: 'Spot 01',
        title: '목조 온실 카페 유리창 테라스',
        desc: '격자무늬 유리창을 통해 들어오는 부드러운 자연광과 초록 식물이 어우러지는 최고의 인생샷 스팟입니다.',
        img: '/images/gardens/wife/garden-wife-08.webp'
      },
      {
        spot: 'Spot 02',
        title: '빈티지 카라반 & 플라워 정원',
        desc: '유럽 시골 마을로 여행을 온 듯한 이국적인 분위기를 연출할 수 있는 감성 포토존입니다.',
        img: '/images/gardens/wife/garden-wife-13.webp'
      },
      {
        spot: 'Spot 03',
        title: '숲속 유럽풍 아치 산책길',
        desc: '울창한 나무와 계절별 꽃이 터널을 이루는 낭만적인 산책로로 커플·가족 스냅 촬영에 제격입니다.',
        img: '/images/gardens/wife/garden-wife-20.webp'
      }
    ],

    // 철학 및 스토리
    philosophy: {
      quote: '아내가 좋아하는 꽃을 심고 가꾸는 일, 그것이 내 인생에서 가장 행복한 사랑의 고백이었습니다.',
      author: '아내의 정원 정원주',
      content: `아내의 정원은 한 남자의 지극한 사랑에서 시작되었습니다.
꽃을 사랑하는 플로리스트 아내에게 영원히 시들지 않는 꽃밭을 선물하고 싶다는 꿈 하나로,
거친 바위와 잡목이 무성하던 15,000평의 산자락을 십수 년에 걸쳐 손수 가꾸었습니다.
정원 곳곳에 피어난 꽃 한 송이, 정갈하게 놓인 디딤돌 하나마다 사랑과 정성의 손길이 닿아 있으며,
이곳을 찾는 모든 이들에게 따뜻한 사랑의 온기와 쉼을 전합니다.`
    },

    // 60장 사진 갤러리 메타
    gallery: {
      categories: [
        { id: 'all', name: '전체 (60)' },
        { id: 'aerial', name: '드론 항공뷰 (7)' },
        { id: 'greenhouse', name: '온실 카페 & 카라반 (16)' },
        { id: 'trail', name: '유럽풍 정원 & 산책로 (20)' },
        { id: 'flower', name: '꽃 & 감성 디테일 (17)' }
      ],
      items: Array.from({ length: 60 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        let category = 'greenhouse';
        let title = `아내의 정원 풍경 ${i + 1}`;

        if (i < 7) {
          category = 'aerial';
          title = `아내의 정원 드론 항공 파노라마 #${i + 1}`;
        } else if (i < 23) {
          category = 'greenhouse';
          title = `목조 온실 카페 및 카라반 풍경 #${i - 6}`;
        } else if (i < 43) {
          category = 'trail';
          title = `유럽풍 정원 산책로 및 숲길 #${i - 22}`;
        } else {
          category = 'flower';
          title = `사계절 꽃과 감성 오브제 #${i - 42}`;
        }

        return {
          id: `wife-${num}`,
          num: num,
          category: category,
          src: `/images/gardens/wife/garden-wife-${num}.webp`,
          thumb: `/images/gardens/wife/garden-wife-${num}.webp`,
          title: title,
          alt: `완도 아내의 정원 고화질 전경 사진 ${num}`
        };
      })
    },

    // 인접 연계 정원
    nearbyGardens: [
      { id: 'baha', name: '바하가든', region: '완도', distance: '차량 15분', desc: '소유보다 존재의 의미를 찾는 바람의 언덕', img: '/images/gardens/baha/garden-baha-01.webp' },
      { id: 'moon', name: '문가든', region: '해남', distance: '차량 45분', desc: '달빛이 머무는 조용한 치유의 정원', img: '/images/gardens/moon/garden-moon-01.webp' },
      { id: 'biwon', name: '비원', region: '해남', distance: '차량 50분', desc: '산비탈 다랑이논의 아름다운 비밀', img: '/images/gardens/biwon/garden-biwon-01.webp' }
    ]
  },
  jindo: {
    id: 'jindo',
    number: '06',
    name: '진도휴식',
    enName: 'Jindo Rest',
    officialTitle: '진도 6만 평 해양 치유 정원',
    area: '약 198,000㎡ (약 60,000평 규모)',
    region: '진도',
    regionEn: 'Jindo',
    slogan: '동백 숲과 바다가 건네는 오감의 환대',
    summary: '진도 다도해의 푸른 바다와 6만 평 대지에 펼쳐진 울창한 동백 숲길, 이국적인 지중해풍 화이트 건축과 감성 오션뷰가 어우러져 일상의 지친 몸과 마음을 온전히 치유하는 남도 최고의 웰니스 예술정원입니다.',
    heroImages: [
      '/images/gardens/jindo/garden-jindo-01.webp',
      '/images/gardens/jindo/garden-jindo-03.webp',
      '/images/gardens/jindo/garden-jindo-07.webp',
      '/images/gardens/jindo/garden-jindo-16.webp'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=6tc6CFsyekE',
    storyPostId: 'j11-jindo-hyusik',

    // 방문 정보
    visitorInfo: {
      address: '전라남도 진도군 고군면 원포길 226',
      addressShort: '진도군 고군면 원포길 226 (쏠비치 인근)',
      openHours: '일반 방문객 09:30 ~ 17:00 (17시 이후 투숙객 전용)',
      closedDays: '연중무휴 (기상 악화 시 운영 시간 변동 가능)',
      admission: '정원 및 카페 이용 (1인 1음료 권장 / 숙박객 정원 자유 이용)',
      parking: '6만 평 부지 내 광활한 전용 무료 주차장 완비',
      petPolicy: '반려동물 동반 가능 (목줄 착용 및 배변봉투 지참 필수)',
      facilities: ['오션뷰 카페', '지중해풍 화이트 테라스', '동백나무 숲길 산책로', '해안 둘레길', '무장애 평지 데크', '빨간 리본 포토존', '감성 스테이']
    },

    // 3대 핵심 매력
    highlights: [
      {
        tag: 'Massive Nature',
        title: '6만 평 대지에 펼쳐진 동백 숲길과 푸른 다도해',
        desc: '사계절 푸른 동백 군락지와 파도 소리가 어우러지는 광활한 자연 속에서 오감으로 느끼는 진정한 피톤치드 샤워를 선사합니다.'
      },
      {
        tag: 'Mediterranean Vibe',
        title: '에메랄드빛 바다와 순백의 지중해풍 건축 미학',
        desc: '이국적인 화이트톤 파사드와 시그니처 레드 리본 체크인 존 등 정원 어디서나 동화 같은 감성 인생샷을 남길 수 있습니다.'
      },
      {
        tag: 'Barrier-Free Healing',
        title: '온 가족과 반려견이 함께 걷는 무장애 오션 둘레길',
        desc: '턱이 없는 완만한 평지형 산책로로 유모차, 휠체어, 어르신은 물론 사랑하는 반려견까지 부담 없이 머물 수 있는 힐링 쉼터입니다.'
      }
    ],

    // 포토스팟 가이드
    photoSpots: [
      {
        spot: 'Spot 01',
        title: '시그니처 "CHECK IN" 레드 리본 존',
        desc: '순백의 화이트 건축 벽면에 드리워진 강렬한 레드 리본을 배경으로 설레는 여행의 첫 컷을 남겨보세요.',
        img: '/images/gardens/jindo/garden-jindo-08.webp'
      },
      {
        spot: 'Spot 02',
        title: '바다가 내 품에 안기는 해안 둘레길',
        desc: '초록빛 숲과 파란 바다가 만나는 해안 둘레길에서 탁 트인 수평선과 일몰 노을을 담는 최고의 뷰포인트입니다.',
        img: '/images/gardens/jindo/garden-jindo-16.webp'
      },
      {
        spot: 'Spot 03',
        title: '다도해 파노라마 오션뷰 야외 테라스',
        desc: '탁 트인 수평선을 바라보며 시원한 바닷바람과 함께 물멍을 즐길 수 있는 이국적인 휴식 스팟입니다.',
        img: '/images/gardens/jindo/garden-jindo-36.webp'
      }
    ],

    // 철학 및 스토리
    philosophy: {
      quote: '정원은 멈추어 서는 곳이 아니라, 자연과 바다가 건네는 환대를 온몸으로 호흡하며 비로소 나를 되찾는 시간입니다.',
      author: '진도휴식 공간 철학',
      content: `진도휴식은 일상의 소음과 번잡함에서 벗어나 오직 파도 소리와 바람, 숲의 숨결에 귀 기울일 수 있도록 빚어낸 6만 평의 해양 안식처입니다.
진도의 청정 바다를 병풍 삼고 수령 깊은 동백나무들이 그늘을 드리운 이 길 위에서, 
방문하는 모든 이들이 걸음을 늦추고 깊은 쉼(休)의 호흡을 되찾기를 바라는 마음으로 가꾸었습니다.
바다와 숲, 건축이 자연스럽게 하나로 녹아든 이곳에서 당신만의 가장 평화로운 계절을 만나보세요.`
    },

    // 55장 사진 갤러리 메타
    gallery: {
      categories: [
        { id: 'all', name: '전체 (55)' },
        { id: 'aerial', name: '드론 항공뷰 (5)' },
        { id: 'architecture', name: '지중해풍 건축 & 테라스 (15)' },
        { id: 'trail', name: '동백 숲길 & 해안 둘레길 (18)' },
        { id: 'detail', name: '카페 & 힐링 디테일 (17)' }
      ],
      items: Array.from({ length: 55 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        let category = 'architecture';
        let title = `진도휴식 풍경 ${i + 1}`;

        if (i < 5) {
          category = 'aerial';
          title = `진도휴식 드론 항공 파노라마 #${i + 1}`;
        } else if (i < 20) {
          category = 'architecture';
          title = `지중해풍 화이트 건축 및 테라스 풍경 #${i - 4}`;
        } else if (i < 38) {
          category = 'trail';
          title = `동백 숲길 및 해안 오션 산책로 #${i - 19}`;
        } else {
          category = 'detail';
          title = `카페 휴식 공간 및 감성 디테일 #${i - 37}`;
        }

        return {
          id: `jindo-${num}`,
          num: num,
          category: category,
          src: `/images/gardens/jindo/garden-jindo-${num}.webp`,
          thumb: `/images/gardens/jindo/garden-jindo-${num}.webp`,
          title: title,
          alt: `진도휴식 고화질 전경 사진 ${num}`
        };
      })
    },

    // 인접 연계 정원
    nearbyGardens: [
      { id: 'moon', name: '문가든', region: '해남', distance: '차량 40분', desc: '달빛이 머무는 조용한 치유의 정원', img: '/images/gardens/moon/garden-moon-01.webp' },
      { id: 'sani', name: '산이정원', region: '해남', distance: '차량 45분', desc: '미래세대를 위한 16만 평 탄소중립 테마정원', img: '/images/gardens/sani/garden-sani-01.webp' },
      { id: 'baha', name: '바하가든', region: '완도', distance: '차량 65분', desc: '소유보다 존재의 의미를 찾는 바람의 언덕', img: '/images/gardens/baha/garden-baha-01.webp' }
    ]
  },
  pine: {
    id: 'pine',
    number: '07',
    name: '파인클라우드',
    enName: 'Pine Cloud',
    officialTitle: '신안군 제1호 민간정원 (2022 전남 예쁜정원 대상)',
    area: '약 76,000㎡ (약 23,000평 규모)',
    region: '신안',
    regionEn: 'Shinan',
    slogan: '소나무와 구름 사이, 사유의 즐거움',
    summary: '신안 천사대교 초입에 자리한 23,000평 규모의 제1호 민간정원으로, 2022년 전남 예쁜 정원 콘테스트 ‘대상’을 수상하였으며, 수백 년 명품 소나무와 100년 만에 꽃을 피운 행운의 소철나무, 9m 대형 그네가 어우러진 자연 치유 예술정원입니다.',
    heroImages: [
      '/images/gardens/pine/garden-pine-01.webp',
      '/images/gardens/pine/garden-pine-04.webp',
      '/images/gardens/pine/garden-pine-06.webp',
      '/images/gardens/pine/garden-pine-11.webp'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=onnW1mJWSvE',
    storyPostId: 's2-pinecloud-photo',

    // 방문 정보
    visitorInfo: {
      address: '전라남도 신안군 압해읍 천사대교로 642',
      addressShort: '신안군 압해읍 천사대교로 642 (천사대교 진입 전)',
      openHours: '09:00 ~ 18:00 (입장 마감 17:00)',
      closedDays: '연중무휴',
      admission: '성인 8,000원 / 청소년 5,000원 / 어린이 3,000원 (만 6세 이하 무료)',
      parking: '대형 버스 및 승용차 전용 무료 주차장 완비',
      petPolicy: '목줄 착용 시 정원 야외 산책로 동반 가능 (실내 온실 제한)',
      facilities: ['소철 유리온실', '9m 대형 춘향이 그네', '물레방아 & 분수 연못', '친환경 흙길 산책로', '동물 농장', '휴게 쉼터']
    },

    // 3대 핵심 매력
    highlights: [
      {
        tag: 'Award Winner',
        title: '2022 전남 예쁜 정원 콘테스트 대상에 빛나는 품격',
        desc: '인위적인 포장을 최소화하고 23,000평 대지에 자연 그대로의 숨결과 명품 소나무의 곡선미를 살린 신안군 제1호 민간정원입니다.'
      },
      {
        tag: 'Century Luck',
        title: '100년에 한 번 핀다는 행운의 상징, 소철나무 꽃',
        desc: '유리온실에서 평생 한 번 마주하기 어렵다는 신비로운 소철꽃을 직접 감상하며 소중한 행운과 건강을 기원할 수 있습니다.'
      },
      {
        tag: 'Dramatic View',
        title: '푸른 압해 바다와 천사대교를 품은 9m 대형 그네',
        desc: '하늘 높이 날아오르며 다도해의 시원한 바다 풍경과 웅장한 천사대교를 한 프레임에 담아내는 최고의 인생샷 명소입니다.'
      }
    ],

    // 포토스팟 가이드
    photoSpots: [
      {
        spot: 'Spot 01',
        title: '유리온실 속 100년의 행운 소철꽃',
        desc: '부드러운 자연광이 유리창을 통과해 비추는 소철나무 꽃 앞에서 평생 간직할 행운의 인증샷을 남겨보세요.',
        img: '/images/gardens/pine/garden-pine-18.webp'
      },
      {
        spot: 'Spot 02',
        title: '천사대교 & 바다 전망 9m 춘향이 그네',
        desc: '탁 트인 다도해와 천사대교를 배경으로 하늘로 날아오르는 역동적인 순간을 일몰 골든타임에 담아보세요.',
        img: '/images/gardens/pine/garden-pine-06.webp'
      },
      {
        spot: 'Spot 03',
        title: '고즈넉한 물레방아 & 분수 연못',
        desc: '시원하게 뿜어지는 분수와 전통 물레방아, 분재 소나무가 어우러진 한 폭의 동양화 같은 풍경을 담을 수 있습니다.',
        img: '/images/gardens/pine/garden-pine-11.webp'
      }
    ],

    // 철학 및 스토리
    philosophy: {
      quote: '소나무는 천 년을 서 있어도 뽐내지 않고, 구름은 스쳐 가도 자취를 남기지 않듯, 비움으로써 온전해지는 정원을 꿈꿉니다.',
      author: '파인클라우드 정원 철학',
      content: `파인클라우드(Pine Cloud)는 이름 그대로 솔바람 소리와 흰 구름이 유유히 머무는 사유의 정원입니다.
아스팔트와 보도블록 대신 부드러운 흙길을 고집하고, 화려한 인공 조형물 대신 세월의 무게를 견딘 명품 소나무와 돌의 여백을 두었습니다.
100년에 한 번 핀다는 소철나무 꽃처럼, 이곳을 찾는 이들에게 기적 같은 평온과 쉼이 깃들기를 바라는 마음으로 한 그루 한 그루 가꾸어 왔습니다.`
    },

    // 24장 사진 갤러리 메타
    gallery: {
      categories: [
        { id: 'all', name: '전체 (24)' },
        { id: 'aerial', name: '드론 항공뷰 (7)' },
        { id: 'pine', name: '명품 소나무 & 연못 (9)' },
        { id: 'trail', name: '온실 & 9m 그네 (8)' }
      ],
      items: Array.from({ length: 24 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        let category = 'pine';
        let title = `파인클라우드 풍경 ${i + 1}`;

        if (i < 7) {
          category = 'aerial';
          title = `파인클라우드 드론 항공 파노라마 #${i + 1}`;
        } else if (i < 16) {
          category = 'pine';
          title = `명품 소나무 정원 및 연못 풍경 #${i - 6}`;
        } else {
          category = 'trail';
          title = `소철 온실 및 9m 그네 산책로 #${i - 15}`;
        }

        return {
          id: `pine-${num}`,
          num: num,
          category: category,
          src: `/images/gardens/pine/garden-pine-${num}.webp`,
          thumb: `/images/gardens/pine/garden-pine-${num}.webp`,
          title: title,
          alt: `신안 파인클라우드 고화질 전경 사진 ${num}`
        };
      })
    },

    // 인접 연계 정원
    nearbyGardens: [
      { id: 'sani', name: '산이정원', region: '해남', distance: '차량 50분', desc: '미래세대를 위한 16만 평 탄소중립 테마정원', img: '/images/gardens/sani/garden-sani-01.webp' },
      { id: 'moon', name: '문가든', region: '해남', distance: '차량 55분', desc: '달빛이 머무는 조용한 치유의 정원', img: '/images/gardens/moon/garden-moon-01.webp' },
      { id: 'jindo', name: '진도휴식', region: '진도', distance: '차량 60분', desc: '동백 숲과 바다가 건네는 오감의 환대', img: '/images/gardens/jindo/garden-jindo-01.webp' }
    ]
  },
  '4est': {
    id: '4est',
    number: '08',
    name: '4est(포레스트)수목원',
    enName: '4est Arboretum',
    officialTitle: '산림청 등록 제12호 사립수목원 (해남 명품 식물원)',
    area: '약 198,000㎡ (약 60,000평 규모)',
    region: '해남',
    regionEn: 'Haenam',
    slogan: '별, 돌, 이야기, 배움이 있는 인생의 숲',
    summary: '해남 두륜산 자락 6만 평 대자연 속에 별(Star), 돌(Stone), 이야기(Story), 배움(Study)의 4ST 철학으로 가꾼 사립수목원으로, 국내 최대 규모 400여 종의 수국 군락과 울창한 편백 피톤치드 숲, 트리하우스와 감성 카페가 어우러진 복합 문화 예술 숲입니다.',
    heroImages: [
      '/images/gardens/4est/garden-4est-01.webp',
      '/images/gardens/4est/garden-4est-05.webp',
      '/images/gardens/4est/garden-4est-10.webp',
      '/images/gardens/4est/garden-4est-20.webp'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=BWgurEgrrUM',
    storyPostId: 'h23-haenam-4est-arboretum',

    // 방문 정보
    visitorInfo: {
      address: '전라남도 해남군 현산면 봉동길 232-118',
      addressShort: '해남군 현산면 봉동길 232-118',
      openHours: '하절기(3~10월) 08:00 ~ 19:00 / 동절기(11~2월) 08:30 ~ 17:00',
      closedDays: '연중무휴',
      admission: '성인 5,000원 / 청소년·어린이 4,000원 (시즌 및 축제 기간 변동 가능)',
      parking: '대형 버스 및 승용차 전용 대형 무료 주차장 완비',
      petPolicy: '목줄 및 배변봉투 지참 시 반려동물 야외 산책로 동반 가능',
      facilities: ['카페 포레스트', '수국 테마정원', '피톤치드 숲길 데크', '원목 트리하우스', '조각 예술 산책로', '사계절 쉼터']
    },

    // 3대 핵심 매력
    highlights: [
      {
        tag: '4est Themes',
        title: '별(Star)·돌(Stone)·이야기(Story)·배움(Study) 4ST의 인문학적 숲',
        desc: '단순한 식물 관람을 넘어 인문학적 스토리와 20여 점의 예술 조형물이 자연과 어우러져 깊은 사색을 선물합니다.'
      },
      {
        tag: 'Hydrangea Haven',
        title: '국내 최대 규모 400여 종 9,000여 본 오색 수국 군락지',
        desc: '초여름이면 골짜기마다 화려하게 피어나는 수국의 푸른 파도가 마치 영화 속 한 장면 같은 황홀경을 자아냅니다.'
      },
      {
        tag: 'Healing Walk',
        title: '두륜산 자락 원시림과 피톤치드 숲속 힐링 데크로드',
        desc: '편백나무와 삼나무가 뿜어내는 맑은 공기를 마시며 숲속 트리하우스와 데크길을 걷는 온전한 자연 테라피를 만끽할 수 있습니다.'
      }
    ],

    // 포토스팟 가이드
    photoSpots: [
      {
        spot: 'Spot 01',
        title: '숲속 동화 같은 원목 트리하우스',
        desc: '울창한 고목 위에 아담하게 세워진 트리하우스에 올라 숲의 파노라마와 인생샷을 담을 수 있는 대표 명소입니다.',
        img: '/images/gardens/4est/garden-4est-10.webp'
      },
      {
        spot: 'Spot 02',
        title: '사계절 영화 같은 수국 & 팜파스 산책로',
        desc: '여름의 푸른 수국 파도부터 가을의 은빛 팜파스 군락까지, 계절마다 색채가 변하는 드라마틱한 산책길입니다.',
        img: '/images/gardens/4est/garden-4est-20.webp'
      },
      {
        spot: 'Spot 03',
        title: '자연과 하나 되는 숲속 카페 테라스',
        desc: '피톤치드 향기 가득한 숲속 야외 테라스에서 여유로운 차 한 잔과 함께 초록의 여운을 기록해보세요.',
        img: '/images/gardens/4est/garden-4est-28.webp'
      }
    ],

    // 철학 및 스토리
    philosophy: {
      quote: '별을 헤며 돌을 쌓고, 이야기를 나누며 삶을 배우는 곳 — 숲은 언제나 우리에게 가장 너른 품을 내어줍니다.',
      author: '4est(포레스트)수목원 설립 철학',
      content: `4est(포레스트)수목원은 숲(Forest)이 가진 무한한 생명력에 별(Star), 돌(Stone), 이야기(Story), 배움(Study)이라는 네 가지 영문 머리글자 '4ST'를 담아 완성한 인문학적 숲입니다.
수십 년간 방치되었던 거친 산자락을 가꾸어 1,600여 종의 식물이 뿌리내리는 생태 안식처로 탈바꿈시켰습니다.
바쁜 일상에 지친 현대인들이 피톤치드 숲길을 걸으며 스스로의 인생을 돌아보고, 계절의 순환 속에서 진정한 치유와 배움을 얻어가기를 희망합니다.`
    },

    // 40장 사진 갤러리 메타
    gallery: {
      categories: [
        { id: 'all', name: '전체 (40)' },
        { id: 'aerial', name: '드론 항공뷰 (9)' },
        { id: 'treehouse', name: '트리하우스 & 데크길 (16)' },
        { id: 'flower', name: '수국 & 팜파스 정원 (15)' }
      ],
      items: Array.from({ length: 40 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        let category = 'treehouse';
        let title = `4est(포레스트)수목원 풍경 ${i + 1}`;

        if (i < 9) {
          category = 'aerial';
          title = `4est(포레스트)수목원 드론 항공 파노라마 #${i + 1}`;
        } else if (i < 25) {
          category = 'treehouse';
          title = `트리하우스 및 숲속 데크 산책로 #${i - 8}`;
        } else {
          category = 'flower';
          title = `수국 테마정원 및 사계절 쉼터 #${i - 24}`;
        }

        return {
          id: `4est-${num}`,
          num: num,
          category: category,
          src: `/images/gardens/4est/garden-4est-${num}.webp`,
          thumb: `/images/gardens/4est/garden-4est-${num}.webp`,
          title: title,
          alt: `해남 4est(포레스트)수목원 고화질 전경 사진 ${num}`
        };
      })
    },

    // 인접 연계 정원
    nearbyGardens: [
      { id: 'biwon', name: '비원', region: '해남', distance: '차량 15분', desc: '산비탈 다랑이논의 아름다운 비밀', img: '/images/gardens/biwon/garden-biwon-01.webp' },
      { id: 'moon', name: '문가든', region: '해남', distance: '차량 30분', desc: '달빛이 머무는 조용한 치유의 정원', img: '/images/gardens/moon/garden-moon-01.webp' },
      { id: 'sani', name: '산이정원', region: '해남', distance: '차량 40분', desc: '미래세대를 위한 16만 평 탄소중립 테마정원', img: '/images/gardens/sani/garden-sani-01.webp' }
    ]
  }
};

// 하위 호환성을 위해 forest 키로도 접근 가능하도록 비열거형(non-enumerable)으로 매핑
Object.defineProperty(GARDENS_MASTER, 'forest', {
  value: GARDENS_MASTER['4est'],
  enumerable: false,
  writable: true,
  configurable: true
});

export default GARDENS_MASTER;
