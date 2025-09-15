import { axiosInstance } from '@/shared/api/base/axiosInstance';

export type PostSignupParams = {
  email: string;
  password: string;
};

export const postSignup = async (params: PostSignupParams) => {
  await axiosInstance.post('/user/signup', params);
};
