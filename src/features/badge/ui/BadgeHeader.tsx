import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/shadcn/button';

export function BadgeHeader() {
  return (
    <div className='flex items-center space-x-4'>
      <Link to={ROUTES.my}>
        <Button variant='outline' size='sm'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          돌아가기
        </Button>
      </Link>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>내 뱃지 컬렉션</h1>
        <p className='text-gray-600'>획득한 뱃지와 도전할 수 있는 뱃지들을 확인해보세요</p>
      </div>
    </div>
  );
}
