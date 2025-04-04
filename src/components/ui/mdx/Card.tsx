'use client';

interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Card({ title, icon, children }: CardProps) {
  return (
    <div className="my-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      {(title || icon) && (
        <div className="flex items-center border-b border-border p-4">
          {icon && <div className="mr-2">{icon}</div>}
          {title && <h3 className="font-semibold">{title}</h3>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
} 