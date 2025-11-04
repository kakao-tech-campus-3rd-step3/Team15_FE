import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Badge } from '@/shared/ui/badge';

import { AnimatedSection } from '@/features/scroll-animate/ui/AnimatedSection';

export function GuidePage() {
  return (
    <div className='px-6 py-10 sm:px-10 lg:px-16'>
      {/* Hero */}
      <AnimatedSection from='up'>
        <header className='mx-auto max-w-4xl text-center'>
          <Badge className='mb-3'>휴쉼 가이드</Badge>
          <h1 className='text-3xl font-extrabold leading-tight md:text-4xl'>
            휴쉼을 더 편하게, 더 안전하게 사용하는 방법
          </h1>
          <p className='text-muted-foreground mt-3'>
            글 올리기부터 신고/차단, 카테고리 구독까지—필요한 기능들을 한눈에 정리했어요.
          </p>
        </header>
      </AnimatedSection>

      {/* Quick Start Cards */}

      <section className='mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <AnimatedSection from='left'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle>1) 맞춤 피드 설정</CardTitle>
              <CardDescription>카테고리/정렬/검색으로 원하는 글만 보기</CardDescription>
            </CardHeader>
            <CardContent className='text-muted-foreground text-sm'>
              상단 필터바에서 카테고리를 고르고, 최신순/공감순으로 정렬하세요. 키워드 검색도
              지원합니다.
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection from='up'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle>2) 안전한 익명</CardTitle>
              <CardDescription>익명/작성자 표시 토글로 내 정보 보호</CardDescription>
            </CardHeader>
            <CardContent className='text-muted-foreground text-sm'>
              글·댓글 작성 시 익명 여부를 선택할 수 있고, 신고/차단 기능으로 불쾌한 경험을 줄일 수
              있어요.
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection from='right'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle>3) 보기 방식 전환</CardTitle>
              <CardDescription>그리드 ↔ 리스트 1줄 보기 스위치</CardDescription>
            </CardHeader>
            <CardContent className='text-muted-foreground text-sm'>
              상단 우측의 뷰 스위치로 한 줄에 게시글 하나씩 보는 리스트 모드로 바꿀 수 있습니다.
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>

      {/* Tips */}
      <section className='mx-auto mt-12 max-w-5xl'>
        <AnimatedSection from='left'>
          <h2 className='text-2xl font-bold'>사용 팁</h2>
        </AnimatedSection>
        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          <AnimatedSection from='left'>
            <Card>
              <CardHeader>
                <CardTitle>키보드 탐색</CardTitle>
                <CardDescription>한 번에 빠르게 이동</CardDescription>
              </CardHeader>
              <CardContent className='text-muted-foreground text-sm'>
                검색창 포커스, 다음 카드로 이동 등 키보드 단축키를 점차 확장할 예정입니다.
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection from='right'>
            <Card>
              <CardHeader>
                <CardTitle>접근성</CardTitle>
                <CardDescription>누구에게나 편한 사용 경험</CardDescription>
              </CardHeader>
              <CardContent className='text-muted-foreground text-sm'>
                대비/폰트/포커스 표시를 강화하고 스크린리더 호환성을 개선하고 있습니다.
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      <Separator className='my-12' />
    </div>
  );
}
