import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/shared/ui/button';

import { ReplyItem } from './ReplyItem';
import { useDeleteComment } from '../model/useDeleteComment';
import { useUpdateComment } from '../model/useUpdateComment';
import { useReplyList } from '@/features/add-reply';

type ReplyListProps = {
  parentId: number;
};

export function ReplyList({ parentId }: ReplyListProps) {
  const { data, isFetching, isFetched } = useReplyList(parentId);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const { mutate: deleteReplyMutate } = useDeleteComment();
  const { mutate: updateReplyMutate } = useUpdateComment();

  const replies = data ?? [];
  const count = isFetched ? replies.length : undefined;

  const label = open
    ? '답글 숨기기'
    : typeof count === 'number'
      ? `답글 ${count}개 보기`
      : '답글 보기';

  const onToggle = async () => {
    setOpen((v) => !v);
  };

  const startEdit = (replyId: number, current: string) => {
    setEditingId(replyId);
    setEditText(current);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const submitEdit = () => {
    if (!editingId) return;
    updateReplyMutate({
      commentId: editingId,
      body: { content: editText },
    });
    setEditingId(null);
    setEditText('');
  };

  const deleteReply = (replyId: number) => {
    if (!confirm('이 대댓글을 삭제할까요?')) return;
    deleteReplyMutate(replyId);
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
                <li key={r.id} className='relative p-3 pr-24'>
                  <ReplyItem
                    reply={r}
                    editingId={editingId}
                    editText={editText}
                    setEditText={setEditText}
                    submitEdit={submitEdit}
                    cancelEdit={cancelEdit}
                  />
                  <div className='absolute right-3 top-3 flex gap-1'>
                    {r.isAuthor && (
                      <>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-xs'
                          onClick={() => startEdit(r.id, r.content ?? '')}
                        >
                          수정
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-xs'
                          onClick={() => deleteReply(r.id)}
                        >
                          삭제
                        </Button>
                      </>
                    )}
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-xs'
                      onClick={() => deleteReply(r.id)}
                    >
                      신고
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {/* <ReplyComposer parentId={parentId} onPosted={refetch} /> */}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
