export interface CommentEntity {
  id: number;
  postId: number;
  author: string; // 닉네임 (문자열)
  handle?: string; // "@..."
  authorTag?: string; // "AUTHOR" 등
  content: string | null; // null 허용 → 어댑터에서 string으로 변환
  isAnonymous?: boolean;
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
