import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { CreateReplyRequest, CreateReplyResponse } from '../model/type';

export const createReply = async (
  parentId: number,
  data: CreateReplyRequest,
): Promise<CreateReplyResponse> => {
  const response = await axiosInstance.post(`/api/comments/${parentId}/replies`, data);
  return response.data;
};
