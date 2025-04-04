'use client';

import React from 'react';
import Typed from 'typed.js';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, Terminal } from 'lucide-react';

export function HeroSection() {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Game Developer',
        'Interactive Media Developer',
        'Unity 2D/3D/AR/VR Developer',
        'ML/Deep Learning Enthusiast'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      smartBackspace: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative overflow-hidden bg-gradient-to-b from-background to-background/50"
    >
      <div className="z-10 max-w-4xl w-full">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-border p-6 mb-8">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Terminal size={20} />
            <span className="text-sm font-mono">portfolio.sh</span>
          </div>
          <div className="font-mono">
            <p className="text-muted-foreground mb-2">$ whoami</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">
              Rishav Nath Pati
            </h1>
            <p className="text-muted-foreground mb-2">$ current_role</p>
            <p className="text-lg sm:text-xl md:text-2xl mb-6">
              <span ref={el} className="text-foreground"></span>
              <span className="animate-blink">_</span>
            </p>
            <p className="text-muted-foreground mb-2">$ next_action</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-mono">
                <Link href="#portfolio">view_portfolio.exe</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-mono">
                <Link href="#contact-cta">contact_me.sh</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <Link href="#about" aria-label="Scroll down to about section">
          <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </Link>
      </div>
    </section>
  );
}