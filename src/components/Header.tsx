'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, FileText, BookOpen, Mail, Bot, Github, Linkedin, FileCode2, Pencil, Menu, X, Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Define navigation items
const navItems = [
  { href: '#hero', icon: Home, label: 'Home', sectionId: 'hero' },
  { href: '#about', icon: User, label: 'About', sectionId: 'about' },
  { href: '#skills', icon: FileText, label: 'Skills', sectionId: 'skills' },
  { href: '#portfolio', icon: BookOpen, label: 'Portfolio', sectionId: 'portfolio' },
  { href: '#blogs', icon: Pencil, label: 'Blogs', sectionId: 'blogs' },
  { href: '#contact-cta', icon: Mail, label: 'Contact', sectionId: 'contact-cta' },
];

// Define social links
const socialLinks = [
  { href: 'https://www.linkedin.com/in/rishavnathpati', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/rishavnathpati', icon: Github, label: 'GitHub' },
  { href: 'https://medium.com/@patirishavnath', icon: Bot, label: 'Medium' },
  { href: 'https://leetcode.com/rishavnathpati/', icon: FileCode2, label: 'LeetCode' },
];

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const pathname = usePathname();

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
    }

    // If we're not on the home page and trying to navigate to a section
    if (pathname !== '/' && href.startsWith('#')) {
      e.preventDefault();
      // Navigate to home page with the hash
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
          setActiveSection(entry.target.id);
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
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileNav}
        className="fixed top-4 left-4 z-[9999] lg:hidden p-2 rounded-md bg-black/30 backdrop-blur-sm border border-border text-foreground hover:text-primary hover:border-primary transition-colors"
        aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileNavOpen}
      >
        {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <header
        id="header"
        className={`fixed top-0 bottom-0 w-[300px] z-[9998] bg-black/30 backdrop-blur-sm text-white overflow-y-auto transition-transform duration-300 ease-in-out flex flex-col border-r border-border
          ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="profile mb-8 pt-10 lg:pt-0">
            <div className="bg-black/20 rounded-lg border border-border p-4">
              <div className="flex items-center gap-3 mb-4">
                <Terminal size={16} className="text-primary" />
                <span className="font-mono text-sm text-muted-foreground">user_profile.json</span>
              </div>
              
              <div className="flex flex-col items-center">
                <Image
                  src="/profile-img.jpg"
                  alt="Rishav Nath Pati"
                  width={100}
                  height={100}
                  className="rounded-lg border-2 border-primary/20"
                  priority
                />
                <h1 className="text-xl font-mono mt-4 mb-1">
                  <Link href="/" className="text-foreground hover:text-primary transition-colors" onClick={() => handleLinkClick}>
                    rishav_nath_pati
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
                      className="w-8 h-8 bg-black/30 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors border border-border"
                    >
                      <link.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <nav id="navbar" className="nav-menu flex-grow">
            <div className="flex items-center gap-2 mb-3 px-2">
              <Terminal size={16} className="text-primary" />
              <span className="font-mono text-sm text-muted-foreground">navigation.sh</span>
            </div>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId && pathname === '/';
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`nav-link flex items-center py-2 px-3 rounded-md transition-colors group font-mono text-sm ${
                        isActive
                          ? 'bg-black/40 text-primary border border-primary/20 no-underline hover:no-underline'
                          : 'text-muted-foreground hover:text-primary hover:bg-black/20 border border-transparent'
                      }`}
                      data-section={item.sectionId}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon
                        size={16}
                        className={`mr-2 transition-colors ${
                          isActive
                            ? 'text-primary'
                            : 'text-muted-foreground group-hover:text-primary'
                        }`}
                      />
                      <span>{item.label.toLowerCase()}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* Overlay for mobile */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9997] lg:hidden"
          onClick={toggleMobileNav}
          aria-hidden="true"
        />
      )}
    </>
  );
} 