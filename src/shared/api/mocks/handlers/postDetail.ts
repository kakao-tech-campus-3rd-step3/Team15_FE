import { http, HttpResponse } from 'msw';

export const postDetailHandlers = [
  http.get('/api/posts/:id', ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
      postCategory: 'TROUBLE',
      postCategoryName: '고민상담',
      title: '고민상담',
      content: '요즘 너무 힘들다.',
      author: '새싹이',
      handle: '@yozjov',
      isAnonymous: true,
      isDeleted: false,
      isLiked: false,
      viewCount: 0,
      likeCount: 0,
      commentCount: 1,
      createdAt: '2025-09-15T17:55:42.504035',
      updatedAt: '2025-09-15T17:55:42.504035',
    });
  }),
];

export const supportProgramHandlers = [
  http.get('/api/support-programs', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '청년 창업 지원 사업',
        company: '중소벤처기업부',
        supportType: 'TEMP',
        endPoint: '2025-12-31',
      },
      {
        id: 2,
        name: '문화 예술 지원 사업',
        company: '문화체육관광부',
        supportType: 'TEMP',
        endPoint: '2025-11-30',
      },
    ]);
  }),
];
