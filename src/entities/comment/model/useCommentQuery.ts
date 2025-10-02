import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchComments } from '../api/getComments';
import type { CommentListResponse } from './types';

export function useComments(postId: number) {
  return useSuspenseQuery<CommentListResponse>({
    queryKey: [postId],
    queryFn: () => fetchComments(postId),
  });
}
