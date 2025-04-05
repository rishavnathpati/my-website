'use client';

import { useEffect, useState, useCallback } from 'react';
import { useConsole } from '@/components/ui/console-provider';

// Game dev-style cheat codes
const CHEAT_CODES = {
  konami: {
    sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    name: 'Konami Code',
    effect: 'Celebration Mode'
  },
  debug: {
    sequence: ['d', 'e', 'b', 'u', 'g'],
    name: 'Debug Mode',
    effect: 'Console Visibility'
  }
  // Removed Unity cheat code since we're using forced dark theme now
};

export function KonamiCode() {
  const [input, setInput] = useState<string[]>([]);
  const { log, success, warn } = useConsole();
  const maxSequenceLength = Math.max(...Object.values(CHEAT_CODES).map(code => code.sequence.length));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let lastKeyTime = 0;
    const keyDebounceTime = 100; // ms
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      // Debounce key presses to avoid too many state updates
      if (now - lastKeyTime < keyDebounceTime) return;
      lastKeyTime = now;
      
      const key = e.key.toLowerCase();
      
      // Optimize array operations with direct manipulation
      const newInput = [...input, key];
      if (newInput.length > maxSequenceLength) {
        newInput.shift();
      }
      
      setInput(newInput);

      // Check for any matching cheat codes
      for (const [codeName, code] of Object.entries(CHEAT_CODES)) {
        const sequence = code.sequence.map(k => k.toLowerCase());
        if (newInput.slice(-sequence.length).join(',') === sequence.join(',')) {
          activateCheatCode(codeName as keyof typeof CHEAT_CODES);
          setInput([]); // Reset input
          break; // Exit loop once a match is found
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, maxSequenceLength]);

  const celebrateKonamiCode = useCallback(() => {
    // Simple celebration effect using DOM elements
    const colors = ['#ff0000', '#00ff00', '#0000ff'];

    // Create achievement popup
    const message = document.createElement('div');
    message.textContent = '🎮 Achievement: Konami!';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: ${colors[1]};
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid ${colors[1]};
      font-family: monospace;
      z-index: 9999;
      transition: opacity 0.3s ease;
    `;

    document.body.appendChild(message);

    // Fade out and remove after 1.5s
    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => message.remove(), 300);
    }, 1500);
  }, []); // No dependencies needed for this effect

  const activateCheatCode = useCallback((codeName: keyof typeof CHEAT_CODES) => {
    const code = CHEAT_CODES[codeName];
    log(`Cheat code detected: ${code.name}`);
    success(`Activating ${code.effect}...`);

    switch (codeName) {
      case 'konami':
        celebrateKonamiCode();
        break;
      case 'debug':
        // Toggle console visibility
        warn('Debug mode activated - console will remain visible');
        break;
    }
  }, [log, success, warn, celebrateKonamiCode]);

  return null;
}