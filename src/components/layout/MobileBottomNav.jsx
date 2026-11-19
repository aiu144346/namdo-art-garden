import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trees, Sparkles, Compass, FileText, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileBottomNav() {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (typeof document === 'undefined') return null;

  const isHome = location.pathname === '/';
  const isGardens = location.pathname.startsWith('/gardens');
  const isPosts = location.pathname.startsWith('/posts') || location.pathname.startsWith('/region');
  const isAbout = location.pathname.startsWith('/about-us');

  return createPortal(
    <>
      {/* Scroll-to-Top Floating Action Button (VisitKorea Mobile Benchmark) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
            className="fixed bottom-16 right-4 md:bottom-8 md:right-8 z-[92] w-11 h-11 rounded-full bg-white/95 hover:bg-neutral-900 text-neutral-800 hover:text-white border border-neutral-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.14)] flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Fixed 5-Tab Bottom Navigation Bar (Thumb Zone) */}
      <nav
        aria-label="모바일 하단 빠른 메뉴"
        className="md:hidden fixed bottom-0 inset-x-0 z-[98] h-14 bg-white/98 backdrop-blur-xl border-t border-neutral-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2"
      >
        <div className="grid grid-cols-5 h-14 items-center max-w-md mx-auto">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center gap-0.5 py-1 transition-colors ${
              isHome ? 'text-primary font-extrabold' : 'text-neutral-500 hover:text-neutral-900 font-medium'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10.5px] tracking-[-0.02em]">홈</span>
          </Link>

          <Link
            to="/gardens"
            className={`flex flex-col items-center justify-center gap-0.5 py-1 transition-colors ${
              isGardens ? 'text-primary font-extrabold' : 'text-neutral-500 hover:text-neutral-900 font-medium'
            }`}
          >
            <Trees className="w-4 h-4" />
            <span className="text-[10.5px] tracking-[-0.02em]">8대 정원</span>
          </Link>

          {/* Center Highlighted Tab: AI Curation */}
          <Link
            to="/posts"
            className="flex flex-col items-center justify-center -mt-3.5"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform active:scale-95 ${
                isPosts ? 'bg-neutral-900 text-primary-light' : 'bg-primary text-white'
              }`}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <span
              className={`text-[10px] mt-0.5 tracking-[-0.02em] ${
                isPosts ? 'text-primary font-extrabold' : 'text-neutral-700 font-bold'
              }`}
            >
              AI 큐레이션
            </span>
          </Link>

          <Link
            to="/about-us"
            className={`flex flex-col items-center justify-center gap-0.5 py-1 transition-colors ${
              isAbout ? 'text-primary font-extrabold' : 'text-neutral-500 hover:text-neutral-900 font-medium'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="text-[10.5px] tracking-[-0.02em]">여행주간</span>
          </Link>

          <a
            href="/files/namdo-artgarden-leaflet.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 py-1 text-neutral-500 hover:text-neutral-900 font-medium transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="text-[10.5px] tracking-[-0.02em]">리플릿</span>
          </a>
        </div>
      </nav>
    </>,
    document.body
  );
}
