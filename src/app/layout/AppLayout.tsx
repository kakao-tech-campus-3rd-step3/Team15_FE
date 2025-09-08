import { Outlet } from 'react-router-dom';
import { Footer } from '@/widgets/footer';
import { Separator } from '@/shared/ui/shadcn/separator';
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/shadcn/sidebar';
import { SideBar } from '@/widgets/sidebar';
import { HeaderGuest } from '@/widgets/header';

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
          <main>
            <SidebarTrigger />
            <Separator />
            <Outlet />
            <Footer />
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
