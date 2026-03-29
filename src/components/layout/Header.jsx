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
    { to: "/region/mokpo", label: "목포권", en: "Mokpo" },
    { to: "/region/shinan", label: "신안권", en: "Shinan" },
    { to: "/region/haenam", label: "해남권", en: "Haenam" },
    { to: "/region/jindo", label: "진도권", en: "Jindo" },
    { to: "/region/wando", label: "완도권", en: "Wando" },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-surface/30 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 md:h-32 items-center justify-between px-6 md:px-12">
        
        {/* Logo */}
        <Link to="/" className="flex items-center group relative z-[110]">
          <img 
            src="/images/logo-main.svg" 
            alt="남도예술정원 로고" 
            className="h-12 md:h-24 w-auto hover:opacity-80 transition-opacity" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu.Root className="relative flex justify-center">
            <NavigationMenu.List className="flex items-center gap-10">
              {navLinks.map((link) => (
                <NavItem 
                  key={link.to} 
                  to={link.to} 
                  current={location.pathname === link.to || location.pathname.startsWith(link.to + '/')}
                >
                  {link.label}
                </NavItem>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative z-[110] p-2 text-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={32} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="flex flex-col gap-1.5"
                >
                  <div className="w-8 h-0.5 bg-primary rounded-full" />
                  <div className="w-6 h-0.5 bg-primary rounded-full self-end" />
                  <div className="w-8 h-0.5 bg-primary rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden z-[105]"
            >
              <nav className="flex flex-col items-center gap-8 w-full">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx + 0.1, duration: 0.4 }}
                    >
                      <Link
                        to={link.to}
                        className="group flex flex-col items-center gap-1 active:scale-95 transition-transform"
                      >
                        <span className={cn(
                          "text-4xl font-serif font-bold tracking-tight transition-colors duration-300",
                          isActive ? "text-primary" : "text-neutral-700"
                        )}>
                          {link.label}
                        </span>
                        <span className={cn(
                          "text-xs font-bold tracking-[0.3em] uppercase transition-opacity duration-300",
                          isActive ? "opacity-100 text-primary" : "opacity-30 text-neutral-500"
                        )}>
                          {link.en}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Decorative Element */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 pointer-events-none"
              >
                <Leaf size={80} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function NavItem({ to, current, children }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild>
        <Link 
          to={to} 
          className={cn(
            "text-base md:text-lg font-bold tracking-wider transition-colors relative py-2",
            current ? "text-primary" : "text-neutral-500 hover:text-primary",
            "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 transition-all duration-500 ease-out",
            current && "after:scale-x-100"
          )}
        >
          {children}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
