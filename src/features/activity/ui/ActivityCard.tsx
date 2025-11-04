import { Badge } from '@/shared/ui/badge';
import { Calendar, Heart, MessageCircle, Eye } from 'lucide-react';
import type { BasePostResponse } from '../types/activity';
import { getCategoryColor } from '../lib/activityUtils';
import { formatDate } from '@/shared/lib/date';

interface ActivityPostCardProps {
  post: BasePostResponse;
}

export const ActivityPostCard = ({ post }: ActivityPostCardProps) => {
  return (
    <div
      key={post.id}
      className='rounded-lg border bg-white p-5 transition-colors hover:bg-gray-50'
    >
      <div className='mb-3 flex items-start justify-between'>
        <div className='flex-1'>
          <div className='mb-2 flex items-center space-x-2'>
            <Badge className={getCategoryColor(post.displayName)}>{post.displayName}</Badge>
          </div>
          <h4 className='mb-2 text-lg font-semibold text-gray-900'>{post.title}</h4>
          <p className='mb-3 line-clamp-2 text-sm text-gray-600'>{post.content}</p>
        </div>
        <span className='ml-4 flex items-center text-sm text-gray-500'>
          <Calendar className='mr-1 h-4 w-4' />
          {formatDate(post.createdAt)}
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
        <span className='flex items-center'>
          <Eye className='mr-1 h-4 w-4 text-gray-500' />
          조회 {post.viewCount}
        </span>
      </div>
    </div>
  );
};
