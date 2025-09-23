import { PostCardSkeleton } from '@/entities/post/ui/PostCard.skeleton';
import { GridSkeleton } from '@/shared/ui/skeleton/list';

export function PostListSkeleton({ className, count = 6 }: { className?: string; count?: number }) {
  return (
    <GridSkeleton className={className + ' px-6 pb-10'} columns={{ base: 1, sm: 2, lg: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </GridSkeleton>
  );
}
