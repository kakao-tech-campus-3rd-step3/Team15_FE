import { DevPanel } from '@/shared/ui';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { LandingPage } from '@/pages/landing';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<LandingPage />} />
          {/* <Route path='/home' element={<HomePage />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Route>
      </Routes>
      <DevPanel />
    </BrowserRouter>
  );
}

export default Router;
