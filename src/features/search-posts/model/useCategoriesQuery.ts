import { postService } from '@/entities/post/lib/postService';
import { useQuery } from '@tanstack/react-query';

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: postService.getCategories,
  });
};
