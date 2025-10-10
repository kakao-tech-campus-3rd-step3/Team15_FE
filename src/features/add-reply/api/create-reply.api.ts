import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { CreateReplyRequest, CreateReplyResponse } from '../model/reply.type';

export const createReply = async (
  parentId: number,
  content: CreateReplyRequest,
): Promise<CreateReplyResponse> => {
  const { data } = await axiosInstance.post(`/api/comments/${parentId}/replies`, content);
  return data;
};
