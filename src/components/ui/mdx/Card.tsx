'use client';

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, icon, children, className }: CardProps) {
  return (
    <div className={cn(
      'my-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 shadow-sm',
      'font-mono text-card-foreground',
      className
    )}>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
          {icon && (
            <div className="text-primary">
              {icon}
            </div>
          )}
          {title && (
            <h3 className="text-lg font-semibold text-foreground">
              {title}
            </h3>
          )}
        </div>
      )}
      <div className="text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}
