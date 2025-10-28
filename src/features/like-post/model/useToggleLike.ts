import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PostDetailResponse } from '@/entities/post/model/post.type';
import { likePostService } from '../api/likePostService';
import { postKeys } from '@/entities/post/model/queryKeys';

/**
 * Like(좋아요)용 커스텀 훅
 * - 상세 캐시에 낙관적 업데이트( likeCount + 1, isLiked=true )
 * - 실패 시 롤백
 * - 완료 후 리스트/상세 무효화로 최종 동기화
 */
export function useToggleLike() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => likePostService.likePost(postId),

    // 1) 서버 호출 전에 낙관적 업데이트
    onMutate: async (postId: number) => {
      // 같은 키의 진행중인 refetch 취소(레이스 컨디션 방지)
      await qc.cancelQueries({ queryKey: postKeys.detail(postId) });
      await qc.cancelQueries({ queryKey: postKeys.lists() });

      // 이전 스냅샷 확보 (롤백용)
      const prevDetail = qc.getQueryData<PostDetailResponse>(postKeys.detail(postId));

      // 상세 캐시에 즉시 반영
      if (prevDetail) {
        const nextDetail: PostDetailResponse = {
          ...prevDetail,
          isLiked: true,
          likeCount: (prevDetail.likeCount ?? 0) + 1,
        };
        qc.setQueryData(postKeys.detail(postId), nextDetail);
      }

      // onError에서 복원하려고 컨텍스트 반환
      return { prevDetail, postId };
    },

    // 2) 실패 시 롤백
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      if (ctx.prevDetail) {
        qc.setQueryData(postKeys.detail(ctx.postId), ctx.prevDetail);
      }
    },

    // 3) 성공/실패 무관, 최종 동기화
    onSettled: (_data, _err, postId) => {
      qc.invalidateQueries({ queryKey: postKeys.detail(postId) });
      qc.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
