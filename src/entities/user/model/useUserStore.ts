import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  login: (token) => {
    localStorage.setItem('accessToken', token);
    set({ isLoggedIn: true, accessToken: token });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ isLoggedIn: false, accessToken: null });
  },
}));
