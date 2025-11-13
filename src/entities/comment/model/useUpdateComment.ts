import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../lib/commentService';
import { commentKeys } from './queryKeys';

export const useUpdateComment = () => {
  const qc = useQueryClient();

  type UpdateCommentVars = {
    commentId: number;
    body: { content: string };
    postId?: number;
  };

  return useMutation({
    mutationFn: ({ commentId, body }: UpdateCommentVars) =>
      commentService.updateComment(commentId, body),
    onSuccess: (_data, variables) => {
      const { postId } = variables as UpdateCommentVars;
      // 개별 댓글 상세 및 목록 계열 무효화]
      if (postId) {
        qc.invalidateQueries({ queryKey: commentKeys.listByPost(postId) });
      }
    },
  });
};
