'use client';

import { useEffect, useState, useCallback } from 'react';
import { Terminal } from 'lucide-react';

interface LogMessage {
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
}

interface ConsoleProps {
  onInit?: (callback: (message: string, type: LogMessage['type']) => void) => void;
}

export function Console({ onInit }: ConsoleProps) {
  // Initialize with empty logs array (no initial state calculation)
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [isMinimized, setIsMinimized] = useState(true); // Start minimized for better performance
  
  // Optimize log addition with a more efficient state update
  const addLog = useCallback((message: string, type: LogMessage['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    // Use function form to avoid stale closures and optimize state updates
    setLogs(prev => {
      // Limit log length to prevent memory issues
      const newLogs = [...prev, { message, type, timestamp }];
      if (newLogs.length > 50) return newLogs.slice(-50);
      return newLogs;
    });
  }, []);

  // Run once on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (onInit) {
      onInit(addLog);
    }

    // Minimal initial logs
    addLog('System initialized', 'info');
    addLog('Assets loaded successfully', 'success');
    
    // More efficient event handling with passive option
    const popstateHandler = () => {
      const path = window.location.pathname;
      addLog(`Loading section: ${path === '/' ? 'hero' : path.slice(1)}`, 'info');
    };
    
    // Use passive event listener for better performance
    window.addEventListener('popstate', popstateHandler, { passive: true });

    return () => {
      window.removeEventListener('popstate', popstateHandler);
    };
  }, [addLog]); // Include addLog in dependencies

  const getMessageColor = (type: LogMessage['type']) => {
    switch (type) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-50 p-2 bg-black/30 backdrop-blur-sm border border-border rounded-md text-primary hover:text-primary/80 transition-colors"
        aria-label="Open console"
      >
        <Terminal size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 max-h-60 bg-black/20 backdrop-blur-sm border border-border rounded-lg overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between p-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-primary" />
          <span className="text-muted-foreground">debug.console</span>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Minimize console"
        >
          _
        </button>
      </div>
      
      <div className="p-2 max-h-40 overflow-y-auto space-y-1">
        {/* Use memo to prevent unnecessary re-renders */}
        {logs.slice(-15).map((log, index) => (
          <div key={`log-${index}-${log.timestamp}`} className="flex items-start gap-2">
            <span className="text-muted-foreground text-xs">{log.timestamp}</span>
            <span className={getMessageColor(log.type)}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}