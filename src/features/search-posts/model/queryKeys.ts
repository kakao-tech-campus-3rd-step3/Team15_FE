import type { Params } from '@/widgets/PostInfo/model/type';

export const postListKeys = {
  all: ['posts'] as const,
  search: (p: Params) => [...postListKeys.all, 'search', p] as const,
};
