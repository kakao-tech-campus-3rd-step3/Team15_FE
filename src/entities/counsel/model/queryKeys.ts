export const counselKeys = {
  all: ['counsel'] as const,
  session: (id: string | null) => [...counselKeys.all, 'session', id] as const,
  messages: (id: string | null) => [...counselKeys.all, 'messages', id] as const,
};
