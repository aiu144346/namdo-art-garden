import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  // Format region name for display
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

  useEffect(() => {
    // Simulate API fetch delay
    setLoading(true);
    setTimeout(() => {
      // In a real app, this would be an API call filtered by regionId
      const filtered = regionsData.filter(item => item.regionId === regionId);

      setItems(filtered);
      setDisplayedItems(filtered.slice(0, ITEMS_PER_PAGE));
      setPage(1);
      setHasMore(filtered.length > ITEMS_PER_PAGE);
      setLoading(false);
    }, 600);
  }, [regionId]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    const nextItems = items.slice(0, nextPage * ITEMS_PER_PAGE);

    if (nextItems.length >= items.length) {
      setHasMore(false);
    }

    setDisplayedItems(nextItems);
    setPage(nextPage);
  }, [page, items, loading, hasMore]);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
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
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO 
        title={`${currentRegionName} 여행 갤러리`}
        description={`${currentRegionName}의 아름다운 관광지와 추천 명소를 사진과 함께 확인하세요. AI 리서처가 남도예술정원의 숨겨진 매력을 안내해 드립니다.`}
        schemaData={faqSchema}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <MapPin size={16} />
          {currentRegionName} 명소 탐방
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          아름다운 {currentRegionName}
        </h1>
        <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
          AI 추천 데이터 기반으로 엄선된 {currentRegionName}의 대표적인 관광 명소를 만나보세요.
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {displayedItems.map((item, index) => {

            // Handle specific image override for 'm1' gohado 
            let imageUrl = item.image;
            if (item.id === 'm1') {
              imageUrl = imgGohadoMain;
            }

            return (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: (index % ITEMS_PER_PAGE) * 0.05 }}
                layout
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col h-full"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
                  <img
                    src={imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-6">
                    <Link
                      to={`/posts/${item.id}`}
                      className="inline-flex items-center gap-2 text-white font-medium hover:text-primary-100 transition-colors"
                    >
                      상세 리뷰 보기 <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title.includes('\n') ? item.title.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < item.title.split('\n').length - 1 && <br />}
                      </span>
                    )) : item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm line-clamp-2 mb-4 flex-grow">
                    {item.summary}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Loading & Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={observerRef} className="py-12 flex justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-sm text-neutral-500">더 많은 장소 불러오는 중...</span>
          </div>
        </div>
      )}

      {!hasMore && displayedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center text-neutral-500"
        >
          모든 관광지({items.length}곳)를 다 불러왔습니다.
        </motion.div>
      )}

      {/* AI Integrated Search FAQ Section */}
      {regionFaqs.length > 0 && (
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mt-20 mb-12"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <HelpCircle className="w-7 h-7 text-primary" />
            <h2 className="text-2xl font-bold font-serif text-neutral-900">AI 검색 가이드: {currentRegionName} 자주 묻는 질문</h2>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-6 md:p-8">
            {regionFaqs.map((faq, i) => (
               <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
