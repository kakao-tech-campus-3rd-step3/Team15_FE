import { MorePostsButton } from '@/shared/ui';
import { LandingPageFilterTabs } from '@/features/landing-page-filter-post';
import { useFilter } from '@/features/landing-page-filter-post/model/useFilter';
import { HeroSection } from '@/widgets/HeroSection';
import { PostList } from '@/widgets/PostList';
import { SupportBand } from '@/widgets/SupportBand';
import ErrorBoundary from '@/shared/ui/error-boundary/ErrorBoundary';
import FallbackError from '@/shared/ui/states/FallbackError';

export function LandingPage() {
  const { category, setCategory } = useFilter();

  return (
    <>
      <ErrorBoundary fallback={FallbackError}>
        <HeroSection />
        <LandingPageFilterTabs category={category} setCategory={setCategory} />
        <PostList className='mt-8' limit={6} code={category} showPagination={false} />
        <MorePostsButton to='/post' label='마음소식 더 보러가기' />
        <SupportBand />
      </ErrorBoundary>
    </>
  );
}
