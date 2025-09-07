import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { Separator } from '@/shared/ui/shadcn/separator';

export default function AppLayout() {
  return (
    <>
      <Header />
      <Separator />
      <Outlet />
      <Footer />
    </>
  );
}
