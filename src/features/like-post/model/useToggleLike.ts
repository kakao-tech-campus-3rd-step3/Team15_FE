import { useMutation } from '@tanstack/react-query';
import { likePost } from '../api/likePostApi';

export function useToggleLike() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => likePost(postId),
    // 추후 낙관적 업데이트 추가 예정
  });
}
