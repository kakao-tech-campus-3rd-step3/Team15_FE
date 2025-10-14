import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReply } from '../api/create-reply.api';
import type { CreateReplyResponse, CreateReplyVariables } from './reply.type';
import { commentKeys } from '@/entities/comment/model/queryKeys';

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateReplyResponse, Error, CreateReplyVariables>({
    mutationFn: ({ parentId, data }) => createReply(parentId, data),
    onSuccess: (_data, variables) => {
      const { parentId } = variables;
      queryClient.invalidateQueries({ queryKey: commentKeys.listByPost(parentId) });
    },
  });
};
