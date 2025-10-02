import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost } from '../api/likePostApi';

// 캐시에서 사용하는 Post의 최소 형태 가정
// (isLiked가 없다면 likes만 낙관적으로 +/- 1 처리)
type Post = { id: number; likes: number; isLiked?: boolean };

type Ctx = {
  prevLists: [readonly unknown[], Post[] | undefined][];
  prevDetail?: Post | undefined;
};

export function useToggleLike() {
  const qc = useQueryClient();

  return useMutation<unknown, unknown, number, Ctx>({
    // variables: postId (number)
    mutationFn: (postId: number) => likePost(postId),

    onMutate: async (postId: number) => {
      // 1) 관련 쿼리 취소 (레이스 컨디션 방지)
      await qc.cancelQueries({ queryKey: ['posts'] });
      await qc.cancelQueries({ queryKey: ['post', postId] });

      // 2) 롤백을 위한 스냅샷
      const prevLists = qc.getQueriesData<Post[]>({ queryKey: ['posts'] });
      const prevDetail = qc.getQueryData<Post>(['post', postId]);

      // 3) 낙관적 패치 함수
      const applyOptimistic = (p: Post): Post => {
        if (typeof p.isLiked === 'boolean') {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likes: p.likes + (nextLiked ? 1 : -1),
          };
        }
        // isLiked가 없으면 일단 +1 (서버 동기화에서 정합화)
        return { ...p, likes: p.likes + 1 };
      };

      // 3-1) 모든 리스트 캐시에서 해당 post만 패치
      prevLists.forEach(([key, list]) => {
        if (!Array.isArray(list)) return;
        qc.setQueryData<Post[]>(
          key,
          list.map((p) => (p.id === postId ? applyOptimistic(p) : p)),
        );
      });

      // 3-2) 상세 캐시가 있으면 패치
      if (prevDetail) {
        qc.setQueryData<Post>(['post', postId], applyOptimistic(prevDetail));
      }

      // 4) 컨텍스트로 이전값 반환 (onError에서 롤백)
      return { prevLists, prevDetail };
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      ctx.prevLists.forEach(([key, list]) => {
        qc.setQueryData(key, list);
      });
      if (ctx.prevDetail) {
        qc.setQueryData(['post', ctx.prevDetail.id], ctx.prevDetail);
      }
    },

    // ✅ 성공/실패 무관: 서버와 최종 동기화
    onSettled: (_data, _err, postId) => {
      qc.invalidateQueries({ queryKey: ['post', postId] });
      qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
