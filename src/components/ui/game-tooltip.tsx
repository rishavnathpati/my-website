'use client';

import { useState, useRef, useEffect } from 'react';

interface GameTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function GameTooltip({ content, children }: GameTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Position above the element by default
      let y = -tooltipRect.height - 10;
      let x = (containerRect.width - tooltipRect.width) / 2;

      // Check if tooltip would go off screen and adjust if needed
      if (containerRect.top + y < 0) {
        y = containerRect.height + 10; // Position below instead
      }

      setPosition({ x, y });
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 pointer-events-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <div className="bg-black/90 backdrop-blur-sm text-primary border border-primary/20 px-4 py-2 rounded-lg font-mono text-sm min-w-[200px] shadow-lg relative">
            {/* Scanline effect */}
            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
              <div className="h-[1px] w-full bg-primary/10 animate-[scanline_2s_linear_infinite]" />
            </div>
            
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-primary/20" />
            
            {/* Content */}
            <div className="relative">
              {content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}