'use client';

import { createContext, useContext, useCallback, useState, useEffect, ReactNode } from 'react'; // Added useEffect
// Console component is no longer imported here

// Export LogMessage type so it can be imported elsewhere
export interface LogMessage {
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  id: number;
}

interface ConsoleContextType {
  logs: LogMessage[];
  log: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  success: (message: string) => void;
}

const ConsoleContext = createContext<ConsoleContextType | null>(null);

interface ConsoleProviderProps {
  children: ReactNode;
}

 // Removed logCallback logic

 // Counter for unique log IDs, outside component state
 let logIdCounter = 0;

 export function ConsoleProvider({ children }: ConsoleProviderProps) {
   const [logs, setLogs] = useState<LogMessage[]>([]);
   // Removed nextId state

   const addLog = useCallback((message: string, type: LogMessage['type']) => {
     const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
     // Removed currentId and setNextId logic
     setLogs(prev => {
       // Use and increment the counter directly for the ID
       const newLog = { message, type, timestamp, id: logIdCounter++ };
       const updatedLogs = [...prev, newLog];
       // Limit log length
       if (updatedLogs.length > 50) return updatedLogs.slice(-50);
       return updatedLogs;
     });
   }, []); // No dependency needed for the counter

   const log = useCallback((message: string) => addLog(message, 'info'), [addLog]);
  const warn = useCallback((message: string) => addLog(message, 'warning'), [addLog]);
  const error = useCallback((message: string) => addLog(message, 'error'), [addLog]);
  const success = useCallback((message: string) => addLog(message, 'success'), [addLog]);

  // Add initial logs after mount using useEffect
  useEffect(() => {
    log('System initialized');
    success('Assets loaded successfully');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    // Provide logs state in context value
    <ConsoleContext.Provider value={{ logs, log, warn, error, success }}>
      {children}
      {/* Console component is rendered directly where needed (e.g., Header.tsx) */}
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
