import { useFilter } from '@/widgets/FilterTabs/model/useFilter';
import { PostList } from '@/widgets/PostList';
import { PostsHeader } from '@/widgets/PostsHeader';
import { PostInfo } from '@/widgets/PostInfo/ui/PostInfo';

export function HeartNewsPage() {
  const { category, setCategory } = useFilter();

  return (
    <>
      <PostsHeader />

      <PostInfo category={category} setCategory={setCategory} />

      <PostList className='mt-8' code={category} />
    </>
  );
}
