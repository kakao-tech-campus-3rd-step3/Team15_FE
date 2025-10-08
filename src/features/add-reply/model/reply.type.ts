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
  author: string;
  handle?: string;
  authorTag?: string;
  createdAt: string;
  updatedAt: string;
  children: Reply[];
  deleted: boolean;
}

export type CreateReplyResponse = Reply;
export type ReplyListResponse = Reply[];
