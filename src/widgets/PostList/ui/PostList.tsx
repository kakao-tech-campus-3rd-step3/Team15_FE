import { PaginationPosts } from '@/features/pagination';
import { useState } from 'react';
import { PostCard } from './PostCard';
import type { PostListProps } from '../model/type';
import { EmptyState } from '@/shared/ui/states/EmptyState';
import { Search } from 'lucide-react';
import { ROUTES } from '@/shared/config';
import { usePostByCategory } from '@/entities/post';

export function PostList({
  className,
  code = 'FREE',
  page = 0,
  size = 10,
  limit, // 기존 prop이 있으면 유지 가능. 다만 페이지네이션과는 충돌될 수 있어 권장 X
  showPagination = true,
}: PostListProps) {
  const [curPage, setCurPage] = useState(page);
  const { data } = usePostByCategory({
    code,
    page: curPage,
    size,
    limit,
  });

  // 서버 페이지네이션을 쓰므로 그대로 사용. limit는 필요 시 컷.
  const list = data?.content;

  if (!list || list.length === 0) {
    return (
      <div className={className + ' grid h-[500px] gap-4 px-6 pb-10'}>
        <EmptyState
          icon={<Search className='text-muted-foreground h-5 w-5' />}
          title='게시글이 없습니다'
          description='첫 게시글을 작성해보세요.'
          action={{ label: '글 쓰기', to: ROUTES.createpost }}
          variant='compact'
        />
      </div>
    );
  }

  return (
    <div className={className + ' grid gap-4 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-3'}>
      {list?.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
      {showPagination && (
        <div className='col-span-full mt-6 flex justify-center'>
          <PaginationPosts
            page={data?.page}
            totalPages={data?.totalPages}
            onChange={setCurPage}
            windowSize={5}
          />
        </div>
      )}
    </div>
  );
}
