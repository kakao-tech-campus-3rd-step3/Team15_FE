import * as React from 'react';

import { Eye, Heart, MessageSquare, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import type { Post } from '../model/types';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Separator } from '@radix-ui/react-separator';
import { Button } from '@/shared/ui/shadcn/button';

type Props = {
  post: Post;
  className?: string;
  onClickLike?: () => void;
  onClickReport?: () => void;
  actionSlot?: React.ReactNode; // 공유 등
};

export function PostDetail({ post, className, onClickLike, onClickReport, actionSlot }: Props) {
  const initials = post.author.nickname?.slice(0, 2) ?? 'U';
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className='text-2xl'>{post.title}</CardTitle>
        <CardDescription>
          <div className='flex items-center gap-3 text-sm'>
            <Avatar className='h-8 w-8'>
              {post.author.avatarUrl ? (
                <AvatarImage src={post.author.avatarUrl} alt={`${post.author.nickname} avatar`} />
              ) : null}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className='font-medium'>{post.author.nickname}</span>
            <Separator orientation='vertical' className='h-4' />
            <time className='text-muted-foreground'>
              {new Date(post.createdAt).toLocaleString()}
            </time>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='prose max-w-none whitespace-pre-wrap leading-7'>{post.content}</div>

        <div className='text-muted-foreground mt-6 flex items-center justify-between text-sm'>
          <div className='flex items-center gap-4'>
            <span className='inline-flex items-center gap-1'>
              <Heart className='h-4 w-4' />
              {post.likeCount}
            </span>
            <span className='inline-flex items-center gap-1'>
              <MessageSquare className='h-4 w-4' />
              {post.commentCount}
            </span>
            <span className='inline-flex items-center gap-1'>
              <Eye className='h-4 w-4' />
              {post.viewCount}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' onClick={onClickLike}>
              <Heart className='mr-1 h-4 w-4' />
              좋아요
            </Button>
            <Button variant='ghost' size='sm' onClick={onClickReport}>
              <Flag className='mr-1 h-4 w-4' />
              신고
            </Button>
            {actionSlot}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostDetail;
