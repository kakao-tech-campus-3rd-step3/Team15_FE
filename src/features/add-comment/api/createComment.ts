import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { CreateCommentRequest, CreateCommentResponse } from '../model/type';

export async function createComment(
  postId: number,
  body: CreateCommentRequest,
): Promise<CreateCommentResponse> {
  const { data } = await axiosInstance.post<CreateCommentResponse>(
    `/posts/${postId}/comments`,
    body,
  );
  return data;
}
