'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Home, User, FileText, BookOpen, Mail, Bot, Github, Linkedin, FileCode2, Pencil, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // Adjust this value based on your layout
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setIsMobileNavOpen(false);
    }
  };

  // Mobile menu toggle
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Effect for scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
      }
    );

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileNav}
        className="fixed top-4 left-4 z-[9999] lg:hidden p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
      >
        {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <header 
        id="header" 
        className={`fixed top-0 left-0 bottom-0 w-[300px] z-[9997] p-4 bg-gray-900 text-white overflow-y-auto transition-all duration-500 ease-in-out flex flex-col dark:bg-neutral-950
          ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="profile text-center mb-8">
          <Image
            src="/profile-img.jpg"
            alt="Rishav Nath Pati - Game Developer"
            width={120}
            height={120}
            className="mx-auto block rounded-full border-8 border-gray-800 dark:border-neutral-800"
            priority
          />
          <h1 className="text-2xl font-semibold mt-4 mb-1">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors">
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
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`nav-link flex items-center py-3 px-4 rounded-md transition-colors group
                    ${activeSection === item.sectionId
                      ? 'text-white bg-gray-800 dark:bg-neutral-800'
                      : 'text-gray-400 dark:text-neutral-400 hover:text-white dark:hover:text-white hover:bg-gray-800 dark:hover:bg-neutral-800'
                    }`}
                  data-section={item.sectionId}
                >
                  <item.icon 
                    size={20} 
                    className={`mr-3 transition-colors
                      ${activeSection === item.sectionId
                        ? 'text-blue-400'
                        : 'text-gray-500 dark:text-neutral-500 group-hover:text-blue-400'
                      }`}
                  />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Overlay for mobile */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[9996] lg:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}
    </>
  );
} 