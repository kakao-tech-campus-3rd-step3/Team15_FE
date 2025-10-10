import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';

type Reply = {
  id: number;
  author?: string;
  content: string;
  createdAt: string;
  deleted?: boolean;
};

export function ReplyItem({ reply }: { reply: Reply }) {
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
        <p
          className={cn('text-sm leading-relaxed', reply.deleted && 'text-muted-foreground italic')}
        >
          {reply.deleted ? '삭제된 댓글입니다.' : reply.content}
        </p>
      </div>
    </li>
  );
}
