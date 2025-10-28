export type MissionCategory = '전체' | '마음챙김' | '운동' | '독서' | '소통' | '취미';

export type MissionStatus = 'available' | 'in_progress' | 'completed' | 'cancelled';

export interface Mission {
  id: number;
  title: string;
  description: string;
  category: MissionCategory;
  points: number;
  completionCount: number;
  status: MissionStatus;
  difficulty: '쉬움' | '보통' | '어려움';
}

export interface MissionStats {
  completedCount: number;
  inProgressCount: number;
  totalPoints: number;
}
