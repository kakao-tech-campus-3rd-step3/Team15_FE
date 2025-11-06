import { axiosInstance } from '@/shared/api/base/axiosInstance';

export const likePostService = {
  async likePost(postId: number) {
    const { data } = await axiosInstance.post(`/posts/${postId}/like`, {
      isLiked: true,
      likeCount: 1,
    });
    return data;
  },

  async unlikePost(postId: number) {
    const { data } = await axiosInstance.post(`/posts/${postId}/like`, {
      isLiked: false,
      likeCount: 0,
    });
    return data;
  },
};
