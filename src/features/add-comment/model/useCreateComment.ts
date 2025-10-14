import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateCommentRequest } from './comment.type';
import { commentService } from '@/entities/comment/lib/commentService';
import { commentKeys } from '@/entities/comment/model/queryKeys';

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateCommentRequest) => commentService.postComment(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.listByPost(postId) });
    },
  });
}
