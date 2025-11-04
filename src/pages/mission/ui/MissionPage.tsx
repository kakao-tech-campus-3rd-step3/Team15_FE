import { useState } from 'react';

import {
  CategoryFilter,
  MissionsList,
  StatsSection,
  TitleSection,
  useTodayMissions,
} from '@/features/mission';
import type { MissionCategory } from '@/features/mission/types/mission';

export function MissionPage() {
  const categories: MissionCategory[] = ['ALL', 'ROUTINE', 'ACTIVITY', 'COMMUNICATION', 'ETC'];
  const [selectedCategory, setSelectedCategory] = useState<MissionCategory>('ALL');
  const { data: missions } = useTodayMissions();

  if (!missions) return null;
  const filteredMissions =
    selectedCategory === 'ALL'
      ? missions
      : missions.filter((mission) => mission.category === selectedCategory);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-4xl px-4 py-8'>
        <TitleSection />

        <StatsSection />

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
