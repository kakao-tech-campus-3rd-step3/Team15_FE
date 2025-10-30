import { useMutation, useQueryClient } from '@tanstack/react-query';
import { missionService } from '../lib/missionService';
import { missionQueryKeys } from '../model/queryKeys';

export const useCompleteMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (missionId: number) => missionService.completeMission(missionId),
    onSuccess: () => {
      // 오늘 미션 목록과 통계 데이터를 다시 불러옴
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.today() });
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.stats() });
    },
  });
};
