import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  Sidebar,
  SidebarMenuItem,
} from '@/shared/ui/shadcn/sidebar';
import { LayoutGrid, MessageCircle, NotebookText, FileText } from 'lucide-react';

export function SideBar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <div className='flex items-center gap-2'>
              <LayoutGrid />홈
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className='flex items-center gap-2'>
              <NotebookText />
              미션
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className='flex items-center gap-2'>
              <MessageCircle />
              마음소식
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className='flex items-center gap-2'>
              <FileText />
              지원사업
            </div>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
