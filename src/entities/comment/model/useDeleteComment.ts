import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../lib/commentService';
import { commentKeys } from './queryKeys';

export const useDeleteComment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => commentService.deleteComment(commentId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commentKeys.lists() });
    },
  });
};
