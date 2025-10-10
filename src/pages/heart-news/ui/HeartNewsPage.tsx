import { PostInfo } from '@/widgets/PostList/ui/PostInfo';
import { PostListInHeartNews } from '@/widgets/PostList/ui/PostListInHeartNews';
import { useState } from 'react';
import type { Params } from '@/widgets/PostList/model/type';
import { PostStats } from '@/widgets/PostStats';
import ErrorBoundary from '@/shared/ui/error-boundary/ErrorBoundary';
import FallbackError from '@/shared/ui/states/FallbackError';
import { SuspenseBoundary } from '@/shared/ui/suspense/SuspenseBoundary';
import { PostListSkeleton } from '@/widgets/PostList/ui/PostList.skeleton';

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
      <ErrorBoundary fallback={FallbackError}>
        <PostStats />
        <PostInfo params={params} onParamsChange={setParams} />
        <SuspenseBoundary fallback={<PostListSkeleton className='mt-8' count={10} />}>
          <PostListInHeartNews className='mt-8' params={params} showPagination={true} />
        </SuspenseBoundary>
      </ErrorBoundary>
    </>
  );
}
