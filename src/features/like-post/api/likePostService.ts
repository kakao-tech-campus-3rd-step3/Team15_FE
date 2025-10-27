import { axiosInstance } from '@/shared/api/base/axiosInstance';

export const likePostService = {
  async likePost(postId: number) {
    const { data } = await axiosInstance.post(`/posts/${postId}/likes`);
    return data;
  },

  async unlikePost(postId: number) {
    const { data } = await axiosInstance.delete(`/posts/${postId}/likes`);
    return data;
  },
};
