import { create } from 'zustand';

interface ChangePasswordRequest {
  isOpen: boolean;
  newPassword: string;
  setNewPassword: (password: string) => void;
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  open: () => void;
  close: () => void;
  submit: () => void;
}

export const useChangePassword = create<ChangePasswordRequest>((set, get) => ({
  isOpen: false,
  newPassword: '',
  setNewPassword: (password: string) => set({ newPassword: password }),
  currentPassword: '',
  setCurrentPassword: (password: string) => set({ currentPassword: password }),
  confirmPassword: '',
  setConfirmPassword: (password: string) => set({ confirmPassword: password }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, newPassword: '', currentPassword: '', confirmPassword: '' }),
  submit: () => {
    const { newPassword, confirmPassword, currentPassword, close } = get();
    if (currentPassword !== '1234') {
      alert('현재 비밀번호가 올바르지 않습니다.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    alert('비밀번호가 성공적으로 변경되었습니다.');
    close();
  },
}));
