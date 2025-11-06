import { Badge } from '@/shared/ui/badge';
import { getCategoryColor } from '../lib/activityUtils';
import { formatDate } from '@/shared/lib/date';
import { Calendar, Heart } from 'lucide-react';
import type { MyComment } from '../types/activity';

interface Props {
  comment: MyComment;
}

export function CommentCard({ comment }: Props) {
  return (
    <div className='rounded-lg border bg-white p-5 transition-colors hover:bg-gray-50'>
      <div className='mb-3 flex items-start justify-between'>
        <div className='flex-1'>
          <div className='mb-2 flex items-center space-x-2'>
            <Badge className={getCategoryColor(comment.displayName)}>{comment.displayName}</Badge>
            <span className='text-sm font-medium text-blue-600'>{comment.postTitle}</span>
          </div>
          <p className='mb-2 leading-relaxed text-gray-700'>
            해당 게시물에 {comment.content}을 달았습니다.
          </p>
          <div className='flex items-center space-x-4 text-sm text-gray-500'>
            <span className='flex items-center'>
              <Calendar className='mr-1 h-4 w-4' />
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-center space-x-4 text-sm text-gray-600'>
        <span className='flex items-center'>
          <Heart className='mr-1 h-4 w-4 text-red-500' />
          좋아요 {comment.likeCount}
        </span>
      </div>
    </div>
  );
}
