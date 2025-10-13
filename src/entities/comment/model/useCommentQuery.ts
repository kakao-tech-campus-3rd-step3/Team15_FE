import { commentKeys } from './queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { CommentListResponse } from './comment.type';
import { getComments } from '../api/comment.api';

export function useComments(postId: number) {
  return useSuspenseQuery<CommentListResponse>({
    queryKey: commentKeys.listByPost(postId),
    queryFn: () => getComments(postId),
  });
}
