import { StatCard } from '@/shared/ui/stat-card';

interface BadgeStatsProps {
  earnedCount: number;
  progressCount: number;
  lockedCount: number;
  allCount: number;
}

export function BadgeStats({ earnedCount, progressCount, lockedCount, allCount }: BadgeStatsProps) {
  const statsData = [
    { label: '획득한 뱃지', value: earnedCount, color: 'text-green-600' },
    { label: '진행 중인 뱃지', value: progressCount, color: 'text-blue-600' },
    { label: '잠긴 뱃지', value: lockedCount, color: 'text-gray-600' },
    { label: '완료한 미션', value: allCount, color: 'text-purple-600' },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
      {statsData.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
