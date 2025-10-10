import { Progress } from '@/shared/ui/progress';
import { getColorClasses, getRarityColor } from '../lib/badgeUtils';
import { Card, CardContent } from '@/shared/ui/card';
import { Lock } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import type { BadgeType } from '../types.ts/badge';

// 공통 뱃지 카드 컴포넌트
export function BadgeCard({ badge }: { badge: BadgeType }) {
  const IconComponent = badge.icon;
  const colors = getColorClasses(badge.color, badge.status !== 'locked');
  const progressPercent =
    badge.status === 'in-progress' && badge.progress && badge.target
      ? (badge.progress / badge.target) * 100
      : null;

  return (
    <Card
      className={`${colors.border} transition-shadow hover:shadow-lg ${
        badge.status === 'locked' ? 'opacity-75' : ''
      }`}
    >
      <CardContent className='p-6'>
        <div className='flex items-start space-x-4'>
          <div
            className={`h-16 w-16 ${colors.bg} relative flex items-center justify-center rounded-full`}
          >
            <IconComponent className={`h-8 w-8 ${colors.text}`} />
            {badge.status === 'locked' && (
              <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-20'>
                <Lock className='h-6 w-6 text-gray-500' />
              </div>
            )}
          </div>

          <div className='flex-1'>
            <div className='mb-2 flex items-center space-x-2'>
              <h3
                className={`font-semibold ${
                  badge.status === 'locked' ? 'text-gray-500' : 'text-gray-900'
                }`}
              >
                {badge.name}
              </h3>
              <Badge className={getRarityColor(badge.rarity)} variant='secondary'>
                {badge.rarity}
              </Badge>
            </div>

            <p
              className={`mb-3 text-sm ${
                badge.status === 'locked' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {badge.description}
            </p>

            {/* 상태별 표시 */}
            {badge.status === 'earned' && (
              <div className='flex items-center justify-between text-xs text-gray-500'>
                <span>카테고리: {badge.category}</span>
                <span>획득일: {badge.earnedDate}</span>
              </div>
            )}

            {badge.status === 'in-progress' && (
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-xs text-gray-500'>
                  <span>카테고리: {badge.category}</span>
                  <span>
                    {badge.progress}/{badge.target}
                  </span>
                </div>
                <Progress value={progressPercent ?? 0} className='h-2' />
                <div className='text-center text-xs text-gray-500'>
                  {progressPercent?.toFixed(0)}% 완료
                </div>
              </div>
            )}

            {badge.status === 'locked' && (
              <div className='space-y-1'>
                <div className='text-xs text-gray-400'>카테고리: {badge.category}</div>
                <div className='text-xs italic text-gray-500'>{badge.requirement}</div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
