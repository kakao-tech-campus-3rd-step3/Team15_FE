import { useState } from 'react';
import type { Category as CategoryDto } from '@/features/filter-posts/api/getCategories';

export type CategoryCode = CategoryDto['code'];

export function useFilter(initial: CategoryCode = 'ALL') {
  const [category, setCategory] = useState<CategoryCode>(initial);
  return { category, setCategory } as const;
}
