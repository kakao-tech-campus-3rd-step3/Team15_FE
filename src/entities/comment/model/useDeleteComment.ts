import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { commentService } from '../lib/commentService';
import { commentKeys } from './queryKeys';
import { ROUTES } from '@/shared/config';

export const useDeleteComment = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (commentId: number) => commentService.deleteComment(commentId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commentKeys.lists() });
      navigate(ROUTES.landing);
    },
  });
};
