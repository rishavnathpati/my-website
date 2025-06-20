'use client';

import { useEffect, useRef } from 'react';
import { X, Minimize, Terminal as TerminalIcon } from 'lucide-react';
import { Console } from './console';
import { useConsole } from './console-provider';
import { TERMINAL_USERNAME, TERMINAL_HOSTNAME } from '@/lib/constants';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const { log } = useConsole();
  const modalRef = useRef<HTMLDivElement>(null);
  const hasLoggedRef = useRef<boolean>(false);

  // Focus trap and escape key handler
  useEffect(() => {
    if (!isOpen) {
      // Reset the logging flag when the modal is closed
      hasLoggedRef.current = false;
      return;
    }

    // Log when terminal is opened in full-screen mode, but only once
    if (!hasLoggedRef.current) {
      log('Terminal opened in full-screen mode. Press ESC to exit.');
      hasLoggedRef.current = true;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, log]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="w-4/5 h-4/5 bg-black/95 border border-zinc-700 rounded-md overflow-hidden flex flex-col shadow-xl"
        style={{
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(10, 10, 10, 0.2)'
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-2 bg-zinc-900/90 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <button 
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                aria-label="Close terminal"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <TerminalIcon size={14} className="text-primary" />
              <h3 className="text-sm font-medium text-foreground">
                {TERMINAL_USERNAME}@{TERMINAL_HOSTNAME}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Keyboard shortcut indicator */}
            <div className="hidden sm:flex items-center text-xs text-muted-foreground">
              <span className="mr-1">Press</span>
              <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs">ESC</kbd>
              <span className="mx-1">to close or</span>
              <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs">Ctrl</kbd>
              <span className="mx-1">+</span>
              <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs">`</kbd>
              <span className="ml-1">to toggle</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Minimize terminal"
              >
                <Minimize size={16} />
              </button>
              <button
                onClick={onClose}
                className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                aria-label="Close terminal"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Terminal Content */}
        <div className="flex-1 p-0 overflow-hidden">
          <Console fullScreen={true} />
        </div>
      </div>
    </div>
  );
} 