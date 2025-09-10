import { Sidebar, SidebarHeader } from '@/shared/ui/shadcn/sidebar';

import SidebarContentSection from './SidebarContentSection';
import SidebarFooterSection from './SidebarFooterSection';

export function SideBar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className='block w-full text-center text-xl font-bold'>휴 쉼</span>
      </SidebarHeader>
      <SidebarContentSection />
      <SidebarFooterSection />
    </Sidebar>
  );
}
