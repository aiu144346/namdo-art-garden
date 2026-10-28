import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'namdo_travel_week_popup_hidden_until';

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [doNotShowToday, setDoNotShowToday] = useState(false);

  useEffect(() => {
    try {
      const hiddenUntil = localStorage.getItem(STORAGE_KEY);
      if (hiddenUntil) {
        const expiryTime = parseInt(hiddenUntil, 10);
        if (Date.now() < expiryTime) {
          return; // Still in "do not show" period
        }
      }
      // Small delay for smooth entry after page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    } catch (e) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (doNotShowToday) {
      try {
        // Hide for 24 hours
        const expire = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, expire.toString());
      } catch (e) {
        // ignore storage errors
      }
    }
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-neutral-100 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Top Close Button (floating) */}
            <button
              onClick={handleClose}
              aria-label="팝업 닫기"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Header Image (Clickable) */}
            <Link
              to="/about-us"
              onClick={handleLinkClick}
              className="relative block w-full aspect-[4/5] max-h-[380px] sm:max-h-[420px] overflow-hidden bg-neutral-100 group"
            >
              <img
                src="/images/namdo-travel-week-poster-popup.webp"
                alt="남도예술정원 여행주간 포스터"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold shadow-md tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  특별 행사
                </span>
              </div>

              {/* Banner Text at bottom of image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  2026. 11. 06 — 11. 20 (2주간)
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold leading-tight drop-shadow-md">
                  남도예술정원 여행주간
                </h3>
                <p className="text-xs text-white/90 font-light mt-1 drop-shadow">
                  남도의 7개 명품 정원을 여행하는 특별한 2주
                </p>
              </div>
            </Link>

            {/* Action Bar */}
            <div className="p-5 sm:p-6 bg-white space-y-4">
              <Link
                to="/about-us"
                onClick={handleLinkClick}
                className="w-full py-3.5 px-5 rounded-2xl bg-neutral-900 hover:bg-primary text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all duration-300 group"
              >
                <span>여행주간 프로그램 & 리플릿 보기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Footer controls: 오늘 하루 보지 않기 / 닫기 */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-neutral-500">
                <label className="flex items-center gap-2 cursor-pointer select-none hover:text-neutral-800">
                  <input
                    type="checkbox"
                    checked={doNotShowToday}
                    onChange={(e) => setDoNotShowToday(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary/30 accent-primary"
                  />
                  <span>오늘 하루 열지 않기</span>
                </label>
                <button
                  onClick={handleClose}
                  className="font-medium hover:text-neutral-900 transition-colors py-1 px-2"
                >
                  닫기
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
