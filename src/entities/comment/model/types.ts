export type CommentId = number;

export interface CommentAuthor {
  id: number;
  nickname: string;
  avatarUrl?: string | null;
  isAI?: boolean; // AI 댓글 구분 필요 시
}

export interface Comment {
  id: CommentId;
  postId: number;
  author: CommentAuthor;
  content: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: CommentId | null; // 대댓글이면 부모 id
}

export interface CommentListResponse {
  items: Comment[];
  total: number;
  page: number;
  size: number;
}
