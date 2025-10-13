import { useSuspenseQueries, type UseSuspenseQueryResult } from '@tanstack/react-query';
import { postKeys } from '@/entities/post/model/queryKeys';
import type { CategoryCode, PostStatsResponse } from '@/entities/post/model/post.type';
import { postService } from '@/entities/post/lib/postService';

type Params = {
  code: CategoryCode;
  size?: number; // 랜딩에서 썸네일 6개
};

export function useLandingPageQueries({ code, size = 6 }: Params) {
  const combined = useSuspenseQueries({
    queries: [
      {
        queryKey: postKeys.list({ code, page: 0, size }),
        queryFn: () => postService.getPostsByCategory({ code, page: 0, size }),
      },
      {
        queryKey: postKeys.stats(),
        queryFn: postService.getPostStats,
      },
    ],
    combine: (
      results: [
        UseSuspenseQueryResult<Awaited<ReturnType<typeof postService.getPostsByCategory>>>,
        UseSuspenseQueryResult<PostStatsResponse>,
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
