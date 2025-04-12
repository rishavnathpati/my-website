'use client';

import { useRef, useEffect } from 'react';
import { useAnimations } from '@/components/ui/animation-provider';

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
   // color: string; // Removed unused property
   maxSize: number;
   minSize: number;
  maxSpeed: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { animationsEnabled } = useAnimations();

  useEffect(() => {
    if (typeof window === 'undefined' || !animationsEnabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

     const config: ParticleConfig = {
       count: 30,
       // color: '#ffffff', // Removed unused color property
       maxSize: 2.5,
       minSize: 0.8,
      maxSpeed: 1,
    };

    const particles: Particle[] = [];
    for (let i = 0; i < config.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: config.minSize + Math.random() * (config.maxSize - config.minSize),
        speedX: (Math.random() - 0.5) * config.maxSpeed,
        speedY: (Math.random() - 0.5) * config.maxSpeed,
        opacity: 0.1 + Math.random() * 0.6,
      });
    }

    let animationFrameId: number;
    let lastTime = 0;
    const targetFPS = 24;
    const frameInterval = 1000 / targetFPS;

    const draw = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
       if (deltaTime > frameInterval) {
         lastTime = currentTime - (deltaTime % frameInterval);
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         // Set fillStyle to use the primary color CSS variable
         ctx.fillStyle = 'hsl(var(--primary))';
         
         particles.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.globalAlpha = particle.opacity;
          ctx.fill();
          
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        });
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw(performance.now());
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationsEnabled]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5] force-animation"
      style={{ mixBlendMode: "screen", opacity: 0.6 }}
    />
  );
}
