import { cn } from '@/lib/utils';

type BodyProps = {
  content: string | null;
};

export function Body({ content }: BodyProps) {
  const isDeleted = content == null;
  const displayContent = content ?? '삭제된 댓글입니다.';

  return (
    <p
      className={cn(
        'mt-1 whitespace-pre-wrap text-sm leading-6',
        isDeleted && 'text-muted-foreground',
      )}
    >
      {displayContent}
    </p>
  );
}
