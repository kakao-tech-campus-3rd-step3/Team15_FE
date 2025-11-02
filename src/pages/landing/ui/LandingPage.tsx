import { LandingPageFilterTabs } from '@/features/landing';
import { useFilter } from '@/features/landing/model/useFilter';
import { HeroSection } from '@/widgets/HeroSection';
import { PostList } from '@/widgets/PostList';
import { SupportBand } from '@/widgets/SupportBand';
import { SuspenseBoundary } from '@/shared/ui/boundary/SuspenseBoundary';
import { PostListSkeleton } from '@/widgets/PostList/ui/PostList.skeleton';
import ErrorBoundary from '@/shared/ui/boundary/ErrorBoundary';
import FallbackError from '@/shared/ui/states/FallbackError';
import { HeroSectionSkeleton } from '@/widgets/HeroSection/ui/HeroSection.skeleton';
import { ROUTES } from '@/shared/config';
import { MorePostsButton } from '@/shared/ui/more-posts-button';
import { AnimatedSection } from '@/features/scroll-animate/ui/AnimatedSection';

import { HeroShowcase } from '../../../widgets/HeroSection/ui/HeroShowcase';
import { SupportProgramList } from '@/pages/support/ui/SupportProgramList';
import { Separator } from '@/shared/ui/separator';
import { HeroSupportSection } from '@/widgets/HeroSection/ui/HeroSupportSection';
import { SupportProgramListSkeleton } from '@/pages/support/ui/SupportProgramList.skelton';

export function LandingPage() {
  const { category, setCategory } = useFilter();

  return (
    <>
      <ErrorBoundary fallback={FallbackError}>
        <HeroShowcase />

        <AnimatedSection from='up'>
          <SuspenseBoundary fallback={<HeroSectionSkeleton />}>
            <HeroSection />
          </SuspenseBoundary>
        </AnimatedSection>

        <AnimatedSection from='down'>
          <LandingPageFilterTabs category={category} setCategory={setCategory} />
        </AnimatedSection>

        <AnimatedSection from='scale'>
          <SuspenseBoundary fallback={<PostListSkeleton className='mt-8' count={6} />}>
            <PostList className='mt-8' limit={6} code={category} showPagination={false} />
          </SuspenseBoundary>

          <MorePostsButton to={ROUTES.post} label='마음소식 더 보러가기' />
        </AnimatedSection>

        <Separator className='my-16' />

        <AnimatedSection from='up'>
          <SuspenseBoundary fallback={<HeroSectionSkeleton />}>
            <HeroSupportSection />
          </SuspenseBoundary>
        </AnimatedSection>

        <div className='px-6'>
          <SuspenseBoundary fallback={<SupportProgramListSkeleton />}>
            <SupportProgramList />
            <MorePostsButton to={ROUTES.support} label='지원사업 더 보러가기' />
          </SuspenseBoundary>
        </div>

        <Separator className='my-16' />

        <AnimatedSection from='up'>
          <SupportBand />
        </AnimatedSection>
      </ErrorBoundary>
    </>
  );
}
