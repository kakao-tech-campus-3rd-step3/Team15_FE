import type { PostEntity } from '../model/types';

export async function fetchPosts(): Promise<PostEntity[]> {
  await new Promise((r) => setTimeout(r, 150));
  return [
    { id: '1', title: '4년전에 왔던 우울에…', preview: '현 26살이고…', likes: 12, comments: 12 },
    {
      id: '2',
      title: '저를 잃어버린 것 같아요',
      preview: '제가 뭐 우여곡절이…',
      likes: 9,
      comments: 5,
    },
    { id: '3', title: '너무 고민중이에요', preview: '대학을 중퇴하고…', likes: 14, comments: 8 },
  ];
}
