import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../api/create-comment.api';
import type { CreateCommentRequest } from './comment.type';

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateCommentRequest) => createComment(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
}
