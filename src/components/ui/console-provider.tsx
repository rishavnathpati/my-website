'use client';

import { createContext, useContext, useCallback, useState, useEffect, ReactNode } from 'react';
import { findCommand } from '@/lib/commands/main';
// Import registry to ensure all commands are registered
import '@/lib/commands/main';

// Export LogMessage type so it can be imported elsewhere
export interface LogMessage {
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  id: number;
}

// Extended ConsoleContextType with command functionality
interface ConsoleContextType {
  logs: LogMessage[];
  log: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  success: (message: string) => void;
  // New command execution methods
  executeCommand: (command: string) => void;
  clearLogs: () => void;
  // Command history navigation
  commandHistory: string[];
  getPreviousCommand: () => string | null;
  getNextCommand: () => string | null;
  // Terminal mode state
  isTerminalFullScreen: boolean;
  toggleTerminalFullScreen: (show?: boolean) => void;
}

const ConsoleContext = createContext<ConsoleContextType | null>(null);

interface ConsoleProviderProps {
  children: ReactNode;
}

// Counter for unique log IDs, outside component state
let logIdCounter = 0;

export function ConsoleProvider({ children }: ConsoleProviderProps) {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTerminalFullScreen, setIsTerminalFullScreen] = useState(false);

  const addLog = useCallback((message: string, type: LogMessage['type']) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => {
      // Use and increment the counter directly for the ID
      const newLog = { message, type, timestamp, id: logIdCounter++ };
      const updatedLogs = [...prev, newLog];
      // Limit log length
      if (updatedLogs.length > 50) return updatedLogs.slice(-50);
      return updatedLogs;
    });
  }, []);

  const log = useCallback((message: string) => addLog(message, 'info'), [addLog]);
  const warn = useCallback((message: string) => addLog(message, 'warning'), [addLog]);
  const error = useCallback((message: string) => addLog(message, 'error'), [addLog]);
  const success = useCallback((message: string) => addLog(message, 'success'), [addLog]);
  
  // Clear logs method
  const clearLogs = useCallback(() => {
    setLogs([]);
    logIdCounter = 0; // Reset the counter
  }, []);

  // Toggle terminal full-screen mode
  const toggleTerminalFullScreen = useCallback((show?: boolean) => {
    setIsTerminalFullScreen(prev => {
      const newState = show !== undefined ? show : !prev;
      return newState;
    });
  }, []);

  // Command execution
  const executeCommand = useCallback((commandStr: string) => {
    // Add command to history
    setCommandHistory(prev => {
      const newHistory = [...prev, commandStr];
      return newHistory;
    });
    setHistoryIndex(-1);
    
    // Log the command
    log(`$ ${commandStr}`);
    
    // Parse command and arguments
    const [command, ...args] = commandStr.trim().split(/\s+/);
    
    // Find and execute command
    const cmd = findCommand(command);
    if (cmd) {
      try {
        cmd.execute(args, { 
          log, 
          warn, 
          error, 
          success, 
          clear: clearLogs,
          commandHistory: [...commandHistory, commandStr], // Pass updated history including current command
          toggleTerminal: toggleTerminalFullScreen // Pass the terminal toggle function
        });
      } catch (err) {
        // @ts-ignore - err might not have message
        error(`Error executing command: ${err?.message || 'Unknown error'}`);
      }
    } else {
      error(`Command not found: ${command}`);
    }
  }, [log, warn, error, success, clearLogs, commandHistory, toggleTerminalFullScreen]);
  
  // Command history navigation
  const getPreviousCommand = useCallback(() => {
    if (historyIndex < commandHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      return commandHistory[commandHistory.length - 1 - newIndex];
    }
    return null;
  }, [commandHistory, historyIndex]);
  
  const getNextCommand = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      return commandHistory[commandHistory.length - 1 - newIndex];
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      return '';
    }
    return null;
  }, [commandHistory, historyIndex]);

  // Add keyboard shortcuts for terminal
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      // Check for Ctrl+` or Cmd+` to toggle terminal
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        toggleTerminalFullScreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleTerminalFullScreen]);

  // Add initial logs after mount using useEffect
  useEffect(() => {
    log('System initialized');
    success('Assets loaded successfully');
    log('Type "help" to see available commands');
    log('Try "terminal" or "t" to open full-screen mode');
    log('Keyboard shortcut: Ctrl+` or Cmd+`');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <ConsoleContext.Provider value={{ 
      logs, 
      log, 
      warn, 
      error, 
      success, 
      executeCommand,
      clearLogs,
      commandHistory,
      getPreviousCommand,
      getNextCommand,
      isTerminalFullScreen,
      toggleTerminalFullScreen
    }}>
      {children}
    </ConsoleContext.Provider>
  );
}

export function useConsole() {
  const context = useContext(ConsoleContext);
  if (!context) {
    throw new Error('useConsole must be used within a ConsoleProvider');
  }
  return context;
}
