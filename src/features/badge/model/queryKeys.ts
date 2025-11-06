export const badgeQueryKeys = {
  all: ['badges'] as const,
  userBadges: () => [...badgeQueryKeys.all, 'user'] as const,
};
