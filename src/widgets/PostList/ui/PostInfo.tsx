import { ViewSwitch } from '@/features/switch-post-view';
import { ParamsBar } from '@/features/search-posts/ui/ParamsBar';
import type { PostStatisticsProps } from '../model/type';

export function PostInfo({ className, params, onParamsChange }: PostStatisticsProps) {
  return (
    <div className={`flex items-center px-5 ${className ?? ''}`}>
      {/* 좌측: 탭 (가로 스크롤 허용) */}
      <div className='flex-1 overflow-x-auto'>
        <div className='min-w-max'>
          <ParamsBar
            value={params}
            onChange={(patch) => onParamsChange((p) => ({ ...p, ...patch }))}
            onApply={() => {
              // 필요 시 여기서 invalidateQueries 호출하거나 page를 0으로 덮어쓰기 등 트리거
              onParamsChange((p) => ({ ...p }));
            }}
            onReset={() =>
              onParamsChange({
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
