'use client';

import { useState } from 'react';
import { Command, Info, X } from 'lucide-react';
import { navItems } from '@/components/header/headerConstants';

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-2 rounded-full bg-black/50 border border-border text-foreground hover:text-primary hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Keyboard shortcuts help"
      >
        <Info size={20} />
        <span className="sr-only">Keyboard shortcuts help</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="keyboard-shortcuts-title"
        >
          <div className="bg-black/80 border border-border rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-full p-1"
              aria-label="Close keyboard shortcuts help"
            >
              <X size={20} />
            </button>

            <div className="mb-4 flex items-center gap-2">
              <Command size={20} className="text-primary" />
              <h2 id="keyboard-shortcuts-title" className="text-xl font-bold">Keyboard Shortcuts</h2>
            </div>

            <p className="text-foreground/80 mb-4">
              This site supports keyboard navigation using the following shortcuts:
            </p>

            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.shortcut} className="flex items-center justify-between p-2 rounded-md bg-black/40 border border-border">
                  <div className="flex items-center gap-2">
                    <item.icon size={16} className="text-primary" />
                    <span>{item.label}</span>
                  </div>
                  <kbd className="px-2 py-1 bg-black/60 border border-primary/30 rounded text-primary text-sm">
                    Alt+{item.shortcut}
                  </kbd>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-foreground/70">
              These shortcuts are optional and all content can be accessed using standard navigation.
            </p>
          </div>
        </div>
      )}
    </>
  );
}