'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export function KonamiCode() {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const newInput = [...input, key];
      
      // Keep only the last N keys pressed, where N is the length of the Konami code
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      
      setInput(newInput);

      // Check if the Konami code was entered
      if (newInput.join(',') === KONAMI_CODE.join(',')) {
        // Trigger the easter egg
        celebrateKonamiCode();
        setInput([]); // Reset input
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  const celebrateKonamiCode = () => {
    // Create a canvas confetti celebration
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

    // Add a fun message
    const message = document.createElement('div');
    message.textContent = '🎮 Konami Code Activated! You found an easter egg!';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      z-index: 9999;
      animation: fadeInOut 3s forwards;
    `;

    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
  };

  return null;
} 