export const postKeys = {
  all: ['posts'] as const,
  category: (code: string) => [...postKeys.all, 'category', code] as const,
  categoryPage: (code: string, page: number, size: number) =>
    [...postKeys.category(code), { page, size }] as const,
};

export const statsKeys = {
  all: ['stats'] as const,
  posts: () => [...statsKeys.all, 'posts'] as const,
};
