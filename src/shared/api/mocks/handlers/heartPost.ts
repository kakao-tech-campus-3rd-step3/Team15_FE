import { http, HttpResponse } from 'msw';

// 카테고리 코드 타입 (백엔드와 맞춰서 필요 시 수정)
export type CategoryCode =
  | 'ALL'
  | 'FREE'
  | 'STUDY'
  | 'CAREER'
  | 'RELATIONSHIP'
  | 'SOCIAL'
  | 'FAMILY'
  | 'HOBBY'
  | 'MENTAL'
  | 'TROUBLE';

interface HeartPost {
  id: number;
  title: string;
  category: CategoryCode; // 카테고리 코드는 위 코드셋 사용
  author: string;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  createdAt: string; // ISO (yyyy-MM-dd or ISO8601)
  content: string;
}

// 데모 데이터 (검색/정렬/기간 필터가 동작하도록 필드 구성)
const heartPosts: HeartPost[] = [
  {
    id: 1,
    title: '스프링 입문기: IoC와 DI 이해하기',
    category: 'STUDY',
    author: 'Alice',
    likeCount: 15,
    viewCount: 120,
    commentCount: 4,
    createdAt: '2025-09-05',
    content: '스프링 핵심 개념 정리. IoC, DI, AOP에 대한 직관적 설명.',
  },
  {
    id: 2,
    title: '일본 소도시 여행 기록',
    category: 'HOBBY',
    author: 'Bob',
    likeCount: 25,
    viewCount: 230,
    commentCount: 10,
    createdAt: '2025-08-28',
    content: '숨겨진 소도시의 매력을 정리했다.',
  },
  {
    id: 3,
    title: '비건 라자냐 레시피',
    category: 'HOBBY',
    author: 'Charlie',
    likeCount: 30,
    viewCount: 340,
    commentCount: 8,
    createdAt: '2025-08-20',
    content: '오븐 없이 만드는 라자냐 실험기.',
  },
  {
    id: 4,
    title: '최신 스마트폰 카메라 비교',
    category: 'TECH' as unknown as CategoryCode, // 필요 시 실제 코드로 교체
    author: 'Diana',
    likeCount: 50,
    viewCount: 540,
    commentCount: 15,
    createdAt: '2025-09-01',
    content: '야간 모드와 망원 성능을 중점 비교.',
  },
  {
    id: 5,
    title: '아침 요가 루틴 정리',
    category: 'HEALTH' as unknown as CategoryCode,
    author: 'Ethan',
    likeCount: 20,
    viewCount: 150,
    commentCount: 5,
    createdAt: '2025-07-30',
    content: '유연성과 감정 안정에 도움이 된다.',
  },
  {
    id: 6,
    title: '온라인 강의로 꾸준히 학습하는 법',
    category: 'STUDY',
    author: 'Fiona',
    likeCount: 18,
    viewCount: 200,
    commentCount: 7,
    createdAt: '2025-08-10',
    content: 'MOOC, Micro-degree, 스케줄링 팁.',
  },
  {
    id: 7,
    title: '인디 밴드 추천 모음',
    category: 'HOBBY',
    author: 'George',
    likeCount: 22,
    viewCount: 180,
    commentCount: 6,
    createdAt: '2025-09-07',
    content: '요즘 꽂힌 신스팝 사운드.',
  },
  {
    id: 8,
    title: '9월에 읽은 역사소설 베스트 3',
    category: 'HOBBY',
    author: 'Hannah',
    likeCount: 35,
    viewCount: 400,
    commentCount: 12,
    createdAt: '2025-09-03',
    content: '서사와 구성을 중심으로 감상.',
  },
  {
    id: 9,
    title: '설악산 단풍 산행 후기',
    category: 'HOBBY',
    author: 'Ian',
    likeCount: 40,
    viewCount: 450,
    commentCount: 9,
    createdAt: '2025-10-01', // 미래 날짜 예시 (정렬 확인용)
    content: '날씨는 쌀쌀하지만 풍경은 최고.',
  },
  {
    id: 10,
    title: '풍경화 그리기 팁 7가지',
    category: 'HOBBY',
    author: 'Jane',
    likeCount: 28,
    viewCount: 320,
    commentCount: 11,
    createdAt: '2025-08-05',
    content: '붓 선택과 색 배합의 기본.',
  },
  {
    id: 11,
    title: '골든아워 사진 촬영 노하우',
    category: 'HOBBY',
    author: 'Kevin',
    likeCount: 33,
    viewCount: 370,
    commentCount: 13,
    createdAt: '2025-09-02',
    content: '노출 보정과 화이트밸런스 가이드.',
  },
  {
    id: 12,
    title: '사워도우 스타터 키우기',
    category: 'HOBBY',
    author: 'Laura',
    likeCount: 26,
    viewCount: 290,
    commentCount: 7,
    createdAt: '2025-07-25',
    content: '발효와 온도 관리 팁.',
  },
  {
    id: 13,
    title: '신작 RPG 리뷰: 스토리와 그래픽',
    category: 'HOBBY',
    author: 'Mike',
    likeCount: 45,
    viewCount: 600,
    commentCount: 20,
    createdAt: '2025-09-04',
    content: '몰입감 끝판왕.',
  },
  {
    id: 14,
    title: '기후변화 다큐 감상문',
    category: 'SOCIAL',
    author: 'Nina',
    likeCount: 38,
    viewCount: 420,
    commentCount: 14,
    createdAt: '2025-09-06',
    content: '관점이 달라진 순간들.',
  },
  {
    id: 15,
    title: '우주 탐사 최근 소식 모음',
    category: 'SCIENCE' as unknown as CategoryCode,
    author: 'Oscar',
    likeCount: 42,
    viewCount: 480,
    commentCount: 16,
    createdAt: '2025-08-18',
    content: '화성 샘플 회수 미션 등.',
  },
];

function parseDate(d?: string) {
  if (!d) return undefined;
  // yyyy-MM-dd 또는 ISO8601 모두 허용
  const asIso = d.length === 10 ? `${d}T00:00:00Z` : d;
  const t = Date.parse(asIso);
  return Number.isNaN(t) ? undefined : new Date(t);
}

function compareBy(field: string, dir: 'asc' | 'desc') {
  return (a: HeartPost, b: HeartPost) => {
    const sign = dir === 'asc' ? 1 : -1;
    if (field === 'createdAt') {
      return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sign;
    }
    // 숫자 필드 정렬 (viewCount, likeCount, commentCount)
    const av = (a[field as keyof HeartPost] as number) ?? 0;
    const bv = (b[field as keyof HeartPost] as number) ?? 0;
    return (av - bv) * sign;
  };
}

function doSearch(requestUrl: string) {
  const url = new URL(requestUrl);

  const keyword = url.searchParams.get('keyword')?.trim();
  const category = (url.searchParams.get('category') || 'ALL') as CategoryCode;
  const startDateStr = url.searchParams.get('startDate') || undefined;
  const endDateStr = url.searchParams.get('endDate') || undefined;
  const pageParam = url.searchParams.get('page');
  const sizeParam = url.searchParams.get('size');
  const sortParam = url.searchParams.get('sort') || 'createdAt,desc';

  const page = pageParam ? Math.max(0, parseInt(pageParam, 10)) : 0;
  const size = sizeParam ? Math.max(1, parseInt(sizeParam, 10)) : 10;

  const [sortFieldRaw, sortDirRaw] = sortParam.split(',');
  const sortField = (sortFieldRaw || 'createdAt').trim();
  const sortDir = ((sortDirRaw || 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc') as
    | 'asc'
    | 'desc';

  // 1) 필터링
  let filtered = heartPosts.slice();

  if (category && category !== 'ALL') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (keyword) {
    const k = keyword.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(k) ||
        p.content.toLowerCase().includes(k) ||
        p.author.toLowerCase().includes(k),
    );
  }

  const start = parseDate(startDateStr);
  const end = parseDate(endDateStr);
  if (start || end) {
    filtered = filtered.filter((p) => {
      const d = new Date(p.createdAt);
      const afterStart = start ? d >= start : true;
      const beforeEnd = end ? d <= end : true;
      return afterStart && beforeEnd;
    });
  }

  // 2) 정렬
  filtered.sort(compareBy(sortField, sortDir));

  // 3) 페이지네이션
  const totalElements = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  const startIdx = page * size;
  const endIdx = startIdx + size;
  const content = filtered.slice(startIdx, endIdx);
  const last = page >= totalPages - 1;

  return {
    page,
    content,
    size,
    totalElements,
    totalPages,
    last,
  };
}

export const heartPostHandlers = [
  // 신규 검색 엔드포인트
  http.get('/api/posts/search', ({ request }) => {
    const body = doSearch(request.url);
    return HttpResponse.json(body);
  }),

  // 하위호환: 기존 `/api/posts/`를 검색 API로 포워딩
  http.get('/api/posts/', ({ request }) => {
    const body = doSearch(request.url);
    return HttpResponse.json(body);
  }),
];
