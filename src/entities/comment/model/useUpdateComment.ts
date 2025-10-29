import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../lib/commentService';
import { commentKeys } from './queryKeys';

export const useUpdateComment = (postId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { content: string }) => commentService.updateComment(postId, body),
    onSuccess: () => {
      // 키 관련해서 수정이 필요
      qc.invalidateQueries({ queryKey: commentKeys.detail(postId) });
      qc.invalidateQueries({ queryKey: commentKeys.lists() });
      qc.invalidateQueries({ queryKey: commentKeys.listByPost(postId) });
    },
  });
};
