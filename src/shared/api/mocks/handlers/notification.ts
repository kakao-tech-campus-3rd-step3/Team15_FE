import { http, HttpResponse } from 'msw';
import type { Notification } from '@/features/notification/types/notification';

// 모의 알림 데이터
let mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'MISSION',
    typeId: 2,
    actorId: 0,
    actorNickname: '시스템',
    receiverId: 1,
    targetId: 101,
    targetType: 'MISSION',
    payload: "오늘의 미션 '하루 30분 산책하기'를 시작해보세요.",
    createdAt: '2025-11-06T:55:00.000000',
    read: false,
  },
  {
    id: 2,
    typeId: 2,
    type: 'COMMENT',
    actorId: 3,
    actorNickname: '김철수',
    receiverId: 1,
    targetId: 16,
    targetType: 'POST',
    payload: '회원님의 글에 댓글이 달렸습니다.',
    createdAt: '2025-11-06T00:00:00.000000',
    read: false,
  },
  {
    id: 3,
    typeId: 2,
    type: 'LIKE',
    actorId: 4,
    actorNickname: '유저A',
    receiverId: 1,
    targetId: 20,
    targetType: 'POST',
    payload: "회원님의 글 '개발자 모임 후기'에 좋아요 5개가 추가되었습니다.",
    createdAt: '2025-11-05T17:00:00.000000',
    read: true,
  },
  {
    id: 4,
    typeId: 2,
    type: 'MISSION',
    actorId: 0,
    actorNickname: '시스템',
    receiverId: 1,
    targetId: 102,
    targetType: 'MISSION',
    payload: "'하루 10분 명상하기' 미션을 완료했습니다. 50 포인트를 획득했어요!",
    createdAt: '2025-11-05T15:00:00.000000',
    read: true,
  },
  {
    id: 5,
    typeId: 2,
    type: 'SYSTEM',
    actorId: 0,
    actorNickname: '시스템',
    receiverId: 1,
    targetId: 0,
    targetType: 'SYSTEM',
    payload: '새로운 기능이 추가되었습니다. 확인해보세요!',
    createdAt: '2025-11-04T12:00:00.000000',
    read: false,
  },
  {
    id: 6,
    typeId: 2,
    type: 'COMMENT',
    actorId: 5,
    actorNickname: '이영희',
    receiverId: 1,
    targetId: 17,
    targetType: 'POST',
    payload: '회원님의 댓글에 답글을 남겼습니다.',
    createdAt: '2025-11-03T12:00:00.000000',
    read: true,
  },
  {
    id: 7,
    typeId: 2,
    type: 'MISSION',
    actorId: 0,
    actorNickname: '시스템',
    receiverId: 1,
    targetId: 103,
    targetType: 'MISSION',
    payload: '연속 7일 미션 달성! 특별 뱃지를 획득했습니다.',
    createdAt: '2025-11-02T12:00:00.000000',
    read: true,
  },
  {
    id: 8,
    typeId: 2,
    type: 'LIKE',
    actorId: 6,
    actorNickname: '유저B',
    receiverId: 1,
    targetId: 21,
    targetType: 'POST',
    payload: '회원님의 댓글에 좋아요 3개가 추가되었습니다.',
    createdAt: '2025-11-01T12:00:00.000000',
    read: true,
  },
];

export const notificationHandlers = [
  // 알림 목록 조회
  http.get('/api/notifications', () => {
    return HttpResponse.json(mockNotifications, { status: 200 });
  }),

  // 읽지 않은 알림 수 조회
  http.get('/api/notifications/unread-count', () => {
    const unreadCount = mockNotifications.filter((n) => !n.read).length;
    return HttpResponse.json({ unreadCount }, { status: 200 });
  }),

  // 단건 읽음 처리
  http.patch('/api/notifications/:id/read', async ({ params }) => {
    const id = parseInt(params.id as string);
    const target = mockNotifications.find((n) => n.id === id);

    if (!target) {
      return HttpResponse.json({ message: '해당 알림을 찾을 수 없습니다.' }, { status: 404 });
    }

    target.read = true;
    return new HttpResponse(null, { status: 204 });
  }),

  // 전체 읽음 처리
  http.patch('/api/notifications/read', async () => {
    mockNotifications = mockNotifications.map((n) => ({ ...n, read: true }));
    return new HttpResponse(null, { status: 204 });
  }),

  // 알림 삭제
  http.delete('/api/notifications/:notificationId', async ({ params }) => {
    const id = parseInt(params.notificationId as string);
    const exists = mockNotifications.some((n) => n.id === id);

    if (!exists) {
      return HttpResponse.json({ message: '해당 알림을 찾을 수 없습니다.' }, { status: 404 });
    }

    mockNotifications = mockNotifications.filter((n) => n.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),
];
