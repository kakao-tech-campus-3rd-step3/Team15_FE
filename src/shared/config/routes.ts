import { NotebookText, Home, MessageCircle, FileText } from 'lucide-react';

export const ROUTES = {
  landing: '/',
  post: '/posts',
  createpost: '/posts/create',
  postdetail: '/posts/:id',
  login: '/login',
  register: '/register',
  activity: '/activity',
  space: '/space',
  plan: '/plan',
  my: '/my',
  badge: '/badges',
} as const;

export const ROUTE_LIST: { label: string; path: string }[] = [
  { label: '랜딩', path: ROUTES.landing },
  { label: '포스터', path: ROUTES.post },
  { label: '포스터 작성', path: ROUTES.createpost },
  { label: '로그인', path: ROUTES.login },
  { label: '회원가입', path: ROUTES.register },
  { label: '활동내역', path: ROUTES.activity },
  { label: '스페이스', path: ROUTES.space },
  { label: '계획', path: ROUTES.plan },
  { label: '마이', path: ROUTES.my },
  { label: '뱃지', path: ROUTES.badge },
];

// 메뉴 항목 정의
export const MENU_ITEMS = [
  {
    title: '홈',
    url: ROUTES.landing,
    icon: Home,
  },
  {
    title: '미션',
    url: '/mission',
    icon: NotebookText,
  },
  {
    title: '마음소식',
    url: ROUTES.post,
    icon: MessageCircle,
  },
  {
    title: '지원사업',
    url: '/support',
    icon: FileText,
  },
];
