import { usePostStatsQuery } from '@/entities/post/model/usePostStatsQuery';

export function PostStats() {
  const { data } = usePostStatsQuery();
  // 추후 PostStats 스켈레톤UI, 에러UI 필요

  return (
    <div className='rounded-xl border border-emerald-100 bg-emerald-50/70 px-6 py-5 pt-10'>
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
    </div>
  );
}
