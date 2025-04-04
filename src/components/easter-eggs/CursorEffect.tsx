'use client';

import { useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
  opacity: number;
}

export function CursorEffect() {
  const [enabled, setEnabled] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const maxPoints = 15;

  useEffect(() => {
    let lastTime = 0;
    let lastX = 0;
    let lastY = 0;
    const minDistance = 5;

    const handleMouseMove = (e: MouseEvent) => {
      if (!enabled) return;

      const currentTime = Date.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (currentTime - lastTime > 50 || distance > minDistance) {
        setPoints((prevPoints) => {
          const newPoint = {
            x: e.clientX,
            y: e.clientY,
            opacity: 1,
          };

          const updatedPoints = [...prevPoints, newPoint]
            .slice(-maxPoints)
            .map((point) => ({
              ...point,
              opacity: Math.max(0, point.opacity - 0.08),
            }))
            .filter((point) => point.opacity > 0);

          return updatedPoints;
        });

        lastTime = currentTime;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c') {
        const now = Date.now();
        if (now - lastTime < 500) {
          setEnabled((prev) => !prev);
          setPoints([]);
        }
        lastTime = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [enabled]);

  return (
    <>
      {points.map((point, index) => (
        <div
          key={index}
          className="pointer-events-none fixed z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-opacity duration-300"
          style={{
            left: point.x,
            top: point.y,
            opacity: point.opacity,
          }}
        />
      ))}
    </>
  );
} 