'use client';

import { useRef, useEffect, useCallback, memo } from 'react';
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
import { Sparkles, ArrowUpRight } from 'lucide-react';

const startHereCommands = [
  {
    command: 'cat featured/START_HERE.txt',
    hint: 'Quick intro to the best work'
  },
  {
    command: 'cat featured/current-work.md',
    hint: 'See what I am building this week'
  },
  {
    command: 'cat featured/best-projects.json',
    hint: 'Skim the four flagship projects'
  }
];

const StartHereSuggestions = memo(function StartHereSuggestionsComponent({ onRun }: { onRun: (command: string) => void }) {
  return (
    <div className="mt-3 bg-black/30 border border-border/60 rounded-lg p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <Sparkles className="w-4 h-4 text-primary" />
        <span>Suggested commands</span>
      </div>
      <div className="mt-3 space-y-2">
        {startHereCommands.map(({ command, hint }) => (
          <button
            key={command}
            type="button"
            className="w-full rounded-md border border-border/60 bg-black/30 px-3 py-2 text-left transition-colors hover:border-primary/60"
            onClick={() => onRun(command)}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-sm text-foreground">{command}</span>
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{hint}</p>
          </button>
        ))}
      </div>
    </div>
  );
});

export function Header() {
  const { open: isMobileNavOpen, toggle: toggleMobileNav, close: closeMobileNav } = useMobileNav();
  const pathname = usePathname();
  const { log, success, executeCommand } = useConsole();
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
    // Close mobile nav if open
    if (isMobileNavOpen) {
      closeMobileNav();
      log('Minimizing terminal');
    }

    // Console feedback
    success(`Executing: ${command}`);
    playNavigationSound();

    // Handle different navigation types
    if (href.startsWith('#')) {
      // Hash link navigation
      if (pathname !== '/') {
        // Redirect to home page with hash
        e.preventDefault();
        log('Redirecting to home directory');
        window.location.href = '/' + href;
      } else {
        // On home page, let default behavior handle smooth scrolling
        // The intersection observer will update the active section
      }
    } else {
      // Page navigation - Next.js will handle the route change
      // The useActiveSectionObserver will automatically clear activeSection
      log(`Navigating to ${href}`);
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
            <StartHereSuggestions onRun={executeCommand} />
          </div>
        </div>
      </header>
    </>
  );
}
