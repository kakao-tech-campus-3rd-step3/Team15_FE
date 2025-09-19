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
      <FilterTabs category={category} setCategory={setCategory} />
      <ViewSwitch />
      <PostList className='mt-8' code={category} />
    </>
  );
}
