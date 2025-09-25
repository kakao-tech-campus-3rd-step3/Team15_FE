import { axiosInstance } from '@/shared/api/base/axiosInstance';

export async function likePost(postId: number) {
  const { data } = await axiosInstance.post(`/api/posts/${postId}/likes`);
  return data;
}
