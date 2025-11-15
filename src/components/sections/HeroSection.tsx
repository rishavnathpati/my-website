'use client';

import { memo, useRef, useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, Terminal, Gamepad2, Sparkles } from 'lucide-react';
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

const heroFocusLines = [
  "I'm building AI NPCs that can actually talk",
  "I'm wiring speech systems into Unity",
  "I'm making VR characters feel real",
  "I'm shipping tools other devs can reuse"
];

const featuredDirectoryPreview = [
  '├── featured/    ⭐ START HERE',
  '├── portfolio/',
  '├── about/',
  '├── experience/',
  '├── skills/',
  '└── contact/'
];

const featuredFiles = ['START_HERE.txt', 'current-work.md', 'best-projects.json'];

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

  // Custom typing animation effect - optimized
  useEffect(() => {
    const currentString = typedStrings[currentStringIndex];
    
    // Use requestAnimationFrame for better performance
    let animationId: number;
    let lastUpdate = Date.now();
    const targetInterval = isDeleting ? 50 : 70;
    
    const updateText = () => {
      const now = Date.now();
      if (now - lastUpdate >= targetInterval) {
        lastUpdate = now;
        
        if (!isDeleting) {
          // Still typing the current string
          if (displayText.length < currentString.length) {
            setDisplayText(currentString.substring(0, displayText.length + 1));
          } else {
            // Finished typing, wait before deleting
            setTimeout(() => setIsDeleting(true), 3000);
            return;
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.substring(0, displayText.length - 1));
          } else {
            // Move to next string
            setIsDeleting(false);
            setCurrentStringIndex((currentStringIndex + 1) % typedStrings.length);
            return;
          }
        }
      }
      
      animationId = requestAnimationFrame(updateText);
    };
    
    animationId = requestAnimationFrame(updateText);
    
    return () => cancelAnimationFrame(animationId);
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
      className="min-h-[100dvh] lg:min-h-screen w-full flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden"
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary bg-clip-text hover:text-primary/90 transition-colors">
                Rishav Nath Pati
              </h1>
              <p className="text-foreground/80 mb-2 group-hover:text-primary transition-colors">$ current_role</p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 font-mono">
                I&apos;m <span className="text-foreground">{displayText}</span>
                <span className="text-foreground animate-blink">|</span>
              </p>
              <p className="text-foreground/80 mb-2 group-hover:text-primary transition-colors">$ next_action</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <ActionButton href="#portfolio-highlights">view_portfolio.sh</ActionButton>
                </div>
                <div>
                  <ActionButton href="#contact-cta" variant="outline">contact_me.sh</ActionButton>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {heroFocusLines.map((line) => (
                  <div
                    key={line}
                    className="flex items-center gap-2 bg-black/30 border border-border/60 rounded-lg px-3 py-2 font-mono text-sm text-foreground/90"
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="bg-black/30 border border-border/70 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Terminal size={16} className="text-primary" />
                    <span className="font-mono">$ tree -L 1</span>
                  </div>
                  <div className="font-mono text-sm text-foreground space-y-1">
                    {featuredDirectoryPreview.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
                <div className="bg-black/30 border border-border/70 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Terminal size={16} className="text-primary" />
                    <span className="font-mono">$ ls featured/</span>
                  </div>
                  <ul className="space-y-2 font-mono text-sm text-foreground">
                    {featuredFiles.map((file, index) => (
                      <li
                        key={file}
                        className="flex items-center justify-between rounded-md border border-border/50 px-3 py-2"
                      >
                        <span className="text-primary/80">{index === 0 ? '⭐' : '•'}</span>
                        <span className="flex-1 pl-2">{file}</span>
                        <span className="text-muted-foreground text-xs">cat featured/{file}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 z-10">
        <EnhancedArrowButton />
      </div>
    </section>
  );
}

// Enhanced Arrow Button Component with proper highlight management
const EnhancedArrowButton = memo(function EnhancedArrowButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  // Handle click with proper highlight management
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    // Set clicked state for 200ms
    setIsClicked(true);
    clickTimeoutRef.current = setTimeout(() => {
      setIsClicked(false);
    }, 200);
    
    // Smooth scroll to target
    const target = document.querySelector('#about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Handle blur to immediately clear highlights
  const handleBlur = useCallback(() => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    setIsClicked(false);
  }, []);

  // Handle focus loss
  const handleFocusOut = useCallback((e: React.FocusEvent) => {
    // Only clear if focus is moving outside the button
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      handleBlur();
    }
  }, [handleBlur]);

  // Viewport visibility observer
  useEffect(() => {
    if (!buttonRef.current) return;

    intersectionObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        // Clear highlights when button goes out of viewport
        if (!entry.isIntersecting) {
          handleBlur();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    intersectionObserverRef.current.observe(buttonRef.current);

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [handleBlur]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, []);

  return (
    <Link
      ref={buttonRef}
      href="#about"
      aria-label="Scroll down to about section"
      className={`
        group relative inline-block focus:outline-none
        rounded-full hover:bg-primary/10 transition-all duration-200
        hover:scale-105 active:scale-95
        ${!isVisible ? 'pointer-events-none' : ''}
      `}
      onClick={handleClick}
      onBlur={handleBlur}
      onBlurCapture={handleFocusOut}
      tabIndex={0}
    >
      {/* Container that moves with the arrow - increased size by ~40% */}
      <div className="relative animate-arrow-enhanced will-change-transform p-3">
        {/* Arrow icon - increased from w-6 h-6 to w-9 h-9 (~50% larger) */}
        <ArrowDown className="relative z-10 w-9 h-9 text-foreground/80 group-hover:text-primary transition-colors" />
        
        {/* Optimized ripple effect with proper cleanup */}
        {isVisible && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`
                ripple-center w-18 h-18 rounded-full border-2 border-primary/30
                animate-ripple-optimized
                ${isClicked ? 'animate-click-ripple' : ''}
              `}
              style={{
                animationDuration: isClicked ? '200ms' : '2.5s',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 200ms ease-out'
              }}
            />
            <div
              className={`
                ripple-center w-18 h-18 rounded-full border-2 border-primary/20
                animate-ripple-optimized-delayed
                ${isClicked ? 'animate-click-ripple-delayed' : ''}
              `}
              style={{
                animationDuration: isClicked ? '200ms' : '2.5s',
                animationDelay: isClicked ? '50ms' : '0.3s',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 200ms ease-out'
              }}
            />
          </div>
        )}
      </div>
    </Link>
  );
});

// Keep the ActionButton memoized as it's a simple UI component
// Keep the useCallback hooks as they're used for event handlers
// But the parent component doesn't need memoization as it's only rendered once
export const HeroSection = HeroSectionComponent;
