import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Calendar, Clock, ChevronRight, Sparkles, Filter, ArrowRight, BookOpen, Layers } from 'lucide-react';
import POST_DATA from '../../data/postsData';
import { getCustomPosts } from '../../utils/adminStorage';
import SEO from '../../components/SEO';

const REGION_TABS = [
  { id: 'all', label: '전체 리포트' },
  { id: 'main', label: '기획·미식투어' },
  { id: 'haenam', label: '해남권' },
  { id: 'wando', label: '완도권' },
  { id: 'jindo', label: '진도권' },
  { id: 'shinan', label: '신안권' },
  { id: 'mokpo', label: '목포권' },
];

export default function PostsArchive() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Convert post data object into structured array with normalized metadata
  const allPosts = useMemo(() => {
    const customObj = getCustomPosts().reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
    const merged = { ...customObj, ...POST_DATA };
    return Object.entries(merged).map(([id, post]) => {
      // Clean title
      const cleanTitle = (post.title || '').replace(/\\n/g, ' ').trim();
      
      // Determine region
      let region = post.regionId;
      if (!region) {
        const prefix = id.charAt(0).toLowerCase();
        if (prefix === 'h') region = 'haenam';
        else if (prefix === 'w') region = 'wando';
        else if (prefix === 'j') region = 'jindo';
        else if (prefix === 's') region = 'shinan';
        else if (prefix === 'm') {
          region = id.startsWith('m2-food-garden-tour') ? 'main' : 'mokpo';
        } else {
          region = 'all';
        }
      }

      // Determine category
      let category = '정원 탐방';
      const text = `${cleanTitle} ${post.description || ''} ${post.keywords || ''}`;
      if (text.includes('미식') || text.includes('맛집') || text.includes('음식') || text.includes('먹거리')) {
        category = '로컬 미식';
      } else if (text.includes('숙소') || text.includes('호텔') || text.includes('펜션') || text.includes('스테이')) {
        category = '감성 숙소';
      } else if (text.includes('걷기') || text.includes('트레킹') || text.includes('산책') || text.includes('코스')) {
        category = '트레킹·힐링';
      } else if (text.includes('양조장') || text.includes('막걸리') || text.includes('시음')) {
        category = '체험·양조장';
      } else if (text.includes('공지') || text.includes('모집') || text.includes('크리에이터')) {
        category = '공지·소식';
      }

      // Priority ordering (Featured first)
      const isFeatured = [
        'j13-jindo-uldol-hyusik',
        'h30-haenam-moongarden',
        'h29-haenam-haechang-brewery',
        'm2-food-garden-tour',
        's20-shinan-stay-best8',
        'h28-haenam-walking-best4',
        'm1-namdo-art-garden-intro'
      ].includes(id);

      return {
        id,
        ...post,
        cleanTitle,
        region,
        category,
        isFeatured
      };
    });
  }, []);

  // Filter posts based on region tab, category, and search query
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      // Region match
      if (selectedRegion !== 'all') {
        if (selectedRegion === 'main') {
          if (post.region !== 'main' && !['1', '2', '3', 'm1-namdo-art-garden-intro'].includes(post.id)) {
            return false;
          }
        } else if (post.region !== selectedRegion) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== 'all' && post.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = post.cleanTitle.toLowerCase().includes(query);
        const matchDesc = (post.description || '').toLowerCase().includes(query);
        const matchKey = (post.keywords || '').toLowerCase().includes(query);
        return matchTitle || matchDesc || matchKey;
      }

      return true;
    }).sort((a, b) => {
      // Featured first
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      // Date descending if possible
      const dateA = a.date || '';
      const dateB = b.date || '';
      return dateB.localeCompare(dateA);
    });
  }, [allPosts, selectedRegion, selectedCategory, searchQuery]);

  const categories = ['all', '정원 탐방', '로컬 미식', '감성 숙소', '트레킹·힐링', '체험·양조장'];

  return (
    <div className="w-full bg-[#fcfcf9] min-h-screen pt-8 pb-32">
      <SEO 
        title="AI 리서처 리포트 전체 아카이브 | 남도예술정원"
        description="전남의 숨은 미식, 감성 숙소, 트레킹 코스, 정원 명소를 AI 리서처가 엄선하여 제안하는 리포트 전체 아카이브입니다."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> AI Researcher Reports Archive
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 tracking-tight leading-tight mb-6">
            남도예술정원<br />
            <span className="text-primary font-sans">AI 리서처 리포트 전체보기</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed">
            해남, 완도, 진도, 신안, 목포까지 남도 5개 권역의 아름다운 정원과 현지 미식, 감성 숙소, 트레킹 코스에 대해 누적 발행된 총 <strong>{allPosts.length}편</strong>의 심층 리포트를 한자리에서 탐색해보세요.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-12 bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-neutral-200/80 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="정원 이름, 맛집, 숙소, 키워드로 리포트 검색 (예: 문가든, 해창주조장, 닭코스, 황칠차...)"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:outline-none focus:border-primary text-sm md:text-base text-neutral-800 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 bg-neutral-200/60 px-2 py-1 rounded-md"
              >
                지우기
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-4">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> 권역별
            </span>
            {REGION_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                  selectedRegion === tab.id
                    ? 'bg-neutral-900 text-white shadow-sm font-bold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> 테마별
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white font-bold'
                    : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700'
                }`}
              >
                {cat === 'all' ? '전체 테마' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-200">
          <p className="text-sm font-medium text-neutral-500">
            총 <strong className="text-neutral-900 font-bold">{filteredPosts.length}</strong>개의 리서처 리포트가 있습니다
          </p>
          {(selectedRegion !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-primary font-bold hover:underline"
            >
              필터 초기화
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-neutral-200 space-y-4 max-w-xl mx-auto my-12">
            <BookOpen className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="text-xl font-serif font-bold text-neutral-800">검색된 리포트가 없습니다</h3>
            <p className="text-sm text-neutral-500">
              다른 검색어나 권역 탭을 선택해 보세요.
            </p>
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-primary transition-colors"
            >
              전체 리포트 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/posts/${post.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img 
                    src={post.image} 
                    alt={post.cleanTitle} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-neutral-800 shadow-sm">
                    {post.category}
                  </div>
                  {post.isFeatured && (
                    <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      추천
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-light">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date || '2026'}</span>
                      {post.readTime && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-lg font-serif font-bold text-neutral-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {post.cleanTitle}
                    </h2>
                    {post.description && (
                      <p className="text-xs text-neutral-500 font-light leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-primary">
                    <span className="group-hover:underline">리포트 읽기</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
