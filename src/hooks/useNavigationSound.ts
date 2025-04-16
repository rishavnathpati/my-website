'use client';

import { useCallback } from 'react';

export function useNavigationSound() {
  const playNavigationSound = useCallback(() => {
    // You can implement actual sound effects here if desired
    console.log('*click*');
  }, []);

  return { playNavigationSound };
}