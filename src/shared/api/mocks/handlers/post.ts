// src/shared/api/mocks/handlers/postHandlers.ts
import { http, HttpResponse } from 'msw';

export const postHandlers = [
  http.get('/api/posts/categories', () => {
    return HttpResponse.json([
      {
        code: 'ALL',
        displayName: '전체',
      },
      {
        code: 'FREE',
        displayName: '자유',
      },
      {
        code: 'STUDY',
        displayName: '학업',
      },
      {
        code: 'CAREER',
        displayName: '진로취업',
      },
      {
        code: 'RELATIONSHIP',
        displayName: '대인관계',
      },
      {
        code: 'SOCIAL',
        displayName: '사회생활',
      },
      {
        code: 'FAMILY',
        displayName: '가족',
      },
      {
        code: 'HOBBY',
        displayName: '취미',
      },
      {
        code: 'MENTAL',
        displayName: '정신건강',
      },
      {
        code: 'TROUBLE',
        displayName: '고민상담',
      },
    ]);
  }),
  http.get('/api/posts/category/:code', ({ request, params }) => {
    const code = params.code as string;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') ?? '0', 10);
    const size = parseInt(url.searchParams.get('size') ?? '10', 10);

    const allPosts = [
      {
        id: 1,
        postCategory: 'FREE',
        postCategoryName: '자유',
        title: '자유 게시글 1',
        content: '자유 게시글 내용 1',
        author: 'user1',
        likeCount: 5,
        viewCount: 100,
        commentCount: 2,
        createdAt: '2024-06-01T10:00:00Z',
      },
      {
        id: 2,
        postCategory: 'FREE',
        postCategoryName: '자유',
        title: '자유 게시글 2',
        content: '자유 게시글 내용 2',
        author: 'user2',
        likeCount: 3,
        viewCount: 50,
        commentCount: 1,
        createdAt: '2024-06-02T11:00:00Z',
      },
      // Add more mock posts as needed
    ];

    // Filter posts by category code if not 'ALL'
    const filteredPosts =
      code === 'ALL' ? allPosts : allPosts.filter((post) => post.postCategory === code);

    const totalElements = filteredPosts.length;
    const totalPages = Math.ceil(totalElements / size);
    const start = page * size;
    const end = start + size;
    const content = filteredPosts.slice(start, end);
    const last = page >= totalPages - 1;

    return HttpResponse.json({
      page,
      content,
      size,
      totalElements,
      totalPages,
      last,
    });
  }),
];
