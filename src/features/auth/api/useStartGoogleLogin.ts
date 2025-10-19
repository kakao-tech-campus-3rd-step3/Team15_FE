import { axiosInstance } from '@/shared/api/base/axiosInstance';
import { mutationOptions, useMutation } from '@tanstack/react-query';

export const fetchGoogleLoginUrl = async (): Promise<string> => {
  const { data: url } = await axiosInstance.get('/auth/google/url');
  return url;
};

export const startGoogleLoginMutationOptions = () => {
  return mutationOptions({
    mutationFn: fetchGoogleLoginUrl,
    onSuccess: (url) => {
      if (!url) throw new Error('로그인 url을 받지 못했습니다.');
      window.location.href = url;
    },
    onError: (error) => {
      console.log('구글로그인 시작 실패', error);
      alert('구글 로그인 중 오류가 발생했습니다. 잠시후에 다시 시도해 주세요');
    },
  });
};

export const useStartGoogleLogin = () => {
  return useMutation(startGoogleLoginMutationOptions());
};
