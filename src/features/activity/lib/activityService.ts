import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { ActivityHeaderProps, MyComment, MyLikedPost, MyPost } from '../types/activity';

export const activityService = {
  // 활동 통계
  getActivityStats: async (): Promise<ActivityHeaderProps> => {
    const { data } = await axiosInstance.get<ActivityHeaderProps>('/users/me');
    return data;
  },
  // 포스트
  getMyPosts: async (): Promise<MyPost[]> => {
    const { data } = await axiosInstance.get<MyPost[]>('/users/me/posts');
    return data;
  },
  // 댓글
  getMyComments: async (): Promise<MyComment[]> => {
    const { data } = await axiosInstance.get<MyComment[]>('/users/me/comments');
    return data;
  },
  // 좋아요
  getLikedPosts: async (): Promise<MyLikedPost[]> => {
    const { data } = await axiosInstance.get<MyLikedPost[]>('/users/me/likes');
    return data;
  },
};
