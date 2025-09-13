import { MorePostsButton } from '@/shared/ui';
import { FilterTabs } from '@/widgets/FilterTabs';
import { HeroSection } from '@/widgets/HeroSection';
import { PostList } from '@/widgets/PostList';
import { SupportBand } from '@/widgets/SupportBand';

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <FilterTabs />
      <PostList className='mt-8' limit={6} />
      <MorePostsButton to='/home' label='마음소식 더 보러가기' />
      <SupportBand />
    </>
  );
}
