'use client';

import { createContext, useContext, useCallback, ReactNode } from 'react';
import { Console } from './console';

interface ConsoleContextType {
  log: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  success: (message: string) => void;
}

const ConsoleContext = createContext<ConsoleContextType | null>(null);

interface ConsoleProviderProps {
  children: ReactNode;
}

let logCallback: ((message: string, type: 'info' | 'warning' | 'error' | 'success') => void) | null = null;

export function ConsoleProvider({ children }: ConsoleProviderProps) {
  const setLogCallback = useCallback((callback: typeof logCallback) => {
    logCallback = callback;
  }, []);

  const log = useCallback((message: string) => {
    logCallback?.(message, 'info');
  }, []);

  const warn = useCallback((message: string) => {
    logCallback?.(message, 'warning');
  }, []);

  const error = useCallback((message: string) => {
    logCallback?.(message, 'error');
  }, []);

  const success = useCallback((message: string) => {
    logCallback?.(message, 'success');
  }, []);

  return (
    <ConsoleContext.Provider value={{ log, warn, error, success }}>
      {children}
      <Console onInit={setLogCallback} />
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