import { PaginationPosts } from '@/features/pagination';
import { PAGINATION_WINDOW } from '@/features/search-posts/config';
import { useSearchPosts } from '@/features/search-posts/model/useSearchPosts';
import type { PostListInHeartNewsProps } from '@/widgets/PostList/model/type';
import { PostCard } from './PostCard';
import { EmptyState } from '@/shared/ui/states/EmptyState';
import { Search } from 'lucide-react';
import { ROUTES } from '@/shared/config';

export function PostListInHeartNews({
  className = '',
  params,
  showPagination = true,
  limit,
}: PostListInHeartNewsProps) {
  const { data, page, setPage } = useSearchPosts(params);

  const list = limit ? data.content.slice(0, limit) : data.content;

  if (!list || list.length === 0) {
    return (
      <div className={className + ' grid h-[500px] gap-4 px-6 pb-10'}>
        <EmptyState
          icon={<Search className='text-muted-foreground h-5 w-5' />}
          title='게시글이 없습니다'
          description='첫 게시글을 작성해보세요.'
          action={{ label: '글 쓰기', to: ROUTES.postdetail }}
          variant='compact'
        />
      </div>
    );
  }

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
