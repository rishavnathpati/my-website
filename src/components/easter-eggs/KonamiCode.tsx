'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
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
  },
  unity: {
    sequence: ['u', 'n', 'i', 't', 'y'],
    name: 'Unity Mode',
    effect: 'Dark Theme'
  }
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

  const activateCheatCode = (codeName: keyof typeof CHEAT_CODES) => {
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
      case 'unity':
        // Switch to dark theme
        document.documentElement.classList.add('dark');
        log('Unity-style dark theme activated');
        break;
    }
  };

  const celebrateKonamiCode = () => {
    // Use fewer confetti particles for better performance
    const duration = 2 * 1000; // Shorter duration
    const end = Date.now() + duration;
    const colors = ['#ff0000', '#00ff00', '#0000ff'];

    let animationFrameId: number;
    
    function frame() {
      confetti({
        particleCount: 3, // Fewer particles
        angle: 60,
        spread: 45, // Narrower spread
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3, // Fewer particles
        angle: 120,
        spread: 45, // Narrower spread
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        animationFrameId = requestAnimationFrame(frame);
      }
    }
    
    frame();
    
    // Ensure cleanup happens
    setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
    }, duration + 100);

    // Use a pre-defined CSS class for the achievement popup
    const message = document.createElement('div');
    message.textContent = '🎮 Achievement: Konami!'; // Shorter text
    message.className = 'achievement-popup';
    
    // Use less demanding CSS without animation and shadows
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #00ff00;
      font-family: monospace;
      z-index: 9999;
      opacity: 0.9;
    `;

    document.body.appendChild(message);
    
    // Use a variable to track the timeout for cleanup
    const timeoutId = setTimeout(() => {
      if (document.body.contains(message)) {
        message.remove();
      }
    }, 2000); // Shorter display time
  };

  return null;
}