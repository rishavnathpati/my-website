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
        // Base prose styles
        "prose prose-invert max-w-none prose-neutral overflow-x-hidden",
        "prose-sm sm:prose-base lg:prose-lg",

        // Typography - consistent monospace font
        "prose-headings:font-mono prose-headings:text-foreground prose-headings:leading-tight",
        "prose-p:font-mono prose-p:text-foreground prose-p:leading-relaxed",
        "prose-li:font-mono prose-li:text-foreground",
        "prose-ul:font-mono prose-ol:font-mono",

        // Links
        "prose-a:text-primary prose-a:no-underline prose-a:font-medium",
        "hover:prose-a:text-primary/80 hover:prose-a:underline",
        "prose-a:transition-colors prose-a:duration-200",

        // Text emphasis
        "prose-strong:font-semibold prose-strong:text-foreground",
        "prose-em:italic prose-em:text-foreground",
        "prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5",
        "prose-code:rounded prose-code:font-mono prose-code:text-sm",

        // Blockquotes
        "prose-blockquote:border-l-4 prose-blockquote:border-primary/50",
        "prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground",
        "prose-blockquote:font-mono prose-blockquote:bg-muted/20 prose-blockquote:py-4",
        "prose-blockquote:rounded-r-lg prose-blockquote:my-6",

        // Code blocks
        "prose-pre:overflow-x-auto prose-pre:max-w-full prose-pre:bg-muted",
        "prose-pre:border prose-pre:border-border prose-pre:font-mono",
        "prose-pre:text-sm prose-pre:leading-relaxed",

        // Headings spacing
        "prose-h1:mb-6 prose-h1:mt-8 prose-h1:text-3xl",
        "prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-2xl prose-h2:border-b prose-h2:border-border prose-h2:pb-2",
        "prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-xl",
        "prose-h4:mb-2 prose-h4:mt-4 prose-h4:text-lg",

        // Lists
        "prose-ul:my-4 prose-ol:my-4",
        "prose-li:my-1",

        // Tables
        "prose-table:font-mono prose-table:text-sm",
        "prose-th:text-foreground prose-th:font-semibold",
        "prose-td:text-foreground",

        // Images
        "prose-img:rounded-lg prose-img:shadow-md prose-img:border prose-img:border-border",

        className
      )}
    >
      {children}
    </div>
  );
}