import type { MissionResponse } from '../types/mission';

export const addRecentCompletedMission = (mission: MissionResponse) => {
  const recent = JSON.parse(localStorage.getItem('recentCompleted') || '[]');

  const updated = [
    { category: mission.category, level: mission.level, date: Date.now() },
    ...recent,
  ].slice(0, 5); // 최근 5개까지만 저장
  console.log('data', updated);
  localStorage.setItem('recentCompleted', JSON.stringify(updated));
};
