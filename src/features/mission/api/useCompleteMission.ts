import { useMutation, useQueryClient } from '@tanstack/react-query';
import { missionService } from '../lib/missionService';
import { missionQueryKeys } from '../model/queryKeys';
import { addRecentCompletedMission } from '../lib/recentMissions';
import type { MissionResponse } from '../types/mission';

export const useCompleteMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (missionId: number) => missionService.completeMission(missionId),
    onSuccess: (_, missionId) => {
      // 오늘 미션 목록과 통계 데이터를 다시 불러옴
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.today() });
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.stats() });
      // 최근 완료 저장
      const missions = queryClient.getQueryData<MissionResponse[]>(missionQueryKeys.today());
      const completed = missions?.find((m) => m.id === missionId);
      if (completed) addRecentCompletedMission(completed);
    },
  });
};
