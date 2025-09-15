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
];
