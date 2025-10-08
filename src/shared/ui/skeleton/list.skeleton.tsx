import { cn } from '@/shared/lib/utils';
import * as React from 'react';

export function GridSkeleton({
  className,
  children,
  columns = { base: 1, sm: 2, lg: 3 },
  gap = 'gap-4',
}: {
  className?: string;
  children: React.ReactNode;
  columns?: { base: number; sm?: number; lg?: number };
  gap?: string;
}) {
  const cols = `grid grid-cols-${columns.base} ${columns.sm ? `sm:grid-cols-${columns.sm}` : ''} ${columns.lg ? `lg:grid-cols-${columns.lg}` : ''}`;
  return <div className={cn(cols, gap, className)}>{children}</div>;
}
