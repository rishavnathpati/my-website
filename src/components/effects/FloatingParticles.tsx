'use client';

import { useRef, useEffect } from 'react';

interface ParticleConfig {
  count: number;
  color: string;
  maxSize: number;
  minSize: number;
  maxSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle configuration
    const config: ParticleConfig = {
      count: 30, // Further reduced count for better performance
      color: '#ffffff',
      maxSize: 2.5,
      minSize: 0.8,
      maxSpeed: 1, // Increased speed slightly for subtle movement
    };
    
    // Create particles
    const particles: Particle[] = [];
    
    for (let i = 0; i < config.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: config.minSize + Math.random() * (config.maxSize - config.minSize),
        speedX: (Math.random() - 0.5) * config.maxSpeed, // Use maxSpeed directly
        speedY: (Math.random() - 0.5) * config.maxSpeed, // Use maxSpeed directly
        opacity: 0.1 + Math.random() * 0.6, // Random opacity between 0.1 and 0.7
        color: config.color,
      });
    }
    
    // Animation function
    let animationFrameId: number;
    
    let lastTime = 0;
    const targetFPS = 24; // Lower FPS since movement is slower
    const frameInterval = 1000 / targetFPS;

    const draw = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime > frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        
        particles.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.globalAlpha = particle.opacity;
          ctx.fill();
          
          // Update particle position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap around edges
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
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5] allow-animation"
      style={{ mixBlendMode: "screen", opacity: 0.6 }}
    />
  );
}