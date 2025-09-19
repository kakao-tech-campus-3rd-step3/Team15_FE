import { MorePostsButton } from '@/shared/ui';
import { FilterTabs } from '@/widgets/FilterTabs';
import { useFilter } from '@/widgets/FilterTabs/model/useFilter';
import { HeroSection } from '@/widgets/HeroSection';
import { PostList } from '@/widgets/PostList';
import { SupportBand } from '@/widgets/SupportBand';

export function LandingPage() {
  const { category, setCategory } = useFilter();

  return (
    <>
      <HeroSection />
      <FilterTabs category={category} setCategory={setCategory} />
      <PostList className='mt-8' limit={6} code={category} />
      <MorePostsButton to='/home' label='마음소식 더 보러가기' />
      <SupportBand />
    </>
  );
}
