import { PostMeta } from '@/entities/post';
import { useToggleLike } from '@/features/like-post';
import type { PostEntity } from '@/entities/post';
import { Button } from '@/shared/ui/shadcn/button';

export function PostCard({ post }: { post: PostEntity }) {
  const { toggle, isPending } = useToggleLike();
  return (
    <article className='rounded-xl border p-4 shadow-sm'>
      <span className='mb-2 inline-block text-xs text-emerald-700'>정신건강</span>
      <h3 className='line-clamp-1 text-base font-semibold'>{post.title}</h3>
      <p className='text-muted-foreground mt-2 line-clamp-3 text-sm'>{post.preview}</p>
      <div className='mt-4 flex items-center justify-between'>
        <PostMeta likes={post.likes} comments={post.comments} />
        <Button variant='ghost' onClick={() => toggle(post.id)} disabled={isPending}>
          {isPending ? '…' : '공감'}
        </Button>
      </div>
    </article>
  );
}
