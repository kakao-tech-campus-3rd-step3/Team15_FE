import { http, HttpResponse } from 'msw';
import type { MissionResponse, MissionStats } from '@/features/mission/types/mission';

// 모의 미션 데이터
const mockMissions: MissionResponse[] = [
  {
    id: 3,
    title: '오늘 30분 걷기',
    content: '동네 한 바퀴 산책',
    point: 100,
    category: 'ROUTINE',
    level: 'BEGINNER',
    active: true,
    todayStartedCount: 12,
    todayCompletedCount: 5,
    state: 'NOT_STARTED',
  },
  {
    id: 4,
    title: '명상 10분',
    content: '조용한 곳에서 명상하기',
    point: 50,
    category: 'ROUTINE',
    level: 'BEGINNER',
    active: true,
    todayStartedCount: 8,
    todayCompletedCount: 3,
    state: 'IN_PROGRESS',
  },
  {
    id: 5,
    title: '독서 30분',
    content: '책 한 챕터 읽기',
    point: 80,
    category: 'ROUTINE',
    level: 'INTERMEDIATE',
    active: true,
    todayStartedCount: 15,
    todayCompletedCount: 10,
    state: 'COMPLETED',
  },
  {
    id: 6,
    title: '물 2리터 마시기',
    content: '하루 동안 물 8잔 이상 마시기',
    point: 70,
    category: 'ROUTINE',
    level: 'BEGINNER',
    active: true,
    todayStartedCount: 20,
    todayCompletedCount: 9,
    state: 'NOT_STARTED',
  },
  {
    id: 7,
    title: '스트레칭 15분',
    content: '아침 혹은 자기 전 간단한 전신 스트레칭',
    point: 60,
    category: 'ROUTINE',
    level: 'BEGINNER',
    active: true,
    todayStartedCount: 18,
    todayCompletedCount: 7,
    state: 'IN_PROGRESS',
  },
  {
    id: 8,
    title: '하루 계획 세우기',
    content: '아침에 오늘 해야 할 일 3가지 정리하기',
    point: 90,
    category: 'ROUTINE',
    level: 'INTERMEDIATE',
    active: true,
    todayStartedCount: 25,
    todayCompletedCount: 20,
    state: 'COMPLETED',
  },
  {
    id: 9,
    title: '감사 일기 작성하기',
    content: '오늘 감사했던 일 3가지 적기',
    point: 80,
    category: 'ROUTINE',
    level: 'INTERMEDIATE',
    active: true,
    todayStartedCount: 14,
    todayCompletedCount: 5,
    state: 'NOT_STARTED',
  },
  {
    id: 10,
    title: '휴대폰 없는 시간 1시간',
    content: '하루 중 1시간 동안 전자기기 없이 보내기',
    point: 120,
    category: 'ROUTINE',
    level: 'ADVANCED',
    active: true,
    todayStartedCount: 10,
    todayCompletedCount: 3,
    state: 'IN_PROGRESS',
  },
];

export const missionHandlers = [
  // 오늘 미션 조회
  http.get('/api/missions/today', () => {
    return HttpResponse.json(mockMissions, { status: 200 });
  }),

  // 미션 시작
  http.patch('/api/missions/:missionId/start', async ({ params }) => {
    const missionId = parseInt(params.missionId as string);
    const mission = mockMissions.find((m) => m.id === missionId);

    if (!mission) {
      return HttpResponse.json({ message: '미션을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 미션 상태를 IN_PROGRESS로 변경
    mission.state = 'IN_PROGRESS';
    mission.todayStartedCount += 1;

    // 204 No Content 응답
    return new HttpResponse(null, { status: 204 });
  }),

  // 미션 완료
  http.patch('/api/missions/:missionId/complete', async ({ params }) => {
    const missionId = parseInt(params.missionId as string);
    const mission = mockMissions.find((m) => m.id === missionId);

    if (!mission) {
      return HttpResponse.json({ message: '미션을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 미션 상태를 COMPLETED로 변경
    mission.state = 'COMPLETED';
    mission.todayCompletedCount += 1;

    // 204 No Content 응답
    return new HttpResponse(null, { status: 204 });
  }),

  // 미션 통계
  http.get('/api/missions/stats', () => {
    const stats: MissionStats = {
      completedCount: 12,
      inProgressCount: 1,
      earnedPoints: 1248,
    };

    return HttpResponse.json(stats, { status: 200 });
  }),

  // 미션 취소
  http.patch('/api/missions/:missionId/cancel', async ({ params }) => {
    const missionId = parseInt(params.missionId as string);
    const mission = mockMissions.find((m) => m.id === missionId);

    if (!mission) {
      return HttpResponse.json({ message: '미션을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 미션 상태를 NOT_STARTED로 변경
    mission.state = 'NOT_STARTED';
    if (mission.todayStartedCount > 0) {
      mission.todayStartedCount -= 1;
    }

    // 204 No Content 응답
    return new HttpResponse(null, { status: 204 });
  }),
];
