import type { Params } from '@/widgets/PostList/model/type';

export const postListKeys = {
  all: ['posts'] as const,
  search: (p: Params) => [...postListKeys.all, 'search', p] as const,
};
