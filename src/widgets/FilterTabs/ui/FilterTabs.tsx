import clsx from 'clsx';
import { useFilter } from '../model/useFilter';
import { Button } from '@/shared/ui/shadcn/button';
import { useCategoriesQuery } from '@/features/filter-posts/lib/useCategoriesQuery';

export function FilterTabs({ className }: { className?: string }) {
  const { category, setCategory } = useFilter();
  const { data } = useCategoriesQuery();

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div
      role='tablist'
      aria-label='카테고리 필터'
      className={clsx('flex flex-wrap gap-2 px-6', className)}
    >
      {data.map((tab) => (
        <Button
          key={tab.code}
          onClick={() => setCategory(tab.code)}
          variant={category === tab.code ? 'default' : 'outline'}
          size='sm'
          className='rounded-full'
          role='tab'
          aria-selected={category === tab.code}
        >
          {tab.displayName}
        </Button>
      ))}
    </div>
  );
}
