import React from 'react';
import { cn } from '@/lib/utils';

interface ProseTerminalProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ProseTerminal component
 * 
 * A reusable component that applies consistent terminal-style typography
 * using Tailwind's typography plugin with monospace font styling.
 */
export function ProseTerminal({ children, className }: ProseTerminalProps) {
  return (
    <div 
      className={cn(
        "prose prose-invert max-w-none prose-neutral prose-lg",
        "prose-headings:font-mono",
        "prose-p:font-mono",
        "prose-li:font-mono",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80",
        "prose-strong:font-semibold prose-strong:text-foreground",
        "prose-em:italic prose-em:text-foreground",
        "prose-blockquote:border-l-4 prose-blockquote:border-primary/50",
        "prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:font-mono",
        className
      )}
    >
      {children}
    </div>
  );
}