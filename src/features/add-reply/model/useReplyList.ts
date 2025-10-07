import { useSuspenseQuery } from '@tanstack/react-query';
import type { ReplyListResponse } from './type';
import { getRelply } from '../api/getRelply';

export function useReplyList(postId: number) {
  return useSuspenseQuery<ReplyListResponse, Error>({
    queryKey: ['comments', postId],
    queryFn: () => getRelply(postId),
    staleTime: 60 * 1000,
  });
}
