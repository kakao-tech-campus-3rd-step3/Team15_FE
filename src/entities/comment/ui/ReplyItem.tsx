import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import type { Reply } from '@/entities/comment/model/reply.type';

type ReplyItemProps = {
  reply: Reply;
  editingId: number | null;
  editText: string;
  setEditText: (text: string) => void;
  submitEdit: () => void;
  cancelEdit: () => void;
};

export function ReplyItem({
  reply,
  editingId,
  editText,
  setEditText,
  submitEdit,
  cancelEdit,
}: ReplyItemProps) {
  return (
    <li className='flex gap-3 p-3'>
      <Avatar className='h-8 w-8'>
        <AvatarFallback className='text-xs'>
          {reply.author?.slice(0, 2)?.toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
      <div className='flex-1'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium'>{reply.author}</span>
          <span className='text-muted-foreground text-xs'>
            {new Date(reply.createdAt).toLocaleString()}
          </span>
        </div>
        {editingId === reply.id ? (
          <div>
            <Textarea
              className='mt-1 w-full resize-none text-sm leading-relaxed'
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
            />
            <div className='mt-2 flex gap-2'>
              <Button size='sm' onClick={submitEdit}>
                저장
              </Button>
              <Button size='sm' variant='outline' onClick={cancelEdit}>
                취소
              </Button>
            </div>
          </div>
        ) : (
          <p
            className={cn(
              'text-sm leading-relaxed',
              reply.deleted && 'text-muted-foreground italic',
            )}
          >
            {reply.deleted ? '삭제된 댓글입니다.' : reply.content}
          </p>
        )}
      </div>
    </li>
  );
}
