import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type {
  CategoryCode,
  PostDetail,
  PostEntity,
  PageResponse,
  PostStats,
  PostId,
} from '../model/types';

export const postService = {
  async getPostsByCategory(params: {
    code: CategoryCode;
    page?: number;
    size?: number;
  }): Promise<PageResponse<PostEntity>> {
    const { code, page = 0, size = 10 } = params;
    const res = await axiosInstance.get<PageResponse<PostEntity>>(`/posts/category/${code}`, {
      params: { page, size },
    });
    return res.data;
  },
  async getPostById(postId: PostId): Promise<PostDetail> {
    const { data } = await axiosInstance.get<PostDetail>(`/posts/${postId}`);
    return data;
  },
  async getPostStats(): Promise<PostStats> {
    const { data } = await axiosInstance.get<PostStats>('/posts/stats');
    return data;
  },
};
