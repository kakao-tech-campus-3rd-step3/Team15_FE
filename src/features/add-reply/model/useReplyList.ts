import { useSuspenseQuery } from '@tanstack/react-query';
import type { ReplyListResponse } from '../../../entities/comment/model/reply.type';
import { commentService } from '@/entities/comment/lib/commentService';

export function useReplyList(parentId: number) {
  return useSuspenseQuery<ReplyListResponse, Error>({
    queryKey: ['comments', 'replies', parentId],
    queryFn: () => commentService.getReplyComment(parentId),
  });
}
