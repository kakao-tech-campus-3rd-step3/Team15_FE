import { useUserProfile } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { formatDate } from '@/shared/lib/date';
import { Button } from '@/shared/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/shadcn/tabs';
import { BookOpen, Heart, MessageCircle, PenTool, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type TabValue = 'posts' | 'comments' | 'likes';

export const ActivityTabs = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('posts');

  const { data, isPending, isError } = useUserProfile();
  if (isPending) return <div>로딩중...</div>;
  if (isError || !data) return <div>데이터를 불러오지 못했습니다.</div>;

  const { comments, likePosts, posts } = data ?? {}; //추후 select 이용해서 리팩토링

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center'>
            <BookOpen className='mr-2 h-5 w-5' />내 활동 내역
          </CardTitle>
          <Link to={ROUTES.activity}>
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
            {posts.map((post) => (
              <div
                key={post.postId}
                className='rounded-lg border p-4 transition-colors hover:bg-gray-50'
              >
                <div className='mb-2 flex items-start justify-between'>
                  <h4 className='font-medium text-gray-900'>{post.title}</h4>
                  <span className='text-sm text-gray-500'>{formatDate(post.createdAt)}</span>
                </div>
                <div className='flex items-center space-x-4 text-sm text-gray-600'>
                  <span className='flex items-center'>
                    <Heart className='mr-1 h-4 w-4' />
                    {post.likeCount}
                  </span>
                  <span className='flex items-center'>
                    <MessageCircle className='mr-1 h-4 w-4' />
                    {post.commentCount}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value='comments' className='mt-6 space-y-4'>
            {comments.map((comment) => (
              <div
                key={comment.commentId}
                className='rounded-lg border p-4 transition-colors hover:bg-gray-50'
              >
                <div className='mb-2 flex items-start justify-between'>
                  <span className='text-sm font-medium text-blue-600'>{comment.postTitle}</span>
                  <span className='text-sm text-gray-500'>{formatDate(comment.createdAt)}</span>
                </div>
                <p className='text-sm text-gray-700'>{comment.content}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value='likes' className='mt-6 space-y-4'>
            {likePosts.map((post) => (
              <div
                key={post.likeId}
                className='rounded-lg border p-4 transition-colors hover:bg-gray-50'
              >
                <div className='mb-2 flex items-start justify-between'>
                  <h4 className='font-medium text-gray-900'>{post.title}</h4>
                  <span className='text-sm text-gray-500'>{formatDate(post.createdAt)}</span>
                </div>
                <p className='text-sm text-gray-600'>작성자: {'null'}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
