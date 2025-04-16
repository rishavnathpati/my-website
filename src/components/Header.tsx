'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useConsole } from '@/components/ui/console-provider';
import { Console } from '@/components/ui/console';
import { ProfileCard } from '@/components/header/ProfileCard';
import { NavigationLinks } from '@/components/header/NavigationLinks';
import { MobileNavToggle } from '@/components/header/MobileNavToggle';
import { useActiveSectionObserver } from '@/hooks/useActiveSectionObserver';
import { useKeyboardNavShortcuts } from '@/hooks/useKeyboardNavShortcuts';
import { useNavigationSound } from '@/hooks/useNavigationSound';
import { navItems, socialLinks } from '@/components/header/headerConstants';

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const { log, success } = useConsole();
  const { playNavigationSound } = useNavigationSound();
  
  // Use our custom hooks
  const { activeSection } = useActiveSectionObserver(navItems);
  
  useKeyboardNavShortcuts({
    navItems,
    onNavigate: playNavigationSound
  });

  // Ref for the first navigation link to manage focus
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);
  
  // Handle focus trap in mobile navigation
  useEffect(() => {
    if (isMobileNavOpen) {
      // Set focus to the first navigation link when menu opens
      setTimeout(() => {
        if (firstNavLinkRef.current) {
          firstNavLinkRef.current.focus();
        }
      }, 100);
    }
  }, [isMobileNavOpen]);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, command: string) => {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
      log('Minimizing terminal');
    }

    success(`Executing: ${command}`);
    playNavigationSound();

    if (pathname !== '/' && href.startsWith('#')) {
      e.preventDefault();
      log('Redirecting to home directory');
      window.location.href = '/' + href;
    }
  };

  return (
    <>
      <MobileNavToggle 
        isOpen={isMobileNavOpen} 
        onToggle={toggleMobileNav} 
      />

      <header
        id="header"
        className={`fixed top-0 left-0 w-72 h-screen border-r border-border bg-black/30 backdrop-blur-sm transition-transform duration-300 z-50 ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 flex flex-col h-full">
          <ProfileCard socialLinks={socialLinks} />
          <NavigationLinks
            navItems={navItems}
            activeSection={activeSection}
            onLinkClick={handleLinkClick}
            firstNavLinkRef={firstNavLinkRef}
          />
          />
          
          {/* Render Console component here, pushed to the bottom */}
          <div className="mt-auto">
            <Console />
          </div>
        </div>
      </header>
    </>
  );
}
