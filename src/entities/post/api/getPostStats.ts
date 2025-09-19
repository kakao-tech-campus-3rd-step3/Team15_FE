import type { PostStats } from '../model/types';

export async function getPostStats(): Promise<PostStats> {
  const res = await fetch('/api/posts/stats', { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch post stats');
  return res.json();
}
