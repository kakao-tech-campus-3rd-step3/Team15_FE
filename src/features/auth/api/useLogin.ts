// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../model/useAuthStore';
import { authService, type LoginRequest, type LoginResponse } from '../lib/authService';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config';

export const useLogin = () => {
  const loginStore = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data: LoginResponse) => {
      // accessToken을 상태 관리로 저장
      loginStore(data.accessToken);
      alert('로그인 성공, 메인페이지로 이동합니다.');
      navigate(ROUTES.landing);
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
