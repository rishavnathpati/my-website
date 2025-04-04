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
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const addLog = useCallback((message: string, type: LogMessage['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, type, timestamp }]);
  }, []);

  useEffect(() => {
    if (onInit) {
      onInit(addLog);
    }

    // Example initial logs
    addLog('System initialized', 'info');
    addLog('Assets loaded successfully', 'success');
    
    // Subscribe to navigation events
    const handleRouteChange = (url: string) => {
      addLog(`Navigating to: ${url}`, 'info');
    };

    const popstateHandler = () => handleRouteChange(window.location.pathname);
    window.addEventListener('popstate', popstateHandler);

    return () => {
      window.removeEventListener('popstate', popstateHandler);
    };
  }, []);

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
      >
        <Terminal size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-64 bg-black/30 backdrop-blur-sm border border-border rounded-lg overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between p-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-primary" />
          <span className="text-muted-foreground">debug.console</span>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          _
        </button>
      </div>
      
      <div className="p-2 max-h-52 overflow-y-auto space-y-1">
        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-muted-foreground">{log.timestamp}</span>
            <span className={getMessageColor(log.type)}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}