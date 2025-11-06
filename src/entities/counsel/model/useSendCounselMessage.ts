import { useMutation } from '@tanstack/react-query';
import { useCounselSession } from '@/shared/session/counselSessionStore';
import { sendCounselMessage } from '../api/counsel.api';

export function useSendCounselMessage() {
  const sessionId = useCounselSession((s) => s.sessionId);

  return useMutation({
    mutationFn: async (message: string) => {
      if (!sessionId) throw new Error('세션이 없습니다. 먼저 시작하세요.');
      return sendCounselMessage(sessionId, { message });
    },
  });
}
