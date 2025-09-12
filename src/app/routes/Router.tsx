import { DevPanel } from '@/shared/ui';
import { BrowserRouter } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes> */}
      <DevPanel />
    </BrowserRouter>
  );
}

export default Router;
