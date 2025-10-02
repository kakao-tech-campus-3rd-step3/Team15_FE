import { BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/shadcn/button';

interface ActivityHeaderProps {
  postCount: number;
  commentCount: number;
  likeCount: number;
}

export function ActivityHeader({ postCount, commentCount, likeCount }: ActivityHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
        <Link to={ROUTES.my}>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            돌아가기
          </Button>
        </Link>
        <div>
          <h1 className='flex items-center text-2xl font-bold'>
            <BookOpen className='mr-3 h-6 w-6 text-green-600' />내 활동 내역
          </h1>
          <p className='mt-1 text-gray-600'>나의 모든 활동을 한눈에 확인해보세요</p>
        </div>
      </div>

      {/* 통계 요약 */}
      <div className='flex space-x-4'>
        <div className='text-center'>
          <div className='text-lg font-bold text-green-600'>{postCount}</div>
          <div className='text-xs text-gray-500'>작성글</div>
        </div>
        <div className='text-center'>
          <div className='text-lg font-bold text-blue-600'>{commentCount}</div>
          <div className='text-xs text-gray-500'>댓글</div>
        </div>
        <div className='text-center'>
          <div className='text-lg font-bold text-red-600'>{likeCount}</div>
          <div className='text-xs text-gray-500'>좋아요</div>
        </div>
      </div>
    </div>
  );
}
