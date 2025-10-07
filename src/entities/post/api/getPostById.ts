import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { PostDetail, PostId } from '../model/types';

export async function getPostById(postId: PostId): Promise<PostDetail> {
  const { data } = await axiosInstance.get(`/posts/${postId}`);

  return data;
}
