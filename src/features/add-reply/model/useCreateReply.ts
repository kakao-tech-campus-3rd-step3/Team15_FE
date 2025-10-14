import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CreateReplyResponse, CreateReplyVariables } from './reply.type';
import { commentKeys } from '@/entities/comment/model/queryKeys';
import { commentService } from '@/entities/comment/lib/commentService';

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateReplyResponse, Error, CreateReplyVariables>({
    mutationFn: ({ parentId, data }) => commentService.postRelplyComment(parentId, data),
    onSuccess: (_data, variables) => {
      const { parentId } = variables;
      queryClient.invalidateQueries({ queryKey: commentKeys.listByPost(parentId) });
    },
  });
};
