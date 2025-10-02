import { useState } from 'react';
import type { Category } from '@/features/search-posts/api/getCategories';

export function useFilter(initial: Category['code'] = 'FREE') {
  const [category, setCategory] = useState<Category['code']>(initial);
  return { category, setCategory } as const;
}
