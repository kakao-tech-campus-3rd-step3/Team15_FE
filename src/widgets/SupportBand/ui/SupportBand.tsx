import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { useNavigate } from 'react-router-dom';

export function SupportBand() {
  const navigate = useNavigate();
  return (
    <section className='from-primary to-primary/80 relative overflow-hidden bg-gradient-to-br text-white'>
      <div className='mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2'>
        <div>
          <h2 className='text-3xl font-extrabold leading-tight tracking-tight md:text-4xl'>
            휴쉼은 서로를 지지하고 격려하는
            <br />
            고민 상담 커뮤니티예요.
          </h2>
          <p className='mt-5 text-base leading-relaxed opacity-90 md:text-lg'>
            가벼운 걱정거리에서 상담사의 도움이 필요한 문제까지.
            <br />
            마음하나에 털어놓고 응원, 위로, 도움을 받아보세요.
          </p>
          <p className='mt-6 text-lg font-semibold md:text-xl'>
            혼자 고민하지 말아요. 해결할 수 있어요.
          </p>
        </div>

        {/* 일러스트: 필요하면 img로 교체 (shared/assets 경로) */}
        <div className='relative flex items-center justify-center'>
          <div className='absolute -top-10 right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl' />
          <div className='absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-xl' />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            className='h-72 w-72 drop-shadow-xl md:h-80 md:w-80'
            fill='none'
            aria-hidden='true'
          >
            {/* subtle background halo */}
            <circle cx='128' cy='128' r='120' fill='#ecfdf5' opacity='0.35' />

            {/* stem */}
            <path
              d='M128 172c0-22 0-44 0-66'
              stroke='#047857'
              strokeWidth='8'
              strokeLinecap='round'
            />

            {/* left leaf */}
            <path d='M128 120c-26-2-42-15-48-32 22-2 39 4 49 17 6 8 7 12-1 15z' fill='#10b981' />

            {/* right leaf */}
            <path d='M128 120c26-2 42-15 48-32-22-2-39 4-49 17-6 8-7 12 1 15z' fill='#34d399' />

            {/* junction node */}
            <circle cx='128' cy='122' r='5' fill='#059669' />

            {/* soft base shadow */}
            <ellipse cx='128' cy='212' rx='44' ry='10' fill='#064e3b' opacity='0.08' />
          </svg>
        </div>
      </div>
    </section>
  );
}
