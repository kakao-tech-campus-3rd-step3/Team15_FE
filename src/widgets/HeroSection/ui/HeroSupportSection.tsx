import { useSupportStatsQuery } from '@/entities/support/model/useSupportStats';

export function HeroSupportSection() {
  const { data } = useSupportStatsQuery();

  return (
    <section className='py-10 text-center'>
      <h1 className='text-primary text-4xl font-extrabold tracking-tight'>지원사업 통합 안내</h1>

      <p className='mt-2 text-4xl font-bold'>
        지금, 총 {data.count}개의 청년 지원사업이 진행 중이에요.
      </p>
      <p className='text-muted-foreground mt-4'>
        창업, 취업, 문화생활까지 — 당신에게 꼭 맞는 지원사업을 한눈에 찾아보세요.
      </p>
    </section>
  );
}
