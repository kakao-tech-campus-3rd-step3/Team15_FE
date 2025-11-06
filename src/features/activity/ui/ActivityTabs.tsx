import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Card, CardContent } from '@/shared/ui/card';
import { PenTool, MessageCircle, ThumbsUp, Heart, TrendingUp } from 'lucide-react';

import type { MyComment, MyLikedPost, MyPost } from '../types/activity';
import { ActivityPostCard } from './ActivityCard';
import { CommentCard } from './CommentCard';
import { LikedPostCard } from './LikedPostCard';

interface ActivityTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  posts: MyPost[];
  comments: MyComment[];
  likedPosts: MyLikedPost[];
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
      post.title?.toLowerCase().includes(searchQuery?.toLowerCase() ?? '') ||
      post.content?.toLowerCase().includes(searchQuery?.toLowerCase() ?? ''),
  );

  const filteredComments = comments.filter(
    (comment) =>
      comment.postTitle?.toLowerCase().includes(searchQuery?.toLowerCase() ?? '') ||
      comment.content?.toLowerCase().includes(searchQuery?.toLowerCase() ?? '') ||
      comment.postContent?.toLowerCase().includes(searchQuery?.toLowerCase() ?? ''),
  );

  const filteredLikedPosts = likedPosts.filter(
    (post) =>
      post.postTitle?.toLowerCase().includes(searchQuery?.toLowerCase() ?? '') ||
      post.postContent?.toLowerCase().includes(searchQuery?.toLowerCase() ?? ''),
  );
  console.log(posts, comments, likedPosts);

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

          {/* 내가 쓴 글 */}
          <TabsContent value='posts'>
            <ActivityListSection
              title='내가 쓴 글'
              count={posts.length}
              subInfo={`총 조회수: ${posts.reduce((sum, p) => sum + p.viewCount, 0)}회`}
              icon={<TrendingUp className='h-4 w-4' />}
            >
              {filteredPosts.map((post) => (
                <ActivityPostCard key={post.id} post={post} />
              ))}
            </ActivityListSection>
          </TabsContent>

          {/* 내 댓글 */}
          <TabsContent value='comments'>
            <ActivityListSection
              title='내 댓글'
              count={comments.length}
              subInfo={`총 좋아요: ${comments.reduce((sum, c) => sum + c.likeCount, 0)}개`}
              icon={<Heart className='h-4 w-4' />}
            >
              {filteredComments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </ActivityListSection>
          </TabsContent>

          {/* 좋아요한 글 */}
          <TabsContent value='likes'>
            <ActivityListSection
              title='좋아요한 글'
              count={likedPosts.length}
              subInfo='관심있는 글들을 모아보세요'
            >
              {filteredLikedPosts.map((post) => (
                <LikedPostCard key={post.id} post={post} />
              ))}
            </ActivityListSection>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ActivityListSection({
  title,
  count,
  subInfo,
  icon,
  children,
}: {
  title: string;
  count: number;
  subInfo?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>
          {title} ({count}개)
        </h3>
        {subInfo && (
          <div className='flex items-center space-x-2 text-sm text-gray-500'>
            {icon}
            <span>{subInfo}</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
