import { useState } from 'react';
export function useCategoryFilter() {
  const [category, setCategory] = useState<string>('전체');
  return { category, setCategory } as const;
}
