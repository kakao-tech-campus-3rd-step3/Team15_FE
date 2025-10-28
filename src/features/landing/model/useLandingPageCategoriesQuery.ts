import { useQuery } from '@tanstack/react-query';
import { postService } from '@/entities/post/lib/postService';

export const useLandingPageCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: postService.getCategories,
  });
};
