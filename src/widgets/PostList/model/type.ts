import type { CategoryCode } from '@/entities/post';
import type { Dispatch, SetStateAction } from 'react';

export type PostListProps = {
  className?: string;
  code?: CategoryCode;
  page?: number;
  size?: number;
  limit?: number;
  showPagination?: boolean;
};

export type PostStatisticsProps = {
  className?: string;
  params: Params;
  onParamsChange: Dispatch<SetStateAction<Params>>;
};

export type Params = {
  category: CategoryCode;
  keyword: string;
  startDate?: string; // yyyy-MM-dd
  endDate?: string; // yyyy-MM-dd
  page: number; // 0-based
  size: number; // 10/20/30...
  sort: SortKey;
};

export type SortKey = 'createdAt,desc' | 'createdAt,asc' | 'viewCount,desc' | 'likeCount,desc';

export type PostListInHeartNewsProps = {
  className?: string;
  params: Params; // category/keyword/startDate/endDate/page/size/sort
  showPagination?: boolean;
  limit?: number;
};
