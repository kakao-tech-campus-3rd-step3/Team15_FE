import { create } from 'zustand';

interface DeleteAccountStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  deleteConfirmText: string;
  setDeleteConfirmText: (text: string) => void;
}

export const useDeleteAccount = create<DeleteAccountStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, deleteConfirmText: '' }),
  deleteConfirmText: '',
  setDeleteConfirmText: (text: string) => set({ deleteConfirmText: text }),
}));
