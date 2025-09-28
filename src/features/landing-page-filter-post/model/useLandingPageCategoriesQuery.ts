import { useQuery } from '@tanstack/react-query';
import { getLandingPageCategories } from '../lib/getLandingPageCategories';

export const useLandingPageCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getLandingPageCategories,
    throwOnError: true,
  });
};
