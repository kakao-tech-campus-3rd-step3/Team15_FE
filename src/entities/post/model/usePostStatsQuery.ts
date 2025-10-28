import { useSuspenseQuery } from '@tanstack/react-query';
import type { PostStatsResponse } from './post.type';
import { postService } from '../lib/postService';
import { postKeys } from './queryKeys';

export function usePostStatsQuery() {
  return useSuspenseQuery<PostStatsResponse>({
    queryKey: postKeys.stats(),
    queryFn: postService.getPostStats,
  });
}
