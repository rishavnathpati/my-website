'use client';

import { useConsole } from './console-provider';
import { TerminalModal } from './terminal-modal';

export function TerminalModalContainer() {
  const { isTerminalFullScreen, toggleTerminalFullScreen } = useConsole();

  return (
    <TerminalModal 
      isOpen={isTerminalFullScreen} 
      onClose={() => toggleTerminalFullScreen(false)} 
    />
  );
} 