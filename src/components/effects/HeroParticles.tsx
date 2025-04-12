'use client';

import { memo, useRef, useEffect, useState } from 'react';
import { particleConfig } from '@/lib/data/hero';
import { throttle } from '@/lib/utils';
import { useAnimations } from '@/components/ui/animation-provider';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  originalSize: number;
  originalSpeed: { x: number, y: number };
}

interface Mouse {
  x: number;
  y: number;
}

const HeroParticlesComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Mouse>({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef(true);
  // Use useEffect to initialize state to avoid hydration mismatch
  const [mouseActive, setMouseActive] = useState(false);
  const lastTimeRef = useRef(0);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hueRef = useRef(200); // Starting hue value
  const { animationsEnabled } = useAnimations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Optimize canvas for retina displays and ensure it covers the entire hero section
    const dpr = window.devicePixelRatio || 1;
    const updateCanvasSize = () => {
      // Get the hero section element
      const heroSection = document.getElementById('hero');
      if (!heroSection) return;
      
      // Set canvas size to match the hero section
      const rect = heroSection.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Set the canvas style to match the hero section dimensions
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Log canvas dimensions for debugging
      console.log(`Canvas dimensions: ${canvas.width}x${canvas.height}, DPR: ${dpr}`);
    };

    const createParticles = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      
      particlesRef.current = Array.from({ length: particleConfig.count }).map(() => {
        const size = particleConfig.minSize + Math.random() * (particleConfig.maxSize - particleConfig.minSize);
        const speedX = (Math.random() - 0.5) * particleConfig.maxSpeed;
        const speedY = (Math.random() - 0.5) * particleConfig.maxSpeed;
        
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          originalSize: size,
          speedX,
          speedY,
          originalSpeed: { x: speedX, y: speedY },
          opacity: particleConfig.opacity.min + Math.random() * (particleConfig.opacity.max - particleConfig.opacity.min),
          color: `hsla(${Math.floor(Math.random() * 60) + 180}, 70%, 60%, `
        };
      });
    };

    const animate = (timestamp = 0) => {
      if (!ctx || !canvas || !isVisibleRef.current || !animationsEnabled) return;
      
      // Limit frame rate for better performance
      const elapsed = timestamp - lastTimeRef.current;
      if (elapsed < 1000 / 60) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = timestamp;
      
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      
      ctx.clearRect(0, 0, width, height);
      
      // Slowly shift the hue for a subtle color change effect
      hueRef.current = (hueRef.current + 0.1) % 360;
      
      // Draw connections between particles first (behind particles)
      ctx.strokeStyle = `hsla(${hueRef.current}, 70%, 60%, 0.05)`;
      ctx.lineWidth = 0.5;
      
      // Only draw connections if animations are enabled for performance
      if (animationsEnabled) {
        for (let i = 0; i < particlesRef.current.length; i++) {
          const particleA = particlesRef.current[i];
          
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const particleB = particlesRef.current[j];
            const dx = particleA.x - particleB.x;
            const dy = particleA.y - particleB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only connect particles that are close to each other
            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(particleA.x, particleA.y);
              ctx.lineTo(particleB.x, particleB.y);
              // Opacity based on distance
              ctx.strokeStyle = `hsla(${hueRef.current}, 70%, 60%, ${0.1 * (1 - distance / 80)})`;
              ctx.stroke();
            }
          }
        }
      }
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Reset particle to original state when mouse is not active
        if (!mouseActive) {
          // Gradually return to original size and speed
          particle.size += (particle.originalSize - particle.size) * 0.1;
          particle.speedX += (particle.originalSpeed.x - particle.speedX) * 0.1;
          particle.speedY += (particle.originalSpeed.y - particle.speedY) * 0.1;
        } 
        // Enhanced mouse interaction when mouse is active
        else if (distance < particleConfig.mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / particleConfig.mouseRadius) * particleConfig.mouseForce;
          
          // Repel particles from mouse
          particle.x -= Math.cos(angle) * force;
          particle.y -= Math.sin(angle) * force;
          
          // Increase size and speed when near mouse
          particle.size = particle.originalSize * (1 + (1 - distance / particleConfig.mouseRadius) * 2);
          
          // Add some randomness to the movement for a more dynamic effect
          particle.speedX += (Math.random() - 0.5) * 0.2;
          particle.speedY += (Math.random() - 0.5) * 0.2;
        }

        // Apply some drag to prevent particles from getting too fast
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Wrap around screen
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle with color variation
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Use particle's color with dynamic opacity
        ctx.fillStyle = `${particle.color}${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Enhanced mouse move handler
    const handleMouseMove = throttle((e: MouseEvent) => {
      if (!animationsEnabled) return;
      
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // Set mouse as active when it moves
      setMouseActive(true);
      
      // Auto-deactivate mouse after a delay for a nice trailing effect
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      mouseTimeoutRef.current = setTimeout(() => {
        setMouseActive(false);
      }, 2000);
    }, 10); // More responsive mouse tracking

    // Enhanced resize handler
    const handleResize = throttle(() => {
      if (isVisibleRef.current) {
        updateCanvasSize();
        createParticles();
        
        // Force redraw after resize
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        animate();
      }
    }, 200);
    
    // Handle mouse enter/leave for the canvas
    const handleMouseEnter = () => {
      if (animationsEnabled) {
        setMouseActive(true);
      }
    };
    
    const handleMouseLeave = () => {
      setMouseActive(false);
    };

    // Intersection Observer for visibility-based rendering
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            animate();
          } else if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
          }
        });
      },
      { threshold: 0 }
    );

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    observer.observe(canvas);
    
    updateCanvasSize();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, [animationsEnabled]);

  // Add an effect to ensure canvas is properly sized after initial render
  useEffect(() => {
    // Wait for the DOM to be fully rendered
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;
        
        // Get the hero section element
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        
        // Set canvas size to match the hero section
        const rect = heroSection.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        
        console.log(`Initial canvas setup: ${canvas.width}x${canvas.height}`);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{
        opacity: 0.6,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }}
    />
  );
};

// Export memoized component
export const HeroParticles = memo(HeroParticlesComponent);