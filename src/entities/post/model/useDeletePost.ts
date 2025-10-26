import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postService } from '@/entities/post/lib/postService';
import { postKeys } from '@/entities/post/model/queryKeys';
import { ROUTES } from '@/shared/config';

export const useDeletePost = (postId: number) => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postService.deletePost(postId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: postKeys.lists() });
      navigate(ROUTES.landing);
    },
  });
};
