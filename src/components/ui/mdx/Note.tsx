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
  info: 'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-200',
  warning: 'border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-200',
  success: 'border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/20 text-green-900 dark:text-green-200',
};

export function Note({ type = 'info', children }: NoteProps) {
  const Icon = icons[type];

  return (
    <div className={cn(
      'my-6 flex gap-2 rounded-lg border p-4',
      styles[type]
    )}>
      <Icon className="h-5 w-5 mt-1 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
} 