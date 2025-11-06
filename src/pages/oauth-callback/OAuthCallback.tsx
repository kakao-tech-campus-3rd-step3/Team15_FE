import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { provider } = useParams();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const hash = window.location.hash; // "#accessToken=xxxx"

    // hash가 비어있으면 아직 리다이렉트가 완료되지 않은 상태
    if (!hash) return;

    const token = new URLSearchParams(hash.replace('#', '?')).get('accessToken');

    if (token) {
      login(token);
      navigate('/', { replace: true });
    } else {
      alert('로그인에 실패했습니다.');
      navigate('/login', { replace: true });
    }
  }, [navigate, login]);

  return <p>{provider} 로그인 처리 중...</p>;
}
