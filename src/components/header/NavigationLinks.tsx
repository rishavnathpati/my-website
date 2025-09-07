'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Command } from 'lucide-react';

interface NavItem {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  sectionId: string;
  command: string;
  shortcut: string;
}

interface NavigationLinksProps {
  navItems: NavItem[];
  activeSection: string;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string, command: string) => void;
  firstNavLinkRef?: React.RefObject<HTMLAnchorElement | null>;
}

export function NavigationLinks({ navItems, activeSection, onLinkClick, firstNavLinkRef }: NavigationLinksProps) {
  const pathname = usePathname();

  // Determine active item with single-source-of-truth logic
  const getActiveItemId = (): string => {
    if (pathname === '/') {
      // On home page, use activeSection but only if it matches one of the
      // hash-based sections declared in navItems to avoid mismatches.
      const validHomeSections = navItems
        .filter(item => item.href.startsWith('#'))
        .map(item => item.sectionId);
      if (activeSection && validHomeSections.includes(activeSection)) {
        return activeSection;
      }
      return 'hero'; // Default fallback
    } else {
      // On other pages, find matching page route
      const pageItem = navItems.find(item => item.href === pathname);
      return pageItem?.sectionId || '';
    }
  };

  const activeItemId = getActiveItemId();

  return (
    <nav id="navbar" className="nav-menu flex-grow mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Command size={16} className="text-primary" />
        <span className="font-mono text-sm text-muted-foreground">navigation.sh</span>
      </div>
      <ul className="space-y-2">
        {navItems.map((item, index) => {
          // Single source of truth for active state - STRICT comparison
          const isActive = activeItemId === item.sectionId && activeItemId !== '';

          // Determine navigation type
          const isHashLink = item.href.startsWith('#');

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                ref={index === 0 ? firstNavLinkRef : null}
                className={`nav-link flex items-center py-3 px-4 rounded-md transition-all duration-300 group font-mono text-sm relative overflow-hidden ${
                  isActive
                    ? 'bg-black/50 text-primary border border-primary/30 shadow-lg shadow-primary/10'
                    : 'text-muted-foreground hover:text-primary hover:bg-black/30 border border-transparent hover:border-primary/20'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
                data-section={item.sectionId}
                onClick={(e) => onLinkClick(e, item.href, item.command)}
                aria-current={isActive ? 'page' : undefined}
                suppressHydrationWarning
              >
                <div className="flex items-center flex-1">
                  <item.icon
                    size={16}
                    className={`mr-2 transition-all duration-300 ${
                      isActive
                        ? 'text-primary scale-110'
                        : 'text-muted-foreground group-hover:text-primary group-hover:scale-105'
                    }`}
                  />
                  <span className={`transition-all duration-300 ${
                    isActive ? 'font-semibold' : 'group-hover:translate-x-1'
                  }`}>
                    {item.label.toLowerCase()}
                  </span>
                </div>

                {/* Active indicator with smooth animation */}
                <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
                  isActive
                    ? 'w-full opacity-100 scale-x-100'
                    : 'w-0 opacity-0 scale-x-0 group-hover:w-full group-hover:opacity-50'
                }`}></div>

                {/* Subtle glow effect for active item */}
                {isActive && (
                  <div className="absolute inset-0 bg-primary/5 rounded-md animate-pulse"></div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
