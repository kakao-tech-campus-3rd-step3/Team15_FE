import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Params } from '@/widgets/PostInfo/model/type';
import { PostCard } from '@/widgets/PostCard';
import { PaginationPosts } from '@/features/pagination';
import { axiosInstance } from '@/shared/api/base/axiosInstance';

// 쿼리스트링 직렬화 (명세에 맞춤)
function toQS(params: Params) {
  const qs = new URLSearchParams();
  const { category, keyword, startDate, endDate, page, size, sort } = params;
  if (category && category !== 'ALL') qs.set('category', String(category));
  if (keyword) qs.set('keyword', keyword);
  if (startDate) qs.set('startDate', startDate);
  if (endDate) qs.set('endDate', endDate);
  qs.set('page', String(page ?? 0));
  qs.set('size', String(size ?? 10));
  qs.set('sort', sort ?? 'createdAt,desc');
  return qs.toString();
}

async function fetchSearch(params: Params) {
  const res = await axiosInstance.get(`/posts/search?${toQS(params)}`);
  if (!res) throw new Error('Failed to fetch posts');

  return res.data;
}

type Props = {
  className?: string;
  params: Params; // category/keyword/startDate/endDate/page/size/sort
  showPagination?: boolean; // 기본 true
  limit?: number; // (선택) 위젯 내부에서 상단 프리뷰처럼 일부만 노출할 때
};

export function PostListInHeartNews({
  className = '',
  params,
  showPagination = true,
  limit,
}: Props) {
  // 페이지 이동 시 이전 데이터 유지 + 상위 변경(카테고리/정렬/기간 등)엔 0으로 리셋
  const [page, setPage] = useState<number>(params.page ?? 0);
  const effective = useMemo(() => ({ ...params, page }), [params, page]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', 'search', effective],
    queryFn: () => fetchSearch(effective),
    staleTime: 60_000,
  });

  if (isLoading) return <div className={className}>로딩 중…</div>;
  if (isError || !data) return <div className={className}>데이터를 불러오지 못했습니다.</div>;

  const list = limit ? data.content.slice(0, limit) : data.content;

  return (
    <div className={className + ' grid gap-4 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-3'}>
      {list.map((p: any) => (
        <PostCard key={p.id} post={p} />
      ))}

      {showPagination && (
        <div className='col-span-full mt-6 flex justify-center'>
          <PaginationPosts
            page={data.page}
            totalPages={data.totalPages}
            onChange={setPage}
            windowSize={5}
          />
        </div>
      )}
    </div>
  );
}
