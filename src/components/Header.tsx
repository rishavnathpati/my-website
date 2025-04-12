'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, FileText, BookOpen, Mail, Bot, Github, Linkedin, FileCode2, Pencil, Menu, X, Terminal, Gamepad2, Command, Download } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useConsole } from '@/components/ui/console-provider';
import { Console } from '@/components/ui/console'; // Import the Console component

// Define navigation items with enhanced metadata
const navItems = [
  { href: '#hero', icon: Home, label: 'Home', sectionId: 'hero', command: 'cd ~', shortcut: '1' },
  { href: '#about', icon: User, label: 'About', sectionId: 'about', command: 'cat about.md', shortcut: '2' },
  {
    href: '#experience',
    icon: FileText,
    label: 'Experience',
    sectionId: 'experience',
    command: 'cat experience.md',
    shortcut: '4'
  },
  { href: '#skills', icon: FileText, label: 'Skills', sectionId: 'skills', command: 'ls skills/', shortcut: '3' },
  { href: '#portfolio', icon: Gamepad2, label: 'Portfolio', sectionId: 'portfolio', command: './view_projects', shortcut: '5' },
  { href: '#blogs', icon: Pencil, label: 'Blogs', sectionId: 'blogs', command: 'vim blog.md', shortcut: '6' },
  { href: '#contact-cta', icon: Mail, label: 'Contact', sectionId: 'contact-cta', command: 'mail -s "Hello"', shortcut: '7' },
];

// Define social links with enhanced metadata
const socialLinks = [
  { href: 'https://www.linkedin.com/in/rishavnathpati', icon: Linkedin, label: 'LinkedIn', command: 'open linkedin' },
  { href: 'https://github.com/rishavnathpati', icon: Github, label: 'GitHub', command: 'git remote -v' },
  { href: 'https://medium.com/@patirishavnath', icon: Bot, label: 'Medium', command: 'read blog' },
  { href: 'https://leetcode.com/rishavnathpati/', icon: FileCode2, label: 'LeetCode', command: 'solve algo' },
];

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  // Removed unused lastCommand state
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const pathname = usePathname();
  const { log, success, warn } = useConsole();

  // Game dev-style keyboard shortcuts
  useEffect(() => {
    const handleShortcuts = (e: KeyboardEvent) => {
      if (e.type === 'keydown' && !e.repeat && !e.altKey) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= navItems.length) {
          const section = navItems[num - 1];
          const element = document.getElementById(section.sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            success(`Executing: ${section.command}`);
            // Removed setLastCommand
            playNavigationSound();
          }
        }
      }
    };

    window.addEventListener('keydown', handleShortcuts);
    return () => {
      window.removeEventListener('keydown', handleShortcuts);
    };
  }, [log, success]);

  const playNavigationSound = () => {
    // You can implement actual sound effects here if desired
    console.log('*click*');
  };

  const toggleMobileNav = () => {
    const newState = !isMobileNavOpen;
    setIsMobileNavOpen(newState);
    log(`Terminal ${newState ? 'maximized' : 'minimized'}`);
    playNavigationSound();
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, command: string) => {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
      log('Minimizing terminal');
    }

    // Removed setLastCommand
    success(`Executing: ${command}`);
    playNavigationSound();

    if (pathname !== '/' && href.startsWith('#')) {
      e.preventDefault();
      log('Redirecting to home directory');
      window.location.href = '/' + href;
    }
  };

  useEffect(() => {
    // Only set up the observer if we're on the home page
    if (pathname !== '/') return;

    if (observerRef.current) observerRef.current.disconnect();

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const section = entry.target;
          
          setActiveSection(sectionId);
          log(`Loading section: ${sectionId}`);
          
          setTimeout(() => {
            success(`Section "${sectionId}" loaded successfully`);
            
            // Add active section highlight effect
            const navLink = document.querySelector(`[data-section="${sectionId}"]`);
            if (navLink) {
              navLink.classList.add('active');
            }
          }, 500);
        } else {
          // Remove active highlight when section is not in view
          const navLink = document.querySelector(`[data-section="${entry.target.id}"]`);
          if (navLink) {
            navLink.classList.remove('active');
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    const currentObserver = observerRef.current;

    navItems.forEach(item => {
      const sectionElement = document.getElementById(item.sectionId);
      if (sectionElement) {
        currentObserver.observe(sectionElement);
        sectionRefs.current.set(item.sectionId, sectionElement);
      }
    });

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
      sectionRefs.current.clear();
    };
  }, [pathname]);

  return (
    <>
      <button
        onClick={toggleMobileNav}
        className="fixed top-4 left-4 z-[9999] lg:hidden p-2 rounded-md bg-black/30 backdrop-blur-sm border border-border text-foreground hover:text-primary hover:border-primary transition-colors"
        aria-label={isMobileNavOpen ? "Minimize terminal" : "Open terminal"}
        aria-expanded={isMobileNavOpen}
      >
        {isMobileNavOpen ? <X size={20} /> : <Terminal size={20} />}
      </button>

      <header
        id="header"
        className={`fixed top-0 left-0 w-72 h-screen border-r border-border bg-black/30 backdrop-blur-sm transition-transform duration-300 z-50 ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="profile mb-8 pt-10 lg:pt-0">
            <div className="bg-black/40 rounded-lg border border-border p-6 relative group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <div className="flex items-center gap-3 mb-4">
                <Terminal size={16} className="text-primary" />
                <span className="font-mono text-sm text-muted-foreground">user_profile.json</span>
              </div>
              
              <div className="flex flex-col items-center relative z-10">
                <div className="relative group">
                  <Image
                    src="/profile-img.jpg"
                    alt="Rishav Nath Pati"
                    width={100}
                    height={100}
                    className="rounded-lg border-2 border-primary/20 transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 border-2 border-primary/0 rounded-lg transition-all duration-300 group-hover:border-primary/40 group-hover:scale-105"></div>
                </div>
                <h1 className="text-xl font-mono mt-4 mb-1">
                  <Link href="/" className="text-foreground hover:text-primary transition-colors" onClick={() => handleLinkClick}>
                    <span className="text-primary">./</span>rishav_nath_pati
                  </Link>
                </h1>
                <div className="social-links mt-4 flex justify-center space-x-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="w-8 h-8 bg-black/30 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200 border border-border hover:scale-110"
                      onClick={() => {
                        success(`Executing: ${link.command}`);
                        // Removed setLastCommand
                        playNavigationSound();
                      }}
                    >
                      <link.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <nav id="navbar" className="nav-menu flex-grow mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={16} className="text-primary" />
              <span className="font-mono text-sm text-muted-foreground">navigation.sh</span>
            </div>
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId && pathname === '/';
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`nav-link flex items-center py-3 px-4 rounded-md transition-all duration-200 group font-mono text-sm relative overflow-hidden ${
                        isActive
                          ? 'bg-black/50 text-primary border border-primary/30 no-underline hover:no-underline'
                          : 'text-muted-foreground hover:text-primary hover:bg-black/30 border border-transparent'
                      }`}
                      data-section={item.sectionId}
                      onClick={(e) => handleLinkClick(e, item.href, item.command)}
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
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-primary/60 flex items-center gap-1">
                        <Command size={12} />
                        <span>{item.shortcut}</span>
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

          {/* Render Console component here, pushed to the bottom */}
          <div className="mt-auto"> {/* Use mt-auto to push console to bottom */}
            <Console />
          </div>
          {/* Removed the old "Last command" display */}
        </div>
      </header>
    </>
  );
}
