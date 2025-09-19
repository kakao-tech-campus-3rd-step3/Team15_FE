import { SearchInput } from '@/features/search-posts';
import { YSButton } from '@/shared/ui';

// 임시 통계 데이터(추후 entities/stats 훅으로 교체)
const TEMP_STATS = [
  { label: '총 게시글', value: 128 },
  { label: '이번 주', value: 45 },
  { label: '오늘', value: 12 },
];

export function PostsHeader() {
  return (
    <>
      <section className='space-y-6 pb-10 pt-10'>
        {/* 상단: 검색 / 타이틀 / 글쓰기 버튼 */}
        <div className='grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr]'>
          {/* 좌측: 검색바 */}
          <div className='sm:order-1'>
            <SearchInput />
          </div>

          {/* 중앙: 타이틀 */}
          <h1 className='text-center text-5xl font-extrabold tracking-tight sm:order-2'>게시글</h1>

          {/* 우측: 글쓰기 버튼 + (선택) 뷰 전환 */}
          <div className='flex items-center justify-end gap-2 sm:order-3'>
            {/* 필요 시 뷰 스위치 노출 */}

            <YSButton size='lg'>+ 새 글쓰기</YSButton>
          </div>
        </div>

        {/* 통계 요약 바 */}
        <div className='rounded-xl border border-emerald-100 bg-emerald-50/70 px-6 py-5 pt-10'>
          <ul className='mx-auto grid max-w-3xl grid-cols-3 text-center'>
            {TEMP_STATS.map((s) => (
              <li key={s.label} className='flex flex-col'>
                <span className='text-3xl font-bold text-emerald-700'>{s.value}</span>
                <span className='text-muted-foreground mt-1 text-sm'>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
