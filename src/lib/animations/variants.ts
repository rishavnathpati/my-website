/**
 * Animation Variants Library
 * 
 * A collection of reusable Framer Motion animation variants for consistent animations
 * throughout the application.
 */

import { Variants } from 'framer-motion';

// Entry/Exit Animations

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const scaleInFast: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
};

// Attention-grabbing Animations

export const pulse: Variants = {
  hidden: { scale: 1 },
  visible: { 
    scale: [1, 1.05, 1],
    transition: { 
      repeat: Infinity, 
      repeatType: 'reverse', 
      duration: 1.5 
    }
  },
};

export const bounce: Variants = {
  hidden: { y: 0 },
  visible: { 
    y: [0, -10, 0],
    transition: { 
      repeat: Infinity, 
      repeatType: 'reverse', 
      duration: 1 
    }
  },
};

export const flash: Variants = {
  hidden: { opacity: 1 },
  visible: { 
    opacity: [1, 0.5, 1],
    transition: { 
      repeat: Infinity, 
      repeatType: 'reverse', 
      duration: 1 
    }
  },
};

// Continuous Animations

export const float: Variants = {
  hidden: { y: 0 },
  visible: { 
    y: [0, -10, 0],
    transition: { 
      repeat: Infinity, 
      repeatType: 'reverse', 
      duration: 3,
      ease: 'easeInOut'
    }
  },
};

export const breathe: Variants = {
  hidden: { scale: 1 },
  visible: { 
    scale: [1, 1.03, 1],
    transition: { 
      repeat: Infinity, 
      repeatType: 'reverse', 
      duration: 3,
      ease: 'easeInOut'
    }
  },
};

// Transition Effects

export const morphIn: Variants = {
  hidden: { 
    opacity: 0, 
    borderRadius: '50%', 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    borderRadius: '0%', 
    scale: 1,
    transition: { duration: 0.5 }
  },
};

// Staggered Animation Helpers

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// 3D Effects

export const tilt: Variants = {
  hidden: { 
    rotateX: 0, 
    rotateY: 0 
  },
  visible: (custom: { x: number, y: number }) => ({
    rotateX: custom.y * 10, // tilt based on mouse Y position
    rotateY: -custom.x * 10, // tilt based on mouse X position
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }),
};

// Terminal-inspired Animations

export const typewriter: Variants = {
  hidden: { width: '0%' },
  visible: { 
    width: '100%',
    transition: { 
      duration: 1.5, 
      ease: 'easeInOut' 
    }
  },
};

export const cursor: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: [0, 1, 0],
    transition: { 
      repeat: Infinity, 
      duration: 0.8 
    }
  },
};

export const glitch: Variants = {
  hidden: { 
    x: 0,
    y: 0,
    filter: 'none'
  },
  visible: { 
    x: [0, -2, 0, 2, 0],
    y: [0, 1, 0, -1, 0],
    filter: ['none', 'brightness(1.2) contrast(1.5)', 'none', 'brightness(0.8) contrast(1.2)', 'none'],
    transition: { 
      repeat: Infinity, 
      repeatType: 'mirror',
      duration: 0.5,
      repeatDelay: 5
    }
  },
};

// Page Transitions

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

// Create variant factory functions for customization

export const createFadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none', 
  distance: number = 20
): Variants => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
    none: {}
  };

  return {
    hidden: { opacity: 0, ...directionMap[direction] },
    visible: { 
      opacity: 1, 
      ...(direction === 'none' ? {} : { [direction === 'up' || direction === 'down' ? 'y' : 'x']: 0 }),
      transition: { duration: 0.5 }
    }
  };
};

export const createStagger = (
  staggerTime: number = 0.1, 
  delayTime: number = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
      delayChildren: delayTime,
    },
  },
});