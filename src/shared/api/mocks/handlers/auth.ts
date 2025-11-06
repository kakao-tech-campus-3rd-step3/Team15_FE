import { http, HttpResponse } from 'msw';

const TEST_EMAIL_CODE = '123456';

export const authHandlers = [
  // 로그인
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'test@email.com' && body.password === 'qwer1234!') {
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

  // 회원가입
  http.post('/api/auth/signup', async ({ request }) => {
    const body = await request.json();

    // 타입 보장용
    const { email, password } = body as {
      email: string;
      password: string;
    };

    // 간단한 유효성 검사 (mock 수준)
    if (!email || !password) {
      return HttpResponse.json({ message: '이메일과 비밀번호는 필수입니다.' }, { status: 400 });
    }

    // 이미 가입된 이메일 예시
    if (email === 'taken@example.com') {
      return HttpResponse.json({ message: '이미 사용 중인 이메일입니다.' }, { status: 409 });
    }

    // 성공 케이스
    return new HttpResponse(null, { status: 201 });
  }),

  //이메일 인증
  // 이메일 인증 코드 전송
  http.post('/api/auth/email/send', async ({ request }) => {
    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email) {
      return HttpResponse.json(
        { status: 400, code: 'INVALID_INPUT', message: '이메일은 필수 입력값입니다.' },
        { status: 400 },
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return HttpResponse.json(
        { status: 400, code: 'INVALID_INPUT', message: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 },
      );
    }

    return HttpResponse.json({ newCode: true }, { status: 200 });
  }),

  // 이메일 인증 코드 확인
  http.post('/api/auth/email/verify', async ({ request }) => {
    const body = await request.json();
    const { code } = body as { code?: string };

    if (code !== TEST_EMAIL_CODE) {
      return HttpResponse.json(
        { status: 400, code: 'EMAIL_CODE_MISMATCH', message: '인증번호가 올바르지 않습니다.' },
        { status: 400 },
      );
    }

    return HttpResponse.json({}, { status: 200 });
  }),
];
