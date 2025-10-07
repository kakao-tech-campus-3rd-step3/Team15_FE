import { useSuspenseQuery } from '@tanstack/react-query';
import type { PostStats } from './types';
import { statsKeys } from './queryKeys';
import { postService } from '../lib/postService';

export function usePostStatsQuery() {
  return useSuspenseQuery<PostStats>({
    queryKey: statsKeys.posts(),
    queryFn: postService.getPostStats,
  });
}
