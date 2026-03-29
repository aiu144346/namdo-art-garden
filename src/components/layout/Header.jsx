import { useState, useEffect } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
    { to: "/region/mokpo", label: "목포권" },
    { to: "/region/shinan", label: "신안권" },
    { to: "/region/haenam", label: "해남권" },
    { to: "/region/jindo", label: "진도권" },
    { to: "/region/wando", label: "완도권" },
  ];

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-surface bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-24 md:h-32 items-center justify-between px-4 md:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center group relative z-[70]">
          <img 
            src="/images/logo-main.svg" 
            alt="남도예술정원 로고" 
            className="h-16 md:h-24 w-auto hover:opacity-80 transition-opacity" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu.Root className="relative flex justify-center">
            <NavigationMenu.List className="flex items-center gap-8">
              {navLinks.map((link) => (
                <NavItem 
                  key={link.to} 
                  to={link.to} 
                  current={location.pathname.includes(link.to)}
                >
                  {link.label}
                </NavItem>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative z-[70] p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="메뉴 열기"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Mobile Navigation Overlay */}
        <div className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-300 md:hidden z-[65]",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}>
          <nav className="flex flex-col items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-3xl font-bold tracking-widest transition-colors",
                  location.pathname.includes(link.to) ? "text-primary" : "text-neutral-500 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
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
            "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 transition-transform",
            current && "after:scale-x-100"
          )}
        >
          {children}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
