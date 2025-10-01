// 내가 쓴 글
export interface MyPost {
  id: number;
  title: string;
  content: string;
  date: string; // YYYY.MM.DD 형식
  likes: number;
  comments: number;
  views: number;
  category: string; // '후기' | '질문' | '모집' | '정보' | '팁' ... 식으로 enum으로 바꿀 수도 있음
  status: string; //'published' | 'draft' | 'deleted'; 으로 확장 가능
}

// 내가 단 댓글
export interface MyComment {
  id: number;
  postTitle: string;
  comment: string;
  date: string;
  likes: number;
  author: string;
  postCategory: string;
}

// 좋아요한 글
export interface LikedPost {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  category: string;
  excerpt: string;
}
