'use client';

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="steps ml-2 sm:ml-4 border-l-2 border-primary/30 pl-4 sm:pl-8 [counter-reset:step] my-6 sm:my-8 relative">
      {children}
    </div>
  );
}

export function Step({ children }: { children: React.ReactNode }) {
  return (
    <div className="step mb-6 sm:mb-8 relative">
      <div className="absolute -left-[34px] sm:-left-[50px] flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary/20 border-2 border-primary/50 text-primary font-mono text-xs sm:text-sm font-bold before:content-[counter(step)] before:[counter-increment:step] shadow-sm" />
      <div className="font-mono text-sm sm:text-base">
        {children}
      </div>
    </div>
  );
}