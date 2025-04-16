'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useConsole } from '@/components/ui/console-provider';

interface SectionItem {
  sectionId: string;
  label: string;
}

export function useActiveSectionObserver(items: SectionItem[]) {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const pathname = usePathname();
  const { log, success } = useConsole();

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
          
          setActiveSection(sectionId);
          log(`Loading section: ${sectionId}`);
          
          setTimeout(() => {
            success(`Section "${sectionId}" loaded successfully`);
          }, 500);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    const currentObserver = observerRef.current;
    const currentSectionRefs = sectionRefs.current;

    items.forEach(item => {
      const sectionElement = document.getElementById(item.sectionId);
      if (sectionElement) {
        currentObserver.observe(sectionElement);
        currentSectionRefs.set(item.sectionId, sectionElement);
      }
    });

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
      currentSectionRefs.clear();
    };
  }, [pathname, items, log, success]);

  return { activeSection };
}