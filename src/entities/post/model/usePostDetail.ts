import { useSuspenseQuery } from '@tanstack/react-query';
import type { PostId } from './types';
import { getPostById } from '../api/getPostById';

export const postKeys = {
  all: ['post'] as const,
  detail: (id: PostId) => [...postKeys.all, 'detail', id] as const,
};

export function usePostDetailQuery(postId: PostId) {
  return useSuspenseQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPostById(postId),
  });
}
