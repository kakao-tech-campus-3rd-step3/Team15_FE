import type { ReactNode } from 'react';

type SectionHeaderProps = {
  title: ReactNode;
  right?: ReactNode;
  left?: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({
  title,
  right,
  left,
  className = '',
  titleClassName = '',
}: SectionHeaderProps) {
  return (
    <div className={`grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr] ${className}`}>
      <div className='w-full max-w-xs sm:order-1'>
        {left ? (
          <div className='flex h-10 items-center'>{left}</div>
        ) : (
          <div
            className='pointer-events-none invisible h-10 w-full max-w-xs select-none sm:order-1'
            aria-hidden='true'
          />
        )}
      </div>
      <h1
        className={`text-center text-5xl font-extrabold tracking-tight sm:order-2 ${titleClassName}`}
      >
        {title}
      </h1>
      <div className='flex items-center justify-end gap-2 sm:order-3'>{right}</div>
    </div>
  );
}
