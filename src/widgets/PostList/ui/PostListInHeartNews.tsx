import { PaginationPosts } from '@/features/pagination';
import { PAGINATION_WINDOW } from '@/features/search-posts/config';
import { useSearchPosts } from '@/features/search-posts/model/useSearchPosts';
import type { PostListInHeartNewsProps } from '@/widgets/PostList/model/type';
import { PostCard } from './PostCard';

export function PostListInHeartNews({
  className = '',
  params,
  showPagination = true,
  limit,
}: PostListInHeartNewsProps) {
  const { data, isLoading, isError, page, setPage } = useSearchPosts(params);

  if (isLoading) return <div className={className}>로딩 중…</div>;
  if (isError || !data) return <div className={className}>데이터를 불러오지 못했습니다.</div>;

  const list = limit ? data.content.slice(0, limit) : data.content;
  return (
    <div className={className + ' grid gap-4 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-3'}>
      {list.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}

      {showPagination && (
        <div className='col-span-full mt-6 flex justify-center'>
          <PaginationPosts
            page={page}
            totalPages={data.totalPages}
            onChange={setPage}
            windowSize={PAGINATION_WINDOW}
          />
        </div>
      )}
    </div>
  );
}
