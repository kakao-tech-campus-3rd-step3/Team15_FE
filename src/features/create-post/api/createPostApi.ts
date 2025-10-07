import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { CreatePostFormValues } from '../lib/post.scheme';

export async function createPost(input: CreatePostFormValues) {
  const { data } = await axiosInstance.post('/api/posts', {
    title: input.title,
    content: input.content,
    anonymous: input.anonymous,
    category: input.categoryCode,
  });
  return data;
}
