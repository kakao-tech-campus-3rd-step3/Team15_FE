import { http, HttpResponse } from 'msw';
import type { ActivityHeaderProps, BasePostResponse } from '@/features/activity/types/activity';

export const activityHandlers = [
  // 🔹 활동 통계
  http.get('/api/users/me', () => {
    const mockResponse: ActivityHeaderProps = {
      postCount: 12,
      commentCount: 45,
      likesCount: 30,
    };

    return HttpResponse.json(mockResponse, { status: 200 });
  }),

  // 🔹 내가 쓴 글
  http.get('/api/users/me/posts', () => {
    const mockResponse: BasePostResponse[] = [
      {
        id: 1,
        postCategory: 'FREE',
        displayName: '자유',
        title: '게임 개발 시작했습니다!',
        content: 'Unity로 첫 프로젝트를 만들고 있어요.',
        likeCount: 10,
        commentCount: 2,
        viewCount: 123,
        createdAt: '2025-09-19T19:28:23.549989',
      },
      {
        id: 2,
        postCategory: 'QUESTION',
        displayName: '질문',
        title: 'React Query에서 queryKey를 어떻게 관리하나요?',
        content: 'FSD 구조에서 queryKey를 정리하는 패턴이 궁금합니다.',
        likeCount: 5,
        commentCount: 1,
        viewCount: 80,
        createdAt: '2025-10-02T12:10:00.000Z',
      },
    ];

    return HttpResponse.json(mockResponse, { status: 200 });
  }),

  // 🔹 내가 쓴 댓글
  http.get('/api/users/me/comments', () => {
    const mockResponse: BasePostResponse[] = [
      {
        id: 101,
        postCategory: 'FREE',
        displayName: '자유',
        title: '새로운 게임 프로젝트 공유합니다',
        content: '이 글에 “정말 멋지네요!”라고 댓글 달았어요.',
        likeCount: 3,
        commentCount: 5,
        viewCount: 70,
        createdAt: '2025-10-03T08:00:00.000Z',
      },
    ];

    return HttpResponse.json(mockResponse, { status: 200 });
  }),

  // 🔹 좋아요 누른 글
  http.get('/api/users/me/likes', () => {
    const mockResponse: BasePostResponse[] = [
      {
        id: 301,
        postCategory: 'REVIEW',
        displayName: '후기',
        title: '카카오 테크 캠퍼스 참여 후기',
        content: '협업 중심의 커리큘럼이 인상적이었습니다.',
        likeCount: 25,
        commentCount: 4,
        viewCount: 200,
        createdAt: '2025-09-15T10:00:00.000Z',
      },
      {
        id: 302,
        postCategory: 'QUESTION',
        displayName: '질문',
        title: 'React에서 Zustand와 Redux Toolkit 차이가 뭔가요?',
        content: '두 상태 관리 라이브러리를 비교해봤습니다.',
        likeCount: 15,
        commentCount: 3,
        viewCount: 150,
        createdAt: '2025-09-22T11:30:00.000Z',
      },
    ];

    return HttpResponse.json(mockResponse, { status: 200 });
  }),
];
