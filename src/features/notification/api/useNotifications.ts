import { useQuery } from '@tanstack/react-query';
import { notificationQueryKeys } from '../model/queryKeys';
import { notificationService } from '../lib/notificationService';

// 알림 목록
export const useNotifications = () => {
  return useQuery({
    queryKey: notificationQueryKeys.userNotifications(),
    queryFn: () => notificationService.getNotifications(),
    staleTime: 1000 * 60,
  });
};
