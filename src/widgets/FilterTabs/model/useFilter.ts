import { useState } from 'react';
import type { Category } from '@/features/filter-posts/api/getCategories';

export function useFilter(initial: Category['code'] = 'ALL') {
  const [category, setCategory] = useState<Category['code']>(initial);
  return { category, setCategory } as const;
}
