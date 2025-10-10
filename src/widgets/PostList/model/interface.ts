import type { CategoryCode } from '@/entities/post/model/types';

export interface PostListProps {
  className?: string;
  code?: CategoryCode;
  page?: number;
  size?: number;
  limit?: number;
}
