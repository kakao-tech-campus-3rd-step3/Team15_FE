import clsx from 'clsx';
import type { CategoryCode } from '@/entities/post/model/types';
import { YSButton } from '@/shared/ui/';
import { useLandingPageCategoriesQuery } from '../model/useLandingPageCategoriesQuery';

export function LandingPageFilterTabs({
  className,
  category,
  setCategory,
}: {
  className?: string;
  category: CategoryCode;
  setCategory: (code: CategoryCode) => void;
}) {
  const { data } = useLandingPageCategoriesQuery();

  return (
    <div
      role='tablist'
      aria-label='카테고리 필터'
      className={clsx('flex flex-wrap gap-2 px-6', className)}
    >
      {data?.map((tab) => (
        <YSButton
          key={tab.code}
          onClick={() => setCategory(tab.code)}
          variant={category === tab.code ? 'default' : 'outline'}
          size='sm'
          className='rounded-full'
          role='tab'
          aria-selected={category === tab.code}
        >
          {tab.displayName}
        </YSButton>
      ))}
    </div>
  );
}
