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
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const newInput = [...input, key];
      
      // Keep only the last N keys pressed
      if (newInput.length > maxSequenceLength) {
        newInput.shift();
      }
      
      setInput(newInput);

      // Check for any matching cheat codes
      Object.entries(CHEAT_CODES).forEach(([codeName, code]) => {
        const sequence = code.sequence.map(k => k.toLowerCase());
        if (newInput.slice(-sequence.length).join(',') === sequence.join(',')) {
          activateCheatCode(codeName as keyof typeof CHEAT_CODES);
          setInput([]); // Reset input
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
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
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Game dev-style achievement popup
    const message = document.createElement('div');
    message.textContent = '🎮 Achievement Unlocked: Konami Master!';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: #00ff00;
      padding: 20px;
      border-radius: 10px;
      border: 2px solid #00ff00;
      font-family: monospace;
      z-index: 9999;
      animation: fadeInOut 3s forwards;
      text-shadow: 0 0 10px #00ff00;
    `;

    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
  };

  return null;
}