import { PostMeta } from '@/entities/post';
import type { PostEntity } from '@/entities/post';
import { useNavigate } from 'react-router-dom';

export function PostCard({ post }: { post: PostEntity }) {
  const navigate = useNavigate();

  return (
    <article
      role='button'
      tabIndex={0}
      className='cursor-pointer rounded-xl border p-4 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300'
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <span className='mb-2 inline-block text-xs text-emerald-700'>{post.postCategoryName}</span>
      <h3 className='line-clamp-1 text-base font-semibold'>{post.title}</h3>
      <p className='text-muted-foreground mt-2 line-clamp-3 text-sm'>
        {(post.content ?? '').slice(0, 100)}
      </p>
      <div className='mt-5 flex items-center justify-end'>
        <PostMeta
          likes={post.likeCount}
          comments={post.commentCount}
          // postId={post.id}
          isLiked={post.isLiked}
        />
      </div>
    </article>
  );
}
