import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { cn } from '@/lib/utils';
import type { CommentEntity } from '../model/comment.type';

type CommentItemProps = {
  comment: CommentEntity;
  className?: string;
  onClickReply?: () => void;
};

export function CommentItem({ comment, className, onClickReply }: CommentItemProps) {
  const initials = comment.author.slice(0, 2).toUpperCase();
  const displayContent = comment.content ?? '삭제된 댓글입니다.';
  const isDeleted = comment.content == null;

  return (
    <li className={cn('flex gap-3 py-4', className)}>
      <Avatar className='h-8 w-8'>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className='min-w-0 flex-1'>
        <div className='flex items-center gap-2 text-sm'>
          <span className='font-medium'>{comment.author}</span>
          {comment.authorTag ? (
            <Badge variant='secondary' className='px-1.5 py-0 text-[10px]'>
              {comment.authorTag === 'AUTHOR' ? '작성자' : comment.authorTag}
            </Badge>
          ) : null}
          <span className='text-muted-foreground ml-1 text-xs'>
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
        <p
          className={cn(
            'mt-1 whitespace-pre-wrap text-sm leading-6',
            isDeleted && 'text-muted-foreground',
          )}
        >
          {displayContent}
        </p>
        {!isDeleted && (
          <div className='mt-2'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='h-7 px-2 text-xs'
              onClick={onClickReply}
            >
              답글
            </Button>
          </div>
        )}
      </div>
    </li>
  );
}

export default CommentItem;
