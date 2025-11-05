import { useQuery } from '@tanstack/react-query';
import { activityQueryKeys } from '../model/queryKeys';
import { activityService } from '../lib/activityService';

export const useActivityStats = () => {
  return useQuery({
    queryKey: activityQueryKeys.stats(),
    queryFn: activityService.getActivityStats,
  });
};
