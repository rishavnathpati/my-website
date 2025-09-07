'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useConsole } from '@/components/ui/console-provider';

interface SectionItem {
  href: string;
  sectionId: string;
  label: string;
}

export function useActiveSectionObserver(items: SectionItem[]) {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();
  const { log, success } = useConsole();

  // Single source of truth for active section tracking
  const activeSectionRef = useRef<string>('hero');
  const visitedSections = useRef<Set<string>>(new Set(['hero']));
  const isInitialized = useRef(false);

  // Define the complete section order as it appears on the page
  const SECTION_ORDER = ['hero', 'about', 'experience', 'skills', 'portfolio-highlights', 'blogs', 'contact-cta'];

  // Memoized callback to update active section
  const updateActiveSection = useCallback((sectionId: string) => {
    if (activeSectionRef.current !== sectionId) {
      activeSectionRef.current = sectionId;
      setActiveSection(sectionId);

      // Log only new sections for user feedback
      if (!visitedSections.current.has(sectionId) && sectionId !== 'hero') {
        visitedSections.current.add(sectionId);
        log(`Loading section: ${sectionId}`);
        success(`Section "${sectionId}" loaded successfully`);
      }
    }
  }, [log, success]);

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // Only set up observer for home page
    if (pathname !== '/') {
      if (activeSectionRef.current !== '') {
        activeSectionRef.current = '';
        setActiveSection('');
      }
      isInitialized.current = false;
      return;
    }

    // Initialize for home page
    if (!isInitialized.current) {
      activeSectionRef.current = 'hero';
      setActiveSection('hero');
      visitedSections.current = new Set(['hero']);
      isInitialized.current = true;
    }



    // Simple and reliable observer options
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Balanced detection area
      threshold: [0, 0.25, 0.5, 0.75, 1.0], // Simplified thresholds
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the section with the highest intersection ratio
      let bestSection = '';
      let bestRatio = 0;
      let hasIntersecting = false;

      entries.forEach(entry => {
        const sectionId = entry.target.id;
        const ratio = entry.intersectionRatio;

        if (entry.isIntersecting && ratio > bestRatio) {
          bestRatio = ratio;
          bestSection = sectionId;
          hasIntersecting = true;
        }
      });

      // If no section is intersecting well, find the closest one based on scroll position
      if (!hasIntersecting || bestRatio < 0.1) {
        const scrollY = window.scrollY + window.innerHeight / 2; // Middle of viewport
        let closestSection = 'hero';
        let closestDistance = Infinity;

        SECTION_ORDER.forEach(sectionId => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + window.scrollY + rect.height / 2;
            const distance = Math.abs(elementCenter - scrollY);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = sectionId;
            }
          }
        });

        bestSection = closestSection;
      }

      // Update active section if we found a different one
      if (bestSection && bestSection !== activeSectionRef.current) {
        updateActiveSection(bestSection);
      }
    };

    // Create and configure observer
    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    const observer = observerRef.current;

    // Observe all sections in the expected order
    const observeSections = () => {
      let observedCount = 0;
      const missingElements: string[] = [];

      SECTION_ORDER.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
          observedCount++;
        } else {
          missingElements.push(sectionId);
        }
      });

      return observedCount;
    };

    // Try to observe sections immediately
    const initialCount = observeSections();

    // If some sections are missing, retry after a delay (for dynamic content)
    let retryTimeout: NodeJS.Timeout | null = null;
    if (initialCount < SECTION_ORDER.length) {
      retryTimeout = setTimeout(() => {
        observeSections();
      }, 300);
    }

    // Cleanup function
    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname, items, updateActiveSection]);

  return { activeSection };
}
