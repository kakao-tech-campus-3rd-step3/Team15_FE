import { PostMeta } from '@/entities/post';
import { useToggleLike } from '@/features/like-post';
import type { PostEntity } from '@/entities/post';

export function PostCard({ post }: { post: PostEntity }) {
  const { toggle, isPending } = useToggleLike();
  return (
    <article className='rounded-xl border p-4 shadow-sm'>
      <span className='mb-2 inline-block text-xs text-emerald-700'>{post.postCategoryName}</span>
      <h3 className='line-clamp-1 text-base font-semibold'>{post.title}</h3>
      <p className='text-muted-foreground mt-2 line-clamp-3 text-sm'>
        {(post.content ?? '').slice(0, 100)}
      </p>
      <div className='mt-5 flex items-center justify-end'>
        <PostMeta
          likes={post.likeCount}
          comments={post.commentCount}
          onLike={() => toggle(post.id)}
          disabled={isPending}
        />
      </div>
    </article>
  );
}
