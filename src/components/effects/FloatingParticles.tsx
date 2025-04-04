'use client';

import { useRef } from 'react';

// We're keeping the interfaces for type compatibility with any imported code
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
  // Completely disabled component - no animation, no effects
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Fix the hydration mismatch by using camelCase for style properties and number values
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen", opacity: 0.4 }}
    />
  );
}