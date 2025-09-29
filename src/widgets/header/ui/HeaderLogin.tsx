import { Separator } from '@/shared/ui/shadcn/separator';
import { SidebarTrigger } from '@/shared/ui/shadcn/sidebar';
import { useLocation } from 'react-router-dom';
import { getActiveItem } from '../model/getActiveItem';
import { Bell } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/button';
import { useLogout } from '@/features/auth/api/useLogout';

export function HeaderLogin() {
  const location = useLocation();
  const pathname = location.pathname;
  const activeItem = getActiveItem(pathname);
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className='bg-background sticky top-0 z-30 flex h-8 w-full items-center gap-5'>
      <SidebarTrigger />
      <Separator orientation='vertical' />
      <div className='text-sm font-medium'>{activeItem?.title}</div>
      <div className='ml-auto flex items-center gap-4'>
        <div className='relative'>
          <Bell />
          <span className='absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-500' />
        </div>
        <div className='flex flex-col text-right'>
          <span className='text-sm font-semibold'>전남대학교</span>
          <span className='text-xs text-gray-500'>전남대1팀</span>
        </div>
        <Button
          variant='destructive'
          size='sm'
          className='rounded-full'
          onClick={() => logout()}
          disabled={isPending}
        >
          {isPending ? '로그아웃 중…' : '로그아웃'}
        </Button>
      </div>
    </div>
  );
}
