import { create } from 'zustand';

interface ChangeEmailRequest {
  isOpen: boolean;
  newEmail: string;
  open: () => void;
  close: () => void;
  setNewEmail: (email: string) => void;
  submit: () => void;
}

export const useChangeEmail = create<ChangeEmailRequest>((set, get) => ({
  isOpen: false,
  newEmail: '',
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, newEmail: '' }),
  setNewEmail: (email: string) => set({ newEmail: email }),
  submit: () => {
    alert('이메일 변경: ' + get().newEmail);
    get().close();
  },
}));
