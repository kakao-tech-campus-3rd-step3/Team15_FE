import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { LandingPage } from '@/pages/landing';
import { ROUTES } from '@/shared/config';
import { AuthPage } from '@/pages/auth';
import { MyPage } from '@/pages/my';
import { HeartNewsPage } from '@/pages/heart-news';
import { Post } from '@/pages/post';
import { PostDetailPage } from '@/pages/post-detail';
import { ActivityPage } from '@/pages/activity';
import { BadgePage } from '@/pages/badge';
import { MissionPage } from '@/pages/mission';
import AuthGuard from './AuthGuard';
import { DevPanel } from '@/shared/ui/dev-panner/DevPanel';
import { SupportPage } from '@/pages/support';
import { SupportDetailPage } from '@/pages/support-detail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.landing} element={<LandingPage />} />
          <Route path={ROUTES.post} element={<HeartNewsPage />} />
          <Route path={ROUTES.login} element={<AuthPage />} />
          <Route path={ROUTES.createpost} element={<Post />} />
          <Route path={ROUTES.support} element={<SupportPage />} />
          <Route path={ROUTES.supportDetail} element={<SupportDetailPage />} />
          <Route element={<AuthGuard />}>
            <Route path={ROUTES.activity} element={<ActivityPage />} />
            <Route path={ROUTES.badge} element={<BadgePage />} />
            <Route path={ROUTES.my} element={<MyPage />} />
          </Route>
          <Route path={ROUTES.postdetail} element={<PostDetailPage />} />
          <Route path={ROUTES.badge} element={<BadgePage />} />
          <Route path={ROUTES.mission} element={<MissionPage />} />
        </Route>
        <Route path={ROUTES.login} element={<AuthPage />} />
      </Routes>
      <DevPanel />
    </BrowserRouter>
  );
}

export default Router;
