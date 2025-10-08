import type { CategoryResponse } from '@/entities/post';
import { useState } from 'react';

export function useFilter(initial: CategoryResponse['code'] = 'FREE') {
  const [category, setCategory] = useState<CategoryResponse['code']>(initial);
  return { category, setCategory } as const;
}
