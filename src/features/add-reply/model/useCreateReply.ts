import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReply } from '../api/createReply';
import type { CreateReplyResponse, CreateReplyVariables } from './type';

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateReplyResponse, Error, CreateReplyVariables>({
    mutationFn: ({ parentId, data }) => createReply(parentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', parent] });
    },
  });
};
