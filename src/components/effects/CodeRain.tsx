'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const CHARACTERS = '01';
const FONT_SIZE = 14;

export function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let columns: number[] = [];
    let scrollOffset = 0;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Array(Math.floor(canvas.width / FONT_SIZE)).fill(canvas.height);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Handle scroll
    const handleScroll = () => {
      scrollOffset = window.scrollY * 0.1;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation
    let animationFrameId: number;
    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.05)' 
        : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set color for characters
      ctx.fillStyle = theme === 'dark'
        ? 'rgba(0, 255, 255, 0.2)'  // Cyan for dark theme
        : 'rgba(0, 128, 128, 0.2)'; // Teal for light theme
      ctx.font = `${FONT_SIZE}px monospace`;

      // Draw characters
      columns.forEach((y, x) => {
        // Get random character
        const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        
        // Calculate position with scroll offset
        const posX = x * FONT_SIZE;
        const posY = y + scrollOffset;
        
        // Draw character
        ctx.fillText(char, posX, posY);

        // Reset column or move down
        columns[x] = posY > canvas.height + scrollOffset + 50 
          ? scrollOffset - FONT_SIZE 
          : y + FONT_SIZE;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-20"
      style={{ mixBlendMode: 'plus-lighter' }}
    />
  );
}