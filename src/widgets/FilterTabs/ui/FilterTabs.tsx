import clsx from 'clsx';
import { useFilter } from '../model/useFilter';
import { Button } from '@/shared/ui/shadcn/button';

const TABS = ['전체', '진로취업', '대인관계', '사회생활', '정신건강', '가족', '성'] as const;

export function FilterTabs({ className }: { className?: string }) {
  const { category, setCategory } = useFilter();

  return (
    <div
      role='tablist'
      aria-label='카테고리 필터'
      className={clsx('flex flex-wrap gap-2', className)}
    >
      {TABS.map((tab) => (
        <Button
          key={tab}
          onClick={() => setCategory(tab)}
          variant={category === tab ? 'default' : 'outline'}
          size='sm'
          className='rounded-full'
          role='tab'
          aria-selected={category === tab}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
