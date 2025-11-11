import { useSuspenseQuery } from '@tanstack/react-query';
import type { ReplyListResponse } from '../../../entities/comment/model/reply.type';
import { commentService } from '@/entities/comment/lib/commentService';
import { replyKeys } from '@/entities/comment/model/queryKeys';

export function useReplyList(parentId: number) {
  return useSuspenseQuery<ReplyListResponse, Error>({
    queryKey: replyKeys.listByPost(parentId),
    queryFn: () => commentService.getReplyComment(parentId),
  });
}
