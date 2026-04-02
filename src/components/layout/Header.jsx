import { useState, useEffect } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

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
    { to: "/region/mokpo", label: "목포권", en: "Mokpo Art District" },
    { to: "/region/shinan", label: "신안권", en: "Shinan Archipelago" },
    { to: "/region/haenam", label: "해남권", en: "Haenam Territory" },
    { to: "/region/jindo", label: "진도권", en: "Jindo Heritage" },
    { to: "/region/wando", label: "완도권", en: "Wando Islands" },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-surface/30 bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto px-6 md:px-12">
        {/* Main Header Row */}
        <div className="flex h-16 md:h-32 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group relative z-[110]">
            <img 
              src="/images/logo-main.svg" 
              alt="남도예술정원 로고" 
              className="h-10 md:h-24 w-auto hover:opacity-80 transition-opacity" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu.Root className="relative flex justify-center">
              <NavigationMenu.List className="flex items-center gap-2 lg:gap-6">
                {navLinks.map((link) => (
                  <NavItem 
                    key={link.to} 
                    to={link.to} 
                    label={link.label}
                    en={link.en}
                    current={location.pathname === link.to || location.pathname.startsWith(link.to + '/')}
                  />
                ))}
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
        </div>

        {/* Mobile Horizontal Region Navigation (Sub-navigation) */}
        <div className="md:hidden border-t border-surface/20 bg-neutral-50/50 py-3 -mx-6 px-4 overflow-x-auto scrollbar-hide whitespace-nowrap flex items-center">
          <div className="inline-flex items-center gap-1 bg-neutral-200/50 p-1.5 rounded-full border border-neutral-200/50 shadow-inner mx-auto min-w-max">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "relative px-4 py-1.5 rounded-full text-[13px] font-bold tracking-tight transition-all z-10",
                    isActive 
                      ? "text-white drop-shadow-sm" 
                      : "text-neutral-500 hover:text-neutral-900"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobileNavPill"
                      className="absolute inset-0 bg-primary rounded-full shadow-md -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, label, en, current }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild>
        <Link 
          to={to} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "group relative px-6 py-4 rounded-2xl transition-all duration-500 block",
            current ? "text-primary" : "text-neutral-500 hover:text-neutral-900"
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
                className="absolute inset-0 bg-neutral-100/80 backdrop-blur-sm rounded-2xl -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </AnimatePresence>

          <div className="flex flex-col items-center justify-center relative">
            {/* English Label (Top Layer - Animated) */}
            <motion.span 
              className="text-[10px] uppercase tracking-[0.2em] font-medium absolute -top-5 whitespace-nowrap"
              initial={{ opacity: 0, y: 5 }}
              animate={{ 
                y: isHovered ? 0 : 5,
                opacity: isHovered ? 0.6 : 0
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {en}
            </motion.span>

            {/* main Korean Label */}
            <span className={cn(
              "text-[17px] font-black tracking-widest transition-all duration-500",
              isHovered ? "translate-y-1 scale-105" : "translate-y-0"
            )}>
              {label}
            </span>
          </div>
          
          {/* Active Indicator Glow Underline */}
          {current && (
            <motion.div
              layoutId="desktopNavActive"
              className="absolute bottom-2 left-6 right-6 h-[4px] bg-primary rounded-full shadow-[0_0_15px_rgba(var(--color-primary),0.6)]"
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
            />
          )}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
