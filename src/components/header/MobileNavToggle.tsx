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
      className="fixed top-4 left-4 z-[9999] lg:hidden p-3 min-h-[48px] min-w-[48px] rounded-md bg-black/60 backdrop-blur-sm border border-border text-foreground hover:text-primary hover:border-primary hover:bg-black/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background flex items-center justify-center shadow-lg"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="header"
      aria-haspopup="true"
    >
      {isOpen ? <X size={22} /> : <Terminal size={22} />}
      <span className="sr-only">{isOpen ? "Close navigation menu" : "Open navigation menu"}</span>
    </button>
  );
}