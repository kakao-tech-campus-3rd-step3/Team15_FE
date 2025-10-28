import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/button';

import { CategoryFilter, MissionsList, StatsSection, TitleSection } from '@/features/mission';
import type { Mission, MissionCategory, MissionStats } from '@/features/mission/types/mission';

const mockMissions = [
  {
    id: 1,
    title: '하루 10분 명상하기',
    description: '아침에 일어나서 10분간 조용히 자신과 마주해보세요.',
    category: '마음챙김',
    points: 50,
    completionCount: 300,
    status: 'completed',
    difficulty: '쉬움',
  },
  {
    id: 2,
    title: '하루 30분 산책하기',
    description: '날씨가 좋을 때 밖으로 나가서 자연을 느껴보세요.',
    category: '운동',
    points: 50,
    completionCount: 1247,
    status: 'available',
    difficulty: '보통',
  },
  {
    id: 3,
    title: '책 한 챕터 읽기',
    description: '관심 있는 책을 골라 한 챕터를 천천히 읽어보세요.',
    category: '독서',
    points: 30,
    completionCount: 156,
    status: 'available',
    difficulty: '쉬움',
  },
  {
    id: 4,
    title: '가족에게 연락하기',
    description: '오늘 하루 어땠는지 가족에게 전화나 메시지를 보내보세요.',
    category: '소통',
    points: 40,
    completionCount: 89,
    status: 'in_progress',
    difficulty: '보통',
  },
  {
    id: 5,
    title: '좋아하는 음악 듣기',
    description: '마음을 편안하게 해주는 음악을 30분간 들어보세요.',
    category: '취미',
    points: 20,
    completionCount: 234,
    status: 'available',
    difficulty: '쉬움',
  },
  {
    id: 6,
    title: '감사 일기 쓰기',
    description: '오늘 감사했던 일 3가지를 적어보세요.',
    category: '마음챙김',
    points: 30,
    completionCount: 178,
    status: 'in_progress',
    difficulty: '쉬움',
  },
  {
    id: 7,
    title: '스트레칭 10분',
    description: '몸을 가볍게 풀어주는 스트레칭을 해보세요.',
    category: '운동',
    points: 30,
    completionCount: 412,
    status: 'available',
    difficulty: '쉬움',
  },
  {
    id: 8,
    title: '새로운 레시피 시도하기',
    description: '간단한 요리를 직접 만들어보세요.',
    category: '취미',
    points: 60,
    completionCount: 67,
    status: 'available',
    difficulty: '어려움',
  },
] as const;

export function MissionPage() {
  const [selectedCategory, setSelectedCategory] = useState<MissionCategory>('전체');
  const missions: Mission[] = mockMissions;
  const stats: MissionStats = {
    completedCount: 20,
    inProgressCount: 100,
    totalPoints: 1000,
  };

  // const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories: MissionCategory[] = ['전체', '마음챙김', '운동', '독서', '소통', '취미'];

  const filteredMissions =
    selectedCategory === '전체'
      ? missions
      : missions.filter((mission) => mission.category === selectedCategory);

  const totalPages = Math.ceil(filteredMissions.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentMissions = filteredMissions.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // if (loading) {
  //   return (
  //     <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50'>
  //       <div className='text-green-600'>로딩 중...</div>
  //     </div>
  //   );
  // }

  const startMission = (id: number) => {
    console.log(id);
  };
  const completeMission = (id: number) => {
    console.log(id);
  };

  const cancelMission = (id: number) => {
    console.log(id);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-4xl px-4 py-8'>
        <TitleSection />

        <StatsSection stats={stats} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Missions List */}
        <MissionsList
          missions={filteredMissions}
          startMission={startMission}
          completeMission={completeMission}
          cancelMission={cancelMission}
        />

        {filteredMissions.length === 0 && (
          <div className='py-12 text-center text-gray-500'>해당 카테고리의 미션이 없습니다.</div>
        )}

        {/* Pagination Controls */}
        {filteredMissions.length > 0 && totalPages > 1 && (
          <div className='mt-8 flex items-center justify-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className='h-9 w-9'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>

            <div className='flex items-center gap-1'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page
                      ? 'h-9 w-9 bg-green-500 text-white hover:bg-green-600'
                      : 'h-9 w-9 bg-white hover:bg-gray-50'
                  }
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className='h-9 w-9'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
