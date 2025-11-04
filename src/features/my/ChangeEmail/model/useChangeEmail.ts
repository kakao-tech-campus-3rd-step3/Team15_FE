import { create } from 'zustand';

interface ChangeEmailStore {
  isOpen: boolean;
  newEmail: string;
  open: () => void;
  close: () => void;
  setNewEmail: (email: string) => void;
}

export const useChangeEmail = create<ChangeEmailStore>((set) => ({
  isOpen: false,
  newEmail: '',
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, newEmail: '' }),
  setNewEmail: (email) => set({ newEmail: email }),
}));
