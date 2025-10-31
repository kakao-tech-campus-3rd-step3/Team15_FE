import { ROUTES } from '@/shared/config';
import { SuspenseBoundary } from '@/shared/ui/boundary/SuspenseBoundary';
import { Button } from '@/shared/ui/button';
import { SectionHeader } from '@/shared/ui/section-header';
import { PostStatsSkeleton } from '@/widgets/PostStats/ui/PostStats.skeletton';
import { Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SupportStats } from './SupportStats';
import { useFilter } from '@/features/landing/model/useFilter';
import { LandingPageFilterTabs } from '@/features/landing';
import { SupportProgramList } from './SupportProgramList';
import { Skeleton } from '@/shared/ui/skeleton';

export function SupportPage() {
  const navigate = useNavigate();
  const { category, setCategory } = useFilter();

  return (
    <section className='mx-8 space-y-6 pb-10 pt-10'>
      {/* 상단: 검색/타이틀/글쓰기 */}
      <SectionHeader
        title={
          <>
            <Newspaper className='mr-2 h-6 w-6 text-green-600' />
            지원사업
          </>
        }
        description='마음소식 게시판의 모든 글을 모아볼 수 있습니다'
        left={
          <Button size='lg' onClick={() => navigate(ROUTES.landing)}>
            목록으로
          </Button>
        }
      />
      <SuspenseBoundary fallback={<PostStatsSkeleton />}>
        <SupportStats />
      </SuspenseBoundary>
      <LandingPageFilterTabs category={category} setCategory={setCategory} />
      <SuspenseBoundary
        fallback={
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className='h-56 rounded-2xl' />
            ))}
          </div>
        }
      >
        <SupportProgramList />
      </SuspenseBoundary>{' '}
    </section>
  );
}
