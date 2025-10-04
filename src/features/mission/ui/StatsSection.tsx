import { Card } from '@/shared/ui/shadcn/card';
import type { MissionStats } from '../types/mission';

interface Props {
  stats: MissionStats;
}

export const StatsSection = ({ stats }: Props) => (
  <Card className='mb-6 bg-white p-6'>
    <div className='grid grid-cols-3 gap-4 text-center'>
      <div>
        <div className='mb-1 text-3xl font-bold text-green-600'>{stats.completedCount}</div>
        <div className='text-sm text-gray-600'>완료한 미션</div>
      </div>
      <div>
        <div className='mb-1 text-3xl font-bold text-green-600'>{stats.inProgressCount}</div>
        <div className='text-sm text-gray-600'>진행 중</div>
      </div>
      <div>
        <div className='mb-1 text-3xl font-bold text-green-600'>{stats.totalPoints}</div>
        <div className='text-sm text-gray-600'>획득 포인트</div>
      </div>
    </div>
  </Card>
);
