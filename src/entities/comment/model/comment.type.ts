export interface CommentEntity {
  id: number;
  postId: number;
  author: string; // 닉네임 (문자열)
  handle?: string; // "@..."
  authorTag?: 'AUTHOR' | 'NORMAL' | 'AI' | null; // "AUTHOR": 작성자, "NORMAL": 일반 사용자, "AI": 인공지능
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
