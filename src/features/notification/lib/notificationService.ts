import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { Notification } from '../types/notification';

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const { data } = await axiosInstance.get<Notification[]>('/notifications');
    return data;
  },
  getUnreadCount: async (): Promise<{ unreadCount: number }> => {
    const { data } = await axiosInstance.get<{ unreadCount: number }>(
      '/notifications/unread-count',
    );
    return data;
  },
  markNotificationAsRead: async (id: number): Promise<void> => {
    await axiosInstance.patch(`/notifications/${id}/read`);
  },
  markAllNotificationsAsRead: async (): Promise<void> => {
    await axiosInstance.patch('/notifications/read');
  },
  deleteNotification: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/notifications/${id}`);
  },
};
