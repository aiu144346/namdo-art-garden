import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Search, MapPin, ArrowRight, Compass, Coffee, ChevronRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import SEO from '../../components/SEO';

const REGIONS = [
  { id: 'mokpo', name: '목포 (Mokpo)', desc: '근대 역사와 예술의 항구', image: '/images/gohado-main.webp', link: '/region/mokpo' },
  { id: 'shinan', name: '신안 (Shinan)', desc: '1004섬의 예술', image: '/images/shinan-18.webp', link: '/region/shinan' },
  { id: 'haenam', name: '해남 (Haenam)', desc: '땅끝의 비밀 정원', image: '/images/haenam-048.webp', link: '/region/haenam' },
  { id: 'jindo', name: '진도 (Jindo)', desc: '빛과 소리의 고장', image: '/images/jindo-034.webp', link: '/region/jindo' },
  { id: 'wando', name: '완도 (Wando)', desc: '치유와 명상의 섬', image: '/images/wando-076.webp', link: '/region/wando' },
];

const HERO_IMAGES = [
  { src: '/images/main-intro-10.webp', name: '문가든' },
  { src: '/images/main-intro-011.webp', name: '바하가든' },
  { src: '/images/main-intro-12.webp', name: '비원' },
  { src: '/images/main-intro-13.webp', name: '산이정원' },
  { src: '/images/main-intro-14.webp', name: '아내의 정원' },
  { src: '/images/main-intro-15.webp', name: '진도휴식' },
  { src: '/images/main-intro-16.webp', name: '파인클라우드' },
  { src: '/images/main-intro-17.webp', name: '포레스트 수목원' }
];

// Generative AI 최적화를 위한 Schema(JSON-LD) 데이터 설계
const generateSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristAttraction",
      "name": "남도예술정원",
      "description": "수백 년 된 고목과 현대 예술 조형물이 어우러진 대자연 속의 거대한 갤러리. 대한민국 최고의 정원 투어.",
      "url": "https://namdogarden.example.com"
    }
  ]
});

// -- Tilt Card Component (Premium 3D Effect) --
function TiltCard({ garden, idx }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      transition={{ delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group flex flex-col h-full perspective-1000"
    >
      <a
        href={garden.video}
        target="_blank"
        rel="noopener noreferrer"
        style={{ transform: "translateZ(50px)" }}
        className="relative overflow-hidden rounded-[2rem] shadow-xl aspect-[3/4] mb-8 group block"
      >
        <img
          src={garden.img}
          alt={garden.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/40 transition-colors duration-500" />

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-500">
            <PlayCircle className="w-8 h-8 text-primary ml-0.5" />
          </div>
        </div>

        {/* Vertical Garden No. */}
        <div className="absolute top-8 left-8" style={{ transform: "translateZ(70px)" }}>
          <span className="text-white/60 text-xs font-bold tracking-[0.4em] uppercase [writing-mode:vertical-lr] rotate-180">
            Garden No.0{idx + 1}
          </span>
        </div>
      </a>

      <div className="space-y-4 flex-grow px-1" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-serif font-bold text-neutral-900">{garden.name}</h3>
          <span className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase border-l pl-3 border-neutral-200">{garden.en}</span>
        </div>
        <p className="text-neutral-500 font-light leading-relaxed text-sm h-12 line-clamp-2 italic">
          "{garden.quote}"
        </p>
        <div className="pt-2">
          <Link to={`/posts/${garden.postId}`} className="text-xs font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
            Read Story <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [currentBg, setCurrentBg] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white selection:bg-primary/30 relative overflow-hidden">
      <SEO 
        title="남도예술정원 | Namdo Art Garden" 
        description="대한민국 남도의 아름다운 정원과 자연 경관, 그리고 예술이 어우러진 최고의 여행 코스를 만나보세요."
        keywords="남도예술정원, 남도여행, 전남여행, 완도, 해남, 신안, 진도, 민간정원"
        schemaData={generateSchema()}
      />

      {/* Hero Section (Cinematic Canvas - Brightened) */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentBg}
            src={HERO_IMAGES[currentBg].src}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 5, ease: "easeOut" }
            }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={HERO_IMAGES[currentBg].name}
          />
        </AnimatePresence>
        
        {/* Cinematic Overlays (Minimized for Maximum Brightness) */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
        >
          <span className="text-white/80 tracking-[0.4em] uppercase text-xs md:text-sm mb-8 font-bold drop-shadow-md">
            The 8 Dimensions of Healing
          </span>
          
          <AnimatePresence mode="wait">
            <motion.h1 
              key={currentBg}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="text-6xl md:text-8xl lg:text-[110px] font-serif text-white font-bold leading-none tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)] mb-10"
            >
              NAMDO<br/>ART GARDEN
            </motion.h1>
          </AnimatePresence>

          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-14 leading-relaxed">
            자연과 예술이 빚어낸 힐링과 서사가 있는,<br/>남도예술정원으로 당신을 초대합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <a href="#featured" className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white py-4 px-8 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 shadow-xl hover:scale-105 group">
               <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" /> 8대 정원 탐험하기
            </a>
          </div>
        </motion.div>

        {/* Dynamic Image Indicator */}
        <div className="absolute bottom-12 right-12 text-white/70 font-serif italic text-lg tracking-widest hidden md:flex items-center">
           <AnimatePresence mode="wait">
             <motion.span
                key={currentBg}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
             >
               {HERO_IMAGES[currentBg].name}
             </motion.span>
           </AnimatePresence>
           <span className="mx-6 text-white/30 font-sans">|</span>
           <span className="text-white/50 text-sm font-sans not-italic font-bold tracking-[0.2em]">
             0{currentBg + 1} / 08
           </span>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/50" />
        </div>
      </section>

      {/* Quick Explore Bar */}
      <div className="bg-neutral-900 text-white sticky top-0 z-40 relative shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-[url('/images/main-intro-01.webp')] before:opacity-10 before:mix-blend-overlay">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center md:justify-between gap-6 relative z-10">
          <span className="font-serif text-xl md:text-2xl italic text-primary/80">"We Must Cultivate Our Garden"</span>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-sm font-bold uppercase tracking-widest text-white/80">
            <a href="#featured" className="hover:text-primary transition-colors whitespace-nowrap">Featured Stories</a>
            <a href="#regions" className="hover:text-primary transition-colors whitespace-nowrap">Explore Regions</a>
            <a href="#editor-picks" className="hover:text-primary transition-colors whitespace-nowrap">AI Researcher's Picks</a>
          </div>
        </div>
      </div>

      {/* Featured Story: 8 Sounds of Namdo (Premium Magazine Style) */}
      <section id="featured" className="py-32 bg-white px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-24 space-y-6 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 text-primary font-bold tracking-[0.4em] uppercase text-xs"
              >
                <div className="w-10 h-[1px] bg-primary"></div>
                Main Story
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-serif text-neutral-900 font-bold leading-tight flex flex-wrap items-baseline gap-x-2"
              >
                <span className="text-3xl md:text-5xl">남도예술정원의</span>
                <span className="text-5xl md:text-7xl text-primary md:ml-4">"소리"</span>
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-neutral-500 font-light max-w-md leading-relaxed md:pb-2 border-b-2 border-neutral-100"
            >
              "정원을 가꾸는 일은 곧 자신의 인생을 가꾸는 일과 같습니다." 남도 명품 민간정원 8곳의 정원주들이 들려주는 사유의 목소리를 만나보세요.
            </motion.p>
          </div>

          {/* 8 Gardens Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[
              { id: 'moon', name: '문가든', en: 'Moon Garden', img: '/images/main-intro-10.webp', quote: '달빛이 머무는 조용한 치유의 정원', video: 'https://www.youtube.com/watch?v=OchvsecQrpg', postId: 'h26-haenam-moongarden-guide' },
              { id: 'baha', name: '바하가든', en: 'Baha Garden', img: '/images/main-intro-011.webp', quote: '소유보다 존재의 의미를 찾는 바람의 언덕', video: 'https://www.youtube.com/watch?v=v-NpCjFLGfk', postId: 'w14-wando-baha-garden' },
              { id: 'biwon', name: '비원', en: 'Secret Garden', img: '/images/main-intro-12.webp', quote: '산비탈 다랑이논의 아름다운 비밀', video: 'https://www.youtube.com/watch?v=pvljDsnK7Os', postId: 'h25-haenam-secret-garden' },
              { id: 'sani', name: '산이정원', en: 'Sani Garden', img: '/images/main-intro-13.webp', quote: '미래세대를 위한 꿈의 씨앗', video: 'https://www.youtube.com/watch?v=9Pj4yPWcZrg', postId: 'h3-haenam-sanigarden-guide' },
              { id: 'wife', name: '아내의 정원', en: 'Home of Florist', img: '/images/main-intro-14.webp', quote: '아내를 향한 남편의 숲속 유럽형 정원', video: 'https://www.youtube.com/watch?v=FrlTdCYDydw', postId: 'w7-wando-wife-garden' },
              { id: 'jindo', name: '진도휴식', en: 'Jindo Rest', img: '/images/main-intro-15.webp', quote: '동백 숲과 바다가 건네는 오감의 환대', video: 'https://www.youtube.com/watch?v=6tc6CFsyekE', postId: 'j11-jindo-hyusik' },
              { id: 'pine', name: '파인클라우드', en: 'Pine Cloud', img: '/images/main-intro-16.webp', quote: '소나무와 구름 사이, 사유의 즐거움', video: 'https://www.youtube.com/watch?v=onnW1mJWSvE', postId: 's2-pinecloud-photo' },
              { id: 'forest', name: '포레스트 수목원', en: '4est Arboretum', img: '/images/main-intro-17.webp', quote: '별, 돌, 이야기, 배움이 있는 인생의 숲', video: 'https://www.youtube.com/watch?v=BWgurEgrrUM', postId: 'h23-haenam-4est-arboretum' },
            ].map((garden, idx) => (
              <TiltCard key={garden.id} garden={garden} idx={idx} />
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-24 pt-12 border-t border-neutral-100 text-center">
            <Link to="/posts/m1-namdo-art-garden-intro" className="inline-flex items-center gap-8 group">
              <span className="text-sm font-bold uppercase tracking-[0.4em] text-neutral-900 group-hover:text-primary transition-colors">
                Explore the complete collection
              </span>
              <div className="w-14 h-14 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 shadow-sm">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>



      {/* Explore Regions (Large Type & Hover Cards) */}
      <section id="regions" className="py-24 bg-surface/30 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif text-neutral-900 mb-6">Explore the Regions</h2>
            <p className="text-neutral-600 text-lg font-light leading-relaxed">각막한 일상에서 벗어나, 아름다운 바다와 숲이 어우러진 다도해의 보석 같은 지역들을 탐험해보세요.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {REGIONS.map((region, idx) => (
              <Link key={region.id} to={region.link} className="group block relative h-[450px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all">
                <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors duration-500 z-10" />
                <img src={region.image} alt={region.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">{region.desc}</span>
                     <h3 className="text-3xl font-serif text-white mb-4">{region.name.split(' ')[0]}</h3>
                     <div className="w-12 h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Eats & Stays (Editor's Picks) */}
      <section id="editor-picks" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b pb-8 border-neutral-200">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-4">남도예술정원 AI 리서처 추천</h2>
              <p className="text-neutral-500 text-lg font-light">전남의 숨은 미식, 감성 숙소, 트레킹 코스를 AI 리서처가 엄선하여 제안합니다</p>
            </div>
            <Link to="/posts" className="flex items-center gap-2 text-primary font-bold tracking-tight hover:underline group">
              리서처 리포트 전체보기 <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { id: 'm2-food-april', title: 'AI 리서처가 추천하는 4월의 목포 맛집 탐방', cat: '맛집', icon: Coffee, img: '/images/post-food-jokzakaya.webp' },
              { id: 's20-shinan-stay-best8', title: 'AI 리서처가 추천하는 신안권 숙소 심층 리뷰 BEST 8', cat: '숙소', icon: Search, img: '/images/post-stay-chunhwadang.webp' },
              { id: 'h28-haenam-walking-best4', title: '해남 걷는 행복 — AI 리서처가 추천하는 최고의 걷기 탐방 가이드', cat: '여행 팁', icon: Compass, img: '/images/wando-074.webp' }
            ].map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6 shadow-md border border-neutral-100">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-neutral-900 flex items-center gap-2 shadow-sm">
                    <post.icon className="w-3 h-3 text-primary" /> {post.cat}
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-neutral-900 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Video Callout Section */}
      <section className="relative py-32 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="/images/main-intro-08.webp" alt="Video Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-neutral-900/60" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <a href="https://www.youtube.com/@%EB%82%A8%EB%8F%84%EC%98%88%EC%88%A0%EC%A0%95%EC%9B%90" target="_blank" rel="noreferrer" className="inline-block mb-10 group cursor-pointer">
             <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white mx-auto shadow-[0_0_40px_rgba(var(--color-primary),0.5)] group-hover:scale-110 transition-transform">
               <PlayCircle className="w-12 h-12 ml-1" />
             </div>
          </a>
          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight drop-shadow-lg">자연이 들려주는<br/>진정한 쉼의 이야기</h2>
          <p className="text-lg md:text-xl text-white/80 font-light mb-12 max-w-2xl mx-auto">
            남도예술정원 유튜브 채널에서 정원주들의 생생한 인터뷰와 아름다운 풍광을 영상으로 만나보세요.
          </p>
          <a href="https://www.youtube.com/@%EB%82%A8%EB%8F%84%EC%98%88%EC%88%A0%EC%A0%95%EC%9B%90" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-white text-neutral-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-neutral-100 hover:text-primary transition-colors">
            Watch Now on YouTube
          </a>
        </div>
      </section>

    </div>
  );
}
