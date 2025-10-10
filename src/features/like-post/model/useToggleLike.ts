import { postKeys } from '@/entities/post/model/usePostDetail';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost } from '../api/like-post.api';

// 캐시에서 사용하는 Post의 최소 형태 가정
// (isLiked가 없다면 likes만 낙관적으로 +/- 1 처리)
type PostLikeEntity = { id: number; likes: number; isLiked?: boolean };

type Ctx = {
  prevLists: [readonly unknown[], unknown][];
  prevDetail?: PostLikeEntity | undefined;
};

export function useToggleLike() {
  const qc = useQueryClient();

  return useMutation<unknown, unknown, number, Ctx>({
    // variables: postId (number)
    mutationFn: (postId: number) => likePost(postId),

    onMutate: async (postId: number) => {
      // 1) 관련 쿼리 취소 (레이스 컨디션 방지)
      await qc.cancelQueries({ queryKey: postKeys.all });
      await qc.cancelQueries({ queryKey: postKeys.detail(postId) });

      // 2) 롤백을 위한 스냅샷
      const prevLists = qc.getQueriesData({ queryKey: postKeys.all });
      const prevDetail = qc.getQueryData<PostLikeEntity>(postKeys.detail(postId));

      // 3) 낙관적 패치 함수
      const applyOptimistic = (p: PostLikeEntity): PostLikeEntity => {
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

      // 다양한 리스트/페이지네이션 응답을 안전하게 패치
      const patchListLike = (data: unknown): unknown => {
        if (Array.isArray(data)) {
          return (data as PostLikeEntity[]).map((p) => (p?.id === postId ? applyOptimistic(p) : p));
        }
        if (data && typeof data === 'object') {
          const obj = data as Record<string, unknown>;
          const patchArray = (arr: unknown): unknown =>
            Array.isArray(arr)
              ? (arr as PostLikeEntity[]).map((p) => (p?.id === postId ? applyOptimistic(p) : p))
              : arr;

          // 우선순위: content -> items -> data -> posts
          if (Object.prototype.hasOwnProperty.call(obj, 'content')) {
            return { ...obj, content: patchArray(obj.content) };
          }
          if (Object.prototype.hasOwnProperty.call(obj, 'items')) {
            return { ...obj, items: patchArray(obj.items) };
          }
          if (Object.prototype.hasOwnProperty.call(obj, 'data')) {
            return { ...obj, data: patchArray(obj.data) };
          }
          if (Object.prototype.hasOwnProperty.call(obj, 'posts')) {
            return { ...obj, posts: patchArray(obj.posts) };
          }
        }
        return data;
      };

      // 3-1) 모든 리스트 캐시에서 해당 post만 패치
      prevLists.forEach(([key, snapshot]) => {
        const next = patchListLike(snapshot);
        qc.setQueryData(key, next);
      });

      // 3-2) 상세 캐시가 있으면 패치
      if (prevDetail) {
        qc.setQueryData<PostLikeEntity>(postKeys.detail(postId), applyOptimistic(prevDetail));
      }

      // 4) 컨텍스트로 이전값 반환 (onError에서 롤백)
      return { prevLists, prevDetail };
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      ctx.prevLists.forEach(([key, snapshot]) => {
        qc.setQueryData(key, snapshot);
      });
      if (ctx.prevDetail) {
        qc.setQueryData(postKeys.detail(ctx.prevDetail.id), ctx.prevDetail);
      }
    },

    // ✅ 성공/실패 무관: 서버와 최종 동기화
    onSettled: (_data, _err, postId) => {
      qc.invalidateQueries({ queryKey: postKeys.all });
      qc.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}
