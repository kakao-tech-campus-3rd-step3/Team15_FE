import { Outlet } from 'react-router-dom';
import { Footer } from '@/widgets/footer';
import { Separator } from '@/shared/ui/separator';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { HeaderGuest, HeaderLogin } from '@/widgets/header';
import { SidebarIndex } from '@/widgets/Sidebar/ui/SidebarIndex';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

export default function AppLayout() {
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      {!isLoggedIn ? (
        <>
          <HeaderGuest />
          <Separator />
          <Outlet />
          <Footer />
        </>
      ) : (
        <SidebarProvider>
          <SidebarIndex />
          <main className='m-3 w-screen'>
            <HeaderLogin />
            <Outlet />
            <Footer />
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
