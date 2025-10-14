import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type {
  CategoryCode,
  PostDetailResponse,
  PostEntity,
  PageResponse,
  PostStatsResponse,
  PostId,
  CategoryResponse,
} from '../model/post.type';
import type { CreatePostFormValues } from '@/features/create-post/lib/post.scheme';

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
  async getPostById(postId: PostId): Promise<PostDetailResponse> {
    const { data } = await axiosInstance.get<PostDetailResponse>(`/posts/${postId}`);
    return data;
  },

  async createPost(input: CreatePostFormValues): Promise<PostDetailResponse> {
    const { data } = await axiosInstance.post('/api/posts', {
      title: input.title,
      content: input.content,
      anonymous: input.anonymous,
      category: input.categoryCode,
    });
    return data;
  },

  async getPostStats(): Promise<PostStatsResponse> {
    const { data } = await axiosInstance.get<PostStatsResponse>('/posts/stats');
    return data;
  },
  async getCategories(): Promise<CategoryResponse[]> {
    const { data } = await axiosInstance.get<CategoryResponse[]>('/posts/categories');
    return data;
  },
  async likePost(postId: number) {
    const { data } = await axiosInstance.post(`/api/posts/${postId}/likes`);
    return data;
  },
};
