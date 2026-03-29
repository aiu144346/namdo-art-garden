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
        </div>

        {/* Mobile Horizontal Region Navigation (Sub-navigation) */}
        <div className="md:hidden border-t border-surface/20 flex items-center h-12 overflow-x-auto scrollbar-hide -mx-6 px-6 gap-6 whitespace-nowrap">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-bold tracking-tight py-1 transition-all",
                  isActive 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-neutral-500 hover:text-primary opacity-70"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
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
