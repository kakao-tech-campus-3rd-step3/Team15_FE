import * as React from 'react';
import { Skeleton } from '@/shared/ui/skeleton';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const textVariants = cva('rounded', {
  variants: {
    size: {
      xs: 'h-3',
      sm: 'h-3.5',
      md: 'h-4',
      lg: 'h-5',
    },
    width: {
      full: 'w-full',
      threeQuarter: 'w-3/4',
      half: 'w-1/2',
      third: 'w-1/3',
    },
  },
  defaultVariants: { size: 'md', width: 'full' },
});

type TextSkeletonProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof textVariants>;

export function TextSkeleton({ className, size, width, ...props }: TextSkeletonProps) {
  return <Skeleton className={cn(textVariants({ size, width }), className)} {...props} />;
}

export function AvatarSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn('h-10 w-10 rounded-full', className)} />;
}

export function ImageSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn('aspect-video w-full rounded-md', className)} />;
}

export function RowSkeleton({
  left = <AvatarSkeleton />,
  right = <TextSkeleton width='threeQuarter' />,
  className,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {left}
      <div className='flex-1'>{right}</div>
    </div>
  );
}
