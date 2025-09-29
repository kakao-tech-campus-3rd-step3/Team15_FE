import { http, HttpResponse } from 'msw';

export const postDetailHandlers = [
  http.get('/api/post/:id', ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
      postCategory: 'TROUBLE',
      postCategoryName: '고민상담',
      title: '고민상담',
      content: '요즘 너무 힘들다.',
      author: '새싹이',
      handle: '@yozjov',
      isAnonymous: false,
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
