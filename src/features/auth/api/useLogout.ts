import { useAuthStore } from '../model/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config';

export const useLogout = () => {
  const logoutStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const logout = () => {
    logoutStore();
    alert('로그아웃 성공, 메인페이지로 이동합니다.');
    navigate(ROUTES.landing);
  };
  return { logout };
};
