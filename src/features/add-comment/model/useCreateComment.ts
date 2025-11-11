import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateCommentRequest } from './comment.type';
import { commentService } from '@/entities/comment/lib/commentService';
import { commentKeys } from '@/entities/comment/model/queryKeys';
import { postKeys } from '@/entities/post/model/queryKeys';

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateCommentRequest) => commentService.postComment(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.listByPost(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      if (postId) {
        queryClient.invalidateQueries({ queryKey: commentKeys.listByPost(postId) });
      }
    },
  });
}
