export function SupportBand() {
  return (
    <section className='bg-primary text-white'>
      <div className='mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2'>
        <div>
          <h2 className='text-3xl font-extrabold leading-tight'>
            휴쉼은 서로를 지지하고 격려하는
            <br />
            고민 상담 커뮤니티예요.
          </h2>
          <p className='mt-5 text-lg leading-relaxed opacity-90'>
            가벼운 걱정거리에서 상담사의 도움이 필요한 문제까지.
            <br />
            마음하나에 털어놓고 응원, 위로, 도움을 받아보세요.
          </p>
          <p className='mt-6 text-xl font-bold'>혼자 고민하지 말아요. 해결할 수 있어요.</p>
          <a href='/guide' className='mt-8 inline-block underline underline-offset-4'>
            마음하나 이렇게 활용해봐요. →
          </a>
        </div>

        {/* 일러스트: 필요하면 img로 교체 (shared/assets 경로) */}
        <div className='flex items-center justify-center'>
          <svg
            className='h-64 w-64'
            viewBox='0 0 256 256'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <circle cx='128' cy='128' r='120' fill='black' opacity='0.08' />
            <path
              d='M170 96c0 23-42 34-42 58 0-24-42-35-42-58 0-19 16-34 36-34s36 15 36 34Z'
              fill='white'
            />
            <path d='M106 168h44c10 0 18 8 18 18v10H88v-10c0-10 8-18 18-18Z' fill='white' />
            <circle cx='112' cy='112' r='6' fill='black' />
            <circle cx='144' cy='112' r='6' fill='black' />
            <path d='M108 136c6 6 34 6 40 0' stroke='black' strokeWidth='4' strokeLinecap='round' />
            <path
              d='M206 54l-14 14M192 54l14 14'
              stroke='black'
              strokeWidth='8'
              strokeLinecap='round'
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
