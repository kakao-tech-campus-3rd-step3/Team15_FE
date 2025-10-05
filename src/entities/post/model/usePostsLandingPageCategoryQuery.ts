import { useSuspenseQuery } from '@tanstack/react-query';
import { postKeys } from './queryKeys';
import { getPostsByCategory } from '../api/getPostsByCategory';
import type { CategoryCode } from './types';

type UsePostsByCategoryQueryParams = {
  code: CategoryCode;
  page?: number; // 0-base
  size?: number;
  enabled?: boolean;
  limit?: number;
};

export function usePostsLandingPageCategoryQuery({
  code,
  page = 0,
  size = 10,
  limit = 6,
}: UsePostsByCategoryQueryParams) {
  return useSuspenseQuery({
    queryKey: postKeys.categoryPage(code, page, size),
    queryFn: async () => {
      const data = await getPostsByCategory({ code, page, size });
      if (limit) {
        return { ...data, content: data.content.slice(0, limit) };
      }
      return data;
    },

    // staleTime, gcTime 등 필요 시 지정
  });
}
