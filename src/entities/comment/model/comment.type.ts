export interface CommentEntity {
  id: number;
  postId: number;
  authorId: number;
  author: string;
  handle: string;
  authorTag: 'AUTHOR' | 'NORMAL' | 'AI' | null;
  content: string | null;
  isAnonymous: boolean;
  isAuthor?: boolean;
  createdAt: string;
  updatedAt?: string;
  hasChildren?: boolean;
}

export interface CommentListResponse {
  page: number;
  content: CommentEntity[];
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
