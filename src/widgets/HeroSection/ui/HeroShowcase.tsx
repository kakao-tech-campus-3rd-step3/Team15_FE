import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/shadcn/badge';
import { AnimatedSection } from '@/features/scroll-animate/ui/AnimatedSection';

export function HeroShowcase() {
  return (
    <section className='from-primary via-primary relative isolate overflow-visible bg-gradient-to-r to-emerald-500/90 text-black/70'>
      {/* subtle noise / glow decorations */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl' />
        <div className='absolute -bottom-28 -right-32 h-80 w-80 rounded-full bg-emerald-200/10 blur-3xl' />
      </div>

      <div className='mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-20'>
        {/* Copy */}
        <div>
          <AnimatedSection from='up' className='mb-4'>
            <Badge variant='secondary' className='rounded-full bg-white/15 text-white'>
              고민 상담 커뮤니티 · 휴쉼
            </Badge>
          </AnimatedSection>

          <AnimatedSection from='up'>
            <h2 className='text-3xl font-extrabold leading-tight md:text-4xl'>
              혼자 고민하지 말아요.
              <br />
              함께 털어놓고, 위로와 도움을 받아요.
            </h2>
            <p className='mt-5 text-lg leading-relaxed text-white/85'>
              가벼운 걱정거리부터 상담사의 도움이 필요한 문제까지.
              <br />
              휴쉼에서 안전하게 기록하고 서로를 지지해요.
            </p>
          </AnimatedSection>

          <AnimatedSection from='up' threshold={0.2} className='mt-8'>
            <div className='flex flex-wrap items-center gap-3'>
              <Button size='lg' variant='whiteoutline'>
                지금 시작하기
              </Button>
              <Button size='lg' variant='whiteoutline'>
                가이드 보기
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection from='up' threshold={0.3} className='mt-6'>
            <ul className='flex flex-wrap items-center gap-6 text-sm text-white/80'>
              <li>❤️ 응원 12만+</li>
              <li>💬 댓글 45만+</li>
              <li>🛟 전문가 연계 지원</li>
            </ul>
          </AnimatedSection>
        </div>

        {/* Visual Preview */}
        <AnimatedSection from='left' threshold={0.2}>
          <div className='relative'>
            <div className='rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md'>
              <div className='mt-4 grid gap-3'>
                {MOCK_CARDS.map((c) => (
                  <div
                    key={c.id}
                    className='rounded-xl border border-white/15 bg-white/10 px-4 py-3'
                  >
                    <div className='mt-0.5 font-semibold text-white/70'>{c.title}</div>
                    <div className='truncate text-sm text-white/80'>{c.content}</div>
                    <div className='mt-2 flex items-center gap-4 text-xs text-white/70'>
                      <span>❤️ {c.likes}</span>
                      <span>💬 {c.comments}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* floating cards */}
            <div className='pointer-events-none hidden lg:block'>
              <div className='absolute -bottom-8 -right-10 w-56 rotate-3 rounded-xl border border-white/20 bg-white/15 p-4 shadow-xl backdrop-blur-md'>
                <div className='text-xs text-white/80'>오늘의 미션</div>
                <div className='mt-1 font-semibold text-white/80'>“하루 10분 산책하기”</div>
                <div className='mt-2 text-xs text-white/70'>완료율 67%</div>
              </div>
              <div className='absolute -left-10 -top-8 w-56 -rotate-2 rounded-xl border border-white/20 bg-white/15 p-4 shadow-xl backdrop-blur-md'>
                <div className='text-xs text-white/80'>안심 가이드</div>
                <div className='mt-1 font-semibold text-white/80'>신고/차단 기능 안내</div>
                <div className='mt-2 text-xs text-white/70'>커뮤니티 안전을 지켜요</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

const MOCK_CARDS = [
  {
    id: 1,
    category: '고민상담',
    title: '밤마다 불안해요',
    content: '혼자 있을 때 자꾸 걱정이 밀려와요…',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    category: '익명',
    title: '친구와의 갈등',
    content: '작은 말 한마디에 서로 상처를 주고 말았어요.',
    likes: 18,
    comments: 5,
  },
  {
    id: 3,
    category: '일상',
    title: '오늘은 괜찮아졌어요',
    content: '햇볕 쬐며 산책하고 마음이 한결 가벼워졌어요.',
    likes: 31,
    comments: 12,
  },
];
