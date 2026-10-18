import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, ArrowRight, Sparkles, Compass, Trees, PlayCircle } from 'lucide-react';
import SEO from '../../components/SEO';
import { GARDENS_MASTER } from '../../data/gardensData';

export default function GardensHub() {
  const [activeRegion, setActiveRegion] = useState('all');

  const gardensList = useMemo(() => {
    return Object.values(GARDENS_MASTER);
  }, []);

  const filteredGardens = useMemo(() => {
    if (activeRegion === 'all') return gardensList;
    return gardensList.filter(g => g.region === activeRegion);
  }, [gardensList, activeRegion]);

  const regions = [
    { id: 'all', label: '전체 정원 (8)' },
    { id: '해남', label: '해남권 (4)' },
    { id: '완도', label: '완도권 (2)' },
    { id: '진도', label: '진도권 (1)' },
    { id: '신안', label: '신안권 (1)' },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf7] text-neutral-900 font-sans selection:bg-primary/20 pb-24">
      <SEO 
        title="남도예술정원 컬렉션 — 8대 명품 민간정원"
        description="전라남도 2권역(해남·완도·진도·신안)이 자랑하는 8개의 아름다운 민간정원과 수목원을 한눈에 만나보세요."
        keywords="남도예술정원, 8대정원, 해남정원, 완도정원, 진도정원, 신안정원, 문가든, 산이정원, 바하가든"
        image="/images/gardens/moon/garden-moon-01.webp"
      />

      {/* ─────────────────────────────────────────────────────────────
          1. 시네마틱 헤더 (Cinematic Header)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-neutral-900 text-white pt-24 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary),0.25),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/images/gardens/moon/garden-moon-01.webp')] bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-xs font-bold uppercase tracking-widest border border-primary/30"
            >
              <Trees className="w-3.5 h-3.5" />
              <span>Namdo Master Gardens Collection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight"
            >
              남도예술정원<br />
              <span className="text-primary-foreground font-light text-3xl sm:text-4xl md:text-5xl">
                자연과 예술이 빚어낸 8개의 서사
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base text-neutral-300 font-light max-w-2xl leading-relaxed"
            >
              해남·완도·진도·신안의 청정 자연 속에 정원주들의 오랜 철학과 땀방울로 일군 
              8곳의 명품 민간정원과 수목원. 각 정원만의 독창적인 사계절 풍경과 치유의 공간으로 당신을 초대합니다.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-6 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/15"
          >
            <div>
              <span className="block text-2xl font-bold font-serif text-primary-foreground">08</span>
              <span className="text-[11px] text-neutral-300 uppercase tracking-widest">Master Gardens</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div>
              <span className="block text-2xl font-bold font-serif text-white">04</span>
              <span className="text-[11px] text-neutral-300 uppercase tracking-widest">Regions</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. 권역 필터 탭 (Filter Tabs)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-neutral-200/80 sticky top-0 z-30 shadow-sm backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setActiveRegion(reg.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                  activeRegion === reg.id
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
            총 {filteredGardens.length}개의 정원 탐색
          </span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. 8대 정원 그리드 (8 Gardens Grid)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredGardens.map((garden, idx) => (
              <motion.div
                key={garden.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group bg-white rounded-[2rem] overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* 상단 이미지 카드 */}
                <Link
                  to={`/gardens/${garden.id}`}
                  className="relative aspect-[4/3] overflow-hidden bg-neutral-200 block"
                >
                  <img
                    src={garden.heroImages?.[0] || '/images/main-intro-10.webp'}
                    alt={garden.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* 넘버링 & 지역 */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      No.{garden.number}
                    </span>
                    <span className="bg-primary/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {garden.region}
                    </span>
                  </div>

                  {/* 사진 갤러리 배지 */}
                  {garden.gallery?.items?.length > 0 && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider border border-white/20 shadow-lg">
                        <Camera className="w-3 h-3 text-primary" /> {garden.gallery.items.length} Photos
                      </span>
                    </div>
                  )}

                  {/* 공식 타이틀 */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-white/80 text-[11px] font-light">
                      {garden.officialTitle}
                    </span>
                  </div>
                </Link>

                {/* 콘텐츠 영역 */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-serif font-bold text-neutral-900 group-hover:text-primary transition-colors">
                        <Link to={`/gardens/${garden.id}`}>
                          {garden.name}
                        </Link>
                      </h3>
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                        {garden.enName}
                      </span>
                    </div>

                    <p className="text-neutral-500 text-xs font-light italic leading-relaxed">
                      "{garden.slogan}"
                    </p>

                    <p className="text-neutral-600 text-xs font-light line-clamp-2 leading-relaxed pt-1">
                      {garden.summary}
                    </p>
                  </div>

                  {/* 버튼 영역 */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <Link
                      to={`/gardens/${garden.id}`}
                      className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 group/btn"
                    >
                      <span>Showcase</span>
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    {garden.gallery?.items?.length > 0 ? (
                      <Link
                        to={`/gardens/${garden.id}#gallery`}
                        className="text-[11px] font-bold text-neutral-700 hover:text-white flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-900 px-3 py-1 rounded-full transition-all duration-300"
                      >
                        <Camera className="w-3.5 h-3.5 text-primary" />
                        <span>갤러리 {garden.gallery.items.length}</span>
                      </Link>
                    ) : (
                      <Link
                        to={`/posts/${garden.storyPostId}`}
                        className="text-[11px] font-semibold text-neutral-500 hover:text-primary flex items-center gap-1 transition-colors"
                      >
                        <span>저널 보기</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. 하단 정원 투어 팁 배너
      ───────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mt-8">
        <div className="bg-neutral-900 text-white rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-primary-foreground font-bold text-xs uppercase tracking-widest">
              Travel Tips
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight">
              남도예술정원 100% 즐기기
            </h2>
            <p className="text-neutral-300 font-light text-sm leading-relaxed">
              남도 2권역의 정원들은 계절마다 야생화와 수목, 호수의 빛깔이 완전히 달라집니다. 
              각 정원의 공식 쇼케이스에서 운영 시간, 주차, 포토스팟을 미리 확인하고 방문해 보세요.
            </p>
            <div className="pt-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-lg"
              >
                <span>홈페이지 메인으로 돌아가기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
