import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';
import { MapPin, Calendar, ArrowRight, Plus, Minus, HelpCircle } from 'lucide-react';
import regionsData from '../../data/regions.json';
import faqData from '../../data/faqs.json';
import imgGohadoMain from '../../assets/gohado-main.webp';

const ITEMS_PER_PAGE = 12;

const FaqItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200 py-4 last:border-b-0">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between text-left focus:outline-none group">
        <span className="font-bold text-neutral-900 pr-4 group-hover:text-primary transition-colors">{q}</span>
        <span className="text-neutral-400 group-hover:text-primary flex-shrink-0 transition-colors">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            <p className="pt-4 text-neutral-600 leading-relaxed text-sm pr-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function RegionGallery() {
  const { regionId } = useParams();
  const [page, setPage] = useState(1);
  const observerRef = useRef();

  const regionNameMap = {
    mokpo: '목포권',
    shinan: '신안권',
    haenam: '해남권',
    jindo: '진도권',
    wando: '완도권',
  };

  const currentRegionName = regionNameMap[regionId] || '관광지';
  const regionFaqs = faqData[regionId] || [];

  const faqSchema = regionFaqs.length > 0 ? {
    "@type": "FAQPage",
    "mainEntity": regionFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  const items = useMemo(() => {
    return regionsData.filter(item => item.regionId === regionId);
  }, [regionId]);

  useEffect(() => {
    setPage(1);
  }, [regionId]);

  const displayedItems = useMemo(() => {
    return items.slice(0, page * ITEMS_PER_PAGE);
  }, [items, page]);

  const hasMore = displayedItems.length < items.length;

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    setPage(prev => prev + 1);
  }, [hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore, hasMore]);

  return (
    <div className="min-h-screen pt-14 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO 
        title={`${currentRegionName} 여행 갤러리 | 남도예술정원`}
        description={`${currentRegionName}의 아름다운 관광지와 추천 명소를 사진과 함께 확인하세요. AI 에디터 큐레이션으로 남도예술정원의 숨겨진 매력을 안내해 드립니다.`}
        schemaData={faqSchema}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
          <MapPin size={15} />
          {currentRegionName} 명소 탐방
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-neutral-900">
          아름다운 {currentRegionName}
        </h1>
        <p className="text-neutral-500 max-w-2xl mx-auto text-base md:text-lg font-light">
          AI 에디터 큐레이션으로 엄선된 {currentRegionName}의 대표적인 정원과 관광 명소를 만나보세요.
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedItems.map((item, index) => {
          let imageUrl = item.image;
          if (item.id === 'm1') {
            imageUrl = imgGohadoMain;
          }

          return (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (index % ITEMS_PER_PAGE) * 0.03 }}
              className="h-full"
            >
              <Link
                to={`/posts/${item.id}`}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200/70 flex flex-col h-full hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-neutral-100">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    loading={index < 8 ? "eager" : "lazy"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-5">
                    <span className="inline-flex items-center gap-1.5 text-white text-xs font-bold tracking-wider uppercase">
                      큐레이션 읽기 <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-mono">
                      <Calendar size={13} />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-base md:text-[17px] font-sans font-bold tracking-[-0.03em] text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-[1.42] break-keep">
                      {item.title.replace(/\\n/g, ' ')}
                    </h3>
                    <p className="text-neutral-500 text-xs md:text-sm font-light line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-primary">
                    <span>자세히 보기</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={observerRef} className="py-12 flex justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-sm text-neutral-500">더 많은 장소 불러오는 중...</span>
          </div>
        </div>
      )}

      {!hasMore && displayedItems.length > 0 && (
        <div className="py-12 text-center text-sm text-neutral-400">
          {currentRegionName}의 모든 추천 명소({items.length}곳)를 불러왔습니다.
        </div>
      )}

      {/* FAQ Section */}
      {regionFaqs.length > 0 && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mt-16 mb-8"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-serif text-neutral-900">
              AI 에디터 큐레이션: {currentRegionName} 자주 묻는 질문
            </h2>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-neutral-200/70 p-6 md:p-8">
            {regionFaqs.map((faq, i) => (
               <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
