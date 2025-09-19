import { FilterTabs } from '@/widgets/FilterTabs';
import { useFilter } from '@/widgets/FilterTabs/model/useFilter';
import { ViewSwitch } from '@/features/switch-post-view';
import type { CategoryCode } from '@/entities/post/model/types';

type Props = {
  className?: string;
  category?: CategoryCode;
  setCategory?: (code: CategoryCode) => void;
};

export function PostInfo({ className, category: extCategory, setCategory: extSetCategory }: Props) {
  const internal = useFilter();
  const category = extCategory ?? internal.category;
  const setCategory = extSetCategory ?? internal.setCategory;

  return (
    <div className={`flex items-center px-5 ${className ?? ''}`}>
      {/* 좌측: 탭 (가로 스크롤 허용) */}
      <div className='flex-1 overflow-x-auto'>
        <div className='min-w-max'>
          <FilterTabs category={category} setCategory={setCategory} />
        </div>
      </div>
      {/* 우측: 툴바 */}
      <div className='ml-3 flex items-center gap-3 border-l pl-3'>
        <ViewSwitch />
      </div>
    </div>
  );
}
