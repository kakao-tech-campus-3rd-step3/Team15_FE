import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { UserProfileResponse } from '../types/userProfile';

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  const { data } = await axiosInstance.get<UserProfileResponse>('/users/me/profile');
  return data;
};
