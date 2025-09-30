import { usePostStatsQuery } from '@/entities/post/model/usePostStatsQuery';
import { SectionHeader, YSButton } from '@/shared/ui';

export function PostStats() {
  const { data, isLoading, isError } = usePostStatsQuery();
  // 추후 PostStats 스켈레톤UI, 에러UI 필요

  return (
    <section className='space-y-6 pb-10 pt-10'>
      {/* 상단: 검색/타이틀/글쓰기 */}
      <SectionHeader title='게시글' right={<YSButton size='lg'>+ 새 글쓰기</YSButton>} />

      {/* 통계 요약 바 */}
      <div className='rounded-xl border border-emerald-100 bg-emerald-50/70 px-6 py-5 pt-10'>
        {isLoading && (
          <ul className='mx-auto grid max-w-3xl animate-pulse grid-cols-3 text-center'>
            {[0, 1, 2].map((i) => (
              <li key={i} className='flex flex-col items-center gap-2'>
                <span className='h-8 w-16 rounded bg-emerald-200' />
                <span className='h-4 w-14 rounded bg-emerald-100' />
              </li>
            ))}
          </ul>
        )}

        {isError && <p className='text-center text-sm text-red-600'>통계를 불러오지 못했습니다.</p>}

        {data && (
          <ul className='mx-auto grid max-w-3xl grid-cols-3 text-center'>
            <li className='flex flex-col'>
              <span className='text-3xl font-bold text-emerald-700'>{data.totalCount}</span>
              <span className='text-muted-foreground mt-1 text-sm'>총 게시글</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-3xl font-bold text-emerald-700'>{data.weekCount}</span>
              <span className='text-muted-foreground mt-1 text-sm'>이번 주</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-3xl font-bold text-emerald-700'>{data.todayCount}</span>
              <span className='text-muted-foreground mt-1 text-sm'>오늘</span>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}
