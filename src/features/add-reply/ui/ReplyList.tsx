import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/shadcn/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/button';
import { useReplyList } from '../model/useReplyList';
import { ReplyItem } from './ReplyItem';

type ReplyListProps = {
  parentId: number;
};

export function ReplyList({ parentId }: ReplyListProps) {
  const { data, refetch, isFetching, isFetched } = useReplyList(parentId);
  const [open, setOpen] = useState(false);

  const replies = data ?? [];
  const count = isFetched ? replies.length : undefined;

  const label = open
    ? '답글 숨기기'
    : typeof count === 'number'
      ? `답글 ${count}개 보기`
      : '답글 보기';

  const onToggle = async () => {
    if (!open) {
      await refetch();
    }
    setOpen((v) => !v);
  };

  return (
    <div className='pl-6'>
      <Collapsible open={open} onOpenChange={onToggle}>
        <div className='flex items-center gap-1'>
          <CollapsibleTrigger asChild>
            <Button variant='ghost' size='sm' className='gap-1'>
              {open ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
              {isFetching ? '불러오는 중…' : label}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className='mt-2 space-y-3'>
          {replies.length === 0 ? (
            <p className='text-muted-foreground text-sm'>아직 대댓글이 없어요.</p>
          ) : (
            <ul className='divide-y rounded-md border'>
              {replies.map((r) => (
                <ReplyItem key={r.id} reply={r} />
              ))}
            </ul>
          )}
          {/* <ReplyComposer parentId={parentId} onPosted={refetch} /> */}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
