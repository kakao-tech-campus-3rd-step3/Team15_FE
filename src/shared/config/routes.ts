export const ROUTES = {
  landing: '/',
  home: '/home',
  login: '/login',
  register: '/register',
  space: '/space',
  plan: '/plan',
} as const;

export const ROUTE_LIST: { label: string; path: string }[] = [
  { label: '랜딩', path: ROUTES.landing },
  { label: '홈', path: ROUTES.home },
  { label: '로그인', path: ROUTES.login },
  { label: '회원가입', path: ROUTES.register },
  { label: '스페이스', path: ROUTES.space },
  { label: '계획', path: ROUTES.plan },
];
