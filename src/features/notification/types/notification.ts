export type NotificationType = 'mission' | 'comment' | 'like' | 'system';

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: NotificationType;
}
