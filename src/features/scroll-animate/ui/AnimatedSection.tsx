import React from 'react';
import { useInView } from '../model/useInView';

type Props = React.PropsWithChildren<{
  className?: string;
  from?: 'up' | 'down' | 'left' | 'right' | 'scale';
  threshold?: number;
  once?: boolean;
}>;

const fromClass: Record<NonNullable<Props['from']>, string> = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-8',
  right: '-translate-x-8',
  scale: 'scale-95',
};

export function AnimatedSection({
  className = '',
  from = 'up',
  threshold = 0.9,
  once = false,
  children,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold }, once);

  return (
    <section
      ref={ref}
      data-in-view={inView}
      className={[
        'transition-all duration-700 ease-out',
        'transform-gpu will-change-transform',
        inView
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : ['opacity-0', fromClass[from]].join(' '),
        className,
      ].join(' ')}
    >
      {children}
    </section>
  );
}
