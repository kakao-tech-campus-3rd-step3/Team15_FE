import { useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { postListKeys } from './queryKeys';
import type { Params } from '@/widgets/PostList/model/type';
import { getSearchPost } from '../api/search-post.api';

// 내부 페이지 상태를 이 훅에서 관리(상위에서 주입받고 싶으면 제거 가능)
export function useSearchPosts(baseParams: Params) {
  const [page, setPage] = useState<number>(baseParams.page ?? 0);
  const params = useMemo(() => ({ ...baseParams, page }), [baseParams, page]);

  const query = useSuspenseQuery({
    queryKey: postListKeys.search(params),
    queryFn: () => getSearchPost(params),
  });

  return { ...query, page, setPage, params };
}
