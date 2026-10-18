import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, Calendar, Ticket, Car, PawPrint, Coffee, 
  Camera, ChevronLeft, ChevronRight, X, Maximize2, Download, 
  ExternalLink, Copy, Check, ArrowRight, Sparkles, Navigation,
  Share2, Heart, Trees, Compass
} from 'lucide-react';
import SEO from '../../components/SEO';
import { GARDENS_MASTER } from '../../data/gardensData';

export default function GardenDetail() {
  const { gardenId } = useParams();
  const targetGardenId = gardenId === 'forest' ? '4est' : (gardenId || 'moon');
  const garden = GARDENS_MASTER[targetGardenId] || GARDENS_MASTER[gardenId];

  // 상태 관리
  const [heroIdx, setHeroIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImageIdx, setSelectedImageIdx] = useState(null);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  // 데이터가 없을 때의 fallback
  if (!garden) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-serif font-bold mb-4">정원을 찾을 수 없습니다.</h1>
        <p className="text-neutral-400 mb-8">요청하신 정원 ID ({gardenId})의 정보가 존재하지 않습니다.</p>
        <Link to="/" className="px-6 py-3 rounded-full bg-primary text-white font-bold">홈으로 돌아가기</Link>
      </div>
    );
  }

  const { heroImages, visitorInfo, highlights, photoSpots, philosophy, gallery, nearbyGardens } = garden;

  // 히어로 이미지 자동 슬라이드
  useEffect(() => {
    if (!heroImages || heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  // 갤러리 필터링
  const filteredImages = useMemo(() => {
    if (!gallery || !gallery.items) return [];
    if (activeCategory === 'all') return gallery.items;
    return gallery.items.filter(item => item.category === activeCategory);
  }, [gallery, activeCategory]);

  // 주소 복사
  const handleCopyAddress = async () => {
    if (!visitorInfo?.address) return;
    try {
      await navigator.clipboard.writeText(visitorInfo.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // 라이트박스 이전/다음
  const handlePrev = useCallback(() => {
    if (selectedImageIdx === null) return;
    setSelectedImageIdx((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  }, [selectedImageIdx, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (selectedImageIdx === null) return;
    setSelectedImageIdx((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  }, [selectedImageIdx, filteredImages.length]);

  // 키보드 내비게이션
  useEffect(() => {
    if (selectedImageIdx === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImageIdx(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIdx, handlePrev, handleNext]);

  return (
    <div className="min-h-screen bg-[#fafaf7] text-neutral-900 font-sans selection:bg-primary/20">
      <SEO 
        title={`${garden.name} (${garden.enName}) — 남도예술정원 공식 쇼케이스`}
        description={garden.summary}
        keywords={`남도예술정원, ${garden.name}, ${garden.region}여행, 해남가볼만한곳, 민간정원, 포토갤러리`}
        image={heroImages?.[0]}
      />

      {/* ─────────────────────────────────────────────────────────────
          1. 시네마틱 히어로 섹션 (Cinematic Hero)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[90vh] min-h-[640px] max-h-[960px] bg-black overflow-hidden flex items-end">
        {/* 배경 이미지 크로스페이드 */}
        <AnimatePresence mode="wait">
          <motion.img
            key={heroIdx}
            src={heroImages?.[heroIdx] || '/images/main-intro-10.webp'}
            alt={garden.name}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
        </AnimatePresence>

        {/* 오버레이 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none" />

        {/* 상단 브레드크럼 */}
        <div className="absolute top-28 left-6 md:left-16 z-20 flex items-center gap-2 text-white/80 text-xs tracking-widest uppercase font-mono">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/region/${garden.regionEn.toLowerCase()}`} className="hover:text-primary transition-colors">{garden.region}</Link>
          <span>/</span>
          <span className="text-primary font-bold">{garden.name}</span>
        </div>

        {/* 히어로 콘텐츠 본문 */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-4xl"
          >
            {/* 배지 & 넘버링 */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-widest">
                Garden No.{garden.number}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-[11px] font-semibold border border-white/20">
                {garden.officialTitle}
              </span>
              <span className="text-white/60 text-xs font-mono">
                {garden.area}
              </span>
            </div>

            {/* 메인 타이틀 & 슬로건 */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-xl">
              {garden.name}
              <span className="block text-2xl sm:text-3xl md:text-4xl font-sans font-light text-white/80 mt-2 tracking-normal">
                {garden.enName}
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl mb-8 drop-shadow-md">
              "{garden.slogan}"
            </p>

            {/* CTA 액션 바 */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#gallery" 
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-neutral-950 font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 shadow-xl hover:scale-105"
              >
                <Camera className="w-4 h-4 text-primary" />
                <span>34장 포토갤러리 감상</span>
              </a>
              <a 
                href="#visitor-guide" 
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/25 font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all duration-300"
              >
                <MapPin className="w-4 h-4" />
                <span>오시는 길 및 관람 안내</span>
              </a>
              {garden.storyPostId && (
                <Link
                  to={`/posts/${garden.storyPostId}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900/60 backdrop-blur-md text-white/90 hover:text-white border border-white/15 font-bold text-xs uppercase tracking-widest hover:border-white/40 transition-all duration-300"
                >
                  <span>취재 저널 읽기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        {/* 인디케이터 바 */}
        <div className="absolute bottom-6 right-6 md:right-16 z-20 flex items-center gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === heroIdx ? 'w-8 bg-primary' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              title={`사진 ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. 퀵 가이드 바 (Quick Highlights Bar)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-neutral-200/80 sticky top-0 z-30 shadow-sm backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-neutral-600">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1">
            <span className="flex items-center gap-2 text-neutral-900 font-bold whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-primary" /> {visitorInfo.addressShort}
            </span>
            <span className="text-neutral-300">|</span>
            <span className="flex items-center gap-2 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-primary" /> {visitorInfo.openHours}
            </span>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-2 text-primary font-bold whitespace-nowrap">
              <Ticket className="w-3.5 h-3.5" /> {visitorInfo.admission}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-full border transition-colors ${
                liked ? 'bg-red-50 border-red-200 text-red-500' : 'border-neutral-200 text-neutral-500 hover:text-neutral-900'
              }`}
              title="관심 정원 저장"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleCopyAddress}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-bold transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? '주소 복사됨' : '주소 복사'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. 정원 소개 및 핵심 매력 3선 (Key Highlights)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-3">
            Distinctive Features
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight leading-tight">
            자연이 빚어낸 3가지 치유의 순간
          </h2>
          <p className="text-neutral-500 font-light text-base md:text-lg mt-4 leading-relaxed">
            {garden.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="group bg-white rounded-3xl p-8 border border-neutral-200/70 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase mb-6">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold font-serif text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-500 font-light text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-neutral-300 group-hover:text-primary transition-colors">
                <span className="font-mono text-xs font-bold">0{idx + 1}</span>
                <Sparkles className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. 정원주의 철학 & 헤리티지 (Philosophy & Heritage)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary),0.15),transparent_50%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-bold tracking-widest uppercase">
                Garden Heritage
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
                "대자연의 시나리오에<br />
                <span className="text-primary-foreground">쉼표 하나를 얹다</span>"
              </h2>
              <div className="w-12 h-[2px] bg-primary" />
              <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed whitespace-pre-line">
                {philosophy.content}
              </p>
              <div className="pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-serif text-primary font-bold">
                  月
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{philosophy.author}</p>
                  <p className="text-xs text-neutral-400">자연주의 치유정원 설계</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[16/10]">
                <img
                  src="/images/gardens/moon/garden-moon-01.webp"
                  alt="문가든 항공 파노라마"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
                  <p className="text-white/90 italic font-serif text-sm md:text-base max-w-lg">
                    "{philosophy.quote}"
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. 인생샷 포토스팟 가이드 (Best Photo Spots)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-3">
            Photographer's Recommendation
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight">
            놓칠 수 없는 인생샷 포토스팟 3
          </h2>
          <p className="text-neutral-500 font-light text-sm md:text-base mt-4">
            전문 사진작가가 추천하는 문가든의 황금 뷰포인트와 촬영 팁을 만나보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {photoSpots.map((spot, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                  src={spot.img}
                  alt={spot.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <span className="absolute top-4 left-4 bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {spot.spot}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 font-serif mb-2">
                    {spot.title}
                  </h3>
                  <p className="text-neutral-500 font-light text-xs leading-relaxed">
                    {spot.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. 34장 인터랙티브 포토 갤러리 (Interactive Photo Archive)
      ───────────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-24 px-6 md:px-12 bg-white border-y border-neutral-200/70">
        <div className="max-w-7xl mx-auto">
          
          {/* 갤러리 헤더 */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.25em] mb-3">
                <Camera className="w-4 h-4" />
                <span>Curated Photo Archive</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight">
                {garden.name} 사계 포토 아카이브
              </h2>
              <p className="text-neutral-500 text-sm md:text-base mt-2 font-light">
                드론 항공뷰부터 숲속 오솔길, 들꽃의 숨결까지 담은 34장의 고화질 사진을 감상해보세요.
              </p>
            </div>

            {/* 카테고리 필터 탭 */}
            <div className="flex flex-wrap items-center gap-2">
              {gallery.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-neutral-900 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* 갤러리 그리드 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (idx % 8) * 0.04 }}
                onClick={() => setSelectedImageIdx(idx)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={img.thumb}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/45 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/95 text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* 캡션 */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-medium drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  {img.title}
                </div>

                {/* 넘버 뱃지 */}
                <div className="absolute top-2.5 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md font-mono">
                  #{img.num}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. 방문자 실용 가이드 & 오시는 길 (Visitor Guide)
      ───────────────────────────────────────────────────────────── */}
      <section id="visitor-guide" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-white rounded-[2.5rem] border border-neutral-200/80 p-8 md:p-14 shadow-lg">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-100 mb-10">
            <div>
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-2">
                Visitor Information
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
                관람 안내 및 오시는 길
              </h2>
            </div>
            <p className="text-neutral-500 font-light text-sm max-w-md">
              방문 전 운영 시간과 안내 사항을 미리 확인하여 더욱 편안하고 여유로운 치유의 시간을 누려보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            <div className="space-y-2 bg-neutral-50 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>운영 시간</span>
              </div>
              <p className="text-base font-semibold text-neutral-800">{visitorInfo.openHours}</p>
              <p className="text-xs text-red-500 font-medium">{visitorInfo.closedDays}</p>
            </div>

            <div className="space-y-2 bg-neutral-50 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                <Ticket className="w-4 h-4" />
                <span>이용 요금</span>
              </div>
              <p className="text-base font-semibold text-neutral-800">{visitorInfo.admission}</p>
              <p className="text-xs text-neutral-500">정원 내 자유 산책 가능</p>
            </div>

            <div className="space-y-2 bg-neutral-50 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                <Car className="w-4 h-4" />
                <span>주차 시설</span>
              </div>
              <p className="text-base font-semibold text-neutral-800">{visitorInfo.parking}</p>
              <p className="text-xs text-neutral-500">대형 버스/승용차 완비</p>
            </div>

            <div className="space-y-2 bg-neutral-50 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                <PawPrint className="w-4 h-4" />
                <span>반려동물</span>
              </div>
              <p className="text-base font-semibold text-neutral-800">동반 불가</p>
              <p className="text-xs text-neutral-500">{visitorInfo.petPolicy}</p>
            </div>

          </div>

          {/* 오시는 길 주소 및 지도 길찾기 */}
          <div className="bg-[#fafaf7] rounded-3xl p-8 border border-neutral-200/60 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 w-full lg:w-auto">
              <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider block">Address</span>
              <p className="text-xl md:text-2xl font-bold text-neutral-900">{visitorInfo.address}</p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {visitorInfo.facilities.map((fac, idx) => (
                  <span key={idx} className="bg-white border border-neutral-200/80 px-3 py-1 rounded-full text-xs text-neutral-600 font-medium">
                    ✓ {fac}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
              <button
                onClick={handleCopyAddress}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-neutral-300 hover:bg-neutral-100 text-xs font-bold text-neutral-800 transition-colors shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '주소 복사 완료' : '주소 복사'}</span>
              </button>

              <a
                href={`https://map.naver.com/v5/search/${encodeURIComponent(garden.name + ' ' + visitorInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#03C75A] text-white text-xs font-bold hover:opacity-95 transition-all shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>네이버 지도 길찾기</span>
              </a>

              <a
                href={`https://map.kakao.com/link/search/${encodeURIComponent(garden.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FEE500] text-[#3C1E1E] text-xs font-bold hover:opacity-95 transition-all shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>카카오맵 길찾기</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. 인접 연계 정원 추천 (Nearby Gardens)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-neutral-100/60 border-t border-neutral-200/70">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-2">
                Continue the Journey
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900">
                함께 둘러보기 좋은 해남 권역 정원
              </h2>
            </div>
            <Link to="/" className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 hover:underline">
              8대 정원 전체보기 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbyGardens.map((near) => (
              <Link
                key={near.id}
                to={`/gardens/${near.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-neutral-200">
                  <img
                    src={near.img}
                    alt={near.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-2">
                      <span>{near.region}</span>
                      <span className="text-primary font-bold">{near.distance}</span>
                    </div>
                    <h3 className="text-xl font-bold font-serif text-neutral-900 group-hover:text-primary transition-colors">
                      {near.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">{near.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-primary">
                    <span>정원 둘러보기</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          라이트박스 풀스크린 모달 (Lightbox Modal)
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 select-none"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white/80 z-20">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-primary">
                  {String(selectedImageIdx + 1).padStart(2, '0')} / {String(filteredImages.length).padStart(2, '0')}
                </span>
                <span className="text-white/30">|</span>
                <span className="text-sm font-medium text-white truncate max-w-[200px] sm:max-w-md">
                  {filteredImages[selectedImageIdx].title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={filteredImages[selectedImageIdx].src}
                  download={`garden-${garden.id}-${selectedImageIdx + 1}.webp`}
                  title="고해상도 다운로드"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedImageIdx(null)}
                  title="닫기 (ESC)"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Center Image */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <button
                onClick={handlePrev}
                title="이전 사진 (좌측 화살표)"
                className="absolute left-2 md:left-6 z-20 w-12 h-12 rounded-full bg-black/50 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-2xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={selectedImageIdx}
                src={filteredImages[selectedImageIdx].src}
                alt={filteredImages[selectedImageIdx].alt}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              />

              <button
                onClick={handleNext}
                title="다음 사진 (우측 화살표)"
                className="absolute right-2 md:right-6 z-20 w-12 h-12 rounded-full bg-black/50 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-2xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="flex justify-center overflow-x-auto py-2 gap-2 max-w-4xl mx-auto no-scrollbar z-20">
              {filteredImages.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIdx(i)}
                  className={`relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                    i === selectedImageIdx
                      ? 'ring-2 ring-primary scale-105 opacity-100'
                      : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={img.thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
