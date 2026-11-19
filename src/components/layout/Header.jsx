import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { to: "/about-us", label: "정원 소개", en: "About Us" },
    { to: "/gardens", label: "남도예술정원", en: "8 Master Gardens", isHighlight: true },
    { to: "/region/mokpo", label: "목포권", en: "Mokpo District" },
    { to: "/region/shinan", label: "신안권", en: "Shinan Islands" },
    { to: "/region/haenam", label: "해남권", en: "Haenam Territory" },
    { to: "/region/jindo", label: "진도권", en: "Jindo Heritage" },
    { to: "/region/wando", label: "완도권", en: "Wando Healing" },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-neutral-200/70 bg-background/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex h-16 md:h-24 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center group relative z-[110] flex-shrink-0">
            <img 
              src="/images/logo-main.svg" 
              alt="남도예술정원 로고" 
              className="h-10 md:h-16 lg:h-20 w-auto hover:opacity-85 transition-opacity" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block flex-1">
            <NavigationMenu.Root className="relative flex justify-center">
              <NavigationMenu.List className="flex items-center gap-0.5 lg:gap-1.5 xl:gap-2">
                {navLinks.map((link) => (
                  <NavItem 
                    key={link.to} 
                    to={link.to} 
                    label={link.label}
                    en={link.en}
                    isHighlight={link.isHighlight}
                    current={location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to + '/'))}
                  />
                ))}
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>

          {/* Right Action: Language Selector & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0 relative z-[110]">
            <LanguageSelector />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "메뉴 닫기" : "전체 메뉴 열기"}
              className="md:hidden w-9 h-9 rounded-full bg-white border border-neutral-200/80 text-neutral-800 hover:text-primary flex items-center justify-center shadow-sm transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Quick Pill Navigation */}
        <div className="md:hidden border-t border-neutral-200/50 bg-neutral-50/60 py-2.5 -mx-4 px-4 overflow-x-auto no-scrollbar whitespace-nowrap flex items-center">
          <div className="inline-flex items-center gap-1 bg-neutral-200/60 p-1 rounded-full border border-neutral-200/60 shadow-inner min-w-max">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-tight transition-all z-10 whitespace-nowrap flex items-center gap-1",
                    isActive 
                      ? "text-white drop-shadow-sm" 
                      : "text-neutral-700 hover:text-neutral-950"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobileNavPill"
                      className="absolute inset-0 bg-primary rounded-full shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {link.isHighlight && !isActive && <Leaf className="w-3 h-3 text-primary" />}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay (Portaled to document.body to avoid header backdrop-filter containment) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/98 backdrop-blur-2xl z-[105] border-t border-neutral-200/70 overflow-y-auto px-6 py-7 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 px-2">
                  Navigation Menu
                </div>
                <nav className="grid grid-cols-1 gap-2">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={cn(
                          "flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all",
                          isActive
                            ? "bg-primary text-white border-primary font-bold shadow-md"
                            : "bg-white/95 text-neutral-800 border-neutral-200/80 hover:border-primary/40 font-semibold"
                        )}
                      >
                        <span className="flex items-center gap-2.5 text-base">
                          {link.isHighlight && (
                            <Leaf className={cn("w-4 h-4", isActive ? "text-white" : "text-primary")} />
                          )}
                          {link.label}
                        </span>
                        <span className={cn(
                          "text-[11px] uppercase tracking-wider font-mono",
                          isActive ? "text-white/80" : "text-neutral-400"
                        )}>
                          {link.en}
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="pt-4 border-t border-neutral-200/70 space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 px-2">
                    Quick Links
                  </div>
                  <Link
                    to="/posts"
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-neutral-900 text-white text-sm font-bold shadow-sm"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary-light" />
                      AI 에디터 큐레이션 전체보기
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="/files/namdo-artgarden-leaflet.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white border border-neutral-200 text-neutral-800 text-sm font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      여행주간 공식 리플릿 (PDF)
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </a>
                </div>
              </div>

              <div className="pt-8 text-center text-xs text-neutral-400 font-light">
                © 2026 남도예술정원 (Namdo Art Garden). All rights reserved.
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}

function NavItem({ to, label, en, isHighlight, current }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavigationMenu.Item className="flex-shrink-0">
      <NavigationMenu.Link asChild>
        <Link 
          to={to} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "group relative px-2.5 lg:px-3.5 xl:px-5 py-3 rounded-2xl transition-all duration-300 block whitespace-nowrap",
            current ? "text-primary" : "text-neutral-600 hover:text-neutral-950"
          )}
        >
          {/* Floating Pill Background */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                layoutId="navHoverPill"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-neutral-200/50 backdrop-blur-sm rounded-2xl -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </AnimatePresence>

          <div className="flex flex-col items-center justify-center relative whitespace-nowrap">
            {/* English Label (Top Layer - Animated) */}
            <motion.span 
              className="text-[9px] xl:text-[10px] uppercase tracking-[0.18em] font-bold absolute -top-4 text-primary whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, y: 4 }}
              animate={{ 
                y: isHovered ? 0 : 4,
                opacity: isHovered ? 0.85 : 0
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {en}
            </motion.span>

            {/* Main Korean Label */}
            <span className={cn(
              "text-[15px] lg:text-[17px] xl:text-[19px] font-extrabold tracking-tight transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap",
              isHighlight && !current ? "text-neutral-950 font-black" : "",
              isHovered ? "translate-y-0.5" : "translate-y-0"
            )}>
              {isHighlight && <Leaf className="w-4 h-4 text-primary fill-primary/20 flex-shrink-0" />}
              <span>{label}</span>
            </span>
          </div>
          
          {/* Active Indicator Glow Underline */}
          {current && (
            <motion.div
              layoutId="desktopNavActive"
              className="absolute bottom-1 left-2.5 right-2.5 lg:left-3.5 lg:right-3.5 xl:left-5 xl:right-5 h-[3px] bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
            />
          )}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
