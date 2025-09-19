import { useFilter } from '@/widgets/FilterTabs/model/useFilter';
import { PostList } from '@/widgets/PostList';
import { PostInfo } from '@/widgets/PostInfo/ui/PostInfo';
import { PostStars } from '@/widgets/PostStats';

export function HeartNewsPage() {
  const { category, setCategory } = useFilter();

  return (
    <>
      <PostStars />

      <PostInfo category={category} setCategory={setCategory} />

      <PostList className='mt-8' code={category} />
    </>
  );
}
