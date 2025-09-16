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
      <button
        type='button'
        onClick={onLike}
        disabled={disabled}
        className='flex items-center gap-2 rounded-full px-2 py-1 hover:bg-neutral-100 disabled:opacity-50 dark:hover:bg-neutral-800'
        aria-label='공감'
      >
        <Heart className='h-5 w-5' />
        <span>{likes}</span>
      </button>
      <div className='flex items-center gap-2 rounded-full px-2 py-1'>
        <MessageCircle className='h-5 w-5' />
        <span>{comments}</span>
      </div>
    </div>
  );
}
