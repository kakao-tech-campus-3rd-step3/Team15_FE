import { usePostStatsQuery } from '@/entities/post/model/usePostStatsQuery';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

export function HeroSection() {
  const { isLoggedIn } = useAuthStore();
  // const { data } = usePostStatsQuery();

  return (
    <section className='py-10 text-center'>
      {isLoggedIn && <h1 className='text-primary text-4xl font-extrabold tracking-tight'>휴쉼</h1>}
      {/* {data && (
        <p className='mt-2 text-4xl font-bold'>
          지금, {data.totalCount}개의 마음이 오가는 중이에요.
        </p>
      )} */}
      <p className='text-muted-foreground mt-4'>
        사소한 생각부터 소중한 기분까지, 어떤 마음이든 여기 남겨도 괜찮아요.
      </p>
    </section>
  );
}
