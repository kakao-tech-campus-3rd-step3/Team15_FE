import { Sidebar } from '@/shared/ui/shadcn/sidebar';

import SidebarContentSection from './SidebarContentSection';
import SidebarFooterSection from './SidebarFooterSection';

export function SideBar() {
  return (
    <Sidebar>
      <SidebarContentSection />
      <SidebarFooterSection />
    </Sidebar>
  );
}
