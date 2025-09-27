import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { Post, PostId } from '../model/types';

export async function getPostById(postId: PostId): Promise<Post> {
  const { data } = await axiosInstance.get(`/api/posts/${postId}`);

  return data;
}
