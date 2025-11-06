// 공통 베이스 타입
export interface BasePostResponse {
  id: number;
  postCategory: string; // 예: 'FREE', 'QUESTION', ...
  displayName: string; // 예: '자유', '질문'
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string; // ISO 형식 예: "2025-09-19T19:28:23.549989"
}

// 활동 헤더
export interface ActivityHeaderProps {
  postCount: number;
  commentCount: number;
  likesCount: number;
}
