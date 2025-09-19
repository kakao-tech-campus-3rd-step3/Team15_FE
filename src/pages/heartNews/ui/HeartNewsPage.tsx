import { ViewSwitch } from '@/features/switch-post-view';
import { FilterTabs } from '@/widgets/FilterTabs';
import { useFilter } from '@/widgets/FilterTabs/model/useFilter';
import { PostList } from '@/widgets/PostList';
import { PostsHeader } from '@/widgets/PostsHeader';

export function HeartNewsPage() {
  const { category, setCategory } = useFilter();

  return (
    <>
      <PostsHeader />

      {/* 카테고리 탭 + 우측 툴바(뷰스위치) 한 줄 배치 */}
      <div className='flex items-center px-5'>
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

      <PostList className='mt-8' code={category} />
    </>
  );
}
