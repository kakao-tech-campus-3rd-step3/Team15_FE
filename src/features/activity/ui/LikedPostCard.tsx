import { Badge } from '@/shared/ui/badge';
import { getCategoryColor } from '../lib/activityUtils';
import type { MyLikedPost } from '../types/activity';
import { formatDate } from '@/shared/lib/date';
import { Calendar, Heart, MessageCircle } from 'lucide-react';

interface Props {
  post: MyLikedPost;
}
export function LikedPostCard({ post }: Props) {
  return (
    <div className='rounded-lg border bg-white p-5 transition-colors hover:bg-gray-50'>
      <div className='mb-3 flex items-start justify-between'>
        <div className='flex-1'>
          <div className='mb-2 flex items-center space-x-2'>
            <Badge className={getCategoryColor(post.displayName)}>{post.displayName}</Badge>
          </div>
          <h4 className='mb-2 text-lg font-semibold text-gray-900'>{post.postTitle}</h4>
          <p className='mb-3 text-sm leading-relaxed text-gray-600'>{post.postContent}</p>
        </div>
        <span className='ml-4 flex items-center text-sm text-gray-500'>
          <Calendar className='mr-1 h-4 w-4' />
          {formatDate(post.postCreatedAt)}
        </span>
      </div>
      <div className='flex items-center space-x-6 text-sm text-gray-600'>
        <span className='flex items-center'>
          <Heart className='mr-1 h-4 w-4 text-red-500' />
          좋아요 {post.likeCount}
        </span>
        <span className='flex items-center'>
          <MessageCircle className='mr-1 h-4 w-4 text-blue-500' />
          댓글 {post.commentCount}
        </span>
      </div>
    </div>
  );
}
