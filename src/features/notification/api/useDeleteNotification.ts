import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../lib/notificationService';
import { notificationQueryKeys } from '../model/queryKeys';

// 단건 삭제 처리
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: number) => notificationService.deleteNotification(notificationId),

    onSuccess: () => {
      // 알람과 안읽은 숫자 데이터를 다시 불러옴
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.unreadCount() });
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.userNotifications() });
    },
  });
};
