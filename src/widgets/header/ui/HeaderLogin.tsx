import { Separator } from '@/shared/ui/shadcn/separator';
import { SidebarTrigger } from '@/shared/ui/shadcn/sidebar';
import { useLocation } from 'react-router-dom';
import { getActiveItem } from '../model/getActiveItem';

export function HeaderLogin() {
  const location = useLocation();
  const pathname = location.pathname;
  const activeItem = getActiveItem(pathname);

  return (
    <div className='bg-background sticky top-0 z-30 flex h-8 w-full items-center gap-5'>
      <SidebarTrigger />
      <Separator orientation='vertical' />
      <div className='text-sm font-medium'>{activeItem?.title}</div>
    </div>
  );
}
