import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';
import { useEffect, useState } from 'react';

export type ViewMode = 'list' | 'grid';

type Props = {
  value?: ViewMode;
  onChange?: (v: ViewMode) => void;
  className?: string;
};

export function ViewSwitch({ value, onChange, className }: Props) {
  const [internal, setInternal] = useState<ViewMode>(value ?? 'list');

  useEffect(() => {
    if (value) setInternal(value);
  }, [value]);

  const handleChange = (v: string) => {
    if (!v) return;
    const mode = v as ViewMode;
    setInternal(mode);
    onChange?.(mode);
  };

  return (
    <ToggleGroup
      type='single'
      value={internal}
      onValueChange={handleChange}
      className={`flex items-center gap-2 ${className ?? ''}`}
      aria-label='게시글 뷰 전환'
    >
      <ToggleGroupItem
        value='list'
        aria-label='리스트 보기'
        className='data-[state=on]:bg-primary inline-flex aspect-square h-10 w-10 items-center justify-center rounded-lg p-0 data-[state=on]:text-white'
      >
        {/* 리스트 아이콘 (두 줄) */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
        </svg>
      </ToggleGroupItem>
      <ToggleGroupItem
        value='grid'
        aria-label='그리드 보기'
        className='data-[state=on]:bg-primary inline-flex aspect-square h-10 w-10 items-center justify-center rounded-lg p-0 data-[state=on]:text-white'
      >
        {/* 그리드 아이콘 (네 개 원) */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <circle cx='7' cy='7' r='2' />
          <circle cx='17' cy='7' r='2' />
          <circle cx='7' cy='17' r='2' />
          <circle cx='17' cy='17' r='2' />
        </svg>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
