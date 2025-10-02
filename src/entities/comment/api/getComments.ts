import type { CommentListResponse } from '../model/types';
import { axiosInstance } from '@/shared/api/base/axiosInstance';

// export const commentKeys = {
//   all: ['comments'] as const,
//   list: (postId: number, page: number, size: number) =>
//     [...commentKeys.all, 'list', { postId, page, size }] as const,
//   infinite: (postId: number, size: number) =>
//     [...commentKeys.all, 'infinite', { postId, size }] as const,
// };

export async function fetchComments(postId: number): Promise<CommentListResponse> {
  const { data } = await axiosInstance.get<CommentListResponse>(`/posts/${postId}/comments`);
  return data;
}
