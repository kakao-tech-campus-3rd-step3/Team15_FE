import { useQuery } from '@tanstack/react-query';
import { notificationQueryKeys } from '../model/queryKeys';
import { notificationService } from '../lib/notificationService';

// 미읽음 갯수 조회
export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: notificationQueryKeys.unreadCount(),
    queryFn: () => notificationService.getUnreadCount(),
    staleTime: 1000 * 60,
  });
};
