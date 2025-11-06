import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import type { BaseBadge, EarnedBadge } from '../types/badge';
import { getBadgeKindColor } from '../lib/badgeUtils';

// 획득 여부에 따라 스타일을 달리 보여주는 공통 배지 카드
type BadgeType = BaseBadge | EarnedBadge;

export function BadgeCard({ badge }: { badge: BadgeType }) {
  const isEarned = 'earnedAt' in badge;

  return (
    <Card
      className={`transition-shadow hover:shadow-md ${
        isEarned ? 'opacity-100' : 'opacity-60 grayscale'
      }`}
    >
      <CardContent className='flex items-center space-x-4 p-6'>
        {/* 배지 아이콘 */}
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
          <img src={badge.iconUrl} alt={badge.name} className='h-10 w-10 object-contain' />
        </div>

        {/* 텍스트 영역 */}
        <div className='flex-1'>
          <div className='mb-1 flex flex-col items-start space-y-1'>
            <h3 className='font-semibold text-gray-900'>{badge.name}</h3>
            <Badge className={getBadgeKindColor(badge.kind)} variant='secondary'>
              {badge.kind}
            </Badge>
          </div>

          {/* 획득한 배지 */}
          {isEarned ? (
            <p className='text-sm text-gray-600'>
              획득일: {new Date(badge.earnedAt).toLocaleDateString('ko-KR')}
            </p>
          ) : (
            <p className='text-sm italic text-gray-400'>아직 획득하지 않았습니다</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
