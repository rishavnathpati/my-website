'use client';

import { useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useMobileNav } from '@/hooks/useMobileNav';
import { useConsole } from '@/components/ui/console-provider';
import { Console } from '@/components/ui/console';
import { ProfileCard } from '@/components/header/ProfileCard';
import { NavigationLinks } from '@/components/header/NavigationLinks';
import { MobileNavToggle } from '@/components/header/MobileNavToggle';
import { useActiveSectionObserver } from '@/hooks/useActiveSectionObserver';
import { useNavigationSound } from '@/hooks/useNavigationSound';
import { navItems, socialLinks } from '@/components/header/headerConstants';

export function Header() {
  const { open: isMobileNavOpen, toggle: toggleMobileNav, close: closeMobileNav } = useMobileNav();
  const pathname = usePathname();
  const { log, success } = useConsole();
  const { playNavigationSound } = useNavigationSound();
  
  // Use our custom hooks
  const { activeSection } = useActiveSectionObserver(navItems);

  // Ref for the first navigation link to manage focus
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);
  
  // Handle focus trap and keyboard navigation in mobile menu
  useEffect(() => {
    if (isMobileNavOpen) {
      // Set focus to the first navigation link when menu opens
      const timer = setTimeout(() => {
        if (firstNavLinkRef.current) {
          firstNavLinkRef.current.focus();
        }
      }, 150);

      // Handle escape key and focus trap
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeMobileNav();
          // Return focus to the mobile nav toggle button
          const toggleButton = document.querySelector('[aria-expanded="false"]') as HTMLButtonElement;
          if (toggleButton) {
            toggleButton.focus();
          }
        }
        
        // Simple focus trap
        if (e.key === 'Tab') {
          const focusableElements = document.querySelectorAll(
            '#header button, #header a, #header input, #header [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      // Add event listeners
      document.addEventListener('keydown', handleKeyDown);

      // Cleanup
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isMobileNavOpen, closeMobileNav]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, command: string) => {
    if (isMobileNavOpen) {
      closeMobileNav();
      log('Minimizing terminal');
    }

    success(`Executing: ${command}`);
    playNavigationSound();

    if (pathname !== '/' && href.startsWith('#')) {
      e.preventDefault();
      log('Redirecting to home directory');
      window.location.href = '/' + href;
    }
  }, [isMobileNavOpen, closeMobileNav, log, success, playNavigationSound, pathname]);

  return (
    <>
      <MobileNavToggle 
        isOpen={isMobileNavOpen} 
        onToggle={toggleMobileNav} 
      />

      <header
        id="header"
        className={`fixed top-0 left-0 w-[300px] h-full max-h-screen border-r border-border bg-black/30 backdrop-blur-sm transition-transform duration-300 z-50 ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-4 sm:p-6 flex flex-col h-full overflow-y-auto">
          <ProfileCard socialLinks={socialLinks} />
          <NavigationLinks
            navItems={navItems}
            activeSection={activeSection}
            onLinkClick={handleLinkClick}
            firstNavLinkRef={firstNavLinkRef}
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
