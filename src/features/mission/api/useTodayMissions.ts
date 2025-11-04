import { useQuery } from '@tanstack/react-query';
import { missionService } from '../lib/missionService';
import { missionQueryKeys } from '../model/queryKeys';

export const useTodayMissions = () => {
  return useQuery({
    queryKey: missionQueryKeys.today(),
    queryFn: () => missionService.getTodayMissions(),
  });
};
