import { Heart, Send } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/utils';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useEffect, useState } from 'react';
import { useStartCounsel } from '@/entities/counsel/model/useStartCounsel';
import { useSendCounselMessage } from '@/entities/counsel/model/useSendCounselMessage';
import { useEndCounsel } from '@/entities/counsel/model/useEndCounsel';
import { useCounselSession } from '@/shared/session/counselSessionStore';

const SUGGESTIONS = [
  '요즘 우울한 기분이 계속돼요',
  '사람들과 어떻게 대화해야 할지 모르겠어요',
  '집에만 있다 보니 무기력해져요',
  '미래가 불안하고 걱정돼요',
];

const AI_AVATAR_URL: string | undefined = undefined; // e.g., '/images/ai-bot.png'
const USER_AVATAR_URL: string | undefined = undefined; // e.g., user profile image path

export function ChatbotPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const { sessionId } = useCounselSession();
  const { mutate: end } = useEndCounsel();

  const { mutate: start } = useStartCounsel();
  useEffect(() => {
    start(undefined, {
      onSuccess: (data: { reply: string }) => {
        setMessages([{ role: 'ai', content: data.reply }]);
        setIsInitialLoading(false);
      },
      onSettled: () => setIsInitialLoading(false),
    });
  }, [start]);

  useEffect(() => {
    return () => {
      if (sessionId) {
        end();
      }
    };
  }, [sessionId, end]);

  const sendMutation = useSendCounselMessage();
  const isSending = sendMutation.isPending;

  return (
    <div className='bg-background flex h-dvh w-full flex-col'>
      {/* Body */}
      <main className='mx-auto flex w-full max-w-4xl flex-1 flex-col px-4'>
        <ScrollArea className='flex-1'>
          <div className='mx-auto flex max-w-4xl flex-col items-center py-10'>
            {/* Hero Icon */}
            <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50'>
              <Heart className='h-8 w-8' />
            </div>

            {/* Title */}
            <h1 className='text-center text-xl font-extrabold tracking-tight md:text-2xl'>
              마음 상담사와 대화하기
            </h1>
            <p className='text-muted-foreground mt-2 text-center text-sm'>
              혼자 있는 시간이 많아 힘드시거나, 마음이 답답하실 때 먼저 편히 이야기해주세요.
            </p>

            {/* Messages */}
            <div className='mt-8 flex w-full flex-col gap-3'>
              {messages.map((m, i) => {
                const isUser = m.role === 'user';
                return (
                  <div
                    key={i}
                    className={cn('mt-5 flex w-full', isUser ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={cn(
                        'flex max-w-[85%] items-end gap-2',
                        isUser && 'flex-row-reverse',
                      )}
                    >
                      {/* Avatar */}
                      <Avatar className='h-8 w-8 shrink-0'>
                        {isUser ? (
                          <>
                            <AvatarImage src={USER_AVATAR_URL} alt='Me' />
                            <AvatarFallback>ME</AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src={AI_AVATAR_URL} alt='AI' />
                            <AvatarFallback>AI</AvatarFallback>
                          </>
                        )}
                      </Avatar>

                      {/* Bubble */}
                      <div
                        className={cn(
                          'rounded-2xl px-4 py-2 text-sm',
                          isUser ? 'bg-emerald-100 text-emerald-900' : 'bg-muted text-foreground',
                        )}
                      >
                        {m.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div className='mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
                {SUGGESTIONS.map((text) => (
                  <Button
                    key={text}
                    variant='outline'
                    className={cn(
                      'h-14',
                      (isSending || isInitialLoading) && 'pointer-events-none opacity-60',
                    )}
                    disabled={isSending || isInitialLoading}
                    onClick={() => {
                      if (isSending || isInitialLoading) return;
                      setShowSuggestions(false);
                      setMessages((prev) => [...prev, { role: 'user', content: text }]);
                      sendMutation.mutate(text, {
                        onSuccess: (data: { reply: string }) => {
                          setMessages((prev) => [...prev, { role: 'ai', content: data.reply }]);
                        },
                      });
                    }}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </main>

      {/* Composer */}
      <div className='bg-background/80 sticky bottom-0 z-40 border-t backdrop-blur'>
        <div className='mx-auto flex w-full max-w-4xl items-center gap-2 px-4 py-3'>
          <Input
            placeholder='마음 편히 이야기해주세요...'
            className={cn('h-11 flex-1')}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isSending || isInitialLoading}
          />
          <Button
            size='icon'
            className='h-11 w-11'
            disabled={isSending || isInitialLoading}
            onClick={() => {
              if (isSending || isInitialLoading) return;
              const text = inputValue.trim();
              if (!text) return;
              setShowSuggestions(false);
              sendMutation.mutate(text, {
                onSuccess: (data: { reply: string }) => {
                  setMessages((prev) => [
                    ...prev,
                    { role: 'user', content: text },
                    { role: 'ai', content: data.reply },
                  ]);
                  setInputValue('');
                },
              });
            }}
          >
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
