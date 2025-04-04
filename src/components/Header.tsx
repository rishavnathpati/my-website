'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, FileText, BookOpen, Mail, Bot, Github, Linkedin, FileCode2, Pencil, Menu, X } from 'lucide-react';
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
        className="fixed top-4 left-4 z-[9999] lg:hidden p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileNavOpen}
      >
        {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <header 
        id="header" 
        className={`fixed top-0 bottom-0 w-[300px] z-[9998] p-4 bg-gray-900 text-white overflow-y-auto transition-transform duration-300 ease-in-out flex flex-col dark:bg-neutral-950
          ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="profile text-center mb-8 pt-10 lg:pt-0">
          <Image
            src="/profile-img.jpg"
            alt="Rishav Nath Pati"
            width={120}
            height={120}
            className="mx-auto block rounded-full border-8 border-gray-800 dark:border-neutral-800"
            priority
          />
          <h1 className="text-2xl font-semibold mt-4 mb-1">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors" onClick={() => handleLinkClick}>
              Rishav Nath Pati
            </Link>
          </h1>
          <div className="social-links mt-3 flex justify-center space-x-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-9 h-9 bg-gray-800 dark:bg-neutral-800 rounded-full flex items-center justify-center text-lg text-white hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors"
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <nav id="navbar" className="nav-menu flex-grow">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId && pathname === '/';
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`nav-link flex items-center py-3 px-4 rounded-md transition-colors group ${
                      isActive
                        ? 'text-white bg-gray-800 dark:bg-neutral-800' // Ensure no underline on active/hover
                        : 'text-gray-400 dark:text-neutral-400 hover:text-white dark:hover:text-white hover:bg-gray-800 dark:hover:bg-neutral-800'
                    }`}
                    data-section={item.sectionId}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <item.icon
                      size={20}
                      className={`mr-3 transition-colors ${
                        isActive
                          ? 'text-blue-400'
                          : 'text-gray-500 dark:text-neutral-500 group-hover:text-blue-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Overlay for mobile */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9997] lg:hidden"
          onClick={toggleMobileNav}
          aria-hidden="true"
        />
      )}
    </>
  );
} 