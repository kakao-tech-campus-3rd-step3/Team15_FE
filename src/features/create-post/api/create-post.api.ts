import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { CreatePostFormValues } from '../lib/post.scheme';
import type { PostDetailResponse } from '@/entities/post';

export const createPost = async (input: CreatePostFormValues): Promise<PostDetailResponse> => {
  const { data } = await axiosInstance.post('/api/posts', {
    title: input.title,
    content: input.content,
    anonymous: input.anonymous,
    category: input.categoryCode,
  });
  return data;
};
