import { useMutation } from '@tanstack/react-query';
import { useCounselSession } from '@/shared/session/counselSessionStore';
import { endCounsel } from '../api/counsel.api';

export function useEndCounsel() {
  const { sessionId, setSessionId } = useCounselSession();

  return useMutation({
    mutationFn: async () => {
      if (!sessionId) return;
      await endCounsel(sessionId);
    },
    onSettled: () => setSessionId(null),
  });
}
