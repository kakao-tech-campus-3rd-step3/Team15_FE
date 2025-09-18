import { create } from 'zustand';

interface DeleteAccountRequest {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  deleteConfirmText: string;
  setDeleteConfirmText: (text: string) => void;
  submit: () => void;
}

export const useDeleteAccount = create<DeleteAccountRequest>((set, get) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, deleteConfirmText: '' }),
  deleteConfirmText: '',
  setDeleteConfirmText: (text: string) => set({ deleteConfirmText: text }),
  submit: () => {
    const { deleteConfirmText, close } = get();
    if (deleteConfirmText !== '계정 탈퇴') {
      alert('탈퇴 문구가 일치하지 않습니다.');
      return;
    }
    alert('계정이 성공적으로 탈퇴되었습니다. 이용해주셔서 감사합니다.');
    close();
    // 실제로는 서버에 탈퇴 요청을 보내고 로그아웃 처리
  },
}));
