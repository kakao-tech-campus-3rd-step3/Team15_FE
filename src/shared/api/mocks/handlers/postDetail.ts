import { http, HttpResponse } from 'msw';

export const postDetailHandlers = [
  http.get('/api/posts/:id', ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
      postCategory: 'TROUBLE',
      postCategoryName: '고민상담',
      title: '고민상담',
      content: '요즘 너무 힘들다.',
      author: '새싹이',
      handle: '@yozjov',
      isAnonymous: true,
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

export const supportProgramHandlers = [
  http.get('/api/support-programs', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '청년 창업 지원 사업',
        company: '중소벤처기업부',
        supportType: 'TEMP',
        endPoint: '2025-12-31',
      },
      {
        id: 2,
        name: '문화 예술 지원 사업',
        company: '문화체육관광부',
        supportType: 'TEMP',
        endPoint: '2025-11-30',
      },
    ]);
  }),
];

export const supportProgramDetailHandlers = [
  http.get('/api/support-programs/:id', ({ params }) => {
    const { id } = params;
    const programId = Number(id);

    const programs: Record<
      number,
      {
        id: number;
        name: string;
        company: string;
        supportType: string;
        endPoint: string;
        content: string;
        place: string;
      }
    > = {
      1: {
        id: 1,
        name: '청년 창업 지원 사업',
        company: '중소벤처기업부',
        supportType: '창업',
        endPoint: 'https://smes.go.kr/startup-support',
        content: `청년 창업자의 초기 사업 정착을 돕기 위한 종합 패키지형 지원사업입니다.
- 창업 초기 자금 지원
- 경영 컨설팅 및 멘토링
- 네트워킹 프로그램 제공`,
        place: '서울특별시 중구 청년창업지원센터',
      },
      2: {
        id: 2,
        name: '문화 예술 지원 사업',
        company: '문화체육관광부',
        supportType: '예술·문화',
        endPoint: 'https://mcst.go.kr/art-fund',
        content: `예술인 및 단체의 창작활동 활성화를 위한 문화예술진흥기금 지원사업입니다.
- 창작지원금 및 전시/공연비 지원
- 지역 문화예술 거점 조성
- 예술 경영 역량 강화`,
        place: '세종특별자치시 문화예술진흥원',
      },
      3: {
        id: 3,
        name: '지역 청년 취업 지원 사업',
        company: '고용노동부',
        supportType: '고용·인턴십',
        endPoint: 'https://moel.go.kr/job-youth',
        content: `지방 거주 청년의 고용 촉진을 위한 맞춤형 취업지원 프로그램입니다.
- 기업 연계형 인턴십
- 취업 역량 강화 교육
- 채용 연계 지원`,
        place: '광주광역시 청년센터',
      },
    };

    const program = programs[programId];

    if (!program) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json(program);
  }),
];
