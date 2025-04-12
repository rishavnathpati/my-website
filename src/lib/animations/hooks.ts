/**
 * Animation Hooks
 * 
 * Custom React hooks for common animation patterns using Framer Motion.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useMotionValue, useTransform, useSpring, useInView, MotionValue } from 'framer-motion';
import { useAnimations } from '@/components/ui/animation-provider';

/**
 * Enhanced typewriter effect with cursor and variable speed
 * @param text - The text to type
 * @param options - Configuration options
 */
export function useTypewriter(
  text: string,
  options: {
    speed?: number;
    delayStart?: number;
    cursor?: boolean;
    loop?: boolean;
    pauseEnd?: number;
    onComplete?: () => void;
    variableSpeed?: boolean;
  } = {}
) {
  const {
    speed = 50,
    delayStart = 0,
    cursor = true,
    loop = false,
    pauseEnd = 1000,
    onComplete,
    variableSpeed = false,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { animationsEnabled } = useAnimations();

  useEffect(() => {
    if (!animationsEnabled) {
      setDisplayText(text);
      setIsDone(true);
      onComplete?.();
      return;
    }

    let i = 0;
    let timer: NodeJS.Timeout;
    
    const startTyping = () => {
      setIsTyping(true);
      
      const typeNextChar = () => {
        if (i < text.length) {
          // Get the next character
          const nextChar = text.charAt(i);
          setDisplayText(prev => prev + nextChar);
          
          // Calculate delay for the next character
          let delay = speed;
          if (variableSpeed) {
            // Slow down for punctuation
            if (['.', ',', '!', '?', ';', ':'].includes(nextChar)) {
              delay = speed * 6;
            } else if ([' '].includes(nextChar)) {
              delay = speed * 1.5;
            } else if (Math.random() > 0.8) {
              // Occasionally vary the speed slightly for a more natural feel
              delay = speed * (0.8 + Math.random() * 0.4);
            }
          }
          
          i++;
          timer = setTimeout(typeNextChar, delay);
        } else {
          setIsTyping(false);
          setIsDone(true);
          onComplete?.();
          
          if (loop) {
            timer = setTimeout(() => {
              setDisplayText('');
              i = 0;
              startTyping();
            }, pauseEnd);
          }
        }
      };
      
      typeNextChar();
    };
    
    // Start typing after the initial delay
    timer = setTimeout(startTyping, delayStart);
    
    return () => clearTimeout(timer);
  }, [text, speed, delayStart, loop, pauseEnd, onComplete, variableSpeed, animationsEnabled]);
  
  return { displayText, isTyping, isDone, cursor };
}

/**
 * Parallax scrolling effect for background elements
 * @param speed - The speed of the parallax effect (1 = normal, <1 = slower, >1 = faster)
 * @param direction - The direction of the parallax effect
 */
export function useParallax(
  speed: number = 0.5,
  direction: 'up' | 'down' | 'left' | 'right' = 'up'
) {
  const { animationsEnabled } = useAnimations();
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  
  const initial = useMotionValue(0);
  
  // Calculate the parallax offset based on scroll position
  const calculateParallaxOffset = useCallback(() => {
    const scrollTop = window.scrollY;
    if (!ref.current || !animationsEnabled) return;
    
    const elementRect = ref.current.getBoundingClientRect();
    setElementTop(elementRect.top + scrollTop);
    setClientHeight(elementRect.height);
    setWindowHeight(window.innerHeight);
  }, [animationsEnabled]);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    calculateParallaxOffset();
    window.addEventListener('scroll', calculateParallaxOffset);
    window.addEventListener('resize', calculateParallaxOffset);
    
    return () => {
      window.removeEventListener('scroll', calculateParallaxOffset);
      window.removeEventListener('resize', calculateParallaxOffset);
    };
  }, [calculateParallaxOffset]);
  
  // Calculate the y offset based on scroll position
  const y = useTransform(
    initial,
    [0, 1],
    [0, direction === 'up' || direction === 'down' ? clientHeight * speed : 0]
  );
  
  // Calculate the x offset based on scroll position
  const x = useTransform(
    initial,
    [0, 1],
    [0, direction === 'left' || direction === 'right' ? clientHeight * speed : 0]
  );
  
  // Update the motion value based on scroll position
  useEffect(() => {
    if (!animationsEnabled) {
      initial.set(0);
      return;
    }
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const offsetTop = elementTop - windowHeight;
      const offsetBottom = elementTop + clientHeight;
      
      // Calculate the progress (0 to 1) based on scroll position
      let progress = 0;
      if (scrollTop >= offsetTop && scrollTop <= offsetBottom) {
        progress = (scrollTop - offsetTop) / (offsetBottom - offsetTop);
      } else if (scrollTop > offsetBottom) {
        progress = 1;
      }
      
      // Adjust the direction
      if (direction === 'down' || direction === 'right') {
        progress = 1 - progress;
      }
      
      initial.set(progress);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initial, elementTop, clientHeight, windowHeight, direction, animationsEnabled]);
  
  return { ref, x, y };
}

/**
 * Chain multiple animations in sequence
 * @param animations - Array of animation steps with duration and optional delay
 */
export function useSequence(
  animations: Array<{
    id: string;
    duration: number;
    delay?: number;
  }>,
  options: {
    autoPlay?: boolean;
    loop?: boolean;
    onComplete?: () => void;
  } = {}
) {
  const { autoPlay = true, loop = false, onComplete } = options;
  const { animationsEnabled } = useAnimations();
  
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  // Start the animation sequence
  const start = useCallback(() => {
    if (!animationsEnabled) {
      // If animations are disabled, mark all steps as completed
      setCompletedSteps(animations.map(a => a.id));
      onComplete?.();
      return;
    }
    
    setIsPlaying(true);
    setCurrentStep(0);
    setCompletedSteps([]);
  }, [animations, animationsEnabled, onComplete]);
  
  // Stop the animation sequence
  const stop = useCallback(() => {
    setIsPlaying(false);
  }, []);
  
  // Reset the animation sequence
  const reset = useCallback(() => {
    setCurrentStep(-1);
    setCompletedSteps([]);
    setIsPlaying(autoPlay);
  }, [autoPlay]);
  
  // Advance to the next step
  useEffect(() => {
    if (!isPlaying || currentStep === -1 || !animationsEnabled) return;
    
    const currentAnimation = animations[currentStep];
    if (!currentAnimation) return;
    
    const timer = setTimeout(() => {
      // Mark the current step as completed
      setCompletedSteps(prev => [...prev, currentAnimation.id]);
      
      // Move to the next step
      if (currentStep < animations.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // End of sequence
        setIsPlaying(false);
        onComplete?.();
        
        // Loop if enabled
        if (loop) {
          setTimeout(() => {
            reset();
          }, 500);
        }
      }
    }, currentAnimation.duration + (currentAnimation.delay || 0));
    
    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, animations, loop, reset, onComplete, animationsEnabled]);
  
  // Auto-start if enabled
  useEffect(() => {
    if (autoPlay && animationsEnabled) {
      start();
    }
  }, [autoPlay, start, animationsEnabled]);
  
  return {
    currentStep,
    currentAnimation: currentStep >= 0 ? animations[currentStep] : null,
    isPlaying,
    completedSteps,
    isCompleted: (id: string) => completedSteps.includes(id),
    start,
    stop,
    reset
  };
}

/**
 * Configurable hover state animations
 * @param options - Configuration options for hover animations
 */
export function useHoverAnimation(
  options: {
    scale?: number;
    rotate?: number;
    y?: number;
    x?: number;
    filter?: string;
    transition?: {
      type?: string;
      stiffness?: number;
      damping?: number;
      duration?: number;
    };
  } = {}
) {
  const {
    scale = 1.05,
    rotate = 0,
    y = 0,
    x = 0,
    filter,
    transition = {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      duration: 0.2
    }
  } = options;
  
  const { animationsEnabled } = useAnimations();
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for each property
  const scaleValue = useMotionValue(1);
  const rotateValue = useMotionValue(0);
  const yValue = useMotionValue(0);
  const xValue = useMotionValue(0);
  
  // Spring animations for smoother transitions
  const springConfig = { stiffness: transition.stiffness || 300, damping: transition.damping || 20 };
  const scaleSpring = useSpring(scaleValue, springConfig);
  const rotateSpring = useSpring(rotateValue, springConfig);
  const ySpring = useSpring(yValue, springConfig);
  const xSpring = useSpring(xValue, springConfig);
  
  // Update motion values based on hover state
  useEffect(() => {
    if (!animationsEnabled) {
      scaleValue.set(1);
      rotateValue.set(0);
      yValue.set(0);
      xValue.set(0);
      return;
    }
    
    if (isHovered) {
      scaleValue.set(scale);
      rotateValue.set(rotate);
      yValue.set(y);
      xValue.set(x);
    } else {
      scaleValue.set(1);
      rotateValue.set(0);
      yValue.set(0);
      xValue.set(0);
    }
  }, [isHovered, scale, rotate, y, x, scaleValue, rotateValue, yValue, xValue, animationsEnabled]);
  
  // Event handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  
  // Style object for non-motion components
  const style = {
    scale: scaleSpring,
    rotate: rotateSpring,
    y: ySpring,
    x: xSpring,
    filter: isHovered && filter ? filter : undefined,
    transition
  };
  
  return {
    isHovered,
    style,
    scaleSpring,
    rotateSpring,
    ySpring,
    xSpring,
    handleMouseEnter,
    handleMouseLeave,
    // Props object for easy spreading
    props: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      style: filter && isHovered ? { filter } : undefined
    }
  };
}

/**
 * Hook for scroll-triggered animations
 * @param options - Configuration options
 */
export function useScrollAnimation(
  options: {
    amount?: number | "some" | "all";
    once?: boolean;
  } = {}
) {
  const { amount = 0.2, once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount, once });
  const { animationsEnabled } = useAnimations();
  
  // If animations are disabled, always return true for inView
  const isVisible = animationsEnabled ? inView : true;
  
  return { ref, inView: isVisible };
}

/**
 * Hook for creating a 3D tilt effect based on mouse position
 * @param options - Configuration options
 */
export function useTilt(
  options: {
    max?: number;
    perspective?: number;
    scale?: number;
    speed?: number;
    axis?: 'both' | 'x' | 'y';
    glare?: boolean;
    glareOpacity?: number;
    gyroscope?: boolean;
  } = {}
) {
  const {
    max = 10,
    perspective = 1000,
    scale = 1.05,
    speed = 500,
    axis = 'both',
    glare = false,
    glareOpacity = 0.3,
    gyroscope = false
  } = options;
  
  const { animationsEnabled } = useAnimations();
  const ref = useRef<HTMLElement>(null);
  
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current || !animationsEnabled) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to the element (0 to 1)
    const x = (e.clientX - rect.left) / width;
    const y = (e.clientY - rect.top) / height;
    
    // Calculate tilt (convert to -max to +max range)
    const tiltXValue = axis === 'y' ? 0 : max * (0.5 - x) * -2;
    const tiltYValue = axis === 'x' ? 0 : max * (0.5 - y) * 2;
    
    // Update state with smooth transition
    setTiltX(tiltXValue);
    setTiltY(tiltYValue);
    
    // Update glare position if enabled
    if (glare) {
      setGlarePosition({ x, y });
    }
  }, [max, axis, glare, animationsEnabled]);
  
  const handleMouseLeave = useCallback(() => {
    // Reset tilt when mouse leaves
    setTiltX(0);
    setTiltY(0);
  }, []);
  
  const handleDeviceOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (!ref.current || !gyroscope || !animationsEnabled) return;
    
    // Use gyroscope data for tilt on mobile devices
    const gamma = e.gamma || 0; // Left/right tilt (-90 to 90)
    const beta = e.beta || 0;   // Front/back tilt (-180 to 180)
    
    // Convert gyroscope data to tilt values
    const tiltXValue = axis === 'y' ? 0 : (gamma / 90) * max;
    const tiltYValue = axis === 'x' ? 0 : ((beta - 45) / 90) * max;
    
    setTiltX(tiltXValue);
    setTiltY(tiltYValue);
  }, [max, axis, gyroscope, animationsEnabled]);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    // Add gyroscope support for mobile devices
    if (gyroscope) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    
    return () => {
      // Clean up event listeners
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      
      if (gyroscope) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, [handleMouseMove, handleMouseLeave, handleDeviceOrientation, gyroscope]);
  
  // Style object for the tilt effect
  const style = {
    transform: animationsEnabled 
      ? `perspective(${perspective}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale(${scale})`
      : undefined,
    transition: `transform ${speed}ms ease-out`,
  };
  
  // Style object for the glare effect
  const glareStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
    backgroundImage: `radial-gradient(circle at ${glarePosition.x * 100}% ${glarePosition.y * 100}%, rgba(255,255,255,${glareOpacity}) 0%, rgba(255,255,255,0) 80%)`,
    transform: `translateZ(1px)`,
    mixBlendMode: 'overlay' as const,
  };
  
  return {
    ref,
    tiltX,
    tiltY,
    style,
    glareStyle,
    glareVisible: glare && animationsEnabled
  };
}