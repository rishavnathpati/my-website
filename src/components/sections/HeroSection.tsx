'use client';

import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, Terminal, Gamepad2 } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function HeroSection() {
  const el = React.useRef(null);
  const heroContentRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const [isHoveringGamepad, setIsHoveringGamepad] = useState(false);

  // Particle system setup and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particlesRef.current = Array.from({ length: 50 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      }));
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * 0.5;
          particle.y -= Math.sin(angle) * 0.5;
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(var(--primary), ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Typed.js effect
  React.useEffect(() => {
    if (!el.current) return;
    
    const typed = new Typed(el.current, {
      strings: [
        'GameDev',
        'Game & Interactive Media Developer',
        'Interactive Media Developer @ Convai',
        'Unity | 2D,3D,AR/VR',
      ],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 3000,
      startDelay: 1000,
      loop: true,
      smartBackspace: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.6 }}
      />
      
      <div 
        ref={heroContentRef} 
        className="z-10 max-w-4xl w-full transition-transform duration-100 ease-out backdrop-blur-sm" 
        style={{ willChange: 'transform' }}
      >
        <div className="bg-black/40 rounded-lg border border-border p-6 mb-8 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"
            style={{
              maskImage: 'radial-gradient(circle at center, black, transparent)',
              WebkitMaskImage: 'radial-gradient(circle at center, black, transparent)'
            }}
          />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <Terminal size={20} />
              <span className="text-sm font-mono">portfolio.sh</span>
            </div>
            
            <div className="font-mono">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-muted-foreground">$ whoami</p>
                <Gamepad2 
                  size={20} 
                  className={`text-primary transition-all duration-300 cursor-pointer ${isHoveringGamepad ? 'rotate-12 scale-110' : ''}`}
                  onMouseEnter={() => setIsHoveringGamepad(true)}
                  onMouseLeave={() => setIsHoveringGamepad(false)}
                />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary bg-clip-text">
                Rishav Nath Pati
              </h1>
              <p className="text-muted-foreground mb-2">$ current_role</p>
              <p className="text-lg sm:text-xl md:text-2xl mb-6">
                I'm a <span ref={el} className="text-foreground"></span>
                <span className="animate-blink">|</span>
              </p>
              <p className="text-muted-foreground mb-2">$ next_action</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="font-mono relative overflow-hidden group"
                >
                  <Link href="#portfolio">
                    <span className="relative z-10">view_portfolio.exe</span>
                    <div className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="font-mono relative overflow-hidden group"
                >
                  <Link href="#contact-cta">
                    <span className="relative z-10">contact_me.sh</span>
                    <div className="absolute inset-0 bg-primary/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <Link href="#about" aria-label="Scroll down to about section">
          <ArrowDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors animate-bounce-slow" />
        </Link>
      </div>
    </section>
  );
}