'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  symbol: string;
  color: string;
}

const SYMBOLS = [
  { symbol: '✨', color: '#61DAFB' },
  { symbol: '⭐', color: '#4CAF50' },
];

const PARTICLE_COUNT = 8; // Reduced for better performance

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollRef = useRef(0);
  const { theme } = useTheme();

  // Initialize particles
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 15 + 10, // Smaller size
      speedY: Math.random() * 0.1 + 0.02, // Slower movement
      opacity: Math.random() * 0.3 + 0.1, // More subtle
      ...SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    }));
  }, []);

  // Animation loop
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Handle scroll with debounce
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollRef.current = window.scrollY * 0.05;
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Animation frame with throttle
    let lastTime = 0;
    const minFrameTime = 1000 / 24; // Lower FPS for better performance

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < minFrameTime) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Move particle
        particle.y -= particle.speedY;
        
        // Reset position if out of bounds
        if (particle.y < -50) {
          particle.y = canvas.height + 50;
          particle.x = Math.random() * canvas.width;
        }
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.font = `${particle.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Optimized glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 25; // Enhanced glow for blur effect
        ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
        
        // Smooth wave motion with time-based animation
        // Simple drift motion
        const drawX = particle.x + Math.sin(Date.now() * 0.0005) * 10;
        
        // Draw with optimized transformations
        ctx.fillText(particle.symbol, drawX, particle.y);
        
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        mixBlendMode: theme === 'dark' ? 'soft-light' : 'color-dodge',
        opacity: theme === 'dark' ? 0.4 : 0.2
      }}
      suppressHydrationWarning
    />
  );
}