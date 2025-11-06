import { http, HttpResponse } from 'msw';
import type { Notification } from '@/features/notification/types/notification';

// 모의 알림 데이터
let mockNotifications: Notification[] = [
  {
    id: 1,
    title: '새로운 미션이 도착했어요!',
    message: "오늘의 미션 '하루 30분 산책하기'를 시작해보세요.",
    time: '5분 전',
    isRead: false,
    type: 'mission',
  },
  {
    id: 2,
    title: '댓글이 달렸어요',
    message: '김철수님이 회원님의 글에 댓글을 남겼습니다.',
    time: '1시간 전',
    isRead: false,
    type: 'comment',
  },
  {
    id: 3,
    title: '좋아요를 받았어요',
    message: "회원님의 글 '개발자 모임 후기'에 좋아요 5개가 추가되었습니다.",
    time: '2시간 전',
    isRead: true,
    type: 'like',
  },
  {
    id: 4,
    title: '미션 완료!',
    message: "'하루 10분 명상하기' 미션을 완료했습니다. 50 포인트를 획득했어요!",
    time: '어제',
    isRead: true,
    type: 'mission',
  },
  {
    id: 5,
    title: '시스템 공지',
    message: '새로운 기능이 추가되었습니다. 확인해보세요!',
    time: '2일 전',
    isRead: false,
    type: 'system',
  },
  {
    id: 6,
    title: '새로운 댓글',
    message: '이영희님이 회원님의 댓글에 답글을 남겼습니다.',
    time: '3일 전',
    isRead: true,
    type: 'comment',
  },
  {
    id: 7,
    title: '미션 알림',
    message: '연속 7일 미션 달성! 특별 뱃지를 획득했습니다.',
    time: '4일 전',
    isRead: true,
    type: 'mission',
  },
  {
    id: 8,
    title: '좋아요 알림',
    message: '회원님의 댓글에 좋아요 3개가 추가되었습니다.',
    time: '5일 전',
    isRead: true,
    type: 'like',
  },
];

export const notificationHandlers = [
  // 알림 목록 조회
  http.get('/api/notifications', () => {
    return HttpResponse.json(mockNotifications, { status: 200 });
  }),

  // 읽지 않은 알림 수 조회
  http.get('/api/notifications/unread-count', () => {
    const unreadCount = mockNotifications.filter((n) => !n.isRead).length;
    return HttpResponse.json({ unreadCount }, { status: 200 });
  }),

  // 단건 읽음 처리
  http.patch('/api/notifications/:id/read', async ({ params }) => {
    const id = parseInt(params.id as string);
    const target = mockNotifications.find((n) => n.id === id);

    if (!target) {
      return HttpResponse.json({ message: '해당 알림을 찾을 수 없습니다.' }, { status: 404 });
    }

    target.isRead = true;
    return new HttpResponse(null, { status: 204 });
  }),

  // 전체 읽음 처리
  http.patch('/api/notifications/read', async () => {
    mockNotifications = mockNotifications.map((n) => ({ ...n, isRead: true }));
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
