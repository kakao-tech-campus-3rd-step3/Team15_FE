import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../lib/commentService';
import { replyKeys } from './queryKeys';

export const useDeleteComment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => commentService.deleteComment(commentId),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: replyKeys.all });
    },
  });
};
