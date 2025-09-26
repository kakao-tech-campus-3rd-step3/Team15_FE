import { axiosInstance } from '@/shared/api/base/axiosInstance';
import { toQS } from '../lib/toQS';
import type { Params } from '@/widgets/PostList/model/type';
import { type PostEntity } from '@/entities/post';
import type { PageResponse } from '@/entities/post/model/types';

export async function getSearchPost(params: Params) {
  const res = await axiosInstance.get<PageResponse<PostEntity>>(`/posts/search?${toQS(params)}`);
  if (!res) throw new Error('Failed to fetch posts');
  return res.data;
}
