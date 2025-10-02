import { useSuspenseQueries, type UseSuspenseQueryResult } from '@tanstack/react-query';
import { postKeys } from '@/entities/post/model/queryKeys';
import { statsKeys } from '@/entities/post/model/queryKeys';
import { getPostsByCategory } from '@/entities/post/api/getPostsByCategory';
import { getPostStats } from '@/entities/post/api/getPostStats';
import type { CategoryCode, PostStats } from '@/entities/post/model/types';

type Params = {
  code: CategoryCode;
  size?: number; // 랜딩에서 썸네일 6개
};

export function useLandingPageQueries({ code, size = 6 }: Params) {
  const combined = useSuspenseQueries({
    queries: [
      {
        queryKey: postKeys.categoryPage(code, 0, size),
        queryFn: () => getPostsByCategory({ code, page: 0, size }),
        staleTime: 60_000,
        gcTime: 5 * 60_000,
      },
      {
        queryKey: statsKeys.posts(),
        queryFn: getPostStats,
        staleTime: 60_000,
        gcTime: 5 * 60_000,
      },
    ],
    combine: (
      results: [
        UseSuspenseQueryResult<Awaited<ReturnType<typeof getPostsByCategory>>>,
        UseSuspenseQueryResult<PostStats>,
      ],
    ) => {
      const [postsRes, statsRes] = results;

      return {
        posts: postsRes.data,
        stats: statsRes.data,
      };
    },
  });

  return combined;
}
