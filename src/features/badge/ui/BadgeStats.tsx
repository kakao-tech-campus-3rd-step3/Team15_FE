import { StatCard } from '@/shared/ui/stat-card';

interface BadgeStatsProps {
  earnedCount: number;
  unearnedCount: number;
  allCount: number;
}

export function BadgeStats({ earnedCount, unearnedCount, allCount }: BadgeStatsProps) {
  const statsData = [
    { label: '획득한 뱃지', value: earnedCount, color: 'text-green-600' },
    { label: '진행 중인 뱃지', value: unearnedCount, color: 'text-blue-600' },
    // { label: '잠긴 뱃지', value: lockedCount, color: 'text-gray-600' },
    { label: '모든 뱃지', value: allCount, color: 'text-purple-600' },
  ];

  return (
    <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
      {statsData.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
