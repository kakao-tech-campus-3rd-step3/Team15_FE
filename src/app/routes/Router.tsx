import { DevPanel } from '@/shared/ui';
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

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.landing} element={<LandingPage />} />
          <Route path={ROUTES.post} element={<HeartNewsPage />} />
          <Route path={ROUTES.login} element={<AuthPage />} />
          <Route path={ROUTES.activity} element={<ActivityPage />} />
          <Route path={ROUTES.createpost} element={<Post />} />
          <Route path={ROUTES.my} element={<MyPage />} />
          <Route path={ROUTES.postdetail} element={<PostDetailPage />} />
        </Route>
      </Routes>
      <DevPanel />
    </BrowserRouter>
  );
}

export default Router;
