// export type MissionCategory = '전체' | '일상' | '활동' | '소통' | '기타'; // 카테고리 나중에 DB 정의에 맞게 수정
export type MissionCategory = 'ALL' | 'ROUTINE' | 'ACTIVITY' | 'COMMUNICATION' | 'ETC';
export type MissionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type MissionDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

// API 응답 타입
export interface MissionResponse {
  id: number;
  title: string;
  content: string;
  point: number;
  category: MissionCategory;
  level: MissionDifficulty;
  active: boolean;
  todayStartedCount: number;
  todayCompletedCount: number;
  state: MissionStatus;
}

export interface MissionStats {
  completedCount: number;
  inProgressCount: number;
  earnedPoints: number;
}
