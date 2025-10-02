import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/shadcn/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronUp, User2 } from 'lucide-react';

function SidebarFooterSection() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 /> Username
                <ChevronUp className='ml-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='top' className='w-56'>
              <DropdownMenuItem>
                <span>내 계정</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>설정</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>로그아웃</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default SidebarFooterSection;
