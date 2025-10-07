import { useToggleLike } from '@/features/like-post';
import { Button } from '@/shared/ui/shadcn/button';
import { Heart, MessageCircle } from 'lucide-react';

export function PostMeta({
  likes,
  comments,
  isLiked,
}: {
  likes: number;
  comments: number;
  postId?: number;
  isLiked: boolean;
}) {
  const { isPending } = useToggleLike();

  return (
    <div className='text-muted-foreground flex items-center justify-center gap-8 text-sm'>
      <Button
        type='button'
        variant={'ghost'}
        // onClick={(e) => {
        //   e.stopPropagation();
        //   mutate(postId);
        // }}
        disabled={isPending}
        aria-label='공감'
      >
        {/* isLiked 여부에 따라 하트 색상/채우기 바꾸기 */}
        {isLiked ? (
          <Heart className='h-5 w-5 fill-red-500 text-red-500' />
        ) : (
          <Heart className='h-5 w-5' />
        )}
        <span>{likes}</span>
      </Button>
      <div className='flex items-center gap-2 rounded-full px-2 py-1'>
        <MessageCircle className='h-5 w-5' />
        <span>{comments}</span>
      </div>
    </div>
  );
}
