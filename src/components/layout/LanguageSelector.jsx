import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'ko', label: '한국어', short: 'KR', flag: '🇰🇷' },
  { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
  { code: 'zh-CN', label: '中文', short: 'ZH', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', short: 'JA', flag: '🇯🇵' }
];

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState('ko');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Read language cookie on initial load
  useEffect(() => {
    const getGoogleTransLang = () => {
      const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
      if (match) {
        const parts = decodeURIComponent(match[1]).split('/');
        const target = parts[parts.length - 1];
        if (target && LANGUAGES.some(l => l.code === target)) {
          return target;
        }
      }
      return 'ko';
    };

    const detected = getGoogleTransLang();
    setCurrentLang(detected);
  }, []);

  // React Router SPA safeguard: keep translation active across route changes
  useEffect(() => {
    if (currentLang !== 'ko') {
      const timer = setTimeout(() => {
        const select = document.querySelector('.goog-te-combo');
        if (select && select.value !== currentLang) {
          select.value = currentLang;
          select.dispatchEvent(new Event('change'));
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentLang]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Change language handler
  const handleSelectLang = (langCode) => {
    setIsOpen(false);
    if (langCode === currentLang) return;

    setCurrentLang(langCode);

    const hostname = window.location.hostname;

    if (langCode === 'ko') {
      // Clear cookies for Korean (original language)
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
      
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = 'ko';
        select.dispatchEvent(new Event('change'));
      }
      // Reload to completely reset translated DOM to pristine Korean
      setTimeout(() => {
        window.location.reload();
      }, 100);
      return;
    }

    // Set Google translate cookie for the target language
    const cookieValue = `/ko/${langCode}`;
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.${hostname};`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${hostname};`;

    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      // If widget element is not yet ready, refresh to let cookie trigger translation
      window.location.reload();
    }
  };

  const activeLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative notranslate" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="언어 선택 (Language)"
        className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-3.5 md:py-2 rounded-full bg-white/80 hover:bg-white text-neutral-800 hover:text-primary border border-neutral-200/80 hover:border-primary/40 shadow-sm hover:shadow transition-all text-xs md:text-sm font-medium tracking-tight backdrop-blur-sm"
      >
        <span className="text-sm md:text-base leading-none">{activeLangObj.flag}</span>
        <span className="font-bold text-xs uppercase tracking-wider">{activeLangObj.short}</span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-44 rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200/80 shadow-2xl py-2 z-[200] overflow-hidden"
          >
            <div className="px-3 py-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100 flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-primary" /> Select Language
            </div>

            <div className="p-1 space-y-0.5">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLang(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs md:text-sm transition-all text-left ${
                      isSelected
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 font-medium'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
