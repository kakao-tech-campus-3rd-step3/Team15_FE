import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  CreateReplyResponse,
  CreateReplyVariables,
} from '../../../entities/comment/model/reply.type';
import { commentKeys, replyKeys } from '@/entities/comment/model/queryKeys';
import { commentService } from '@/entities/comment/lib/commentService';

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateReplyResponse, Error, CreateReplyVariables>({
    mutationFn: ({ parentId, data }) => commentService.postReplyComment(parentId, data),
    onSuccess: (_data, variables) => {
      const { parentId } = variables;
      queryClient.invalidateQueries({ queryKey: replyKeys.listByPost(parentId) });
      queryClient.refetchQueries({ queryKey: commentKeys.all });
    },
  });
};
