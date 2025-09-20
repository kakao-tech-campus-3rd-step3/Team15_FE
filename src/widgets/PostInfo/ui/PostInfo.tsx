import { useState } from 'react';
import { ParamsBar, type Params } from '@/features/filter-posts/ui/ParamsBar';
import { useFilter } from '@/widgets/FilterTabs/model/useFilter';
import { ViewSwitch } from '@/features/switch-post-view';
import type { Props } from '../model/type';

export function PostInfo({ className, category: extCategory, setCategory: extSetCategory }: Props) {
  const internal = useFilter();
  const category = extCategory ?? internal.category;
  const setCategory = extSetCategory ?? internal.setCategory;

  const [params, setParams] = useState<Params>({
    category: 'ALL',
    keyword: '',
    startDate: undefined,
    endDate: undefined,
    page: 0,
    size: 10,
    sort: 'createdAt,desc',
  });

  return (
    <div className={`flex items-center px-5 ${className ?? ''}`}>
      {/* 좌측: 탭 (가로 스크롤 허용) */}
      <div className='flex-1 overflow-x-auto'>
        <div className='min-w-max'>
          <ParamsBar
            value={params}
            onChange={(patch) => setParams((p) => ({ ...p, ...patch }))}
            onApply={() => {
              // TODO: 여기에 tanstack query 재요청(invalidate) 또는 상위 콜백 연결
            }}
            onReset={() =>
              setParams({
                category: 'ALL',
                keyword: '',
                startDate: undefined,
                endDate: undefined,
                page: 0,
                size: 10,
                sort: 'createdAt,desc',
              })
            }
          />
        </div>
      </div>

      {/* 우측: 툴바 */}
      <div className='ml-3 flex items-center gap-3 border-l pl-3'>
        <ViewSwitch />
      </div>
    </div>
  );
}
