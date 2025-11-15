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
  const observedIdsRef = useRef<Set<string>>(new Set());

  // Define the complete section order as it appears on the page
  const SECTION_ORDER = ['hero', 'about', 'experience', 'skills', 'portfolio-highlights', 'notes', 'contact-cta'];

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
      rootMargin: '-35% 0px -35% 0px', // Center-weighted detection area
      threshold: [0, 0.25, 0.5, 0.75, 1.0], // Simplified thresholds
    };

    // Compute the active section using viewport center for robust sequencing
    const computeActiveByViewportCenter = () => {
      const viewportCenterY = window.scrollY + window.innerHeight / 2;
      let closestSection = '';
      let closestDistance = Infinity;

      SECTION_ORDER.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + window.scrollY + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenterY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = sectionId;
        }
      });

      if (closestSection && closestSection !== activeSectionRef.current) {
        updateActiveSection(closestSection);
      }
    };

    // Intersection observer simply triggers recalculation
    const observerCallback = (_entries: IntersectionObserverEntry[]) => {
      computeActiveByViewportCenter();
    };

    // Create and configure observer
    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    const observer = observerRef.current;

    // Observe all sections in the expected order
    const observeSections = () => {
      let observedCount = 0;
      SECTION_ORDER.forEach(sectionId => {
        if (observedIdsRef.current.has(sectionId)) return;
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
          observedIdsRef.current.add(sectionId);
          observedCount++;
        }
      });
      return observedCount;
    };

    // Try to observe sections immediately
    const initialCount = observeSections();

    // If some sections are missing, keep watching DOM mutations to observe them when they mount
    let mutationObserver: MutationObserver | null = null;
    if (initialCount < SECTION_ORDER.length) {
      mutationObserver = new MutationObserver(() => {
        observeSections();
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    // Add scroll/resize listeners to keep active section accurate even without IO events
    let rafId: number | null = null;
    const handleScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        computeActiveByViewportCenter();
      });
    };
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
      observedIdsRef.current.clear();
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [pathname, items, updateActiveSection]);

  return { activeSection };
}
