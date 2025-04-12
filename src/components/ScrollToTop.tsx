'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
        const scrolled = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const newProgress = height > 0 ? Math.round((scrolled / height) * 100) : 0;
        const newVisibility = scrolled > 300;

        setScrollProgress(newProgress);

        if (newVisibility !== isVisible) {
          setIsVisible(newVisibility);
        }
        
        animationFrameId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative h-12 w-12">
        {/* Progress Circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-muted stroke-current"
            strokeWidth="4"
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary stroke-current"
            strokeWidth="4"
            strokeLinecap="round"
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: 276.46, // Pre-calculated 2 * Math.PI * 44
              strokeDashoffset: 276.46 * (1 - scrollProgress / 100),
            }}
          />
        </svg>
        
        {/* Button - positioned in center of progress circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border border-border hover:border-primary hover:bg-black/50 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 