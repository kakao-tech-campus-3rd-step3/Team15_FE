import { PostInfo } from '@/widgets/PostList/ui/PostInfo';
import { PostListInHeartNews } from '@/widgets/PostList/ui/PostListInHeartNews';
import { useState } from 'react';
import type { Params } from '@/widgets/PostList/model/type';
import { PostStats } from '@/widgets/PostStats';
import ErrorBoundary from '@/shared/ui/error-boundary/ErrorBoundary';
import FallbackError from '@/shared/ui/states/FallbackError';
import { SuspenseBoundary } from '@/shared/ui/suspense/SuspenseBoundary';
import { PostListSkeleton } from '@/widgets/PostList/ui/PostList.skeleton';
import { PostStatsSkeleton } from '@/widgets/PostStats/ui/PostStats.skeletton';
import { SectionHeader, YSButton } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config';
import { Newspaper } from 'lucide-react';

export function HeartNewsPage() {
  const [params, setParams] = useState<Params>({
    category: 'ALL',
    keyword: '',
    startDate: undefined,
    endDate: undefined,
    page: 0,
    size: 10,
    sort: 'createdAt,desc',
  });
  const navigate = useNavigate();
  return (
    <>
      <ErrorBoundary fallback={FallbackError}>
        <section className='mx-8 space-y-6 pb-10 pt-10'>
          {/* 상단: 검색/타이틀/글쓰기 */}
          <SectionHeader
            title={
              <>
                <Newspaper className='mr-2 h-6 w-6 text-green-600' />
                게시글
              </>
            }
            description='마음소식 게시판의 모든 글을 모아볼 수 있습니다'
            left={
              <YSButton size='lg' onClick={() => navigate(-1)}>
                목록으로
              </YSButton>
            }
            right={
              <YSButton size='lg' onClick={() => navigate(ROUTES.createpost)}>
                + 새 글쓰기
              </YSButton>
            }
          />
          <SuspenseBoundary fallback={<PostStatsSkeleton />}>
            <PostStats />
          </SuspenseBoundary>
        </section>

        <PostInfo params={params} onParamsChange={setParams} />
        <SuspenseBoundary fallback={<PostListSkeleton className='mt-8' count={10} />}>
          <PostListInHeartNews className='mt-8' params={params} showPagination={true} />
        </SuspenseBoundary>
      </ErrorBoundary>
    </>
  );
}
