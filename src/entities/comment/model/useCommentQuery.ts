import { useSuspenseQuery, type QueryKey } from '@tanstack/react-query';
import { fetchComments, commentKeys } from '../api/getComments';
import type { CommentListResponse } from './types';

export function useComments(postId: number, page = 0, size = 10) {
  return useSuspenseQuery<CommentListResponse>({
    queryKey: commentKeys.list(postId, page, size) as unknown as QueryKey,
    queryFn: ({ signal }) => fetchComments(postId, { page, size, signal }),
  });
}
