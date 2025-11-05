import { create } from 'zustand';

type CounselSessionState = {
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
};

export const useCounselSession = create<CounselSessionState>((set) => {
  // 초기 복구
  const saved = typeof window !== 'undefined' ? localStorage.getItem('counselSessionId') : null;

  return {
    sessionId: saved,
    setSessionId: (id) => {
      if (typeof window !== 'undefined') {
        if (id) localStorage.setItem('counselSessionId', id);
        else localStorage.removeItem('counselSessionId');
      }
      set({ sessionId: id });
    },
  };
});
