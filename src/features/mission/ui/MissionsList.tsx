import { Star, Users } from 'lucide-react';

import { Badge } from '@/shared/ui/shadcn/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

import { getStatusBadge } from '../lib/missionUtils';
import { useCancelMission } from '../api/useCancelMission';
import { useCompleteMission } from '../api/useCompleteMission';
import { useStartMission } from '../api/useStartMission';
// import { useTodayMissions } from '../api/useTodayMissions';
import type { MissionResponse } from '../types/mission';

interface Props {
  missions: MissionResponse[];
}

export const MissionsList = ({ missions }: Props) => {
  // const { data: missions } = useTodayMissions();
  const { mutate: cancelMission } = useCancelMission();
  const { mutate: completeMission } = useCompleteMission();
  const { mutate: startMission } = useStartMission();

  if (!missions) return null;

  if (missions.length === 0) {
    return <div className='py-12 text-center text-gray-500'>해당 카테고리의 미션이 없습니다.</div>;
  }

  return (
    <>
      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
        {missions.map((mission) => {
          const statusBadge = getStatusBadge(mission.state);
          const isCompleted = mission.state === 'COMPLETED';
          const isInProgress = mission.state === 'IN_PROGRESS';
          const isAvailable = mission.state === 'NOT_STARTED';

          return (
            <Card key={mission.id} className={`p-5 ${isCompleted ? 'bg-gray-50' : 'bg-white'}`}>
              <div className='mb-3 flex items-start justify-between'>
                <Badge className={statusBadge.color}>{statusBadge.text}</Badge>
                <span className='text-xs text-gray-500'>{mission.level}</span>
              </div>

              <h3
                className={`mb-2 text-lg font-bold ${isCompleted ? 'text-gray-500' : 'text-gray-900'}`}
              >
                {mission.title}
              </h3>

              <p className={`mb-4 text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                {mission.content}
              </p>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 text-sm'>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' />
                    <span className={isCompleted ? 'text-gray-400' : 'text-gray-700'}>
                      {mission.point} 포인트
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Users className='h-4 w-4 text-gray-400' />
                    <span className='text-gray-500'>{mission.todayStartedCount}명 진행 중</span>
                  </div>
                </div>

                {isCompleted && (
                  <Button disabled variant='outline' size='sm' className='bg-gray-100'>
                    완료됨
                  </Button>
                )}

                {isInProgress && (
                  <div className='flex gap-2'>
                    <Button onClick={() => cancelMission(mission.id)} variant='outline' size='sm'>
                      취소
                    </Button>
                    <Button
                      onClick={() => completeMission(mission.id)}
                      className='bg-green-500 hover:bg-green-600'
                      size='sm'
                    >
                      완료하기
                    </Button>
                  </div>
                )}

                {isAvailable && (
                  <Button
                    onClick={() => startMission(mission.id)}
                    className='bg-green-500 hover:bg-green-600'
                    size='sm'
                  >
                    오늘 시작
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};
