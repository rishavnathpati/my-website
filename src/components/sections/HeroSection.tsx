'use client';

import { memo, useRef, useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, Terminal, Gamepad2 } from 'lucide-react';
import { typedStrings } from '@/lib/data/hero';

// Memoized button component
const ActionButton = memo(function ActionButton({ 
  href, 
  variant = 'default',
  children 
}: { 
  href: string;
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}) {
  return (
    <Button 
      asChild 
      variant={variant}
      size="lg" 
      className="font-mono relative overflow-hidden group"
    >
      <Link href={href}>
        <span className="relative z-10">{children}</span>
        <div className={`absolute inset-0 ${
          variant === 'default' ? 'bg-primary/10' : 'bg-primary/5'
        } transform translate-y-full group-hover:translate-y-0 transition-transform duration-200`} />
      </Link>
    </Button>
  );
});

function HeroSectionComponent() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [isHoveringGamepad, setIsHoveringGamepad] = useState(false);
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Memoized hover handlers
  const handleGamepadEnter = useCallback(() => setIsHoveringGamepad(true), []);
  const handleGamepadLeave = useCallback(() => setIsHoveringGamepad(false), []);

  // Custom typing animation effect
  useEffect(() => {
    const currentString = typedStrings[currentStringIndex];
    
    // Set timeout for typing effect
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Still typing the current string
        if (displayText.length < currentString.length) {
          setDisplayText(currentString.substring(0, displayText.length + 1));
        } else {
          // Finished typing, wait before deleting
          setTimeout(() => setIsDeleting(true), 3000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          // Move to next string
          setIsDeleting(false);
          setCurrentStringIndex((currentStringIndex + 1) % typedStrings.length);
        }
      }
    }, isDeleting ? 50 : 70); // Faster when deleting
    
    return () => clearTimeout(timeout);
  }, [displayText, currentStringIndex, isDeleting]);
  
  // Manual tilt effect implementation
  const handleTiltMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    
    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    
    tiltRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.02)`;
  }, []);
  
  const handleTiltMouseLeave = useCallback(() => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative overflow-hidden"
    >
      <div 
        ref={heroContentRef}
        className="z-10 max-w-4xl w-full backdrop-blur-sm" 
      >
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 group">
          <Terminal className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-bold font-mono text-foreground group-hover:text-primary transition-colors">
            home
          </h2>
        </div>
        
        <div 
          ref={tiltRef}
          className="bg-black/60 rounded-lg border border-border p-6 mb-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
          onMouseMove={handleTiltMouseMove}
          onMouseLeave={handleTiltMouseLeave}
        >
          {/* Animated gradient background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none transition-opacity group-hover:opacity-75"
            style={{
              maskImage: 'radial-gradient(circle at center, black, transparent)',
              WebkitMaskImage: 'radial-gradient(circle at center, black, transparent)'
            }}
          />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-4 text-foreground/80 group">
              <Terminal size={20} className="group-hover:text-primary transition-colors" />
              <span className="text-sm font-mono group-hover:text-primary transition-colors">portfolio.sh</span>
            </div>
            
            <div className="font-mono">
              <div className="flex items-center gap-2 mb-2 group">
                <p className="text-foreground/80 group-hover:text-primary transition-colors">$ whoami</p>
                <Gamepad2
                  size={20}
                  className={`text-primary transition-all duration-300 cursor-pointer ${
                    isHoveringGamepad ? 'rotate-12 scale-110' : ''
                  }`}
                  onMouseEnter={handleGamepadEnter}
                  onMouseLeave={handleGamepadLeave}
                />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary bg-clip-text hover:text-primary/90 transition-colors">
                Rishav Nath Pati
              </h1>
              <p className="text-foreground/80 mb-2 group-hover:text-primary transition-colors">$ current_role</p>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 font-mono">
                I&apos;m <span className="text-foreground">{displayText}</span>
                <span className="text-foreground animate-blink">|</span>
              </p>
              <p className="text-foreground/80 mb-2 group-hover:text-primary transition-colors">$ next_action</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <ActionButton href="#portfolio">view_portfolio.sh</ActionButton>
                </div>
                <div>
                  <ActionButton href="#contact-cta" variant="outline">contact_me.sh</ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <Link
          href="#about"
          aria-label="Scroll down to about section"
          className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-full p-1"
        >
          <ArrowDown className="w-6 h-6 text-foreground/80 group-hover:text-primary transition-colors animate-bounce-slow" />
        </Link>
      </div>
    </section>
  );
}

// Keep the ActionButton memoized as it's a simple UI component
// Keep the useCallback hooks as they're used for event handlers
// But the parent component doesn't need memoization as it's only rendered once
export const HeroSection = HeroSectionComponent;
