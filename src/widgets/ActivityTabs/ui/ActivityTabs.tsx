import { Button } from '@/shared/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/shadcn/tabs';
import { BookOpen, Heart, MessageCircle, PenTool, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type TabValue = 'posts' | 'comments' | 'likes';

export const ActivityTabs = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('posts');

  const myPosts = [
    { id: 1, title: '커뮤니티 활동 팁 공유합니다', date: '2024.03.15', likes: 24, comments: 8 },
    { id: 2, title: '새로운 기능 제안드려요', date: '2024.03.12', likes: 15, comments: 12 },
    { id: 3, title: '질문있어요! 도움 부탁드립니다', date: '2024.03.10', likes: 8, comments: 5 },
  ];

  const myComments = [
    {
      id: 1,
      post: '개발자 모임 후기',
      comment: '정말 유익한 시간이었네요! 다음에도 참여하고 싶어요.',
      date: '2024.03.16',
    },
    {
      id: 2,
      post: 'React 질문',
      comment: 'useEffect 사용할 때 dependency array 확인해보세요.',
      date: '2024.03.15',
    },
    {
      id: 3,
      post: '프로젝트 팀원 모집',
      comment: '관심있습니다! DM 보내드릴게요.',
      date: '2024.03.14',
    },
  ];

  const likedPosts = [
    { id: 1, title: 'Next.js 14 새로운 기능들', author: '개발자김씨', date: '2024.03.16' },
    { id: 2, title: '디자인 시스템 구축 경험담', author: '디자이너박씨', date: '2024.03.15' },
    { id: 3, title: '스타트업 취업 후기', author: '신입이씨', date: '2024.03.14' },
  ];

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center'>
            <BookOpen className='mr-2 h-5 w-5' />내 활동 내역
          </CardTitle>
          <Link to='/activity'>
            <Button variant='outline' size='sm'>
              자세히 보기
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as TabValue)}>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='posts' className='flex items-center space-x-2'>
              <PenTool className='h-4 w-4' />
              <span>내가 쓴 글</span>
            </TabsTrigger>
            <TabsTrigger value='comments' className='flex items-center space-x-2'>
              <MessageCircle className='h-4 w-4' />
              <span>내 댓글</span>
            </TabsTrigger>
            <TabsTrigger value='likes' className='flex items-center space-x-2'>
              <ThumbsUp className='h-4 w-4' />
              <span>좋아요한 글</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='posts' className='mt-6 space-y-4'>
            {myPosts.map((post) => (
              <div
                key={post.id}
                className='rounded-lg border p-4 transition-colors hover:bg-gray-50'
              >
                <div className='mb-2 flex items-start justify-between'>
                  <h4 className='font-medium text-gray-900'>{post.title}</h4>
                  <span className='text-sm text-gray-500'>{post.date}</span>
                </div>
                <div className='flex items-center space-x-4 text-sm text-gray-600'>
                  <span className='flex items-center'>
                    <Heart className='mr-1 h-4 w-4' />
                    {post.likes}
                  </span>
                  <span className='flex items-center'>
                    <MessageCircle className='mr-1 h-4 w-4' />
                    {post.comments}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value='comments' className='mt-6 space-y-4'>
            {myComments.map((comment) => (
              <div
                key={comment.id}
                className='rounded-lg border p-4 transition-colors hover:bg-gray-50'
              >
                <div className='mb-2 flex items-start justify-between'>
                  <span className='text-sm font-medium text-blue-600'>{comment.post}</span>
                  <span className='text-sm text-gray-500'>{comment.date}</span>
                </div>
                <p className='text-sm text-gray-700'>{comment.comment}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value='likes' className='mt-6 space-y-4'>
            {likedPosts.map((post) => (
              <div
                key={post.id}
                className='rounded-lg border p-4 transition-colors hover:bg-gray-50'
              >
                <div className='mb-2 flex items-start justify-between'>
                  <h4 className='font-medium text-gray-900'>{post.title}</h4>
                  <span className='text-sm text-gray-500'>{post.date}</span>
                </div>
                <p className='text-sm text-gray-600'>작성자: {post.author}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
