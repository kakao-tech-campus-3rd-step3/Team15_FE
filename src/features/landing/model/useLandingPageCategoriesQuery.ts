import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/landing.api';

export const useLandingPageCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
