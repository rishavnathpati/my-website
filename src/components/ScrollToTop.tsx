'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrolled / height) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        {/* Progress Circle */}
        <svg
          className="w-12 h-12 -rotate-90"
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
            className="text-primary stroke-current transition-all duration-300"
            strokeWidth="4"
            strokeLinecap="round"
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: `${2 * Math.PI * 44}`,
              strokeDashoffset: `${2 * Math.PI * 44 * (1 - scrollProgress / 100)}`,
            }}
          />
        </svg>
        
        {/* Button */}
        <Button
          onClick={scrollToTop}
          size="icon"
          className="absolute inset-0 rounded-full hover:scale-110 transition-transform"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
} 