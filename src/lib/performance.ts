// Performance monitoring utilities
import React from 'react';

export interface PerformanceMetrics {
  name: string;
  duration: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private timers: Map<string, number> = new Map();

  startTimer(name: string): void {
    this.timers.set(name, performance.now());
  }

  endTimer(name: string): number | null {
    const startTime = this.timers.get(name);
    if (!startTime) {
      console.warn(`Timer "${name}" was not started`);
      return null;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(name);

    const metric: PerformanceMetrics = {
      name,
      duration,
      timestamp: Date.now()
    };

    this.metrics.push(metric);
    
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ Performance: ${name} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  // Get Core Web Vitals
  getCoreWebVitals(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const eventEntry = entry as PerformanceEntry & { processingStart?: number };
          if (eventEntry.processingStart) {
            console.log('FID:', eventEntry.processingStart - entry.startTime);
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        let cumulativeScore = 0;
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
          if (!entry.hadRecentInput && entry.value !== undefined) {
            cumulativeScore += entry.value;
          }
        });
        console.log('CLS:', cumulativeScore);
      }).observe({ entryTypes: ['layout-shift'] });

      resolve();
    });
  }
}

export const performanceMonitor = new PerformanceMonitor();

// HOC for measuring component render time
export function withPerformanceMonitoring<T extends object>(
  Component: React.ComponentType<T>,
  componentName: string
) {
  return function PerformanceWrappedComponent(props: T) {
    React.useEffect(() => {
      performanceMonitor.startTimer(`${componentName}-render`);
      return () => {
        performanceMonitor.endTimer(`${componentName}-render`);
      };
    });

    return React.createElement(Component, props);
  };
}

// Hook for measuring custom operations
export function usePerformanceTimer(name: string) {
  const startTimer = React.useCallback(() => {
    performanceMonitor.startTimer(name);
  }, [name]);

  const endTimer = React.useCallback(() => {
    return performanceMonitor.endTimer(name);
  }, [name]);

  return { startTimer, endTimer };
}
