import { usePostsByCategoryQuery } from '@/entities/post/model/usePostsByCategoryQuery';
import { PostCard } from '@/widgets/PostCard';
import type { PostListProps } from '../model/interface';
import { PaginationPosts } from '@/features/pagination';
import { useState } from 'react';

export function PostList({
  className,
  code = 'FREE',
  page = 0,
  size = 10,
  limit, // 기존 prop이 있으면 유지 가능. 다만 페이지네이션과는 충돌될 수 있어 권장 X
  showPagination = true,
}: PostListProps) {
  const [curPage, setCurPage] = useState(page);
  const { data, isLoading, isError } = usePostsByCategoryQuery({ code, page: curPage, size });

  if (isLoading) return <div className={className}>로딩 중…</div>;
  if (isError || !data) return <div className={className}>데이터를 불러오지 못했습니다.</div>;

  // 서버 페이지네이션을 쓰므로 그대로 사용. limit는 필요 시 컷.
  const list = limit ? data.content.slice(0, limit) : data.content;

  return (
    <div className={className + ' grid gap-4 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-3'}>
      {list.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
      {showPagination && (
        <div className='col-span-full mt-6 flex justify-center'>
          <PaginationPosts
            page={data.page}
            totalPages={data.totalPages}
            onChange={setCurPage}
            windowSize={5}
          />
        </div>
      )}
    </div>
  );
}
