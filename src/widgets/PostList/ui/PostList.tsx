import { usePostsLandingPageCategoryQuery } from '@/entities/post/';
import { PaginationPosts } from '@/features/pagination';
import { useState } from 'react';
import { PostCard } from './PostCard';
import type { PostListProps } from '../model/type';

export function PostList({
  className,
  code = 'FREE',
  page = 0,
  size = 10,
  limit, // 기존 prop이 있으면 유지 가능. 다만 페이지네이션과는 충돌될 수 있어 권장 X
  showPagination = true,
}: PostListProps) {
  const [curPage, setCurPage] = useState(page);
  const { data } = usePostsLandingPageCategoryQuery({
    code,
    page: curPage,
    size,
  });

  // 서버 페이지네이션을 쓰므로 그대로 사용. limit는 필요 시 컷.
  const list = limit ? data?.content.slice(0, limit) : data?.content;

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
