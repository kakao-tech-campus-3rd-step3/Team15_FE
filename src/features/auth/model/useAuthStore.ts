import { create } from 'zustand';
import { authService } from '../lib/authService';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}
export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  accessToken: null,

  login: async (email, password) => {
    const data = await authService.login({ email, password });
    localStorage.setItem('accessToken', data.accessToken);
    set({ accessToken: data.accessToken, isLoggedIn: true });
  },

  logout: async () => {
    await authService.logout();
    localStorage.removeItem('accessToken');
    set({ accessToken: null, isLoggedIn: false });
  },

  refreshAccessToken: async () => {
    try {
      const data = await authService.refresh();
      localStorage.setItem('accessToken', data.accessToken);
      set({ accessToken: data.accessToken, isLoggedIn: true });
    } catch {
      get().logout();
    }
  },
}));
