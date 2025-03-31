'use client';

import React from 'react';
import Typed from 'typed.js';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['a GameDev.', 'a Developer.', 'a Freelancer.', 'a Photographer.'],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1800,
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
      className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 relative overflow-hidden"
    >
      <div className="z-10 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-raleway tracking-tight text-foreground">
          Rishav Nath Pati
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-muted-foreground font-poppins">
          I'm <span ref={el} className="text-primary font-semibold"></span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="#portfolio">View Portfolio</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
            <Link href="#contact-cta">Contact Me</Link>
          </Button>
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