import { Badge } from '@/shared/ui/badge';
import type { CommentEntity } from '../../model/comment.type';

type HeaderProps = {
  comment: CommentEntity;
};

export function Header({ comment }: HeaderProps) {
  return (
    <div className='flex items-center gap-2 text-sm'>
      <span className='font-medium'>{comment.author}</span>

      {comment.authorTag && (
        <Badge variant='secondary' className='px-1.5 py-0 text-[10px]'>
          {comment.authorTag === 'AUTHOR' ? '작성자' : comment.authorTag}
        </Badge>
      )}

      <span className='text-muted-foreground ml-1 text-xs'>
        {new Date(comment.createdAt).toLocaleString()}
      </span>
    </div>
  );
}
