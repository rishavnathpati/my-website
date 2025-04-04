'use client';

import { useEffect, useState } from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
}

export function LoadingOverlay({ isLoading, text = 'Loading...' }: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Animate loading dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(dotsInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black/60 border border-primary/20 p-6 rounded-lg max-w-xs w-full font-mono">
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary text-sm">{text}{dots}</span>
          <span className="text-primary text-sm">{Math.min(100, Math.round(progress))}%</span>
        </div>
        
        <div className="h-2 bg-black/40 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="h-[2px] w-full bg-white/20 animate-[scanline_1s_linear_infinite]" />
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          {progress < 100 ? (
            'Initializing assets...'
          ) : (
            'Load complete!'
          )}
        </div>
      </div>
    </div>
  );
}