import { DevPanel } from '@/shared/ui';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { LandingPage } from '@/pages/landing';
import { ROUTES } from '@/shared/config';
import { AuthPage } from '@/pages/auth';
import { MyPage } from '@/pages/my';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.landing} element={<LandingPage />} />
          {/* <Route path={ROUTES.home} element={<HomePage />} /> */}
          <Route path={ROUTES.login} element={<AuthPage />} />

          <Route path={ROUTES.my} element={<MyPage />} />
        </Route>
      </Routes>
      <DevPanel />
    </BrowserRouter>
  );
}

export default Router;
