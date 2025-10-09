import { AnimatedSection } from '@/features/scroll-animate/ui/AnimatedSection';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

type Props = {
  title?: string;
  subtitle?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  stats?: { label: string; value: string | number }[];
};

export function HeroShowcase({
  title = '지금, 마음이 오가는 중이에요.',
  subtitle = '사소한 고민부터 깊은 이야기까지, 휴쉼에서 가볍게 시작하세요.',
  ctaPrimaryLabel = '지금 시작하기',
  ctaSecondaryLabel = '마음소식 보러가기',
  onPrimaryClick,
  onSecondaryClick,
  stats = [
    { label: '누적 마음소식', value: '977' },
    { label: '활성 유저', value: '1,240+' },
    { label: '일일 게시글', value: '120' },
  ],
}: Props) {
  return (
    <AnimatedSection from='up'>
      <div className='bg-primary relative py-10'>
        <header className='relative isolate overflow-visible'>
          {/* Full-bleed background band */}
          <div
            aria-hidden
            className='absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2'
          />
          {/* 은은한 배경 장식 */}
          <div className='pointer-events-none absolute inset-0 -z-10'>
            <div className='bg-primary/10 absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl' />
            <div className='absolute -bottom-28 -right-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl' />
          </div>

          {/* 페이지 입장 시 한 번만 자연스럽게 */}
          <div className='container mx-auto max-w-screen-xl px-4 text-left md:px-6'>
            <section className='grid min-h-[70svh] grid-cols-1 items-center gap-10 py-12 md:py-16 lg:grid-cols-[1fr_minmax(520px,560px)]'>
              {/* 왼쪽: 카피 + CTA */}
              <div className='max-w-xl'>
                <AnimatedSection from='up' threshold={0.2}>
                  <div className='mb-4'>
                    <Badge variant='secondary' className='rounded-full'>
                      고민 상담 커뮤니티 · 휴쉼
                    </Badge>
                  </div>
                  <h1 className='text-4xl font-extrabold leading-tight tracking-tight md:text-5xl'>
                    {title}
                  </h1>
                  <p className='text-foreground mt-4 text-lg'>{subtitle}</p>
                </AnimatedSection>

                <AnimatedSection from='up' threshold={0.2} className='mt-8'>
                  <div className='flex flex-wrap items-center gap-3'>
                    <Button size='lg' variant='whiteoutline' onClick={onPrimaryClick}>
                      {ctaPrimaryLabel}
                    </Button>
                    <Button size='lg' variant='whiteoutline' onClick={onSecondaryClick}>
                      {ctaSecondaryLabel}
                    </Button>
                  </div>
                  {/* 필요하면 검색 인풋 사용
              <div className="mt-4 max-w-md">
                <Input placeholder="마음소식 검색…" />
              </div>
              */}
                </AnimatedSection>

                {/* 소셜 프루프/통계 */}
                <AnimatedSection from='up' threshold={0.3} className='mt-8'>
                  <ul className='text-foreground flex flex-wrap gap-6 text-sm'>
                    {stats.map((s) => (
                      <li key={s.label}>
                        <span className='text-foreground text-base font-semibold'>{s.value}</span>{' '}
                        <span className='ml-1'>{s.label}</span>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              </div>

              {/* 오른쪽: 미니 보드 프리뷰(서비스 감 잡는 목업) */}
              <AnimatedSection from='left' threshold={0.2}>
                <div className='relative'>
                  <div className='bg-card rounded-2xl border p-5 shadow-sm'>
                    <div className='flex items-center justify-between'>
                      <span className='font-semibold'>마음소식 최신글</span>
                      <Badge variant='outline'>실시간</Badge>
                    </div>

                    <div className='mt-4 grid gap-3'>
                      {MOCK_POSTS.map((p) => (
                        <div
                          key={p.id}
                          className='bg-background/50 hover:bg-background rounded-xl border px-4 py-3 transition'
                        >
                          <div className='text-primary text-sm font-medium'>{p.category}</div>
                          <div className='mt-0.5 font-semibold'>{p.title}</div>
                          <div className='text-muted-foreground truncate text-sm'>{p.content}</div>
                          <div className='text-muted-foreground mt-2 flex items-center gap-4 text-xs'>
                            <span>❤️ {p.likes}</span>
                            <span>💬 {p.comments}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 카드가 둥둥 뜨는 느낌의 레이어드 카드 */}
                  <div className='pointer-events-none hidden lg:block'>
                    <div className='bg-card absolute -bottom-8 -right-10 w-56 rotate-3 rounded-xl border p-4 shadow-md'>
                      <div className='text-muted-foreground text-sm'>오늘의 미션</div>
                      <div className='mt-1 font-semibold'>“하루 10분 산책하기”</div>
                      <div className='text-muted-foreground mt-2 text-xs'>완료율 67%</div>
                    </div>
                    <div className='bg-card absolute -left-10 -top-8 w-56 -rotate-2 rounded-xl border p-4 shadow-md'>
                      <div className='text-muted-foreground text-sm'>지원사업</div>
                      <div className='mt-1 font-semibold'>멘탈케어 프로그램</div>
                      <div className='text-muted-foreground mt-2 text-xs'>D-7 모집중</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </section>
          </div>
        </header>
      </div>
    </AnimatedSection>
  );
}

const MOCK_POSTS = [
  {
    id: 1,
    category: '자유',
    title: '오늘의 일상',
    content: '날씨가 좋네요.',
    likes: 2,
    comments: 0,
  },
  {
    id: 2,
    category: '고민상담',
    title: '요즘 걱정이 많아요',
    content: '시험이 다가오네요.',
    likes: 5,
    comments: 2,
  },
  {
    id: 3,
    category: '취미',
    title: '러닝 시작했어요',
    content: '5km 완주!',
    likes: 3,
    comments: 1,
  },
];
