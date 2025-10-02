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
  handle: string;
  isAnonymous: boolean;
  isDeleted: boolean;
  isLiked: boolean;
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

// export interface Author {
//   id: number;
//   nickname: string;
//   avatarUrl?: string | null;
// }

// export interface Post {
//   id: PostId;
//   title: string;
//   content: string;
//   author: Author;
//   likeCount: number;
//   viewCount: number;
//   commentCount: number;
//   createdAt: string; // ISO string
//   updatedAt?: string;
//   tags?: string[];
//   // 필요시 확장
// }

export interface PostDetail {
  id: number;
  postCategory: string; // 카테고리 코드 (예: "TROUBLE")
  postCategoryName: string; // 카테고리 한글 이름 (예: "고민상담")
  title: string;
  content: string;
  author: string; // 작성자 닉네임
  handle: string; // 작성자 핸들 (예: "@yozjov")
  isAnonymous: boolean; // 익명 여부
  isDeleted: boolean; // 삭제 여부
  isLiked: boolean; // 내가 좋아요 눌렀는지 여부
  viewCount: number; // 조회수
  likeCount: number; // 좋아요 개수
  commentCount: number; // 댓글 개수
  createdAt: string; // 작성일 (ISO 8601)
  updatedAt: string; // 수정일 (ISO 8601)
}
