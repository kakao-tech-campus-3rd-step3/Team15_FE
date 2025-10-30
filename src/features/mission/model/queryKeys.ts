export const missionQueryKeys = {
  all: ['missions'] as const,
  today: () => [...missionQueryKeys.all, 'today'] as const,
  stats: () => [...missionQueryKeys.all, 'stats'] as const,
  detail: (id: number) => [...missionQueryKeys.all, 'detail', id] as const,
};
