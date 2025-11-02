import { Badge } from '@/shared/ui/badge';
import type { CommentEntity } from '../../model/comment.type';

type HeaderProps = {
  comment: CommentEntity;
};

const authorTagLabel = {
  AUTHOR: '작성자',
  NORMAL: '일반',
  AI: 'AI',
} as const;

export function Header({ comment }: HeaderProps) {
  const tag = comment.authorTag ? authorTagLabel[comment.authorTag] : null;
  const displayAuthor = comment.isAnonymous ? '익명' : comment.author;

  return (
    <div className='flex items-center gap-2 text-sm'>
      <span className='font-medium'>{displayAuthor}</span>

      {tag && (
        <Badge
          variant={
            comment.authorTag === 'AUTHOR'
              ? 'default'
              : comment.authorTag === 'AI'
                ? 'outline'
                : 'secondary'
          }
          className='px-1.5 py-0 text-[10px]'
        >
          {tag}
        </Badge>
      )}

      <span className='text-muted-foreground ml-1 text-xs'>
        {new Date(comment.createdAt).toLocaleString()}
      </span>
    </div>
  );
}
