import { Card } from '@/shared/ui/shadcn/card';
import { Badge } from '@/shared/ui/shadcn/badge';
import { Button } from '@/shared/ui/shadcn/button';
import { Star, Users } from 'lucide-react';
import type { Mission } from '../types/mission';
import { getStatusBadge } from '../lib/missionUtils';

interface Props {
  missions: Mission[];
  startMission: (id: number) => void;
  completeMission: (id: number) => void;
  cancelMission: (id: number) => void;
}

export const MissionsList = ({ missions, startMission, completeMission, cancelMission }: Props) => {
  return (
    <>
      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
        {missions.map((mission) => {
          const statusBadge = getStatusBadge(mission.status);
          const isCompleted = mission.status === 'completed';
          const isInProgress = mission.status === 'in_progress';
          const isAvailable = mission.status === 'available';

          return (
            <Card key={mission.id} className={`p-5 ${isCompleted ? 'bg-gray-50' : 'bg-white'}`}>
              <div className='mb-3 flex items-start justify-between'>
                <Badge className={statusBadge.color}>{statusBadge.text}</Badge>
                <span className='text-xs text-gray-500'>{mission.difficulty}</span>
              </div>

              <h3
                className={`mb-2 text-lg font-bold ${isCompleted ? 'text-gray-500' : 'text-gray-900'}`}
              >
                {mission.title}
              </h3>

              <p className={`mb-4 text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                {mission.description}
              </p>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 text-sm'>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' />
                    <span className={isCompleted ? 'text-gray-400' : 'text-gray-700'}>
                      {mission.points} 포인트
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Users className='h-4 w-4 text-gray-400' />
                    <span className='text-gray-500'>{mission.completionCount}명 진행 중</span>
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
                    오늘 {mission.category === '운동' ? '운동' : '시작'}
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
