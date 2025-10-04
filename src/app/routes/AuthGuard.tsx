// app/router/AuthGuard.tsx
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />;
  }

  // 로그인 된 경우 -> 자식 라우트 렌더링
  return <Outlet />;
};

export default AuthGuard;
