// src/pages/landing/ui/GuideFAQSection.tsx
import { AnimatedSection } from '@/features/scroll-animate/ui/AnimatedSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';

export function GuideFAQSection() {
  return (
    <section className='mx-auto mb-16 max-w-6xl'>
      <AnimatedSection from='left'>
        <h2 className='text-2xl font-bold'>자주 묻는 질문</h2>
        <p className='text-muted-foreground mt-2 text-sm'>핵심 기능에 대한 빠른 답변을 모았어요.</p>
      </AnimatedSection>

      <div className='mt-6'>
        <AnimatedSection from='right'>
          <Accordion type='single' collapsible>
            <AccordionItem value='write'>
              <AccordionTrigger>글/댓글을 익명으로 작성할 수 있나요?</AccordionTrigger>
              <AccordionContent>
                네. 작성 폼에서 <b>익명 여부</b>를 선택하면 익명으로 표시됩니다. 작성자 본인에게만
                수정/삭제 버튼이 보여요.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='report'>
              <AccordionTrigger>부적절한 콘텐츠는 어떻게 신고하나요?</AccordionTrigger>
              <AccordionContent>
                각 글/댓글의 <b>더보기(⋯)</b> 메뉴에서 <b>신고</b>를 선택하고 사유를 고르면 됩니다.
                필요 시 차단도 함께 할 수 있어요.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='view'>
              <AccordionTrigger>게시글을 1줄 리스트로 보려면?</AccordionTrigger>
              <AccordionContent>
                상단 툴바의 <b>보기 전환</b> 스위치를 <b>리스트</b>로 변경하면 1열 레이아웃로
                표시됩니다.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='search'>
              <AccordionTrigger>원하는 주제만 빠르게 찾아볼 수 있나요?</AccordionTrigger>
              <AccordionContent>
                카테고리 필터, 검색어, 정렬(최신/공감)을 조합하면 원하는 글만 빠르게 모아볼 수
                있어요.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}
