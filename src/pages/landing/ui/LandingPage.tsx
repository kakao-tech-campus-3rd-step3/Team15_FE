import { MorePostsButton } from '@/shared/ui';
import { LandingPageFilterTabs } from '@/features/LandingPageFilterTabs';
import { useFilter } from '@/features/LandingPageFilterTabs/model/useFilter';
import { HeroSection } from '@/widgets/HeroSection';
import { PostList } from '@/widgets/PostList';
import { SupportBand } from '@/widgets/SupportBand';

export function LandingPage() {
  const { category, setCategory } = useFilter();

  return (
    <>
      <HeroSection />
      <LandingPageFilterTabs category={category} setCategory={setCategory} />
      <PostList className='mt-8' limit={6} code={category} showPagination={false} />
      <MorePostsButton to='/post' label='마음소식 더 보러가기' />
      <SupportBand />
    </>
  );
}
