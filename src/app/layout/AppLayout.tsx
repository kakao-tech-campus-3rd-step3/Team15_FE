import { Outlet } from 'react-router-dom';
import { Footer } from '@/widgets/footer';
import { Separator } from '@/shared/ui/shadcn/separator';
import { SidebarProvider } from '@/shared/ui/shadcn/sidebar';
import { SideBar } from '@/widgets/sidebar';
import { HeaderGuest, HeaderLogin } from '@/widgets/header';

export default function AppLayout() {
  const isLoggedIn = false;
  return (
    <>
      {isLoggedIn ? (
        <>
          <HeaderGuest />
          <Separator />
          <Outlet />
          <Footer />
        </>
      ) : (
        <SidebarProvider>
          <SideBar />
          <main className='m-3'>
            <HeaderLogin />
            <Outlet />
            <Footer />
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
