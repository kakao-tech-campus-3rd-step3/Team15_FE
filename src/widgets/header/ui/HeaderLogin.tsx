import { Separator } from '@/shared/ui/separator';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { getActiveItem } from '../model/getActiveItem';
import { Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useLogout } from '@/features/auth/api/useLogout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ROUTES } from '@/shared/config';
import { useUserSummaryQuery } from '../model/useUserSummaryQuery';

export function HeaderLogin() {
  const location = useLocation();
  const pathname = location.pathname;
  const activeItem = getActiveItem(pathname);
  const { data: userSummary } = useUserSummaryQuery();
  const { logout } = useLogout();
  const navigate = useNavigate();

  return (
    <div className='bg-background h-13 sticky top-0 z-30 flex w-full items-center gap-4 px-4'>
      <SidebarTrigger />
      <Separator orientation='vertical' className='!h-8 self-center' />
      <div className='text-sm font-medium'>{activeItem?.title}</div>
      <div className='ml-auto flex items-center gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='group flex cursor-pointer items-center gap-3 outline-none'>
              <div className='relative'>
                <Bell />
                <span className='absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-500' />
              </div>
              <div className='flex flex-col text-right'>
                <span className='text-sm font-semibold'>{userSummary.handle}</span>
                <span className='text-xs text-gray-500'>{userSummary.name}</span>
              </div>
              <ChevronDown className='h-4 w-4 text-gray-500 transition-transform group-data-[state=open]:rotate-180' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' sideOffset={8} className='w-40'>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                navigate(ROUTES.my);
              }}
            >
              내 설정
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant='destructive' size='sm' className='rounded-full' onClick={() => logout()}>
          {'로그아웃'}
        </Button>
      </div>
    </div>
  );
}
