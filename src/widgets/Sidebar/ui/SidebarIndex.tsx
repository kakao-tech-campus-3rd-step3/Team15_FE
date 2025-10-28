import { Sidebar, SidebarHeader } from '@/shared/ui/sidebar';
import SidebarContentSection from './SidebarContentSection';
// import SidebarFooterSection from './SidebarFooterSection';

export function SidebarIndex() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className='block w-full text-center text-xl font-bold'>휴 쉼</span>
      </SidebarHeader>
      <SidebarContentSection />
      {/* <SidebarFooterSection /> */}
    </Sidebar>
  );
}
