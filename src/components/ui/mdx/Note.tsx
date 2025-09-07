'use client';

import { cn } from "@/lib/utils";
import { AlertCircle, Info, CheckCircle2 } from "lucide-react";

interface NoteProps {
  type?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
}

const icons = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle2,
};

const styles = {
  info: 'border-blue-500/30 bg-blue-500/10 text-blue-200 border-l-4 border-l-blue-500',
  warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-200 border-l-4 border-l-yellow-500',
  success: 'border-green-500/30 bg-green-500/10 text-green-200 border-l-4 border-l-green-500',
};

export function Note({ type = 'info', children }: NoteProps) {
  const Icon = icons[type];

  return (
    <div className={cn(
      'my-4 sm:my-6 flex gap-2 sm:gap-3 rounded-lg border p-3 sm:p-4 font-mono backdrop-blur-sm text-sm sm:text-base',
      styles[type]
    )}>
      <Icon className="h-4 w-4 sm:h-5 sm:w-5 mt-1 flex-shrink-0" />
      <div className="flex-1">{children}</div>
    </div>
  );
} 