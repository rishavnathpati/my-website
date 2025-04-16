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

  return (
    <nav id="navbar" className="nav-menu flex-grow mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Command size={16} className="text-primary" />
        <span className="font-mono text-sm text-muted-foreground">navigation.sh</span>
      </div>
      <ul className="space-y-2">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.sectionId && pathname === '/';
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                ref={index === 0 ? firstNavLinkRef : null}
                className={`nav-link flex items-center py-3 px-4 rounded-md transition-all duration-200 group font-mono text-sm relative overflow-hidden ${
                  isActive
                    ? 'bg-black/50 text-primary border border-primary/30 no-underline hover:no-underline'
                    : 'text-muted-foreground hover:text-primary hover:bg-black/30 border border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
                data-section={item.sectionId}
                onClick={(e) => onLinkClick(e, item.href, item.command)}
                aria-current={isActive ? 'page' : undefined}
                suppressHydrationWarning
              >
                <div className="flex items-center flex-1">
                  <item.icon
                    size={16}
                    className={`mr-2 transition-colors ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-primary'
                    }`}
                  />
                  <span>{item.label.toLowerCase()}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-primary/60 flex items-center gap-1" aria-hidden="true">
                  <Command size={12} />
                  <span>Alt+{item.shortcut}</span>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 h-[2px] bg-primary/40 w-full transform origin-left scale-x-100 transition-transform"></div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}