import { Button } from '@/shared/ui/shadcn/button';
import { Heart, MessageCircle } from 'lucide-react';

export function PostMeta({
  likes,
  comments,
  onLike,
  disabled,
}: {
  likes: number;
  comments: number;
  onLike?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className='text-muted-foreground flex items-center justify-center gap-8 text-sm'>
      <Button
        type='button'
        variant={'ghost'}
        onClick={onLike}
        disabled={disabled}
        aria-label='공감'
      >
        <Heart className='h-5 w-5' />
        <span>{likes}</span>
      </Button>
      <div className='flex items-center gap-2 rounded-full px-2 py-1'>
        <MessageCircle className='h-5 w-5' />
        <span>{comments}</span>
      </div>
    </div>
  );
}
