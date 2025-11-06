import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { KakaoLoading } from './KakaoLoading';

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
        window.location.href = `/api/auth/kakao/callback?code=${code}`;
      } catch (err) {
        console.error('카카오 로그인 실패:', err);
      }
    };

    fetchToken();
  }, [navigate, login]);

  return <KakaoLoading />;
};
