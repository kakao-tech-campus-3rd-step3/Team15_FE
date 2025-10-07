export interface CreateCommentRequest {
  content: string;
  isAnonymous: boolean;
}

export interface CreateCommentResponse {
  id: number;
  postId: number;
  author: string;
  handle: string;
  authorTag: string;
  content: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
}
