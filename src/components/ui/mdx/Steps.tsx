'use client';

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="steps ml-4 border-l border-border pl-8 [counter-reset:step] my-8">
      {children}
    </div>
  );
}

export function Step({ children }: { children: React.ReactNode }) {
  return (
    <div className="step mb-8 relative">
      <div className="absolute -left-[50px] flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground font-mono text-sm font-medium before:content-[counter(step)] before:[counter-increment:step]" />
      {children}
    </div>
  );
} 