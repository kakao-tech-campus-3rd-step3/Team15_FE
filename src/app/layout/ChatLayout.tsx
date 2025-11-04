import { Outlet } from 'react-router-dom';
import { Separator } from '@/shared/ui/separator';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { HeaderGuest, HeaderLogin } from '@/widgets/header';
import { SidebarIndex } from '@/widgets/Sidebar/ui/SidebarIndex';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

export default function ChatLayout() {
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      {!isLoggedIn ? (
        <>
          <HeaderGuest />
          <Separator />
          <Outlet />
        </>
      ) : (
        <SidebarProvider>
          <SidebarIndex />
          <main className='w-screen'>
            <HeaderLogin />
            <Outlet />
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
