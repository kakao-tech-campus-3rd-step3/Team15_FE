import type { BadgeResponse } from '@/features/badge';
import { http, HttpResponse } from 'msw';

// ✅ 뱃지 관련 핸들러
export const badgeHandlers = [
  http.get('/api/users/me/badges', () => {
    // 더미 데이터 (mock)
    const mockResponse: BadgeResponse = {
      earnedBadges: [
        {
          name: '사랑 전도사',
          kind: 'LOVE_EVANGELIST',
          iconUrl: '/badges/love.png',
          earnedAt: '2025-10-05T02:18:48',
        },
      ],
      unearnedBadges: [
        {
          name: '댓글 장인',
          kind: 'DILIGENT_COMMENTER',
          iconUrl: '/badges/comment.png',
        },
        {
          name: '미션 킬러',
          kind: 'MISSION_KILLER',
          iconUrl: '/badges/mission.png',
        },
        {
          name: '개근왕',
          kind: 'PERFECT_ATTENDANCE',
          iconUrl: '/badges/attendance.png',
        },
      ],
      allBadges: [
        {
          name: '사랑 전도사',
          kind: 'LOVE_EVANGELIST',
          iconUrl: '/badges/love.png',
        },
        {
          name: '댓글 장인',
          kind: 'DILIGENT_COMMENTER',
          iconUrl: '/badges/comment.png',
        },
        {
          name: '미션 킬러',
          kind: 'MISSION_KILLER',
          iconUrl: '/badges/mission.png',
        },
        {
          name: '개근왕',
          kind: 'PERFECT_ATTENDANCE',
          iconUrl: '/badges/attendance.png',
        },
      ],
    };

    return HttpResponse.json(mockResponse, { status: 200 });
  }),
];
