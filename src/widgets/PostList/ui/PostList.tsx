import { usePostsQuery } from '@/entities/post';
import { PostCard } from '@/widgets/PostCard';

export function PostList({ className, limit }: { className?: string; limit?: number }) {
  const { data, isLoading } = usePostsQuery();

  if (isLoading) return <div className={className}>로딩 중…</div>;

  const postsToShow = limit ? data?.slice(0, limit) : data;

  return (
    <div className={className + ' grid gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3'}>
      {postsToShow?.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
