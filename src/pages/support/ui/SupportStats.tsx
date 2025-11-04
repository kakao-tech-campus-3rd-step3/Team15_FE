import { useSupportStatsQuery } from '@/entities/support/model/useSupportStats';

export function SupportStats() {
  const { data } = useSupportStatsQuery();
  // 추후 PostStats 스켈레톤UI, 에러UI 필요

  return (
    <div className='rounded-xl border border-emerald-100 bg-emerald-50/70 px-6 py-5 pt-10'>
      <ul className='mx-auto grid max-w-3xl text-center'>
        <span className='text-3xl font-bold text-emerald-700'>{data.count}</span>
        <span className='text-muted-foreground mt-1 text-sm'>진행중인 지원 사업</span>
      </ul>
    </div>
  );
}
