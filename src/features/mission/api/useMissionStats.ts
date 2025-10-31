import { useQuery } from '@tanstack/react-query';
import { missionService } from '../lib/missionService';
import { missionQueryKeys } from '../model/queryKeys';

export const useMissionStats = () => {
  return useQuery({
    queryKey: missionQueryKeys.stats(),
    queryFn: () => missionService.getMissionStats(),
  });
};
