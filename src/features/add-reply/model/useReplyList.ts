import { useSuspenseQuery } from '@tanstack/react-query';
import type { ReplyListResponse } from '../../../entities/comment/model/reply.type';
import { commentKeys } from '@/entities/comment/model/queryKeys';
import { commentService } from '@/entities/comment/lib/commentService';

export function useReplyList(postId: number) {
  return useSuspenseQuery<ReplyListResponse, Error>({
    queryKey: [...commentKeys.listByPost(postId), 'replies'],
    queryFn: () => commentService.getReplyComment(postId),
  });
}
