'use client';

import { memo, useState, useRef, useEffect, useCallback, KeyboardEvent, forwardRef } from 'react';
import { Terminal, Maximize2 } from 'lucide-react';
// Import context hook and LogMessage type
import { useConsole } from './console-provider';
import type { LogMessage } from './console-provider'; // Use type import
import { TERMINAL_USERNAME, TERMINAL_HOSTNAME, TERMINAL_PATH } from '@/lib/constants';

// Add fullScreen prop to Console component
interface ConsoleProps {
  fullScreen?: boolean;
}

// New component for command input with forwardRef
const ConsoleInput = forwardRef<
  HTMLInputElement,
  { fullScreen?: boolean }
>(({}, ref) => {
  const [input, setInput] = useState('');
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
          if (ref && 'current' in ref && ref.current) {
            ref.current.selectionStart = ref.current.value.length;
            ref.current.selectionEnd = ref.current.value.length;
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
  
  return (
    <form onSubmit={handleSubmit} className="flex border-t border-border">
      <div className="flex items-center px-2 py-1 text-xs">
        <span className="text-green-400 font-bold mr-1">➜</span>
        <span className="text-blue-400 font-semibold mr-2">{TERMINAL_PATH}</span>
        <span className="text-primary mr-1">$</span>
      </div>
      <input
        ref={ref}
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
});

ConsoleInput.displayName = 'ConsoleInput';

// Keep the memoization here as the console component could re-render frequently
// when logs are added, and we want to prevent unnecessary re-renders
export const Console = memo(function Console({ fullScreen = false }: ConsoleProps) {
  // Get logs directly from context
  const { logs, toggleTerminalFullScreen } = useConsole();
  const logContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to focus the input field
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getMessageColor = useCallback((type: LogMessage['type']) => {
    switch (type) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      case 'command': return 'text-green-400 font-bold';
      default: return 'text-blue-500';
    }
  }, []);

  // Auto-scroll to bottom when logs update - throttled for performance
  useEffect(() => {
    const scrollToBottom = () => {
      if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
      }
    };
    
    // Use requestAnimationFrame to throttle scroll updates
    const timeoutId = requestAnimationFrame(scrollToBottom);
    
    return () => cancelAnimationFrame(timeoutId);
  }, [logs.length]); // Only depend on logs length, not entire logs array
  
  // Focus input when fullScreen changes or on mount
  useEffect(() => {
    setTimeout(focusInput, 50);
  }, [fullScreen]);

  // Adjust height based on fullScreen prop
  const containerClasses = fullScreen
    ? "w-full h-full bg-black border border-border rounded-lg overflow-hidden font-mono text-sm flex flex-col"
    : "w-full max-h-60 bg-black/20 backdrop-blur-sm border border-border rounded-lg overflow-hidden font-mono text-sm flex flex-col";

  const logContainerClasses = fullScreen
    ? "p-2 flex-1 overflow-y-auto space-y-1"
    : "p-2 max-h-52 overflow-y-auto space-y-1 flex-1";

  const renderLogMessage = useCallback((log: LogMessage) => {
    if (log.type === 'command') {
      return (
        <div key={log.id} className="flex items-start mt-2 mb-1">
          <div className="flex items-center">
            <span className="text-pink-500 font-semibold mr-1">{TERMINAL_USERNAME}</span>
            <span className="text-gray-500 mr-1">@</span>
            <span className="text-blue-500 font-semibold mr-1">{TERMINAL_HOSTNAME}</span>
            <span className="text-gray-500 mr-1">:</span>
            <span className="text-blue-400 font-semibold mr-2">{TERMINAL_PATH}</span>
            <span className="text-primary mr-2">$</span>
            <span className={`${getMessageColor(log.type)}`}>{log.message}</span>
          </div>
        </div>
      );
    }
    
    return (
      <div key={log.id} className="flex items-start">
        <span className={`${getMessageColor(log.type)} pl-12 break-words`}>{log.message}</span>
      </div>
    );
  }, [getMessageColor]);

  return (
    <div 
      className={`console-container ${containerClasses}`}
      onClick={focusInput}
    >
      {/* Optional header for the inline console with expand button */}
      {!fullScreen && (
        <div className="flex items-center justify-between px-2 py-1 border-b border-border bg-zinc-900/50">
          <div className="flex items-center gap-1">
            <Terminal size={14} className="text-primary" />
            <span className="text-xs font-medium">Console</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              toggleTerminalFullScreen(true);
            }}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-sm touch-manipulation"
            aria-label="Open full-screen terminal"
            title="Open full-screen terminal"
          >
            <Maximize2 size={16} className="sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      )}
      
      {/* Log display area */}
      <div 
        ref={logContainerRef}
        className={logContainerClasses}
        role="log"
        aria-live="polite"
      >
        {logs.map(renderLogMessage)}
      </div>
      
      {/* Add the input field component - properly forward ref */}
      <ConsoleInput ref={inputRef} fullScreen={fullScreen} />
    </div>
  );
});
