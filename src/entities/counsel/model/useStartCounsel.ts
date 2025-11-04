import { useMutation } from '@tanstack/react-query';
import { useCounselSession } from '@/shared/session/counselSessionStore';
import { startCounsel } from '../api/counsel.api';

export function useStartCounsel() {
  const setSessionId = useCounselSession((s) => s.setSessionId);

  return useMutation({
    mutationFn: startCounsel,
    onSuccess: (data) => {
      setSessionId(data.sessionId); // 세션 저장
    },
  });
}
