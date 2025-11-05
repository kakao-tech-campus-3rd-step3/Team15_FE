export const activityQueryKeys = {
  all: ['activity'] as const,
  stats: () => [...activityQueryKeys.all, 'stats'] as const,
  posts: () => [...activityQueryKeys.all, 'posts'] as const,
  comments: () => [...activityQueryKeys.all, 'comments'] as const,
  likedPosts: () => [...activityQueryKeys.all, 'likedPosts'] as const,
};
