import { commentKeys } from './queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchComments } from '../api/comment.api';
import type { CommentListResponse } from './comment.type';

export function useComments(postId: number) {
  return useSuspenseQuery<CommentListResponse>({
    queryKey: commentKeys.listByPost(postId),
    queryFn: () => fetchComments(postId),
  });
}
