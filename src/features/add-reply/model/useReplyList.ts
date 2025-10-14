import { useSuspenseQuery } from '@tanstack/react-query';
import type { ReplyListResponse } from './reply.type';
import { getRelply } from '../api/get-relply.api';
import { commentKeys } from '@/entities/comment/model/queryKeys';

export function useReplyList(postId: number) {
  return useSuspenseQuery<ReplyListResponse, Error>({
    queryKey: commentKeys.listByPost(postId),
    queryFn: () => getRelply(postId),
  });
}
