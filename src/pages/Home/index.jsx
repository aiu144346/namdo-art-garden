import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Compass, Coffee, ChevronRight, PlayCircle, Newspaper, Bell, ExternalLink, Sparkles, Flower2, Heart, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import EventPopup from '../../components/EventPopup';
import { getCustomNotices, getCustomPress } from '../../utils/adminStorage';

const REGIONS = [
  { id: 'mokpo', name: '목포 (Mokpo)', desc: '근대 역사와 예술의 항구', image: '/images/gohado-main.webp', link: '/region/mokpo' },
  { id: 'shinan', name: '신안 (Shinan)', desc: '1004섬의 예술', image: '/images/shinan-18.webp', link: '/region/shinan' },
  { id: 'haenam', name: '해남 (Haenam)', desc: '땅끝의 비밀 정원', image: '/images/haenam-048.webp', link: '/region/haenam' },
  { id: 'jindo', name: '진도 (Jindo)', desc: '빛과 소리의 고장', image: '/images/jindo-034.webp', link: '/region/jindo' },
  { id: 'wando', name: '완도 (Wando)', desc: '치유와 명상의 섬', image: '/images/wando-076.webp', link: '/region/wando' },
];

const HERO_IMAGES = [
  { src: '/images/gardens/moon/garden-moon-01.webp', name: '문가든', region: '해남', link: '/gardens/moon' },
  { src: '/images/gardens/baha/garden-baha-01.webp', name: '바하가든', region: '완도', link: '/gardens/baha' },
  { src: '/images/gardens/biwon/garden-biwon-01.webp', name: '비원', region: '해남', link: '/gardens/biwon' },
  { src: '/images/gardens/sani/garden-sani-01.webp', name: '산이정원', region: '해남', link: '/gardens/sani' },
  { src: '/images/gardens/wife/garden-wife-01.webp', name: '아내의 정원', region: '완도', link: '/gardens/wife' },
  { src: '/images/gardens/jindo/garden-jindo-01.webp', name: '진도휴식', region: '진도', link: '/gardens/jindo' },
  { src: '/images/gardens/pine/garden-pine-01.webp', name: '파인클라우드', region: '신안', link: '/gardens/pine' },
  { src: '/images/gardens/4est/garden-4est-01.webp', name: '4est(포레스트)수목원', region: '해남', link: '/gardens/4est' }
];

const NOTICES = [
  {
    id: 4,
    title: "남도예술정원 여행주간 (11.06 ~ 11.20)",
    date: "2026.10.28",
    desc: "남도의 정원을 여행하는 2주! 문가든, 산이정원, 포레스트수목원 등 8대 명품 민간정원과 지역 파트너 공간이 함께하는 특별한 가을 정원 여행주간에 여러분을 초대합니다.",
    link: "/posts/notice-261106-travel-week",
    thumbnail: "/images/namdo-travel-week-poster-thumb.webp",
    isExternal: false
  },
  {
    id: 3,
    title: "남도예술정원 서포터즈 모집",
    date: "2026.06.23",
    desc: "남도예술정원 2권역(해남‧완도‧진도‧신안)의 8대 민간정원을 직접 방문해 체험하고, 콘텐츠를 생산 및 홍보하는 「남도예술정원 서포터즈」를 모집합니다!",
    link: "/posts/notice-260703-supporters",
    thumbnail: "/images/notice_260703_creator02_thumb.png",
    isExternal: false
  },
  {
    id: 2,
    title: "남도예술정원 관광콘텐츠 크리에이터 공모",
    date: "2026.07.01",
    desc: "남도예술정원의 숨겨진 매력을 발굴하고 트렌디한 관광콘텐츠로 풀어낼 크리에이터를 모집합니다. 2권역 사업운영단(㈜쥬스컴퍼니)에서 남도예술정원과 함께 성장할 크리에이터를 모집합니다.",
    link: "/posts/notice-260703-creator-contest",
    thumbnail: "/images/creator_contest.jpg",
    isExternal: false
  },
  {
    id: 1,
    title: "남도예술정원 관광콘텐츠 크리에이터 공모 안내",
    date: "2026.06.16",
    desc: "남도예술정원의 숨겨진 매력을 발굴하고 트렌디한 관광콘텐츠로 풀어낼 크리에이터를 모집합니다.",
    link: "https://www.newswire.co.kr/newsRead.php?no=1036697",
    isExternal: true
  }
];

const PRESS_RELEASE = [
  {
    id: 3,
    title: '남도예술정원 협동조합 "정원 관광의 새로운 이정표"',
    date: "2026.07.28",
    desc: "남도예술정원 협동조합이 해남 산이정원에서 현판식을 갖고 남도 정원관광의 새로운 출발을 알렸습니다. 해남, 완도, 진도, 신안의 8대 명품 민간정원이 함께해 관광 자생력을 높입니다.",
    thumbnail: "https://www.ikbc.co.kr/data/kbc/image/2026/07/28/kbc202607280020.jpg",
    link: "/posts/press-260728-ikbc-coop",
    isExternal: false,
    source: "KBC광주방송"
  },
  {
    id: 1,
    title: "남도예술정원, 관광콘텐츠 크리에이터 공모전 개최",
    date: "2026.06.16",
    desc: "남부권 공동진흥사업 소도시 여행권역 육성사업의 일환으로, 2권역 정원 활성화를 위한 크리에이터 10팀을 선발합니다.",
    thumbnail: "/images/creator_contest.jpg",
    link: "https://www.newswire.co.kr/newsRead.php?no=1036697",
    isExternal: true,
    source: "뉴스와이어"
  },
  {
    id: 2,
    title: "남도예술정원 관광 콘텐츠 크리에이터 공모 공고",
    date: "2026.06.16",
    desc: "문화체육관광부와 전라남도, (재)전라남도관광재단에서는 남부권 광역관광 공동진흥사업으로 소도시 여행권역 육성사업을 추진하고 있습니다. 남도예술정원의 숨겨진 매력을 발굴하고 트렌디한 관광콘텐츠로 풀어낼 크리에이터를 모집합니다.",
    thumbnail: "/images/creator_contest_ijnto.jpg",
    link: "https://ijnto.or.kr/plaza/notice/read/562",
    isExternal: true,
    source: "전남관광재단"
  }
];

const generateSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristAttraction",
      "name": "남도예술정원",
      "description": "수백 년 된 고목과 현대 예술 조형물이 어우러진 대자연 속의 거대한 갤러리. 대한민국 최고의 8대 민간정원 투어.",
      "url": "https://namdoartgarden.com"
    }
  ]
});

// -- Tilt Card Component (Premium 3D Effect) --
function TiltCard({ garden, idx }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group flex flex-col h-full perspective-1000 w-[76vw] max-w-[280px] flex-shrink-0 snap-center sm:w-auto sm:max-w-none bg-neutral-50/70 sm:bg-transparent p-3.5 sm:p-0 rounded-3xl sm:rounded-none border border-neutral-200/60 sm:border-0"
    >
      <a
        href={garden.video}
        target="_blank"
        rel="noopener noreferrer"
        style={{ transform: "translateZ(40px)" }}
        className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-md sm:shadow-lg hover:shadow-2xl aspect-[4/3] sm:aspect-[3/4] mb-4 sm:mb-6 group block bg-neutral-100"
      >
        <img
          src={garden.img}
          alt={`${garden.name} 전경`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25 group-hover:bg-neutral-900/40 transition-colors duration-500" />

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-500">
            <PlayCircle className="w-8 h-8 text-primary ml-0.5" />
          </div>
        </div>

        {/* Clean Top Badge */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-white text-[11px] font-mono font-bold tracking-wider uppercase border border-white/15">
            NO. 0{idx + 1}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-primary/90 text-white text-[11px] font-bold">
            {garden.region}
          </span>
        </div>
      </a>

      <div className="space-y-3 flex-grow px-1 flex flex-col justify-between" style={{ transform: "translateZ(25px)" }}>
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xl xl:text-2xl font-serif font-bold text-neutral-900 group-hover:text-primary transition-colors">
              <Link to={`/gardens/${garden.id}`}>{garden.name}</Link>
            </h3>
            <span className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase flex-shrink-0">
              {garden.en}
            </span>
          </div>
          <p className="text-neutral-500 font-light leading-relaxed text-sm line-clamp-2 italic">
            "{garden.quote}"
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <Link to={`/gardens/${garden.id}`} className="text-xs font-bold text-primary uppercase tracking-[0.15em] flex items-center gap-1.5 group/btn">
            <span>Showcase</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <Link to={`/posts/${garden.postId}`} className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors">
            스토리 읽기
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [currentBg, setCurrentBg] = useState(0);
  const [activeTab, setActiveTab] = useState('notice');
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0]);

  const allNotices = useMemo(() => {
    return [...getCustomNotices(), ...NOTICES];
  }, []);

  const allPress = useMemo(() => {
    return [...getCustomPress(), ...PRESS_RELEASE];
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white selection:bg-primary/30 relative overflow-hidden">
      <SEO 
        title="남도예술정원 | Namdo Art Garden — 8대 명품 민간정원 & 여행 큐레이션" 
        description="대한민국 남도의 아름다운 8대 민간정원과 자연 경관, 그리고 예술이 어우러진 최고의 여행 코스를 만나보세요."
        keywords="남도예술정원, 8대정원, 남도여행, 전남여행, 완도, 해남, 신안, 진도, 목포, 민간정원"
        schemaData={generateSchema()}
      />
      <EventPopup />

      {/* Hero Section (Cinematic Canvas) */}
      <section className="relative w-full h-[88vh] min-h-[620px] max-h-[960px] overflow-hidden bg-neutral-950">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentBg}
            src={HERO_IMAGES[currentBg].src}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 6, ease: "easeOut" }
            }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={`${HERO_IMAGES[currentBg].name} 대표 풍경`}
          />
        </AnimatePresence>
        
        {/* Balanced Multi-layer Scrim for High Readability */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35 pointer-events-none" />

        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white/95 tracking-[0.3em] uppercase text-[11px] md:text-xs mb-6 font-bold shadow-lg">
            The 8 Dimensions of Healing
          </span>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[104px] font-serif text-white font-bold leading-[1.05] tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.75)] mb-8">
            NAMDO<br/>ART GARDEN
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-light max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] mb-12 leading-relaxed">
            자연과 예술이 빚어낸 힐링과 서사가 있는,<br/>
            <strong className="font-semibold text-white">8대 남도예술정원</strong>으로 당신을 초대합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full max-w-lg justify-center">
            <Link
              to="/gardens"
              className="bg-primary hover:bg-primary-dark text-white py-4 px-8 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl hover:scale-105 group text-sm md:text-base"
            >
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              <span>8대 정원 컬렉션 탐험하기</span>
            </Link>
            <a
              href="#featured"
              className="bg-white/15 backdrop-blur-md border border-white/30 text-white py-4 px-7 rounded-full font-bold hover:bg-white hover:text-neutral-950 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl text-sm md:text-base"
            >
              <span>정원주 스토리 보기</span>
            </a>
          </div>
        </motion.div>

        {/* Bottom Interactive Slide Controls & Current Garden Indicator */}
        <div className="absolute bottom-8 inset-x-6 md:inset-x-12 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            {HERO_IMAGES.map((item, idx) => (
              <button
                key={item.name}
                onClick={() => setCurrentBg(idx)}
                aria-label={`${item.name} 배경 보기`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentBg ? 'w-8 bg-primary-light' : 'w-2 bg-white/40 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          <Link
            to={HERO_IMAGES[currentBg].link}
            className="text-white/90 hover:text-primary-light font-serif text-sm md:text-base tracking-wider flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 transition-colors"
          >
            <span className="text-xs font-sans font-bold text-primary-light uppercase">
              {HERO_IMAGES[currentBg].region}
            </span>
            <span>{HERO_IMAGES[currentBg].name}</span>
            <span className="text-white/30 font-sans">|</span>
            <span className="text-white/70 text-xs font-mono not-italic font-bold tracking-widest">
              0{currentBg + 1} / 08
            </span>
          </Link>
        </div>
      </section>

      {/* Sticky Section Anchor Bar */}
      <div className="bg-neutral-900 text-white sticky top-16 md:top-24 z-40 shadow-xl border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 md:py-4 flex flex-wrap items-center justify-center md:justify-between gap-4 relative z-10">
          <span className="font-serif text-lg md:text-xl italic text-primary-light">
            "We Must Cultivate Our Garden"
          </span>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-xs md:text-sm font-bold uppercase tracking-widest text-white/85">
            <a href="#featured" className="hover:text-primary-light transition-colors whitespace-nowrap">8 Master Gardens</a>
            <a href="#regions" className="hover:text-primary-light transition-colors whitespace-nowrap">Explore Regions</a>
            <a href="#editor-picks" className="hover:text-primary-light transition-colors whitespace-nowrap">AI Editor's Curation</a>
          </div>
        </div>
      </div>

      {/* Featured Story: 8 Sounds of Namdo */}
      <section id="featured" className="py-20 md:py-28 bg-white px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-20 space-y-6 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center md:justify-start gap-4 text-primary font-bold tracking-[0.35em] uppercase text-xs"
              >
                <div className="w-10 h-[2px] bg-primary" />
                <span>8 Master Gardens Story</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="font-serif text-neutral-900 font-bold leading-snug text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              >
                남도예술정원의 <span className="text-primary">"소리"</span>
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-lg text-neutral-600 font-light max-w-md leading-relaxed md:pb-2 border-b-2 border-neutral-100 mx-auto md:mx-0"
            >
              "정원을 가꾸는 일은 곧 자신의 인생을 가꾸는 일과 같습니다." 남도 8대 명품 민간정원의 정원주들이 들려주는 사유의 목소리를 만나보세요.
            </motion.p>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="sm:hidden flex items-center justify-between text-xs text-neutral-400 font-medium mb-3 px-1">
            <span>좌우로 밀어 8대 정원 둘러보기</span>
            <span className="font-mono text-[11px] text-primary font-bold">01 — 08 &rarr;</span>
          </div>

          {/* 8 Gardens Grid (Horizontal Swipe Carousel on Mobile, 4-col Grid on Desktop) */}
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 -mx-4 px-4 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 sm:gap-y-14 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible">
            {[
              { id: 'moon', name: '문가든', region: '해남', en: 'Moon Garden', img: '/images/gardens/moon/garden-moon-01.webp', quote: '달빛이 머무는 조용한 치유의 정원', video: 'https://www.youtube.com/watch?v=OchvsecQrpg', postId: 'h26-haenam-moongarden-guide' },
              { id: 'baha', name: '바하가든', region: '완도', en: 'Baha Garden', img: '/images/gardens/baha/garden-baha-01.webp', quote: '소유보다 존재의 의미를 찾는 바람의 언덕', video: 'https://www.youtube.com/watch?v=v-NpCjFLGfk', postId: 'w14-wando-baha-garden' },
              { id: 'biwon', name: '비원', region: '해남', en: 'Secret Garden', img: '/images/gardens/biwon/garden-biwon-01.webp', quote: '산비탈 다랑이논의 아름다운 비밀', video: 'https://www.youtube.com/watch?v=pvljDsnK7Os', postId: 'h25-haenam-secret-garden' },
              { id: 'sani', name: '산이정원', region: '해남', en: 'Sani Garden', img: '/images/gardens/sani/garden-sani-01.webp', quote: '미래세대를 위한 꿈의 씨앗', video: 'https://www.youtube.com/watch?v=9Pj4yPWcZrg', postId: 'h3-haenam-sanigarden-guide' },
              { id: 'wife', name: '아내의 정원', region: '완도', en: 'Home of Florist', img: '/images/gardens/wife/garden-wife-01.webp', quote: '아내를 향한 남편의 숲속 유럽형 정원', video: 'https://www.youtube.com/watch?v=FrlTdCYDydw', postId: 'w7-wando-wife-garden' },
              { id: 'jindo', name: '진도휴식', region: '진도', en: 'Jindo Rest', img: '/images/gardens/jindo/garden-jindo-01.webp', quote: '동백 숲과 바다가 건네는 오감의 환대', video: 'https://www.youtube.com/watch?v=6tc6CFsyekE', postId: 'j11-jindo-hyusik' },
              { id: 'pine', name: '파인클라우드', region: '신안', en: 'Pine Cloud', img: '/images/gardens/pine/garden-pine-01.webp', quote: '소나무와 구름 사이, 사유의 즐거움', video: 'https://www.youtube.com/watch?v=onnW1mJWSvE', postId: 's2-pinecloud-photo' },
              { id: '4est', name: '4est(포레스트)수목원', region: '해남', en: '4est Arboretum', img: '/images/gardens/4est/garden-4est-01.webp', quote: '별, 돌, 이야기, 배움이 있는 인생의 숲', video: 'https://www.youtube.com/watch?v=BWgurEgrrUM', postId: 'h23-haenam-4est-arboretum' },
            ].map((garden, idx) => (
              <TiltCard key={garden.id} garden={garden} idx={idx} />
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-20 pt-10 border-t border-neutral-100 text-center">
            <Link to="/gardens" className="inline-flex items-center gap-6 group">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-900 group-hover:text-primary transition-colors">
                8대 명품 정원 컬렉션 전체보기
              </span>
              <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 shadow-sm">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Travel Week & About Us Brand Banner */}
          <div className="mt-16 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-3 max-w-2xl relative z-10 text-center md:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30">
                2026. 11. 06 — 11. 20 (2주간)
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug space-y-1">
                <span className="block text-primary-light text-lg sm:text-xl italic font-normal">We Must Cultivate Our Garden</span>
                <span className="block font-sans">남도예술정원 여행주간 4대 프로그램 & 공식 리플릿</span>
              </h3>
              <p className="text-neutral-300 text-sm font-light leading-relaxed">
                8대 정원 투어, 예술무대, 지역 크리에이터 특화체험, 비전세미나 및 스탬프 투어 안내와 공식 리플릿 PDF를 만나보세요.
              </p>
            </div>
            <Link
              to="/about-us"
              className="px-7 py-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-sm tracking-wide shadow-xl flex items-center gap-2 group flex-shrink-0 relative z-10 transition-transform hover:scale-105"
            >
              <span>정원 소개 & 리플릿 받기</span>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* News & Notice Section */}
      <section className="py-24 bg-neutral-50 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Latest Updates</span>
            <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 font-bold mb-4">남도 소식 & 공지</h2>
            <p className="text-neutral-500 font-light max-w-xl mx-auto text-sm md:text-base">
              남도예술정원의 새로운 이벤트 소식과 보도 자료를 가장 먼저 만나보세요.
            </p>
          </div>

          {/* Interactive Tabs (Fixed Framer Motion layoutId Pattern) */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-neutral-200/70 backdrop-blur-md rounded-full border border-neutral-300/50">
              <button
                type="button"
                onClick={() => setActiveTab('notice')}
                className={`relative z-10 px-7 py-3 rounded-full text-xs md:text-sm font-bold tracking-wider transition-colors duration-300 flex items-center gap-2 ${
                  activeTab === 'notice' ? 'text-white' : 'text-neutral-700 hover:text-neutral-950'
                }`}
              >
                {activeTab === 'notice' && (
                  <motion.div
                    layoutId="newsActiveTabBg"
                    className="absolute inset-0 rounded-full bg-neutral-900 shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Bell className="w-3.5 h-3.5" />
                <span>공지사항</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('press')}
                className={`relative z-10 px-7 py-3 rounded-full text-xs md:text-sm font-bold tracking-wider transition-colors duration-300 flex items-center gap-2 ${
                  activeTab === 'press' ? 'text-white' : 'text-neutral-700 hover:text-neutral-950'
                }`}
              >
                {activeTab === 'press' && (
                  <motion.div
                    layoutId="newsActiveTabBg"
                    className="absolute inset-0 rounded-full bg-neutral-900 shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Newspaper className="w-3.5 h-3.5" />
                <span>언론보도</span>
              </button>
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="max-w-4xl mx-auto min-h-[380px]">
            <AnimatePresence mode="wait">
              {activeTab === 'notice' && (
                <motion.div
                  key="notice"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  {allNotices.map((item) => {
                    const CardWrapper = item.isExternal ? 'a' : Link;
                    const linkProps = item.isExternal 
                      ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
                      : { to: item.link || '/posts' };

                    return (
                      <CardWrapper
                        key={item.id}
                        {...linkProps}
                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-3xl bg-white hover:bg-white border border-neutral-200/70 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer gap-6"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-grow">
                          {item.thumbnail && (
                            <div className="w-20 h-28 sm:w-24 sm:h-32 flex-shrink-0 rounded-2xl overflow-hidden border border-neutral-200/70 shadow-sm bg-neutral-100 relative">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                loading="lazy"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="space-y-2 max-w-2xl">
                            <span className="inline-block text-[10px] font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
                              Notice
                            </span>
                            <h3 className="text-lg md:text-xl font-bold text-neutral-900 group-hover:text-primary transition-colors flex items-center gap-2">
                              <span>{item.title}</span>
                              {item.isExternal && <ExternalLink className="w-4 h-4 text-neutral-400 flex-shrink-0" />}
                            </h3>
                            <p className="text-neutral-500 font-light text-sm line-clamp-2 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 text-right flex items-center md:flex-col justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-neutral-100 flex-shrink-0">
                          <span className="text-xs font-bold text-neutral-400 tracking-wider font-mono">{item.date}</span>
                          <span className="text-[11px] font-bold text-neutral-900 group-hover:text-primary transition-colors tracking-widest uppercase md:mt-2 block group-hover:translate-x-1 duration-300">
                            자세히 보기 &rarr;
                          </span>
                        </div>
                      </CardWrapper>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === 'press' && (
                <motion.div
                  key="press"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {allPress.map((item) => {
                    const CardWrapper = item.isExternal ? 'a' : Link;
                    const linkProps = item.isExternal 
                      ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
                      : { to: item.link };

                    return (
                      <CardWrapper
                        key={item.id}
                        {...linkProps}
                        className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-neutral-200/70 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white tracking-widest uppercase">
                            {item.source}
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                          <div className="space-y-2">
                            <span className="text-[11px] font-bold text-neutral-400 tracking-wider font-mono block">{item.date}</span>
                            <h3 className="text-base md:text-lg font-sans font-bold tracking-[-0.03em] text-neutral-900 group-hover:text-primary transition-colors leading-[1.42] line-clamp-2 break-keep">
                              {item.title}
                            </h3>
                            <p className="text-neutral-500 font-light text-xs line-clamp-3 leading-relaxed">{item.desc}</p>
                          </div>
                          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold tracking-wider text-neutral-900 group-hover:text-primary transition-colors uppercase">
                            <span>{item.isExternal ? '기사 원문 보기' : '소식 자세히 보기'}</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </CardWrapper>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Explore Regions (Horizontal Swipe on Mobile, 5-Col on Desktop) */}
      <section id="regions" className="py-16 md:py-24 bg-surface/30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-2.5 block">5 Cultural Districts</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-neutral-900 font-bold mb-4">Explore the Regions</h2>
            <p className="text-neutral-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              각박한 일상에서 벗어나, 아름다운 바다와 숲이 어우러진 다도해의 보석 같은 5개 권역을 탐험해보세요.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3.5 -mx-4 px-4 pb-3 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible">
            {REGIONS.map((region) => (
              <Link
                key={region.id}
                to={region.link}
                className="group block relative w-[68vw] max-w-[240px] flex-shrink-0 snap-center h-[290px] sm:w-auto sm:max-w-none sm:h-[420px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all bg-neutral-900"
              >
                <div className="absolute inset-0 bg-neutral-900/25 group-hover:bg-neutral-900/40 transition-colors duration-500 z-10" />
                <img
                  src={region.image}
                  alt={region.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-7 bg-gradient-to-t from-black/85 via-black/35 to-transparent">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-primary-light font-bold uppercase tracking-wider text-xs mb-1.5 block drop-shadow">
                      {region.desc}
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-white mb-3 drop-shadow-md">
                      {region.name.split(' ')[0]}
                    </h3>
                    <div className="w-12 h-1 bg-primary-light transform origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Editor's Curation Section (2-Col Compact Grid on Mobile, 4-Col on Desktop) */}
      <section id="editor-picks" className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 md:mb-14 gap-4 border-b pb-6 md:pb-8 border-neutral-200">
            <div>
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
                AI Editor's Curation
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-2">
                남도예술정원 AI 에디터 큐레이션
              </h2>
              <p className="text-neutral-500 text-sm sm:text-base md:text-lg font-light">
                전남의 숨은 미식, 감성 숙소, 트레킹 코스를 AI 에디터가 엄선하여 제안합니다.
              </p>
            </div>
            <Link to="/posts" className="inline-flex items-center gap-1 text-xs sm:text-sm md:text-base text-primary font-bold tracking-tight hover:underline group flex-shrink-0">
              <span>AI 에디터 큐레이션 전체보기</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3.5 gap-y-6 sm:gap-8">
            {[
              { id: 'w20-wando-sinji-myeongsasimni', title: '완도 가볼만한곳 신지 명사십리해수욕장 사계절 아름다운 힐링 여행지', cat: '해변 힐링', icon: Waves, img: '/images/myeongsasimni/myeongsasimni-01.webp' },
              { id: 'w21-wando-marine-ecology-museum', title: '완도 아이와 가볼만한곳 해양생태전시관 바닷속 생태계를 만나는 특별한 여행', cat: '생태 체험', icon: Sparkles, img: '/images/marine-eco/marine-eco-02.webp' },
              { id: 'w22-wando-marine-healing-center', title: '완도가볼만한곳 완도해양치유센터 바다가 선물하는 특별한 힐링여행', cat: '해양 치유', icon: Heart, img: '/images/healing-center/healing-center-03.webp' },
              { id: 'j13-jindo-uldol-hyusik', title: '필사즉생의 기상에서 초록빛 안식까지, 진도 감성 여행 완벽 가이드', cat: '감성 유람', icon: Compass, img: '/images/haeyang/haeyang-10.webp' },
              { id: 'm2-food-garden-tour', title: '남도와 정원에 관심있는 사람 모여라! 맛있는 정원투어 미식 여행', cat: '미식 투어', icon: Coffee, img: '/images/food-tour/food-tour-01.webp' },
              { id: 'h30-haenam-moongarden', title: '해남 필수 여행 코스! 맛있는 피크닉 명소 ‘문가든’ 정원 데이트', cat: '정원 피크닉', icon: Flower2, img: '/images/moongarden/moongarden-01.webp' },
              { id: 'h29-haenam-haechang-brewery', title: '막걸리 매니아 방문 필수! 무료 시음 가능한 해남 해창주조장 정원', cat: '양조장 투어', icon: Sparkles, img: '/images/haechang/haechang-01.webp' },
              { id: 's20-shinan-stay-best8', title: 'AI 에디터가 큐레이션한 신안권 숙소 심층 리뷰 BEST 8', cat: '감성 숙소', icon: Heart, img: '/images/post-stay-chunhwadang.webp' }
            ].map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`} className="group flex flex-col">
                <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl mb-2.5 sm:mb-5 shadow-sm sm:shadow-md border border-neutral-100 bg-neutral-100">
                  <img
                    src={post.img}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-neutral-900 flex items-center gap-1 sm:gap-1.5 shadow-sm">
                    <post.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    <span>{post.cat}</span>
                  </div>
                </div>
                <h3 className="text-[14px] sm:text-base md:text-lg font-sans font-bold tracking-[-0.03em] text-neutral-900 group-hover:text-primary transition-colors leading-[1.38] sm:leading-[1.42] line-clamp-2 break-keep px-0.5">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Video Callout Section (Clean Panoramic Background without Burned-in Subtitles) */}
      <section className="relative py-28 md:py-36 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 opacity-45">
          <img
            src="/images/gardens/sani/garden-sani-04.webp"
            alt="남도예술정원 파노라마 풍경"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/60 to-neutral-950/80" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <a
            href="https://www.youtube.com/@%EB%82%A8%EB%8F%84%EC%98%88%EC%88%A0%EC%A0%95%EC%9B%90"
            target="_blank"
            rel="noreferrer"
            aria-label="남도예술정원 공식 유튜브 채널 열기"
            className="inline-block mb-8 group cursor-pointer"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center text-white mx-auto shadow-[0_0_40px_rgba(34,139,34,0.6)] group-hover:scale-110 transition-transform">
              <PlayCircle className="w-10 h-10 md:w-12 md:h-12 ml-0.5" />
            </div>
          </a>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">
            자연이 들려주는<br/>진정한 쉼의 이야기
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/85 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            남도예술정원 공식 유튜브 채널에서 8대 정원주들의 생생한 인터뷰와 사계절 아름다운 풍광을 영상으로 만나보세요.
          </p>
          <a
            href="https://www.youtube.com/@%EB%82%A8%EB%8F%84%EC%98%88%EC%88%A0%EC%A0%95%EC%9B%90"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-white text-neutral-950 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl"
          >
            <span>Watch Now on YouTube</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
