import { axiosInstance } from '@/shared/api/base/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type PostSignupParams = {
  email: string;
  password: string;
};

export const postSignup = async (params: PostSignupParams) => {
  await axiosInstance.post('/users/signup', params);
};

export const useSignup = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (data: PostSignupParams) => postSignup(data),
    onSuccess: () => {
      alert('회원가입 완료');
      onSuccess?.();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert('회원가입 실패');
        console.error(error);
      } else {
        console.error('알 수 없는 에러', error);
      }
    },
  });
};
