import { usePostsByCategoryQuery } from '@/entities/post/model/usePostsByCategoryQuery';
import { PostCard } from '@/widgets/PostCard';
import type { PostListProps } from '../model/interface';

export function PostList({
  className,
  code = 'FREE',
  page = 0,
  size = 10,
  limit, // 기존 prop이 있으면 유지 가능. 다만 페이지네이션과는 충돌될 수 있어 권장 X
}: PostListProps) {
  const { data, isLoading, isError } = usePostsByCategoryQuery({ code, page, size });

  if (isLoading) return <div className={className}>로딩 중…</div>;
  if (isError || !data) return <div className={className}>데이터를 불러오지 못했습니다.</div>;

  // 서버 페이지네이션을 쓰므로 그대로 사용. limit는 필요 시 컷.
  const list = limit ? data.content.slice(0, limit) : data.content;

  return (
    <div className={className + ' grid gap-4 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-3'}>
      {list.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
      {/* 간단한 페이지네이션 예시 */}
      {/* <div className='col-span-full mt-4 flex items-center justify-center gap-2 text-sm'>
        <button
          disabled={data.first}
          onClick={() => {
            // 외부에서 page prop을 상태로 관리하는 상위 컴포넌트가 변경해주도록 설계하는 게 FSD에 적합
            // (여기서는 예시만 표시)
          }}
          className='rounded border px-3 py-1 disabled:opacity-50'
        >
          이전
        </button>
        <span>
          {data.page + 1} / {data.totalPages}
        </span>
        <button
          disabled={data.last}
          onClick={() => {
            // 상위에서 page+1 전달
          }}
          className='rounded border px-3 py-1 disabled:opacity-50'
        >
          다음
        </button>
      </div> */}
    </div>
  );
}
