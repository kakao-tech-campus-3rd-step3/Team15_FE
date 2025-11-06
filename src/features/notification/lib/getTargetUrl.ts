import type { Notification } from '../types/notification';

export const getTargetUrl = (notification: Notification): string => {
  switch (notification.targetType) {
    case 'POST':
      return `/posts/${notification.targetId}`;
    case 'COMMENT':
      return `/posts/${notification.targetId}`;
    case 'MISSION':
      return `/missions`;
    case 'SYSTEM':
    default:
      return '/'; // fallback
  }
};
