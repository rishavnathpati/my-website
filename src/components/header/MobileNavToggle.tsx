'use client';

import { Terminal, X } from 'lucide-react';
import { useConsole } from '@/components/ui/console-provider';
import { useNavigationSound } from '@/hooks/useNavigationSound';

interface MobileNavToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileNavToggle({ isOpen, onToggle }: MobileNavToggleProps) {
  const { log } = useConsole();
  const { playNavigationSound } = useNavigationSound();

  const handleToggle = () => {
    onToggle();
    log(`Terminal ${!isOpen ? 'maximized' : 'minimized'}`);
    playNavigationSound();
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 left-4 z-[9999] lg:hidden p-2 rounded-md bg-black/30 backdrop-blur-sm border border-border text-foreground hover:text-primary hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      aria-label={isOpen ? "Minimize terminal" : "Open terminal"}
      aria-expanded={isOpen}
      aria-controls="header"
    >
      {isOpen ? <X size={20} /> : <Terminal size={20} />}
      <span className="sr-only">{isOpen ? "Close navigation menu" : "Open navigation menu"}</span>
    </button>
  );
}