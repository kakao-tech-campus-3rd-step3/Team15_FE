import { useQuery } from '@tanstack/react-query';
import type { PostEntity } from './types';
import { fetchPosts } from '../api/api';

export function usePostsQuery() {
  return useQuery<PostEntity[]>({ queryKey: ['posts'], queryFn: fetchPosts });
}
