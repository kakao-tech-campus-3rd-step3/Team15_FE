import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateCommentRequest } from './comment.type';
import { commentService } from '@/entities/comment/lib/commentService';

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateCommentRequest) => commentService.postComment(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
}
