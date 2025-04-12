'use client';

import { memo } from 'react'; // Removed useEffect, useState, useCallback
import { Terminal } from 'lucide-react';
// Import context hook and LogMessage type
import { useConsole } from './console-provider';
import type { LogMessage } from './console-provider'; // Use type import

// Removed ConsoleProps interface, no props needed

// Memoize the component to prevent unnecessary re-renders if props don't change
export const Console = memo(function Console() {
  // Get logs directly from context
  const { logs } = useConsole();

  // Removed internal state (logs, nextId)
  // Removed addLog callback
  // Removed useEffect hook

  const getMessageColor = (type: LogMessage['type']) => {
    switch (type) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  // Removed the isMinimized conditional rendering block

  return (
    // Removed fixed positioning, added w-full, adjusted max-h
    <div className="w-full max-h-32 bg-black/20 backdrop-blur-sm border border-border rounded-lg overflow-hidden font-mono text-sm">
      {/* Removed internal header */}
      
      {/* Adjusted padding and max-height for log area */}
      <div className="p-2 h-full overflow-y-auto space-y-1">
        {/* Use memo to prevent unnecessary re-renders */}
        {logs.slice(-15).map((log) => (
          // Use the unique log.id for the key prop
          <div key={log.id} className="flex items-start gap-2">
            <span className="text-muted-foreground text-xs shrink-0 w-[70px]">{log.timestamp}</span>
            <span className={`${getMessageColor(log.type)} break-words`}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
