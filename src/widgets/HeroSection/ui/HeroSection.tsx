import { useEffect, useState } from 'react';

export function HeroSection() {
  const read = () =>
    typeof localStorage !== 'undefined' && localStorage.getItem('app:isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(read());

  useEffect(() => {
    const handle = () => setIsLoggedIn(read());
    window.addEventListener('auth:change', handle);
    window.addEventListener('storage', handle);
    return () => {
      window.removeEventListener('auth:change', handle);
      window.removeEventListener('storage', handle);
    };
  }, []);
  // 로그인 구현 전 임시

  return (
    <section className='py-10 text-center'>
      {!isLoggedIn && <h1 className='text-primary text-4xl font-extrabold tracking-tight'>휴쉼</h1>}
      <p className='mt-2 text-4xl font-bold'>지금, 1,621개의 마음이 오가는 중이에요.</p>
      <p className='text-muted-foreground mt-4'>
        사소한 생각부터 소중한 기분까지, 어떤 마음이든 여기 남겨도 괜찮아요.
      </p>
    </section>
  );
}
