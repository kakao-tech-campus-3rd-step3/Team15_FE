import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
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
}: UsePostsByCategoryQueryParams) {
  return useSuspenseQuery({
    queryKey: postKeys.categoryPage(code, page, size),
    queryFn: () => getPostsByCategory({ code, page, size }),

    // staleTime, gcTime 등 필요 시 지정
  });
}
