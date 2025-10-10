import type { CommentListResponse } from '../model/comment.type';
import { axiosInstance } from '@/shared/api/base/axiosInstance';

export async function fetchComments(postId: number): Promise<CommentListResponse> {
  const { data } = await axiosInstance.get<CommentListResponse>(`/posts/${postId}/comments`);
  return data;
}
