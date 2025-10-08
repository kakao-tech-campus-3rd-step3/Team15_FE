import { useSuspenseQuery } from '@tanstack/react-query';
import type { PostStatsResponse } from './post.type';
import { statsKeys } from './queryKeys';
import { postService } from '../lib/postService';

export function usePostStatsQuery() {
  return useSuspenseQuery<PostStatsResponse>({
    queryKey: statsKeys.posts(),
    queryFn: postService.getPostStats,
  });
}
