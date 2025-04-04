'use client';

import { useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

export default function ParallaxBackground() {
  // Completely disabled component - no animation, no effects
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Empty canvas with no animations or effects
  // Use the correct React style format: camelCase for properties and numeric values for numbers
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[0]"
      style={{ mixBlendMode: "soft-light", opacity: 0.5 }}
    />
  );
}