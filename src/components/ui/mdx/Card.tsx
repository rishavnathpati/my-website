'use client';

import {
  Card as BaseCard,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

interface MDXCardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Card({ title, icon, children }: MDXCardProps) {
  return (
    <BaseCard className="my-6">
      {(title || icon) && (
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          {icon && <div>{icon}</div>}
          {title && <CardTitle>{title}</CardTitle>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </BaseCard>
  );
}