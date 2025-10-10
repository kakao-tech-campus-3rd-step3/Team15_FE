import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { CategoryCode } from '@/entities/post';
import type { Params, SortKey } from '@/widgets/PostList/model/type';
import { useCategoriesQuery } from '../model/useCategoriesQuery';

type Props = {
  value: Params;
  onChange: (patch: Partial<Params>) => void;
  onApply?: () => void; // 서버 호출 트리거(선택)
  onReset?: () => void;
  className?: string;
};

export function ParamsBar({ value, onChange, onApply, onReset, className }: Props) {
  const pretty = (d?: string) => (d ? format(new Date(d), 'yyyy-MM-dd') : '기간 선택');
  const { data } = useCategoriesQuery();
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ''}`}>
      {/* 검색어 */}
      <Input
        value={value.keyword}
        onChange={(e) => onChange({ keyword: e.target.value, page: 0 })}
        placeholder='제목/내용 검색…'
        className='w-[220px] md:w-[280px]'
      />

      {/* 카테고리 */}
      <Select
        value={value.category}
        onValueChange={(v) => onChange({ category: v as CategoryCode, page: 0 })}
      >
        <SelectTrigger className='w-[140px]'>
          <SelectValue placeholder='카테고리' />
        </SelectTrigger>
        <SelectContent>
          {data.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              {c.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 정렬 */}
      <Select value={value.sort} onValueChange={(v) => onChange({ sort: v as SortKey, page: 0 })}>
        <SelectTrigger className='w-[140px]'>
          <SelectValue placeholder='정렬' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='createdAt,desc'>최신순</SelectItem>
          <SelectItem value='createdAt,asc'>오래된순</SelectItem>
          <SelectItem value='viewCount,desc'>조회수순</SelectItem>
          <SelectItem value='likeCount,desc'>좋아요순</SelectItem>
        </SelectContent>
      </Select>

      {/* 기간 (start~end) */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='gap-2'>
            <CalendarIcon className='h-4 w-4' />
            {value.startDate || value.endDate
              ? `${value.startDate ?? ''} ~ ${value.endDate ?? ''}`
              : pretty()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-3' align='start'>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <div>
              <p className='text-muted-foreground mb-2 text-xs'>시작일</p>
              <Calendar
                mode='single'
                selected={value.startDate ? new Date(value.startDate) : undefined}
                onSelect={(d) =>
                  onChange({ startDate: d ? format(d, 'yyyy-MM-dd') : undefined, page: 0 })
                }
              />
            </div>
            <div>
              <p className='text-muted-foreground mb-2 text-xs'>종료일</p>
              <Calendar
                mode='single'
                selected={value.endDate ? new Date(value.endDate) : undefined}
                onSelect={(d) =>
                  onChange({ endDate: d ? format(d, 'yyyy-MM-dd') : undefined, page: 0 })
                }
              />
            </div>
          </div>
          <div className='mt-3 flex justify-end gap-2'>
            <Button
              variant='ghost'
              onClick={() => onChange({ startDate: undefined, endDate: undefined, page: 0 })}
            >
              지우기
            </Button>
            <Button onClick={onApply}>적용</Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* 페이지당 개수 */}
      <Select
        value={String(value.size)}
        onValueChange={(v) => onChange({ size: Number(v), page: 0 })}
      >
        <SelectTrigger className='w-[110px]'>
          <SelectValue placeholder='개수' />
        </SelectTrigger>
        <SelectContent>
          {[10, 20, 30, 50].map((n) => (
            <SelectItem key={n} value={String(n)}>
              {n}개
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 실행/초기화 */}
      <Button onClick={onApply}>적용</Button>
      <Button variant='outline' onClick={onReset}>
        초기화
      </Button>
    </div>
  );
}
