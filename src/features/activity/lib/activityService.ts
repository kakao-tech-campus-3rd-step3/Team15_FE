import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { ActivityHeaderProps, BasePostResponse } from '../types/activity';

export const activityService = {
  // 활동 통계
  getActivityStats: async (): Promise<ActivityHeaderProps> => {
    const { data } = await axiosInstance.get<ActivityHeaderProps>('/users/me');
    return data;
  },
  // 포스트
  getMyPosts: async (): Promise<BasePostResponse[]> => {
    const { data } = await axiosInstance.get<BasePostResponse[]>('/users/me/posts');
    return data;
  },
  // 댓글
  getMyComments: async (): Promise<BasePostResponse[]> => {
    const { data } = await axiosInstance.get<BasePostResponse[]>('/users/me/comments');
    return data;
  },
  // 좋아요
  getLikedPosts: async (): Promise<BasePostResponse[]> => {
    const { data } = await axiosInstance.get<BasePostResponse[]>('/users/me/likes');
    return data;
  },
};
