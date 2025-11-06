// src/pages/oauth/KakaoCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const handleCallback = () => {
      // 1. 해시(#) 방식에서 accessToken 가져오기
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      let accessToken = hashParams.get('accessToken');

      // 2. 쿼리(?) 방식 fallback
      if (!accessToken) {
        const searchParams = new URLSearchParams(window.location.search);
        accessToken = searchParams.get('accessToken');
      }

      if (!accessToken) {
        console.error('accessToken이 URL에 없습니다.');
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        navigate('/login');
        return;
      }

      // 3. 로그인 상태 저장
      login(accessToken);
      console.log('카카오 로그인 완료, accessToken:', accessToken);

      // 4. 홈으로 이동
      navigate('/');
    };

    handleCallback();
  }, [login, navigate]);

  return <div>로그인 처리 중입니다...</div>;
};
