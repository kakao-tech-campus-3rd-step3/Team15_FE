import { useQuery } from '@tanstack/react-query';
import { postKeys } from './queryKeys';
import type { CategoryCode } from './types';
import { postService } from '../lib/postService';

type UsePostsByCategoryQueryParams = {
  code: CategoryCode;
  page?: number; // 0-base
  size?: number;
  enabled?: boolean;
};

export function usePostsHeartCategoryQuery({
  code,
  page = 0,
  size = 10,
  enabled = true,
}: UsePostsByCategoryQueryParams) {
  return useQuery({
    queryKey: postKeys.categoryPage(code, page, size),
    queryFn: () => postService.getPostsByCategory({ code, page, size }),
    enabled,
    // staleTime, gcTime 등 필요 시 지정
  });
}
