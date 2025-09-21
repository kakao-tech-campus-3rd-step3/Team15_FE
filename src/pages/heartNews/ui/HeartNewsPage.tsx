import { PostInfo } from '@/widgets/PostList/ui/PostInfo';
import { PostStars } from '@/widgets/PostStats';
import { PostListInHeartNews } from '@/widgets/PostList/ui/PostListInHeartNews';
import { useState } from 'react';
import type { Params } from '@/widgets/PostList/model/type';

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
      <PostStars />
      <PostInfo params={params} onParamsChange={setParams} />
      <PostListInHeartNews className='mt-8' params={params} showPagination={true} />
    </>
  );
}
