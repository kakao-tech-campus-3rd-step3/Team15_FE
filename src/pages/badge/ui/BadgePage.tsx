import { useBadges } from '@/features/badge/api/useBadges';
import { BadgeHeader, BadgeStats, BadgeTabs } from '@/features/badge';
import { Alert } from '@/shared/ui/alert';
import type { BadgeResponse } from '@/features/badge/types.ts/badge';

export function BadgePage() {
  const { data, error, isPending } = useBadges();

  if (isPending) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <div>로딩중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <Alert variant='destructive'>
          <p>뱃지 정보를 불러오는 중 오류가 발생했습니다.</p>
          <p className='text-sm text-gray-500'>{String(error.message)}</p>
        </Alert>
      </div>
    );
  }

  // 정상 응답
  const { earnedBadges, unearnedBadges, allBadges } = (data ?? {}) as BadgeResponse;

  // api 응답 대신 사용
  const allBadge = [...earnedBadges, ...unearnedBadges];

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='mx-auto max-w-6xl space-y-6 px-4'>
        {/* 헤더 */}
        <BadgeHeader />

        {/* 통계 요약 */}
        <BadgeStats
          earnedCount={earnedBadges?.length ?? 0}
          unearnedCount={unearnedBadges?.length ?? 0}
          allCount={allBadges?.length ?? 0}
        />

        {/* 뱃지 탭 */}
        <BadgeTabs
          earnedBadges={earnedBadges ?? []}
          unearnedBadges={unearnedBadges ?? []}
          allBadges={allBadge ?? []}
        />
      </div>
    </div>
  );
}
