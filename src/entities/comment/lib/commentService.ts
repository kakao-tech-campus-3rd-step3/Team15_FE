import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { CommentListResponse } from '../model/comment.type';
import type {
  CreateCommentRequest,
  CreateCommentResponse,
} from '@/features/add-comment/model/comment.type';

export const commentService = {
  async getComments(postId: number): Promise<CommentListResponse> {
    const { data } = await axiosInstance.get<CommentListResponse>(`/posts/${postId}/comments`);
    return data;
  },

  async postComment(postId: number, body: CreateCommentRequest): Promise<CreateCommentResponse> {
    const { data } = await axiosInstance.post<CreateCommentResponse>(
      `/posts/${postId}/comments`,
      body,
    );
    return data;
  },
};
