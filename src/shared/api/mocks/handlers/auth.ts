import { http, HttpResponse, delay } from "msw";

interface User {
  id: string;
  email: string;
  password: string; // plain for mock only
  nickname?: string;
  provider: "local" | "kakao";
  createdAt: string;
}

const users: User[] = [
  {
    id: "u_1",
    email: "test@example.com",
    password: "pass1234!",
    nickname: "테스터",
    provider: "local",
    createdAt: new Date().toISOString(),
  },
];

// email → code
const emailVerifyCodes = new Map<string, string>();
// email → reset token
const passwordResetTokens = new Map<string, string>();

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function sixDigits() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const authHandlers = [
  // 이메일 중복 확인 (GET /api/user/check-email?email=...)
  http.get("/api/user/check-email", async ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    if (!email) {
      return HttpResponse.json(
        { message: "email query param is required" },
        { status: 400 }
      );
    }
    const exists = users.some((u) => u.email === email);
    await delay(300);
    return HttpResponse.json({ exists }); // { exists: true | false }
  }),

  // 회원가입 (POST /api/user/signup)
  http.post("/api/user/signup", async ({ request }) => {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      nickname?: string;
    };

    if (!body?.email || !body?.password) {
      return HttpResponse.json(
        { message: "email and password are required" },
        { status: 400 }
      );
    }
    if (users.some((u) => u.email === body.email)) {
      return HttpResponse.json(
        { message: "email already used" },
        { status: 409 }
      );
    }

    const user: User = {
      id: uid("u"),
      email: body.email,
      password: body.password,
      nickname: body.nickname,
      provider: "local",
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await delay(400);
    return HttpResponse.json({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      createdAt: user.createdAt,
    });
  }),

  // 이메일 인증 코드 전송 (POST /api/user/send-code)
  http.post("/api/user/send-code", async ({ request }) => {
    const { email } = (await request.json()) as { email?: string };
    if (!email)
      return HttpResponse.json({ message: "email required" }, { status: 400 });

    const code = sixDigits();
    emailVerifyCodes.set(email, code);
    await delay(300);
    // 실제 이메일 전송 대신 개발 편의를 위해 code를 함께 반환
    return HttpResponse.json({ sent: true, devCode: code });
  }),

  // 이메일 인증 코드 확인 (POST /api/user/verify-code)
  http.post("/api/user/verify-code", async ({ request }) => {
    const { email, code } = (await request.json()) as {
      email?: string;
      code?: string;
    };
    if (!email || !code)
      return HttpResponse.json(
        { message: "email and code required" },
        { status: 400 }
      );

    const ok = emailVerifyCodes.get(email) === code;
    await delay(200);
    return ok
      ? HttpResponse.json({ verified: true })
      : HttpResponse.json(
          { verified: false, message: "invalid code" },
          { status: 400 }
        );
  }),

  // 이메일 로그인 (POST /api/auth/login)
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    await delay(300);
    if (!user)
      return HttpResponse.json(
        { message: "invalid credentials" },
        { status: 401 }
      );

    return HttpResponse.json({
      accessToken: uid("atk"),
      user: { id: user.id, email: user.email, nickname: user.nickname },
    });
  }),

  // 카카오 로그인 (POST /api/auth/login/kakao)
  http.post("/api/auth/login/kakao", async ({ request }) => {
    const { kakaoToken } = (await request.json()) as { kakaoToken?: string };
    await delay(250);
    if (!kakaoToken)
      return HttpResponse.json(
        { message: "kakaoToken required" },
        { status: 400 }
      );

    // 토큰을 이메일로 매핑하는 척
    const email = `kakao_${kakaoToken.slice(0, 6)}@example.com`;
    let user = users.find((u) => u.email === email);
    if (!user) {
      user = {
        id: uid("u"),
        email,
        password: "", // 소셜 계정
        provider: "kakao",
        createdAt: new Date().toISOString(),
      };
      users.push(user);
    }
    return HttpResponse.json({
      accessToken: uid("atk"),
      user: { id: user.id, email: user.email },
    });
  }),

  // 로그아웃 (POST /api/auth/logout)
  http.post("/api/auth/logout", async () => {
    await delay(150);
    return HttpResponse.json({ ok: true });
  }),

  // 이메일 찾기 (POST /api/auth/find-email)
  http.post("/api/auth/find-email", async ({ request }) => {
    const { name, phone } = (await request.json()) as {
      name?: string;
      phone?: string;
    };
    await delay(300);
    if (!name || !phone)
      return HttpResponse.json(
        { message: "name and phone required" },
        { status: 400 }
      );

    // 데모: 첫 번째 사용자의 이메일을 돌려줌
    const found = users[0]?.email ?? null;
    return HttpResponse.json({ email: found });
  }),

  // 비밀번호 찾기 (POST /api/auth/find-password)
  http.post("/api/auth/find-password", async ({ request }) => {
    const { email } = (await request.json()) as { email?: string };
    await delay(300);
    if (!email)
      return HttpResponse.json({ message: "email required" }, { status: 400 });

    const user = users.find((u) => u.email === email);
    if (!user)
      return HttpResponse.json({ message: "not found" }, { status: 404 });

    const token = uid("reset");
    passwordResetTokens.set(email, token);
    return HttpResponse.json({ sent: true, devToken: token });
  }),

  // 비밀번호 재설정 (POST /api/auth/reset-password)
  http.post("/api/auth/reset-password", async ({ request }) => {
    const { email, token, password } = (await request.json()) as {
      email?: string;
      token?: string;
      password?: string;
    };
    if (!email || !token || !password)
      return HttpResponse.json(
        { message: "email, token, password required" },
        { status: 400 }
      );

    const expect = passwordResetTokens.get(email);
    if (expect !== token)
      return HttpResponse.json({ message: "invalid token" }, { status: 400 });

    const user = users.find((u) => u.email === email);
    if (!user)
      return HttpResponse.json({ message: "not found" }, { status: 404 });

    user.password = password;
    passwordResetTokens.delete(email);
    await delay(300);
    return HttpResponse.json({ reset: true });
  }),
];
