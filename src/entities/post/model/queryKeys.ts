import type { CategoryCode, PostId } from './post.type';

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params: { code: CategoryCode; page?: number; size?: number }) =>
    [
      ...postKeys.lists(),
      { code: params.code, page: params.page ?? 0, size: params.size ?? 10 },
    ] as const,

  details: () => [...postKeys.all, 'detail'] as const,
  detail: (postId: PostId) => [...postKeys.details(), postId] as const,

  stats: () => [...postKeys.all, 'stats'] as const,
  categories: () => [...postKeys.all, 'categories'] as const,
};
