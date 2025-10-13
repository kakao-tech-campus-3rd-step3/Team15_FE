import { commentKeys } from './queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { CommentListResponse } from './comment.type';
import { commentService } from '../lib/commentService';

export function useComments(postId: number) {
  return useSuspenseQuery<CommentListResponse>({
    queryKey: commentKeys.listByPost(postId),
    queryFn: () => commentService.getComments(postId),
  });
}
