'use client';

import { useState, useEffect, useRef } from 'react';

export function FloatingActions() {
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
      {/* Scroll to top button */}
      <div
        className="cursor-pointer group"
        onClick={scrollToTop}
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <div className="relative h-12 w-12">
          <svg
            className="absolute inset-0"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              className="text-muted stroke-current"
              strokeWidth="4"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
            />
            {/* Progress circle */}
            <circle
              className="text-primary stroke-current"
              strokeWidth="4"
              strokeLinecap="round"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
              transform="rotate(-90 50 50)"
              style={{
                strokeDasharray: 276.46,
                strokeDashoffset: 276.46 * (1 - scrollProgress / 100),
              }}
            />
            {/* Up arrow */}
            <g className="stroke-current text-foreground group-hover:text-primary transition-colors">
              <line
                x1="50"
                y1="65"
                x2="50"
                y2="35"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="35"
                y1="50"
                x2="50"
                y2="35"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="65"
                y1="50"
                x2="50"
                y2="35"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}