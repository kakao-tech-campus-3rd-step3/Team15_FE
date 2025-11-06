// 공통 베이스 (모든 게시글이 공통으로 가지는 필드)
export interface BasePost {
  id: number;
  postCategory: string;
  displayName: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
}

// 내가 쓴 글
export interface MyPost extends BasePost {
  title: string;
  content: string;
  createdAt: string;
}

// 내가 쓴 댓글
export interface MyComment extends BasePost {
  content: string;
  createdAt: string;
  isAnonymous: boolean;
  postId: number;
  postTitle: string;
  postContent: string;
}

// 좋아요한 글
export interface MyLikedPost extends BasePost {
  postId: number;
  postTitle: string;
  postContent: string;
  postCreatedAt: string;
}

// 활동 헤더
export interface ActivityHeaderProps {
  postCount: number;
  commentCount: number;
  likesCount: number;
}
