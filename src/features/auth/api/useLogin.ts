// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../model/useAuthStore';
import { authService, type LoginRequest, type LoginResponse } from '../lib/authService';
import { isAxiosError } from 'axios';

export const useLogin = () => {
  const loginStore = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data: LoginResponse) => {
      // accessToken을 상태 관리로 저장
      loginStore(data.accessToken);
    },
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error)) {
        alert(error.response?.data.message);
        console.error('로그인 실패', error);
      } else {
        console.log('알 수 없는 에러', error);
      }
    },
  });
};
