// src/pages/oauth/KakaoCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { axiosInstance } from '@/shared/api/base/axiosInstance';

export const KakaoOAuthCallback = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URL(window.location.href).searchParams.get('code');

      if (!code) {
        console.error('인가 코드가 없습니다.');
        return;
      }

      try {
        // 백엔드 API로 인가 코드 전달
        const res = await axiosInstance.get(`/auth/kakao/callback?code=${code}`);
        console.log('카카오 로그인', res);

        const { accessToken } = res.data;

        login(accessToken);
        console.log(accessToken);

        // 로그인 완료 후 홈으로 이동
        navigate('/');
      } catch (err) {
        console.error('카카오 로그인 실패:', err);
      }
    };

    fetchToken();
  }, [navigate, login]);

  return <div>로그인 중입니다...</div>;
};
