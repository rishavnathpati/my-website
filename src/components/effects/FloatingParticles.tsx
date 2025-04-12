'use client';

import { useRef, useEffect, useState } from 'react';
import { useAnimations } from '@/components/ui/animation-provider';
import { throttle } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface ParticleConfig {
  count: number;
  maxSize: number;
  minSize: number;
  maxSpeed: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);
  const [isInView, setIsInView] = useState(true);
  const { animationsEnabled } = useAnimations();

  useEffect(() => {
    if (typeof window === 'undefined' || !animationsEnabled || !isInView) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Optimize canvas size based on device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    // Throttle resize handler
    const handleResize = throttle(() => {
      if (isVisibleRef.current) {
        updateCanvasSize();
      }
    }, 100);

    window.addEventListener('resize', handleResize);
    updateCanvasSize();

    const config: ParticleConfig = {
      count: 20, // Reduced from 30
      maxSize: 2.5,
      minSize: 0.8,
      maxSpeed: 0.8, // Reduced from 1
    };

    const particles: Particle[] = [];
    for (let i = 0; i < config.count; i++) {
      particles.push({
        x: Math.random() * (canvas.width / dpr),
        y: Math.random() * (canvas.height / dpr),
        size: config.minSize + Math.random() * (config.maxSize - config.minSize),
        speedX: (Math.random() - 0.5) * config.maxSpeed,
        speedY: (Math.random() - 0.5) * config.maxSpeed,
        opacity: 0.1 + Math.random() * 0.4, // Reduced max opacity
      });
    }

    let animationFrameId: number;
    let lastTime = 0;
    const targetFPS = 30; // Increased from 24 for smoother animation
    const frameInterval = 1000 / targetFPS;

    const draw = (currentTime: number) => {
      if (!isVisibleRef.current) return;

      const deltaTime = currentTime - lastTime;
      if (deltaTime > frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);
        
        // Clear only the necessary part of the canvas
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        
        // Batch particle updates
        ctx.beginPath();
        ctx.fillStyle = 'hsl(var(--primary))';
        
        particles.forEach((particle) => {
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap around screen edges
          if (particle.x < 0) particle.x = canvas.width / dpr;
          if (particle.x > canvas.width / dpr) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height / dpr;
          if (particle.y > canvas.height / dpr) particle.y = 0;
          
          // Draw particle
          ctx.moveTo(particle.x, particle.y);
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.globalAlpha = particle.opacity;
        });
        
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    // Intersection Observer for visibility-based rendering
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting) {
            draw(performance.now());
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(canvas);
    draw(performance.now());
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [animationsEnabled, isInView]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5] force-animation"
      style={{ mixBlendMode: "screen", opacity: 0.5 }} // Reduced opacity
    />
  );
}
