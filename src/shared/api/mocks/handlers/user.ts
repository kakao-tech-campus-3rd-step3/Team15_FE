import type { UserProfileResponse } from '@/entities/user/types/userProfile';
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
];
