import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type { PostStats } from './types';
import { statsKeys } from './queryKeys';
import { getPostStats } from '../api/getPostStats';

export function usePostStatsQuery() {
  return useSuspenseQuery<PostStats>({
    queryKey: statsKeys.posts(),
    queryFn: getPostStats,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  });
}
