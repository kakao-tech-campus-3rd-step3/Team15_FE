import { useState } from 'react';

export type Category = '전체' | '진로취업' | '대인관계' | '사회생활' | '정신건강' | '가족' | '성';

export function useFilter(initial: Category = '전체') {
  const [category, setCategory] = useState<Category>(initial);
  return { category, setCategory } as const;
}
