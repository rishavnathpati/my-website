/**
 * Animations Module
 * 
 * Central export point for all animation-related utilities, hooks, and variants.
 */

// Re-export everything from the animation provider
export * from '@/components/ui/animation-provider';

// Re-export all animation variants
export * from './variants';

// Re-export all animation hooks
export * from './hooks';

// Re-export all animation utilities
export * from './utils';

// Export a default object with grouped exports for convenience
export default {
  // Animation provider exports
  provider: {
    AnimationProvider: require('@/components/ui/animation-provider').AnimationProvider,
    useAnimations: require('@/components/ui/animation-provider').useAnimations,
  },
  
  // Animation variants
  variants: require('./variants'),
  
  // Animation hooks
  hooks: require('./hooks'),
  
  // Animation utilities
  utils: require('./utils'),
};