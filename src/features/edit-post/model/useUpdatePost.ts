import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/entities/post/lib/postService';
import { postKeys } from '@/entities/post/model/queryKeys';
import { commentKeys } from '@/entities/comment/model/queryKeys';
import type { UpdatePostRequest } from '@/entities/post';

export const useUpdatePost = (postId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdatePostRequest) => postService.updatePost(postId, body),
    onSuccess: () => {
      // 상세 & 목록/통계 등 관련 캐시 무효화
      qc.invalidateQueries({ queryKey: postKeys.detail(postId) });
      qc.invalidateQueries({ queryKey: postKeys.lists() });
      qc.invalidateQueries({ queryKey: commentKeys.listByPost(postId) });
    },
  });
};
