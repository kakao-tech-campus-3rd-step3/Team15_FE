export const commentKeys = {
  all: ['comments'] as const,
  lists: () => [...commentKeys.all, 'list'] as const,
  listByPost: (postId: number) => [...commentKeys.lists(), { postId }] as const,
  listByUser: (userId: string | number) => [...commentKeys.lists(), { userId }] as const,
  details: () => [...commentKeys.all, 'detail'] as const,
  detail: (commentId: number) => [...commentKeys.details(), commentId] as const,
};
