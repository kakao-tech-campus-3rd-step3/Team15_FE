import DevPanel from '@/shared/ui/dev-panner/ui/DevPanel';
import { BrowserRouter } from 'react-router-dom';

function RouterProvider() {
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

export default RouterProvider;
