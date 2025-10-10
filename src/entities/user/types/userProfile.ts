export interface User {
  nickname: string;
  joinDate: string;
  lastActiveDate: string;
  score: number;
  level: number;
}

export interface UserStats {
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  totalMissionClear: number;
}

export interface BadgeSummary {
  name: string;
  iconUrl: string;
}

export interface PostSummary {
  postId: number;
  title: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface CommentSummary {
  commentId: number;
  content: string;
  postId: number;
  postTitle: string;
  createdAt: string;
}

export interface LikePostSummary {
  likeId: number;
  postId: number;
  title: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  likedAt: string;
}

export interface Account {
  email: string;
  passwordLastChanged: string;
  newCommentNotification: boolean;
  likeNoticeNotification: boolean;
}

export interface UserProfileResponse {
  // 이름 변경 고민 Entity vs Response
  user: User;
  stats: UserStats;
  badges: BadgeSummary[];
  posts: PostSummary[];
  comments: CommentSummary[];
  likePosts: LikePostSummary[];
  account: Account;
}
