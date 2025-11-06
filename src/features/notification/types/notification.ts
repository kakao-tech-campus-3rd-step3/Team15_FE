export type NotificationType = 'MISSION' | 'COMMENT' | 'LIKE' | 'REPLY' | 'SYSTEM';
export type TargetType = 'POST' | 'COMMENT' | 'MISSION' | 'SYSTEM';

export interface Notification {
  id: number;
  typeId: number | null;
  type: NotificationType;
  actorId: number;
  actorNickname: string;
  receiverId: number;
  targetId: number;
  targetType: TargetType;
  payload: string;
  createdAt: string;
  read: boolean;
}
