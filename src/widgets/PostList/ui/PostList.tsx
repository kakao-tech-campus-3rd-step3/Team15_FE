import { usePostsQuery } from '@/entities/post';
import { PostCard } from '@/widgets/PostCard';

export function PostList({ className }: { className?: string }) {
  const { data, isLoading } = usePostsQuery();

  if (isLoading) return <div className={className}>로딩 중…</div>;

  return (
    <div className={className + ' grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
      {data?.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
