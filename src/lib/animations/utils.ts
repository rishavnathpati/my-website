/**
 * Animation Utilities
 * 
 * Helper functions and utilities for animations throughout the application.
 */

import { useEffect, useState, useCallback } from 'react';
import { useAnimations } from '@/components/ui/animation-provider';

/**
 * Generates a random number between min and max
 */
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Maps a value from one range to another
 */
export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
): number {
  return (
    ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) +
    outputMin
  );
}

/**
 * Easing functions for animations
 */
export const easings = {
  // Linear
  linear: (t: number): number => t,
  
  // Sine
  easeInSine: (t: number): number => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t: number): number => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2,
  
  // Quad
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => 1 - (1 - t) * (1 - t),
  easeInOutQuad: (t: number): number =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  
  // Cubic
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  
  // Elastic
  easeInElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },
  easeOutElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  
  // Bounce
  easeInBounce: (t: number): number => 1 - easings.easeOutBounce(1 - t),
  easeOutBounce: (t: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
};

/**
 * Framer Motion transition presets
 */
export const transitions = {
  // Basic transitions
  default: { type: 'tween', duration: 0.3 },
  smooth: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
  
  // Spring transitions
  spring: { type: 'spring', stiffness: 300, damping: 20 },
  bouncy: { type: 'spring', stiffness: 400, damping: 10 },
  gentle: { type: 'spring', stiffness: 200, damping: 30 },
  
  // Special transitions
  elastic: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
    mass: 1.2,
    velocity: 2,
  },
  slowStart: { type: 'tween', ease: [0.4, 0, 0.2, 1], duration: 0.5 },
  quickEnd: { type: 'tween', ease: [0.8, 0, 0.2, 1], duration: 0.4 },
  
  // Staggered children
  staggered: {
    staggerChildren: 0.1,
    delayChildren: 0.2,
  },
  quickStaggered: {
    staggerChildren: 0.05,
    delayChildren: 0.1,
  },
};

/**
 * Hook to create a delayed animation
 * @param delay - Delay in seconds
 * @param initialState - Initial state (default: false)
 */
export function useDelayedAnimation(delay: number, initialState = false) {
  const [isActive, setIsActive] = useState(initialState);
  const { animationsEnabled, getDuration } = useAnimations();
  
  useEffect(() => {
    if (!animationsEnabled) {
      setIsActive(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsActive(true);
    }, getDuration(delay) * 1000);
    
    return () => clearTimeout(timer);
  }, [delay, animationsEnabled, getDuration]);
  
  return isActive;
}

/**
 * Hook to create a sequence of animations
 * @param steps - Number of steps in the sequence
 * @param baseDelay - Base delay between steps
 * @param autoStart - Whether to start the sequence automatically
 */
export function useAnimationSequence(
  steps: number,
  baseDelay = 0.1,
  autoStart = true
) {
  const [currentStep, setCurrentStep] = useState(autoStart ? 0 : -1);
  const { animationsEnabled, getDuration } = useAnimations();
  
  const start = useCallback(() => {
    setCurrentStep(0);
  }, []);
  
  const reset = useCallback(() => {
    setCurrentStep(-1);
  }, []);
  
  useEffect(() => {
    if (currentStep === -1 || currentStep >= steps || !animationsEnabled) return;
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, getDuration(baseDelay) * 1000);
    
    return () => clearTimeout(timer);
  }, [currentStep, steps, baseDelay, animationsEnabled, getDuration]);
  
  return {
    currentStep: animationsEnabled ? currentStep : steps,
    isComplete: currentStep >= steps,
    isActive: (step: number) => animationsEnabled ? currentStep >= step : true,
    start,
    reset,
  };
}

/**
 * Hook to create a repeating animation
 * @param interval - Interval in seconds
 * @param initialState - Initial state (default: false)
 */
export function useRepeatingAnimation(interval: number, initialState = false) {
  const [isActive, setIsActive] = useState(initialState);
  const { animationsEnabled, getDuration } = useAnimations();
  
  useEffect(() => {
    if (!animationsEnabled) {
      setIsActive(true);
      return;
    }
    
    const timer = setInterval(() => {
      setIsActive(prev => !prev);
    }, getDuration(interval) * 1000);
    
    return () => clearInterval(timer);
  }, [interval, animationsEnabled, getDuration]);
  
  return isActive;
}

/**
 * Creates a CSS keyframe animation
 * @param name - Animation name
 * @param keyframes - CSS keyframes
 */
export function createKeyframeAnimation(name: string, keyframes: string): string {
  return `
    @keyframes ${name} {
      ${keyframes}
    }
  `;
}

/**
 * Utility to create staggered delays for children
 * @param count - Number of children
 * @param baseDelay - Base delay between children
 */
export function createStaggeredDelays(count: number, baseDelay = 0.1): number[] {
  return Array.from({ length: count }, (_, i) => i * baseDelay);
}

/**
 * Utility to create a wave pattern of delays
 * @param count - Number of children
 * @param baseDelay - Base delay between children
 */
export function createWaveDelays(count: number, baseDelay = 0.1): number[] {
  const center = Math.floor(count / 2);
  return Array.from({ length: count }, (_, i) => Math.abs(i - center) * baseDelay);
}

/**
 * Utility to create a random pattern of delays
 * @param count - Number of children
 * @param minDelay - Minimum delay
 * @param maxDelay - Maximum delay
 */
export function createRandomDelays(
  count: number,
  minDelay = 0,
  maxDelay = 0.5
): number[] {
  return Array.from({ length: count }, () => random(minDelay, maxDelay));
}

/**
 * Utility to check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Utility to check if the device has a gyroscope
 */
export function hasGyroscope(): Promise<boolean> {
  return new Promise(resolve => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    
    if ('DeviceOrientationEvent' in window) {
      // Try to request permission for DeviceOrientationEvent
      // This is required in iOS 13+
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((permissionState: string) => {
            resolve(permissionState === 'granted');
          })
          .catch(() => {
            resolve(false);
          });
      } else {
        // No permission needed
        resolve(true);
      }
    } else {
      resolve(false);
    }
  });
}

/**
 * Utility to create a spring animation configuration
 * @param stiffness - Spring stiffness
 * @param damping - Spring damping
 * @param mass - Spring mass
 */
export function createSpringConfig(
  stiffness = 300,
  damping = 20,
  mass = 1
) {
  const { getSpringConfig } = useAnimations();
  const { stiffness: adjustedStiffness, damping: adjustedDamping } = getSpringConfig(stiffness, damping);
  
  return {
    type: 'spring',
    stiffness: adjustedStiffness,
    damping: adjustedDamping,
    mass,
  };
}

/**
 * Utility to create a tween animation configuration
 * @param duration - Animation duration in seconds
 * @param ease - Easing function
 */
export function createTweenConfig(
  duration = 0.3,
  ease: string | number[] = 'easeInOut'
) {
  const { getDuration } = useAnimations();
  
  return {
    type: 'tween',
    duration: getDuration(duration),
    ease,
  };
}