import { useSuspenseQuery } from '@tanstack/react-query';
import type { PostId } from './post.type';
import { postService } from '../lib/postService';
import { postKeys } from './queryKeys';

export function usePostDetailQuery(postId: PostId) {
  return useSuspenseQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => postService.getPostById(postId),
  });
}
