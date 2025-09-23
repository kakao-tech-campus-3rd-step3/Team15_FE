import { PostInfo } from '@/widgets/PostList/ui/PostInfo';
import { PostListInHeartNews } from '@/widgets/PostList/ui/PostListInHeartNews';
import { useState } from 'react';
import type { Params } from '@/widgets/PostList/model/type';
<<<<<<< HEAD
import { PostStats } from '@/widgets/PostStats';
import ErrorBoundary from '@/shared/ui/error-boundary/ErrorBoundary';
import FallbackError from '@/shared/ui/states/FallbackError';
=======
import { SuspenseBoundary } from '@/shared/ui/suspense/SuspenseBoundary';
import { PostListSkeleton } from '@/widgets/PostList/ui/PostList.skeleton';
>>>>>>> 5d7be7a (feat: 마음소식 페이지 포스터 스켈레톤 ui)

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
  return (
    <>
<<<<<<< HEAD
      <ErrorBoundary fallback={FallbackError}>
        <PostStats />
        <PostInfo params={params} onParamsChange={setParams} />
        <PostListInHeartNews className='mt-8' params={params} showPagination={true} />
      </ErrorBoundary>
=======
      <PostStars />
      <PostInfo params={params} onParamsChange={setParams} />
      <SuspenseBoundary fallback={<PostListSkeleton className='mt-8' count={10} />}>
        <PostListInHeartNews className='mt-8' params={params} showPagination={true} />
      </SuspenseBoundary>
>>>>>>> 5d7be7a (feat: 마음소식 페이지 포스터 스켈레톤 ui)
    </>
  );
}
