// utils/recommendMission.ts
import type { MissionCategory, MissionResponse } from '@/features/mission/types/mission';

export const getRecommendedMissions = (missions: MissionResponse[]): MissionResponse[] => {
  const recent: MissionResponse[] = JSON.parse(localStorage.getItem('recentCompleted') || '[]');
  if (recent.length === 0) return [];

  // 1️⃣ 가장 많이 한 카테고리 계산
  const categoryCount = recent.reduce<Record<MissionCategory, number>>(
    (acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    },
    { ALL: 0, ROUTINE: 0, ACTIVITY: 0, COMMUNICATION: 0, ETC: 0 },
  );
  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0];

  // 2️⃣ 가장 최근 미션의 난이도
  const lastLevel = recent[0].level;

  // 3️⃣ 추천 필터
  const recommended = missions.filter(
    (m) => m.state === 'NOT_STARTED' && m.category === topCategory && m.level === lastLevel,
  );

  // 4️⃣ 없으면 비슷한 카테고리나 낮은 난이도로 fallback
  if (recommended.length === 0) {
    return missions.filter(
      (m) => m.state === 'NOT_STARTED' && (m.category === topCategory || m.level === 'BEGINNER'),
    );
  }

  return recommended.slice(0, 3); // 상위 3개 추천
};
