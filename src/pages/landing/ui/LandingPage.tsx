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
import { GuidePage } from '@/pages/landing/ui/GuidePage';
import { GuideFAQSection } from './GuideFAQSection';
import { ChatbotIntroSection } from './ChatbotIntroSection';

export function LandingPage() {
  const { category, setCategory } = useFilter();

  return (
    <>
      <ErrorBoundary fallback={FallbackError}>
        <HeroShowcase />
        <GuidePage />

        <AnimatedSection from='up'>
          <SuspenseBoundary fallback={<HeroSectionSkeleton />}>
            <HeroSection />
          </SuspenseBoundary>
        </AnimatedSection>

        <AnimatedSection from='scale'>
          <div className='mx-auto w-full max-w-7xl px-4 md:px-6 md:py-24'>
            <LandingPageFilterTabs category={category} setCategory={setCategory} />
            <SuspenseBoundary fallback={<PostListSkeleton className='mt-8' count={6} />}>
              <PostList className='mt-8' limit={6} code={category} showPagination={false} />
            </SuspenseBoundary>

            <MorePostsButton to={ROUTES.post} label='마음소식 더 보러가기' />
          </div>
        </AnimatedSection>

        <Separator className='my-16' />

        <AnimatedSection from='up'>
          <SuspenseBoundary fallback={<HeroSectionSkeleton />}>
            <HeroSupportSection />
          </SuspenseBoundary>
        </AnimatedSection>

        <AnimatedSection from='up'>
          <div className='mx-auto w-full max-w-7xl px-4 md:px-6 md:py-24'>
            <SuspenseBoundary fallback={<SupportProgramListSkeleton />}>
              <SupportProgramList limit={3} />
              <MorePostsButton to={ROUTES.support} label='지원사업 더 보러가기' />
            </SuspenseBoundary>
          </div>
        </AnimatedSection>

        <Separator className='my-16' />
        <AnimatedSection from='up' threshold={0.5}>
          <ChatbotIntroSection />
          <MorePostsButton to={ROUTES.chatBot} label='지금 상담 시작하기' />
        </AnimatedSection>
        <Separator className='my-16' />
        <GuideFAQSection />
        <AnimatedSection from='up'>
          <SupportBand />
        </AnimatedSection>
      </ErrorBoundary>
    </>
  );
}
