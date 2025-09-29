export type CategoryCode =
  | 'ALL'
  | 'FREE'
  | 'STUDY'
  | 'CAREER'
  | 'RELATIONSHIP'
  | 'SOCIAL'
  | 'FAMILY'
  | 'HOBBY'
  | 'MENTAL'
  | 'TROUBLE';

export type PostEntity = {
  id: number;
  postCategory: CategoryCode;
  postCategoryName: string;
  title: string;
  content: string;
  author: string;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  createdAt: string; // ISO string
};

export type PageResponse<T> = {
  page: number; // 0-based
  content: T[];
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type PostStats = {
  totalCount: number;
  weekCount: number;
  todayCount: number;
};

export type PostId = number;

export interface Author {
  id: number;
  nickname: string;
  avatarUrl?: string | null;
}

export interface Post {
  id: PostId;
  title: string;
  content: string;
  author: Author;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  createdAt: string; // ISO string
  updatedAt?: string;
  tags?: string[];
  // 필요시 확장
}
