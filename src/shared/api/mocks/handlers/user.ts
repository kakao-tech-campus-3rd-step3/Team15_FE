import type {
  UserProfileResponse,
  UserProfileEditResponse,
  UpdateUserProfileRequest,
} from '@/entities/user/types/userProfile';
import { http, HttpResponse } from 'msw';

export const userHandlers = [
  http.get('/api/users/me/profile', () => {
    const mockResponse: UserProfileResponse = {
      user: {
        nickname: 'jin',
        joinDate: '2025-02-12T12:00:00Z',
        lastActiveDate: '2025-06-20T12:00:00Z',
        score: 1200,
        level: 5,
      },
      stats: {
        totalPosts: 34,
        totalComments: 120,
        totalLikes: 450,
        totalMissionClear: 12,
      },
      badges: [
        { name: '첫 게시글', iconUrl: '/badges/badge1.png' },
        { name: '댓글왕', iconUrl: '/badges/badge2.png' },
        { name: '인기글 달성', iconUrl: '/badges/badge3.png' },
      ],
      posts: [
        {
          postId: 1,
          title: '첫 번째 게시글',
          likeCount: 10,
          commentCount: 2,
          createdAt: '2025-09-01T10:00:00Z',
        },
        {
          postId: 2,
          title: '두 번째 게시글',
          likeCount: 5,
          commentCount: 1,
          createdAt: '2025-09-02T15:00:00Z',
        },
      ],
      comments: [
        {
          commentId: 101,
          content: '좋은 글 감사합니다!',
          postId: 1,
          postTitle: '첫 번째 게시글',
          createdAt: '2025-09-03T08:00:00Z',
        },
      ],
      likePosts: [
        {
          likeId: 201,
          postId: 3,
          title: '재미있는 글',
          likeCount: 20,
          commentCount: 3,
          createdAt: '2025-09-04T14:00:00Z',
          likedAt: '2025-09-05T09:00:00Z',
        },
      ],
      account: {
        email: 'jin@example.com',
        passwordLastChanged: '2025-01-15T12:00:00Z',
        newCommentNotification: true,
        likeNoticeNotification: false,
      },
    };

    return HttpResponse.json(mockResponse, { status: 200 });
  }),

  // 내 프로필 수정 조회
  http.get('/api/users/me/profile/edit', () => {
    const mockEditResponse: UserProfileEditResponse = {
      nickname: 'jin',
      introduction: '함께 성장하는 것을 좋아해요! 🌱',
    };

    return HttpResponse.json(mockEditResponse, { status: 200 });
  }),

  // 기본 정보 변경
  http.patch('/api/users/me/profile/edit/info', async ({ request }) => {
    const body = (await request.json()) as UpdateUserProfileRequest;

    // 유효성 검사
    if (!body.nickname || body.nickname.length < 2) {
      return HttpResponse.json(
        { status: 400, code: 'INVALID_INPUT', message: '닉네임은 2자 이상이어야 합니다.' },
        { status: 400 },
      );
    }

    // 성공 응답
    return HttpResponse.json(null, { status: 200 });
  }),

  // 비밀번호 변경
  http.put('/api/users/me/password', async ({ request }) => {
    const body = (await request.json()) as {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    };

    // 현재 비밀번호 검증
    if (body.currentPassword !== 'qwer1234!') {
      return HttpResponse.json(
        { status: 401, code: 'INVALID_PASSWORD', message: '비밀번호가 올바르지 않습니다.' },
        { status: 401 },
      );
    }

    // 비밀번호 확인 검증
    if (body.newPassword !== body.confirmPassword) {
      return HttpResponse.json(
        { status: 400, code: 'PASSWORD_MISMATCH', message: '비밀번호 확인이 일치하지 않습니다.' },
        { status: 400 },
      );
    }

    // 성공 응답
    return HttpResponse.json(null, { status: 200 });
  }),

  // 회원 탈퇴
  http.delete('/api/users/me', async ({ request }) => {
    const body = (await request.json()) as { confirmText: string };

    if (body.confirmText !== '계정 탈퇴') {
      return HttpResponse.json(
        {
          status: 400,
          code: 'WITHDRAWAL_FAILED',
          message: '회원탈퇴에 실패했습니다.',
        },
        { status: 400 },
      );
    }

    // 성공 응답 (204 No Content)
    return HttpResponse.json(null, { status: 204 });
  }),

  // 새 댓글 알림 설정
  http.put('/api/users/me/notification/comment', async ({ request }) => {
    const body = (await request.json()) as { enabled: boolean };

    console.log('댓글 알림 설정:', body.enabled);

    // 성공 응답
    return HttpResponse.json(null, { status: 200 });
  }),

  // 좋아요 알림 설정
  http.put('/api/users/me/notification/like', async ({ request }) => {
    const body = (await request.json()) as { enabled: boolean };

    console.log('좋아요 알림 설정:', body.enabled);

    // 성공 응답
    return HttpResponse.json(null, { status: 200 });
  }),
];
