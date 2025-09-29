import { http, HttpResponse } from 'msw';

export const commentHandlers = [
  http.get('/api/posts/:postId/comments', ({ params }) => {
    const { postId } = params;

    // 데이터셋 1 (단일 댓글)
    const singleComment = {
      page: 0,
      content: [
        {
          id: 1,
          postId: Number(postId),
          author: '새싹이',
          handle: '@ayk974',
          authorTag: 'AUTHOR',
          content: '댓글 내용입니다',
          isAnonymous: false,
          createdAt: '2025-09-14T20:40:54.94442',
          updatedAt: '2025-09-14T20:40:54.94442',
          hasChildren: true,
        },
      ],
      size: 10,
      totalElements: 1,
      totalPages: 1,
      last: true,
    };

    // 데이터셋 2 (여러 댓글)
    const multiComments = {
      page: 0,
      content: [
        {
          id: 4,
          postId: Number(postId),
          author: '새싹이',
          handle: '@ayk974',
          authorTag: 'AUTHOR',
          content: null,
          isAnonymous: false,
          createdAt: '2025-09-14T20:43:30.454011',
          updatedAt: '2025-09-14T20:43:37.709852',
          hasChildren: false,
        },
        {
          id: 3,
          postId: Number(postId),
          author: '새싹이',
          handle: '@ayk974',
          authorTag: 'AUTHOR',
          content: '댓글 내용입니다2',
          isAnonymous: false,
          createdAt: '2025-09-14T20:42:30.726205',
          updatedAt: '2025-09-14T20:42:30.726205',
          hasChildren: false,
        },
        {
          id: 1,
          postId: Number(postId),
          author: '새싹이',
          handle: '@ayk974',
          authorTag: 'AUTHOR',
          content: '삭제된 댓글입니다.',
          isAnonymous: false,
          createdAt: '2025-09-14T20:40:54.94442',
          updatedAt: '2025-09-14T20:42:46.173627',
          hasChildren: true,
        },
      ],
      size: 10,
      totalElements: 3,
      totalPages: 1,
      last: true,
    };

    // 간단히 postId에 따라 다른 데이터셋 반환
    if (Number(postId) === 1) {
      return HttpResponse.json(multiComments);
    }
    return HttpResponse.json(singleComment);
  }),
];
