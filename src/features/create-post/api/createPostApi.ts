import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { CreatePostInput } from '../model/validation';

export async function createPost(input: CreatePostInput) {
  const { data } = await axiosInstance.post('/api/posts', {
    title: input.title,
    content: input.content,
    anonymous: input.anonymous,
    category: input.categoryCode,
  });
  return data;
}
