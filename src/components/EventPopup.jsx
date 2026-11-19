import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
          return;
        }
      }
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    } catch (e) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (doNotShowToday) {
      try {
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

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          aria-label="남도예술정원 여행주간 안내"
          className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-[95] w-[calc(100vw-2rem)] max-w-[340px] sm:max-w-[350px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.32)] border border-neutral-200/80 overflow-hidden"
        >
          {/* Top Close Button */}
          <button
            onClick={handleClose}
            aria-label="안내 카드 닫기"
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Compact Horizontal/Cover Preview */}
          <Link
            to="/about-us"
            onClick={handleLinkClick}
            className="relative block w-full h-44 overflow-hidden bg-neutral-900 group"
          >
            <img
              src="/images/namdo-travel-week-poster-popup.webp"
              alt="남도예술정원 여행주간 포스터"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

            {/* Top Badge */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold shadow-md tracking-wider">
                <Sparkles className="w-3 h-3" />
                특별 행사 안내
              </span>
            </div>

            {/* Bottom Text */}
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-wider mb-1.5">
                <Calendar className="w-3 h-3" />
                2026. 11. 06 — 11. 20 (2주간)
              </div>
              <h3 className="text-lg font-serif font-bold leading-snug drop-shadow">
                남도예술정원 여행주간
              </h3>
              <p className="text-[11px] text-white/90 font-light mt-0.5 drop-shadow">
                남도의 8대 명품 정원을 여행하는 특별한 2주
              </p>
            </div>
          </Link>

          {/* Action & Footer Controls */}
          <div className="p-4 bg-white space-y-3">
            <Link
              to="/about-us"
              onClick={handleLinkClick}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-primary text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md transition-all duration-300 group"
            >
              <span>여행주간 프로그램 & 리플릿 보기</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center justify-between pt-1.5 border-t border-neutral-100 text-[11px] text-neutral-500">
              <label className="flex items-center gap-1.5 cursor-pointer select-none hover:text-neutral-800">
                <input
                  type="checkbox"
                  checked={doNotShowToday}
                  onChange={(e) => setDoNotShowToday(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-neutral-300 text-primary focus:ring-primary/30 accent-primary"
                />
                <span>오늘 하루 열지 않기</span>
              </label>
              <button
                onClick={handleClose}
                className="font-semibold hover:text-neutral-900 transition-colors px-2 py-0.5"
              >
                닫기
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body
  );
}
