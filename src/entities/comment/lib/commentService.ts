import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { CommentListResponse } from '../model/comment.type';
import type {
  CreateCommentRequest,
  CreateCommentResponse,
} from '@/features/add-comment/model/comment.type';
import type {
  CreateReplyRequest,
  CreateReplyResponse,
  ReplyListResponse,
} from '@/features/add-reply/model/reply.type';

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

  async getReplyComment(postId: number): Promise<ReplyListResponse> {
    const { data } = await axiosInstance.get<ReplyListResponse>(`/posts/${postId}/replies`);
    return data;
  },

  async postReplyComment(parentId: number, body: CreateReplyRequest): Promise<CreateReplyResponse> {
    const { data } = await axiosInstance.post(`/comments/${parentId}/replies`, body);
    return data;
  },

  async updateComment(parentId: number, content: string): Promise<CreateReplyResponse> {
    const { data } = await axiosInstance.patch(`/comments/${parentId}`, content);
    return data;
  },
  async deleteComment(commentId: number): Promise<void> {
    const { data } = await axiosInstance.delete(`/comments/${commentId}`);
    return data;
  },
};
