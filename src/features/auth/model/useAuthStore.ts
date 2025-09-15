import { create } from 'zustand';
import { authService } from '../lib/authService';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: null,

      login: async (token: string) => {
        localStorage.setItem('accessToken', token);
        set({ accessToken: token, isLoggedIn: true });
      },

      logout: async () => {
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
    }),
    { name: 'auth-storage' },
  ),
);
