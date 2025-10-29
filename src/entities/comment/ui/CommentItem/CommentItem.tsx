import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import type { CommentEntity } from '../../model/comment.type';
import { Header } from './Header';
import { Body } from './Body';
import { Actions } from './Action';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';

type CommentItemProps = {
  comment: CommentEntity;
  onClickReply?: () => void;
  // Inline edit controls (optional)
  isEditing?: boolean;
  editText?: string;
  onEditChange?: (value: string) => void;
  onSubmitEdit?: () => void;
  onCancelEdit?: () => void;
};

export function CommentItem({
  comment,
  onClickReply,
  isEditing,
  editText,
  onEditChange,
  onSubmitEdit,
  onCancelEdit,
}: CommentItemProps) {
  const initials = comment.author.slice(0, 2).toUpperCase();
  const isDeleted = comment.content == null;

  return (
    <li className='flex gap-3 p-3'>
      <Avatar className='h-8 w-8'>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className='flex-1'>
        <Header comment={comment} />
        {isEditing ? (
          <div>
            <Textarea
              className='mt-1 w-full resize-none text-sm leading-relaxed'
              rows={3}
              value={editText}
              onChange={(e) => onEditChange?.(e.target.value)}
            />
            <div className='mt-2 flex gap-2'>
              <Button size='sm' onClick={onSubmitEdit} disabled={!editText?.trim()}>
                저장
              </Button>
              <Button variant='outline' size='sm' onClick={onCancelEdit}>
                취소
              </Button>
            </div>
          </div>
        ) : (
          <Body content={comment.content} />
        )}
        <Actions isDeleted={isDeleted} onClickReply={onClickReply} />
      </div>
    </li>
  );
}

export default CommentItem;
