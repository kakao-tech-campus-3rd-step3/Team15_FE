import * as React from 'react';
import { Bot, MessageSquare, ShieldCheck, Send } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';

export function ChatbotIntroSection() {
  return (
    <section
      aria-labelledby='chatbot-intro-title'
      className='mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24'
    >
      <div className='grid items-center gap-10 md:gap-12 lg:grid-cols-2'>
        {/* Left: Illustration / Image */}
        <Card className='border-muted/40 from-muted/60 to-background order-2 overflow-hidden bg-gradient-to-br shadow-sm lg:order-1'>
          <CardContent className='relative isolate aspect-[4/3] p-0'>
            {/* Background accents */}
            <div className='bg-primary/10 pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full blur-3xl' />
            <div className='pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl' />

            {/* Bot Illustration Box */}
            <div className='flex h-full w-full items-center justify-center'>
              <div className='bg-background/70 relative z-10 flex h-[420px] w-[320px] flex-col overflow-hidden rounded-2xl border shadow-sm backdrop-blur md:h-[500px] md:w-[380px]'>
                {/* Chat header */}
                <div className='bg-card/60 flex items-center gap-3 border-b px-4 py-3 backdrop-blur'>
                  <div className='bg-background flex h-8 w-8 items-center justify-center rounded-full border'>
                    <Bot className='text-primary h-4 w-4' />
                  </div>
                  <div>
                    <div className='text-sm font-semibold'>AI 상담 챗봇</div>
                    <div className='text-muted-foreground text-xs'>지금 응답할 준비가 되었어요</div>
                  </div>
                </div>

                {/* Chat messages scroll area */}
                <div className='relative grid flex-1 gap-3 overflow-hidden px-4 py-4'>
                  <div className='absolute inset-0 -z-10 bg-[radial-gradient(120px_80px_at_20%_10%,rgba(99,102,241,0.08),transparent),radial-gradient(160px_100px_at_80%_90%,rgba(16,185,129,0.08),transparent)]' />
                  <div className='flex flex-col gap-3 overflow-y-auto pr-2'>
                    {/* Bot message */}
                    <div className='max-w-[85%] self-start'>
                      <div className='bg-muted text-foreground relative rounded-2xl rounded-bl-md px-4 py-2 text-sm shadow-sm'>
                        안녕하세요. 요즘 어떤 점이 가장 힘들게 느껴지시나요?
                        <span className='bg-muted absolute -left-1 bottom-2 h-2 w-2 rotate-45' />
                      </div>
                      <div className='text-muted-foreground mt-1 text-[10px]'>오전 9:02</div>
                    </div>

                    {/* User message */}
                    <div className='max-w-[85%] self-end'>
                      <div className='bg-primary text-primary-foreground relative rounded-2xl rounded-br-md px-4 py-2 text-sm shadow-sm'>
                        잠이 잘 오지 않고, 자꾸 불안해져요.
                        <span className='bg-primary absolute -right-1 bottom-2 h-2 w-2 rotate-45' />
                      </div>
                      <div className='text-muted-foreground mt-1 text-right text-[10px]'>
                        오전 9:03
                      </div>
                    </div>

                    {/* Bot message */}
                    <div className='max-w-[85%] self-start'>
                      <div className='bg-muted text-foreground relative rounded-2xl rounded-bl-md px-4 py-2 text-sm shadow-sm'>
                        불안이 심해지는 순간을 함께 살펴볼게요. 특히 어떤 상황에서 가장
                        두드러지나요?
                        <span className='bg-muted absolute -left-1 bottom-2 h-2 w-2 rotate-45' />
                      </div>
                      <div className='text-muted-foreground mt-1 text-[10px]'>오전 9:04</div>
                    </div>

                    {/* Typing indicator */}
                    <div className='max-w-[60%] self-start'>
                      <div className='bg-muted text-muted-foreground relative flex items-center gap-1 rounded-2xl rounded-bl-md px-3 py-2 text-sm shadow-sm'>
                        <span className='bg-muted-foreground/70 inline-block h-1.5 w-1.5 animate-pulse rounded-full' />
                        <span className='bg-muted-foreground/70 inline-block h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:120ms]' />
                        <span className='bg-muted-foreground/70 inline-block h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:240ms]' />
                        <span className='bg-muted absolute -left-1 bottom-2 h-2 w-2 rotate-45' />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat input mock */}
                <div className='bg-card/60 flex items-center gap-2 border-t px-3 py-3'>
                  <div className='bg-background text-muted-foreground flex-1 rounded-full border px-4 py-2 text-sm'>
                    메시지를 입력하세요…
                  </div>
                  <button
                    type='button'
                    className='bg-primary text-primary-foreground inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition hover:opacity-95'
                    aria-label='send message'
                    disabled
                    title='데모 UI'
                  >
                    <Send className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: Texts & Features */}
        <div className='order-1 space-y-6 lg:order-2'>
          <div className='space-y-3'>
            <Badge className='bg-primary/10 text-primary hover:bg-primary/20'>
              실시간 익명 상담
            </Badge>
            <h2
              id='chatbot-intro-title'
              className='text-balance text-3xl font-extrabold tracking-tight md:text-4xl'
            >
              혼자 고민하지 마세요.
              <br className='hidden md:block' />
              <span className='text-primary'> 상담 챗봇</span>이 곁에 있어요.
            </h2>

            <p className='text-muted-foreground text-pretty'>
              24시간 언제든지 이야기할 수 있는 대화형 상담 파트너입니다. 고민을 안전하게 기록하고,
              상황에 맞는 도움말과 리소스를 추천해 드려요.
            </p>
          </div>

          <Separator className='my-4' />

          {/* Features */}
          <ul className='grid gap-4 sm:grid-cols-2'>
            <Feature
              icon={<MessageSquare className='h-5 w-5' aria-hidden='true' />}
              title='자연스러운 대화'
              desc='문맥을 기억하고 공감하며 대화합니다.'
            />
            <Feature
              icon={<ShieldCheck className='h-5 w-5' aria-hidden='true' />}
              title='안전한 이용'
              desc='비식별·보안 기준을 준수해 기록을 보호합니다.'
            />
          </ul>

          <p className='text-muted-foreground text-xs'>
            * 위 서비스는 정보 제공 목적의 상담 도구이며, 응급상황에서는 지역 응급전화 또는
            전문기관에 연락하세요.
          </p>
        </div>
      </div>
    </section>
  );
}

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const Feature: React.FC<FeatureProps> = ({ icon, title, desc }) => {
  return (
    <li className='bg-card flex items-start gap-3 rounded-lg border p-4 shadow-sm'>
      <div className='bg-background mt-0.5 flex h-8 w-8 items-center justify-center rounded-md border'>
        {icon}
      </div>
      <div>
        <h3 className='font-semibold'>{title}</h3>
        <p className='text-muted-foreground text-sm'>{desc}</p>
      </div>
    </li>
  );
};
