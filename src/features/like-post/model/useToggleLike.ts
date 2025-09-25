import { useMutation } from '@tanstack/react-query';
import { likePost } from '../api/likePostApi';

export function useToggleLike() {
  return useMutation({
    mutationFn: (postId: number) => likePost(postId),
  });
}
