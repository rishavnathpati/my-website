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
    if (!isLoading || typeof window === 'undefined') {
      setProgress(0);
      return;
    }

    let animationFrameId: number;
    let lastTime = Date.now();
    let currentProgress = 0;
    
    // Use a single RAF loop instead of multiple intervals
    const updateProgress = () => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      
      // Update progress less frequently (every 150ms)
      if (deltaTime > 150) {
        lastTime = now;
        
        // Update dots every ~600ms
        if (deltaTime > 600) {
          setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }
        
        // Update progress
        if (currentProgress < 100) {
          // More predictable progress increments
          currentProgress += 5 + Math.random() * 10;
          if (currentProgress > 100) currentProgress = 100;
          setProgress(Math.min(100, currentProgress));
        }
      }
      
      if (currentProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateProgress);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      className="absolute inset-0 bg-black/30 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-title"
    >
      <div
        className="bg-black/50 border border-primary/20 p-4 rounded-lg max-w-xs w-full font-mono"
        tabIndex={-1}
        aria-live="polite"
      >
        <div className="flex items-center justify-between mb-3">
          <span id="loading-title" className="text-primary text-sm">{text}{dots}</span>
          <span className="text-primary text-sm" aria-live="polite" aria-atomic="true">
            {Math.min(100, Math.round(progress))}%
          </span>
        </div>
        
        <div className="h-2 bg-black/40 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="h-full bg-primary relative"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 text-xs text-muted-foreground" aria-live="polite">
          {progress < 100 ? 'Loading...' : 'Complete'}
        </div>
      </div>
    </div>
  );
}