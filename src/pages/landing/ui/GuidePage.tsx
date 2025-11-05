import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Badge } from '@/shared/ui/badge';

import { AnimatedSection } from '@/features/scroll-animate/ui/AnimatedSection';

export function GuidePage() {
  return (
    <div className='px-6 py-12 md:px-8 lg:px-12'>
      {/* Hero */}
      <AnimatedSection from='up'>
        <header className='mx-auto max-w-4xl text-center'>
          <Badge className='mb-3'>휴쉼 가이드</Badge>
          <h1 className='text-3xl font-extrabold leading-tight md:text-4xl'>
            휴쉼을 더 편하게, 더 안전하게 사용하는 방법
          </h1>
          <p className='text-muted-foreground mx-auto mt-3 max-w-2xl leading-relaxed'>
            글 올리기부터 신고/차단, 카테고리 구독까지—필요한 기능들을 한눈에 정리했어요.
          </p>
        </header>
      </AnimatedSection>

      {/* Quick Start Cards */}
      <AnimatedSection from='left'>
        <h2 className='mx-auto mt-20 max-w-5xl text-2xl font-bold tracking-tight md:text-3xl'>
          빠른 시작
        </h2>
      </AnimatedSection>

      <ul className='mx-auto mt-12 grid max-w-5xl list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3'>
        <li>
          <AnimatedSection from='up'>
            <Card className='h-full'>
              <CardHeader>
                <CardTitle>1) 맞춤 피드 설정</CardTitle>
                <CardDescription>카테고리/정렬/검색으로 원하는 글만 보기</CardDescription>
              </CardHeader>
              <CardContent className='text-muted-foreground text-sm leading-relaxed'>
                상단 필터바에서 카테고리를 고르고 최신순/공감순으로 정렬하세요. 키워드 검색도
                지원합니다.
              </CardContent>
            </Card>
          </AnimatedSection>
        </li>

        <li>
          <AnimatedSection from='up'>
            <Card className='h-full'>
              <CardHeader>
                <CardTitle>2) 안전한 익명</CardTitle>
                <CardDescription>익명/작성자 표시 토글로 내 정보 보호</CardDescription>
              </CardHeader>
              <CardContent className='text-muted-foreground text-sm leading-relaxed'>
                글·댓글 작성 시 익명 여부를 선택할 수 있고 신고/차단 기능으로 불쾌한 경험을 줄일 수
                있어요.
              </CardContent>
            </Card>
          </AnimatedSection>
        </li>

        <li>
          <AnimatedSection from='up'>
            <Card className='h-full'>
              <CardHeader>
                <CardTitle>3) 보기 방식 전환</CardTitle>
                <CardDescription>그리드 ↔ 리스트 1줄 보기 스위치</CardDescription>
              </CardHeader>
              <CardContent className='text-muted-foreground text-sm leading-relaxed'>
                상단 우측의 뷰 스위치로 리스트(1줄)·그리드 간 빠르게 전환할 수 있어요.
              </CardContent>
            </Card>
          </AnimatedSection>
        </li>
      </ul>

      {/* Tips */}
      <section className='mx-auto mt-12 max-w-5xl'>
        <AnimatedSection from='left'>
          <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>사용 팁</h2>
        </AnimatedSection>
        <ul className='mt-6 grid list-none gap-4 p-0 md:grid-cols-2'>
          <li>
            <AnimatedSection from='left'>
              <Card>
                <CardHeader>
                  <CardTitle>글 작성 팁</CardTitle>
                  <CardDescription>공감과 소통이 잘 되는 글쓰기</CardDescription>
                </CardHeader>
                <CardContent className='text-muted-foreground text-sm leading-relaxed'>
                  진심이 느껴지는 제목과 첫 문장은 독자의 시선을 끌어요. 구체적인 상황이나 감정을
                  솔직하게 표현하면 더 많은 공감을 얻을 수 있습니다.
                </CardContent>
              </Card>
            </AnimatedSection>
          </li>

          <li>
            <AnimatedSection from='right'>
              <Card>
                <CardHeader>
                  <CardTitle>댓글 &amp; 대댓글 작성</CardTitle>
                  <CardDescription>따뜻한 대화 문화를 만들어가요</CardDescription>
                </CardHeader>
                <CardContent className='text-muted-foreground text-sm leading-relaxed'>
                  짧더라도 존중이 느껴지는 댓글은 큰 힘이 됩니다. 상대의 감정에 공감하고, 논쟁보다는
                  위로와 격려의 방향으로 대화를 이어가 보세요.
                </CardContent>
              </Card>
            </AnimatedSection>
          </li>
        </ul>
      </section>

      {/* 상담 챗봇 가이드 */}
      <section className='mx-auto mt-12 max-w-5xl'>
        <AnimatedSection from='left'>
          <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>상담 챗봇 가이드</h2>
        </AnimatedSection>
        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          <AnimatedSection from='up'>
            <Card>
              <CardHeader>
                <CardTitle>상담 챗봇 시작하기</CardTitle>
                <CardDescription>대화 흐름과 기본 사용법</CardDescription>
              </CardHeader>
              <CardContent className='text-muted-foreground space-y-2 text-sm leading-relaxed'>
                <ul className='list-disc space-y-1 pl-5'>
                  <li>
                    상단 메뉴에서 <strong>AI 상담</strong>으로 이동하면 자동으로 세션이 시작돼요.
                  </li>
                  <li>첫 응답이 도착할 때까지 입력창과 추천 문장은 잠시 비활성화돼요.</li>
                  <li>추천 문장(Suggestions)을 누르거나 직접 입력해 메시지를 보낼 수 있어요.</li>
                  <li>AI와 나의 메시지는 각각 아바타로 구분되어 말풍선 형태로 표시돼요.</li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
      <Separator className='my-16' />
    </div>
  );
}
