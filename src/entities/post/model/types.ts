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
