import type { ReactNode } from 'react';

type SectionHeaderProps = {
  title: ReactNode;
  right?: ReactNode;
  left?: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({
  title,
  right,
  left,
  description,
  className = '',
  titleClassName = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className='flex items-center gap-4'>
        {left && <div>{left}</div>}
        <div>
          <h1 className={`flex items-center text-2xl font-bold ${titleClassName}`}>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      </div>
      <div className='flex items-center justify-end gap-2'>{right}</div>
    </div>
  );
}
