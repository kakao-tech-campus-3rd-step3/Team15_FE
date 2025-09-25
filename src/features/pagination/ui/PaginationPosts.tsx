import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/shadcn/pagination';
import type { Props } from '../model/type';

export function PaginationPosts({ page = 1, totalPages = 1, onChange, windowSize = 5 }: Props) {
  if (totalPages <= 1) return null;

  // 0-based 를 1-based로 보이게
  const current = page + 1;

  // 가운데 윈도우 계산
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, Math.min(start, end - windowSize + 1));

  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={current === 1}
            onClick={() => current > 1 && onChange(current - 2)}
          />
        </PaginationItem>

        {/* 맨앞 ellipsis */}
        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onChange(0)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* 가운데 윈도우 */}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink isActive={p === current} onClick={() => onChange(p - 1)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 맨뒤 ellipsis */}
        {end < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => onChange(totalPages - 1)}>{totalPages}</PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            aria-disabled={current === totalPages}
            onClick={() => current < totalPages && onChange(current)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
