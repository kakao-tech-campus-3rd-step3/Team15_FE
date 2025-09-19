import { usePostStatsQuery } from '@/entities/post/model/usePostStatsQuery';
import { SearchInput } from '@/features/search-posts';
import { YSButton } from '@/shared/ui';

export function PostStars() {
  const { data, isLoading, isError } = usePostStatsQuery();

  return (
    <section className='space-y-6 pb-10 pt-10'>
      {/* 상단: 검색/타이틀/글쓰기 */}
      <div className='grid grid-cols-1 items-center gap-3 px-5 sm:grid-cols-[1fr_auto_1fr]'>
        <div className='w-full max-w-xs sm:order-1'>
          <SearchInput />
        </div>
        <h1 className='text-center text-5xl font-extrabold tracking-tight sm:order-2'>게시글</h1>
        <div className='flex items-center justify-end gap-2 sm:order-3'>
          <YSButton size='lg'>+ 새 글쓰기</YSButton>
        </div>
      </div>

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
