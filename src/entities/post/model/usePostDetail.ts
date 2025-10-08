import { useSuspenseQuery } from '@tanstack/react-query';
import type { PostId } from './post.type';
import { postService } from '../lib/postService';

export const postKeys = {
  all: ['post'] as const,
  detail: (id: PostId) => [...postKeys.all, 'detail', id] as const,
};

export function usePostDetailQuery(postId: PostId) {
  return useSuspenseQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => postService.getPostById(postId),
  });
}
