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
import { ChatbotPage } from '@/pages/chatbot/ui/ChatbotPage';
import ChatLayout from '../layout/ChatLayout';
import GoogleOAuthCallback from '@/pages/OAuthCallback/GoogleOAuthCallback';
import { KakaoOAuthCallback } from '@/pages/OAuthCallback/KakaoOAuthCallback';
import ErrorBoundary from '@/shared/ui/boundary/ErrorBoundary';
import FallbackError from '@/shared/ui/states/FallbackError';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.oauthGoogle} element={<GoogleOAuthCallback />} />
          <Route path='/kakao/login/callback' element={<KakaoOAuthCallback />} />

          <Route path='/oauth/callback/kakao' element={<GoogleOAuthCallback />} />

          <Route path={ROUTES.landing} element={<LandingPage />} />
          <Route path={ROUTES.post} element={<HeartNewsPage />} />
          <Route path={ROUTES.login} element={<AuthPage />} />
          <Route path={ROUTES.support} element={<SupportPage />} />
          <Route path={ROUTES.supportDetail} element={<SupportDetailPage />} />
          <Route element={<AuthGuard />}>
            <Route path={ROUTES.createpost} element={<Post />} />
            <Route path={ROUTES.activity} element={<ActivityPage />} />
            <Route path={ROUTES.badge} element={<BadgePage />} />
            <Route path={ROUTES.my} element={<MyPage />} />
          </Route>
          <Route path={ROUTES.postdetail} element={<PostDetailPage />} />
          <Route path={ROUTES.badge} element={<BadgePage />} />
          <Route path={ROUTES.mission} element={<MissionPage />} />
        </Route>
        <Route element={<ChatLayout />}>
          <Route
            path={ROUTES.chatBot}
            element={
              <ErrorBoundary fallback={FallbackError}>
                <ChatbotPage />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route path={ROUTES.login} element={<AuthPage />} />
      </Routes>
      {process.env.NODE_ENV === 'development' && <DevPanel />}
    </BrowserRouter>
  );
}

export default Router;
