import { create } from 'zustand';

interface ChangePasswordStore {
  isOpen: boolean;
  newPassword: string;
  setNewPassword: (password: string) => void;
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  open: () => void;
  close: () => void;
}

export const useChangePassword = create<ChangePasswordStore>((set) => ({
  isOpen: false,
  newPassword: '',
  setNewPassword: (password: string) => set({ newPassword: password }),
  currentPassword: '',
  setCurrentPassword: (password: string) => set({ currentPassword: password }),
  confirmPassword: '',
  setConfirmPassword: (password: string) => set({ confirmPassword: password }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, newPassword: '', currentPassword: '', confirmPassword: '' }),
}));
