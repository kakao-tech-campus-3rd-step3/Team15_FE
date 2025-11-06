import { useState } from 'react';

import {
  CategoryFilter,
  MissionsList,
  StatsSection,
  TitleSection,
  useTodayMissions,
} from '@/features/mission';
import type { MissionCategory } from '@/features/mission/types/mission';
import { getRecommendedMissions } from '@/features/mission/lib/recommendMission';

export function MissionPage() {
  const categories: MissionCategory[] = ['ALL', 'ROUTINE', 'ACTIVITY', 'COMMUNICATION', 'ETC'];
  const [selectedCategory, setSelectedCategory] = useState<MissionCategory>('ALL');
  const { data: missions } = useTodayMissions();

  if (!missions) return null;
  const filteredMissions =
    selectedCategory === 'ALL'
      ? missions
      : missions.filter((mission) => mission.category === selectedCategory);
  const recommended = getRecommendedMissions(missions);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto space-y-6 px-4 py-8'>
        <TitleSection />

        <StatsSection />

        {recommended.length > 0 && (
          <div className='mb-8'>
            <h2 className='mb-4 text-xl font-semibold'>🎯 오늘의 추천 미션</h2>
            <MissionsList missions={recommended} isRecommended />
          </div>
        )}

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Missions List */}
        <MissionsList missions={filteredMissions} />
      </div>
    </div>
  );
}
