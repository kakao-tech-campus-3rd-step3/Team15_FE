import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { PostStats } from '../model/types';

export async function getPostStats(): Promise<PostStats> {
  const res = await axiosInstance.get('/posts/stats');
  return res.data;
}
