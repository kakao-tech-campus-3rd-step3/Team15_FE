import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Footer } from '@/widgets/footer';
import { Separator } from '@/shared/ui/shadcn/separator';
import { SidebarProvider } from '@/shared/ui/shadcn/sidebar';
import { SideBar } from '@/widgets/sidebar';
import { HeaderGuest, HeaderLogin } from '@/widgets/header';

export default function AppLayout() {
  const read = () =>
    typeof localStorage !== 'undefined' && localStorage.getItem('app:isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(read());

  useEffect(() => {
    const handle = () => setIsLoggedIn(read());
    window.addEventListener('auth:change', handle);
    window.addEventListener('storage', handle);
    return () => {
      window.removeEventListener('auth:change', handle);
      window.removeEventListener('storage', handle);
    };
  }, []);

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
