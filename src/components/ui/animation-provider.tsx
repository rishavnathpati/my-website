'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type AnimationContextType = {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  // Default to true, but check local storage for saved preference
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // Check local storage for saved preference
    const savedPreference = localStorage.getItem('animationsEnabled');
    if (savedPreference !== null) {
      setAnimationsEnabled(savedPreference === 'true');
    }
  }, []);

  useEffect(() => {
    // Apply the animation preference to the document
    document.documentElement.classList.toggle('reduce-motion', !animationsEnabled);
    // Save preference to local storage
    localStorage.setItem('animationsEnabled', String(animationsEnabled));
  }, [animationsEnabled]);

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimations() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimations must be used within an AnimationProvider');
  }
  return context;
} 