import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-32 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center group">
          <img src="/images/logo-main.svg" alt="남도예술정원 로고" className="h-24 w-auto hover:opacity-80 transition-opacity" />
        </Link>
        <NavigationMenu.Root className="relative flex justify-center">
          <NavigationMenu.List className="flex items-center gap-8">
            <NavItem to="/region/mokpo" current={location.pathname.includes('/region/mokpo')}>목포권</NavItem>
            <NavItem to="/region/shinan" current={location.pathname.includes('/region/shinan')}>신안권</NavItem>
            <NavItem to="/region/haenam" current={location.pathname.includes('/region/haenam')}>해남권</NavItem>
            <NavItem to="/region/jindo" current={location.pathname.includes('/region/jindo')}>진도권</NavItem>
            <NavItem to="/region/wando" current={location.pathname.includes('/region/wando')}>완도권</NavItem>
          </NavigationMenu.List>
        </NavigationMenu.Root>
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
            current ? "text-primary" : "text-neutral-500 hover:text-primary focus:text-primary",
            "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-right after:transition-transform hover:after:scale-x-100 hover:after:origin-left",
            current && "after:scale-x-100"
          )}
        >
          {children}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
