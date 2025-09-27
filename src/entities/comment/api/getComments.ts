import type { CommentListResponse } from '../model/types';
import { axiosInstance } from '@/shared/api/base/axiosInstance';

export const commentKeys = {
  all: ['comments'] as const,
  list: (postId: number, page: number, size: number) =>
    [...commentKeys.all, 'list', { postId, page, size }] as const,
  infinite: (postId: number, size: number) =>
    [...commentKeys.all, 'infinite', { postId, size }] as const,
};

export async function fetchComments(
  postId: number,
  { page = 0, size = 10, signal }: { page?: number; size?: number; signal?: AbortSignal },
): Promise<CommentListResponse> {
  const res = await axiosInstance.get<CommentListResponse>(`/api/posts/${postId}/comments`, {
    params: { page, size },
    signal,
    withCredentials: true,
  });
  return res.data;
}
