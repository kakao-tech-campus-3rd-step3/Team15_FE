export const notificationQueryKeys = {
  all: ['notification'] as const,
  userNotifications: () => [...notificationQueryKeys.all, 'user'] as const,
  unreadCount: () => [...notificationQueryKeys.all, 'unreadCount'] as const,
};
