import { Separator } from '@/shared/ui/shadcn/separator';
import { SidebarTrigger } from '@/shared/ui/shadcn/sidebar';

export function HeaderLogin() {
  return (
    <div className='bg-background sticky top-0 z-30 flex h-8 w-full items-center gap-2'>
      <SidebarTrigger />
      <Separator orientation='vertical' />
    </div>
  );
}
