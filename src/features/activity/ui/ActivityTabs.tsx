import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/shadcn/tabs';
import { Card, CardContent } from '@/shared/ui/shadcn/card';
import { PenTool, MessageCircle, ThumbsUp, Heart, TrendingUp, Calendar, Eye } from 'lucide-react';
import { getCategoryColor } from '../lib/activityUtils';
import { Badge } from '@/shared/ui/shadcn/badge';
import type { LikedPost, MyComment, MyPost } from '../types/activity';

interface ActivityTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  posts: MyPost[];
  comments: MyComment[];
  likedPosts: LikedPost[];
  searchQuery: string;
}

export function ActivityTabs({
  activeTab,
  onTabChange,
  posts,
  comments,
  likedPosts,
  searchQuery,
}: ActivityTabsProps) {
  // 필터 로직은 여기서 처리
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredComments = comments.filter(
    (comment) =>
      comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.comment.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredLikedPosts = likedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Card>
      <CardContent className='pt-6'>
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className='mb-6 grid w-full grid-cols-3'>
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

          <TabsContent value='posts' className='space-y-4'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>내가 쓴 글 ({filteredPosts.length}개)</h3>
              <div className='flex items-center space-x-2 text-sm text-gray-500'>
                <TrendingUp className='h-4 w-4' />
                <span>총 조회수: {posts.reduce((sum, post) => sum + post.views, 0)}회</span>
              </div>
            </div>
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className='rounded-lg border bg-white p-5 transition-colors hover:bg-gray-50'
              >
                <div className='mb-3 flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='mb-2 flex items-center space-x-2'>
                      <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                    </div>
                    <h4 className='mb-2 text-lg font-semibold text-gray-900'>{post.title}</h4>
                    <p className='mb-3 line-clamp-2 text-sm text-gray-600'>{post.content}</p>
                  </div>
                  <span className='ml-4 flex items-center text-sm text-gray-500'>
                    <Calendar className='mr-1 h-4 w-4' />
                    {post.date}
                  </span>
                </div>
                <div className='flex items-center space-x-6 text-sm text-gray-600'>
                  <span className='flex items-center'>
                    <Heart className='mr-1 h-4 w-4 text-red-500' />
                    좋아요 {post.likes}
                  </span>
                  <span className='flex items-center'>
                    <MessageCircle className='mr-1 h-4 w-4 text-blue-500' />
                    댓글 {post.comments}
                  </span>
                  <span className='flex items-center'>
                    <Eye className='mr-1 h-4 w-4 text-gray-500' />
                    조회 {post.views}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value='comments' className='space-y-4'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>내 댓글 ({filteredComments.length}개)</h3>
              <div className='flex items-center space-x-2 text-sm text-gray-500'>
                <Heart className='h-4 w-4' />
                <span>
                  총 좋아요: {comments.reduce((sum, comment) => sum + comment.likes, 0)}개
                </span>
              </div>
            </div>
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className='rounded-lg border bg-white p-5 transition-colors hover:bg-gray-50'
              >
                <div className='mb-3 flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='mb-2 flex items-center space-x-2'>
                      <Badge className={getCategoryColor(comment.postCategory)}>
                        {comment.postCategory}
                      </Badge>
                      <span className='text-sm font-medium text-blue-600'>{comment.postTitle}</span>
                    </div>
                    <p className='mb-2 leading-relaxed text-gray-700'>{comment.comment}</p>
                    <div className='flex items-center space-x-4 text-sm text-gray-500'>
                      <span>원글 작성자: {comment.author}</span>
                      <span className='flex items-center'>
                        <Calendar className='mr-1 h-4 w-4' />
                        {comment.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-4 text-sm text-gray-600'>
                  <span className='flex items-center'>
                    <Heart className='mr-1 h-4 w-4 text-red-500' />
                    좋아요 {comment.likes}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value='likes' className='space-y-4'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>좋아요한 글 ({filteredLikedPosts.length}개)</h3>
              <div className='text-sm text-gray-500'>관심있는 글들을 모아보세요</div>
            </div>
            {filteredLikedPosts.map((post) => (
              <div
                key={post.id}
                className='rounded-lg border bg-white p-5 transition-colors hover:bg-gray-50'
              >
                <div className='mb-3 flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='mb-2 flex items-center space-x-2'>
                      <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                      <span className='text-sm text-gray-600'>작성자: {post.author}</span>
                    </div>
                    <h4 className='mb-2 text-lg font-semibold text-gray-900'>{post.title}</h4>
                    <p className='mb-3 text-sm leading-relaxed text-gray-600'>{post.excerpt}</p>
                  </div>
                  <span className='ml-4 flex items-center text-sm text-gray-500'>
                    <Calendar className='mr-1 h-4 w-4' />
                    {post.date}
                  </span>
                </div>
                <div className='flex items-center space-x-6 text-sm text-gray-600'>
                  <span className='flex items-center'>
                    <Heart className='mr-1 h-4 w-4 text-red-500' />
                    좋아요 {post.likes}
                  </span>
                  <span className='flex items-center'>
                    <MessageCircle className='mr-1 h-4 w-4 text-blue-500' />
                    댓글 {post.comments}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
