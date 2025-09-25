import { useQuery } from '@tanstack/react-query';
import { postKeys } from './queryKeys';
import { getPostsByCategory } from '../api/getPostsByCategory';
import type { CategoryCode } from './types';

type UsePostsByCategoryQueryParams = {
  code: CategoryCode;
  page?: number; // 0-base
  size?: number;
  enabled?: boolean;
};

export function usePostsLandingPageCategoryQuery({
  code,
  page = 0,
  size = 10,
  enabled = true,
}: UsePostsByCategoryQueryParams) {
  return useQuery({
    queryKey: postKeys.categoryPage(code, page, size),
    queryFn: () => getPostsByCategory({ code, page, size }),
    enabled,
    throwOnError: true,
    // staleTime, gcTime 등 필요 시 지정
  });
}
