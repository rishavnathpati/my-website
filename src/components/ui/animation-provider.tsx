'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Animation speed options
export type AnimationSpeed = 'slow' | 'normal' | 'fast';

// Animation theme options
export type AnimationTheme = 'default' | 'subtle' | 'energetic' | 'professional';

// Animation preset options
export type AnimationPreset = 'minimal' | 'moderate' | 'maximal';

// Animation context type with enhanced features
type AnimationContextType = {
  // Core animation controls
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  
  // Enhanced features
  speed: AnimationSpeed;
  setSpeed: (speed: AnimationSpeed) => void;
  
  theme: AnimationTheme;
  setTheme: (theme: AnimationTheme) => void;
  
  preset: AnimationPreset;
  setPreset: (preset: AnimationPreset) => void;
  
  // Animation sequence management
  registerSequence: (id: string, priority: number) => void;
  unregisterSequence: (id: string) => void;
  getSequenceDelay: (id: string) => number;
  
  // Utility functions
  getDuration: (baseDuration: number) => number;
  getSpringConfig: (stiffness: number, damping: number) => { stiffness: number; damping: number };
};

// Default values for animation settings
const defaultSpeed: AnimationSpeed = 'normal';
const defaultTheme: AnimationTheme = 'default';
const defaultPreset: AnimationPreset = 'moderate';

// Speed multipliers
const speedMultipliers = {
  slow: 1.5,
  normal: 1,
  fast: 0.7
};

// Theme configurations
const themeConfigs = {
  default: {
    stiffnessMultiplier: 1,
    dampingMultiplier: 1
  },
  subtle: {
    stiffnessMultiplier: 0.8,
    dampingMultiplier: 1.2
  },
  energetic: {
    stiffnessMultiplier: 1.3,
    dampingMultiplier: 0.8
  },
  professional: {
    stiffnessMultiplier: 0.9,
    dampingMultiplier: 1.1
  }
};

// Preset configurations
const presetConfigs = {
  minimal: {
    enabledFeatures: ['essential', 'functional'],
    intensityMultiplier: 0.7
  },
  moderate: {
    enabledFeatures: ['essential', 'functional', 'decorative'],
    intensityMultiplier: 1
  },
  maximal: {
    enabledFeatures: ['essential', 'functional', 'decorative', 'playful'],
    intensityMultiplier: 1.2
  }
};

// Create the context
const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

// Animation provider component with enhanced features
export function AnimationProvider({ children }: { children: React.ReactNode }) {
  // Core animation state
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Enhanced animation state
  const [speed, setSpeed] = useState<AnimationSpeed>(defaultSpeed);
  const [theme, setTheme] = useState<AnimationTheme>(defaultTheme);
  const [preset, setPreset] = useState<AnimationPreset>(defaultPreset);
  
  // Animation sequence management
  const [sequences, setSequences] = useState<Map<string, number>>(new Map());
  
  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Load animation enabled preference
    const savedAnimationsEnabled = localStorage.getItem('animationsEnabled');
    if (savedAnimationsEnabled !== null) {
      setAnimationsEnabled(savedAnimationsEnabled === 'true');
    }
    
    // Load speed preference
    const savedSpeed = localStorage.getItem('animationSpeed');
    if (savedSpeed && ['slow', 'normal', 'fast'].includes(savedSpeed)) {
      setSpeed(savedSpeed as AnimationSpeed);
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('animationTheme');
    if (savedTheme && ['default', 'subtle', 'energetic', 'professional'].includes(savedTheme)) {
      setTheme(savedTheme as AnimationTheme);
    }
    
    // Load preset preference
    const savedPreset = localStorage.getItem('animationPreset');
    if (savedPreset && ['minimal', 'moderate', 'maximal'].includes(savedPreset)) {
      setPreset(savedPreset as AnimationPreset);
    }
  }, []);
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Apply the animation preference to the document
    document.documentElement.classList.toggle('reduce-motion', !animationsEnabled);
    
    // Save preferences to localStorage
    localStorage.setItem('animationsEnabled', String(animationsEnabled));
    localStorage.setItem('animationSpeed', speed);
    localStorage.setItem('animationTheme', theme);
    localStorage.setItem('animationPreset', preset);
    
    // Apply CSS variables for animation settings
    document.documentElement.style.setProperty('--animation-speed-multiplier', String(speedMultipliers[speed]));
    document.documentElement.style.setProperty('--animation-intensity', String(presetConfigs[preset].intensityMultiplier));
  }, [animationsEnabled, speed, theme, preset]);
  
  // Toggle animations enabled/disabled
  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled(prev => !prev);
  }, []);
  
  // Register an animation sequence with a priority
  const registerSequence = useCallback((id: string, priority: number) => {
    setSequences(prev => {
      const newSequences = new Map(prev);
      newSequences.set(id, priority);
      return newSequences;
    });
  }, []);
  
  // Unregister an animation sequence
  const unregisterSequence = useCallback((id: string) => {
    setSequences(prev => {
      const newSequences = new Map(prev);
      newSequences.delete(id);
      return newSequences;
    });
  }, []);
  
  // Get the delay for a sequence based on its priority
  const getSequenceDelay = useCallback((id: string) => {
    const priority = sequences.get(id) || 0;
    const baseDelay = 0.1; // seconds
    return priority * baseDelay * speedMultipliers[speed];
  }, [sequences, speed]);
  
  // Get adjusted duration based on speed setting
  const getDuration = useCallback((baseDuration: number) => {
    return baseDuration * speedMultipliers[speed];
  }, [speed]);
  
  // Get spring configuration based on theme
  const getSpringConfig = useCallback((stiffness: number, damping: number) => {
    const config = themeConfigs[theme];
    return {
      stiffness: stiffness * config.stiffnessMultiplier,
      damping: damping * config.dampingMultiplier
    };
  }, [theme]);
  
  // Create the context value
  const contextValue: AnimationContextType = {
    // Core animation controls
    animationsEnabled,
    toggleAnimations,
    
    // Enhanced features
    speed,
    setSpeed,
    theme,
    setTheme,
    preset,
    setPreset,
    
    // Animation sequence management
    registerSequence,
    unregisterSequence,
    getSequenceDelay,
    
    // Utility functions
    getDuration,
    getSpringConfig
  };
  
  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
}

// Hook to use animation context
export function useAnimations() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimations must be used within an AnimationProvider');
  }
  return context;
}