import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { ReplyListResponse } from '../model/type';

// 게시글(postId)의 댓글 목록 조회
export async function getRelply(postId: number): Promise<ReplyListResponse> {
  const { data } = await axiosInstance.get<ReplyListResponse>(`/posts/${postId}/replies`);
  return data;
}
