// 대댓글 작성 요청 타입
export interface CreateReplyRequest {
  content: string;
  isAnonymous?: boolean;
}

export interface CreateReplyVariables {
  parentId: number;
  data: CreateReplyRequest;
}

// 대댓글 단일 객체 타입
export interface Reply {
  id: number;
  postId: number;
  content: string;
  authorId: number;
  author: string;
  handle?: string;
  authorTag: 'AUTHOR' | 'NORMAL' | 'AI' | null;
  isAuthor: boolean;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
  children: Reply[];
  deleted: boolean;
}

export type CreateReplyResponse = Reply;
export type ReplyResponse = Reply;
export type ReplyListResponse = Reply[];
