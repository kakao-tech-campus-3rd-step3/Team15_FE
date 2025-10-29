import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type {
  CategoryCode,
  PostDetailResponse,
  PostEntity,
  PageResponse,
  PostStatsResponse,
  PostId,
  CategoryResponse,
  UpdatePostRequest,
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
    const { data } = await axiosInstance.post('/posts', {
      title: input.title,
      content: input.content,
      isAnonymous: input.anonymous,
      postCategory: input.categoryCode,
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
    const { data } = await axiosInstance.post(`/posts/${postId}/likes`);
    return data;
  },

  async updatePost(postId: PostId, body: UpdatePostRequest): Promise<PostDetailResponse> {
    // 익명 여부는 수정 불가 (전달하지 않음)
    const { data } = await axiosInstance.patch<PostDetailResponse>(`/posts/${postId}`, body);
    return data;
  },

  async deletePost(postId: PostId): Promise<void> {
    await axiosInstance.delete(`/posts/${postId}`);
  },
};
