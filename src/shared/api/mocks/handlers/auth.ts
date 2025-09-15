import { http, HttpResponse } from 'msw';

export const authHandlers = [
  // 로그인
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'test@example.com' && body.password === 'password123!') {
      return HttpResponse.json({ accessToken: 'mocked-access-token' }, { status: 200 });
    }

    return HttpResponse.json(
      { code: 'LOGIN_FAILED', message: '아이디 또는 비밀번호가 잘못되었습니다' },
      { status: 401, statusText: 'Unauthorized' },
    );
  }),

  // 로그아웃
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // 리프레시
  http.post('/api/auth/refresh', () => {
    console.log('리프레쉬');
    return HttpResponse.json({ accessToken: 'refreshed-mocked-token' }, { status: 200 });
  }),
];
