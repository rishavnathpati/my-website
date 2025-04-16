'use client';

import { memo, useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Terminal, Maximize2 } from 'lucide-react';
// Import context hook and LogMessage type
import { useConsole } from './console-provider';
import type { LogMessage } from './console-provider'; // Use type import

// Add fullScreen prop to Console component
interface ConsoleProps {
  fullScreen?: boolean;
}

// New component for command input
const ConsoleInput = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { executeCommand, getPreviousCommand, getNextCommand } = useConsole();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      // Get previous command from history
      const prevCommand = getPreviousCommand();
      if (prevCommand !== null) {
        setInput(prevCommand);
        // Move cursor to end of input
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.value.length;
            inputRef.current.selectionEnd = inputRef.current.value.length;
          }
        }, 0);
      }
    } else if (e.key === 'ArrowDown') {
      // Get next command from history
      const nextCommand = getNextCommand();
      if (nextCommand !== null) {
        setInput(nextCommand);
      }
    }
  };
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <form onSubmit={handleSubmit} className="flex border-t border-border">
      <span className="text-primary px-2 py-1">$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none text-foreground px-1 py-1"
        placeholder="Type a command..."
        autoComplete="off"
        spellCheck="false"
      />
      <button type="submit" className="sr-only">Execute</button>
    </form>
  );
};

// Keep the memoization here as the console component could re-render frequently
// when logs are added, and we want to prevent unnecessary re-renders
export const Console = memo(function Console({ fullScreen = false }: ConsoleProps) {
  // Get logs directly from context
  const { logs, toggleTerminalFullScreen } = useConsole();
  const logContainerRef = useRef<HTMLDivElement>(null);

  const getMessageColor = (type: LogMessage['type']) => {
    switch (type) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  // Auto-scroll to bottom when logs update
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Adjust height based on fullScreen prop
  const containerClasses = fullScreen
    ? "w-full h-full bg-black border border-border rounded-lg overflow-hidden font-mono text-sm flex flex-col"
    : "w-full max-h-60 bg-black/20 backdrop-blur-sm border border-border rounded-lg overflow-hidden font-mono text-sm flex flex-col";

  const logContainerClasses = fullScreen
    ? "p-2 flex-1 overflow-y-auto space-y-1"
    : "p-2 max-h-52 overflow-y-auto space-y-1 flex-1";

  return (
    <div className={containerClasses}>
      {/* Optional header for the inline console with expand button */}
      {!fullScreen && (
        <div className="flex items-center justify-between px-2 py-1 border-b border-border bg-zinc-900/50">
          <div className="flex items-center gap-1">
            <Terminal size={14} className="text-primary" />
            <span className="text-xs font-medium">Console</span>
          </div>
          <button
            onClick={() => toggleTerminalFullScreen(true)}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
            aria-label="Open full-screen terminal"
            title="Open full-screen terminal (or type 'terminal')"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      )}
      
      {/* Log display area */}
      <div 
        ref={logContainerRef}
        className={logContainerClasses}
      >
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2">
            <span className="text-muted-foreground text-xs shrink-0 w-[70px]">{log.timestamp}</span>
            <span className={`${getMessageColor(log.type)} break-words`}>{log.message}</span>
          </div>
        ))}
      </div>
      
      {/* Add the input field component */}
      <ConsoleInput />
    </div>
  );
});
