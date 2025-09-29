// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from '@app/App.tsx';
// import { worker } from '@shared/api/mocks/browser.ts';
// import { config } from '@/shared/config/appConfig';
// import './main.css';

// if (config.useMock) {
//   worker.start({ onUnhandledRequest: 'bypass' });
// }

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { config } from '@/shared/config/appConfig';
import './main.css';

async function bootstrap() {
  // if (config.useMock && import.meta.env.DEV) {
  //   const { worker } = await import('@/shared/api/mocks/browser');
  //   await worker.start({
  //     onUnhandledRequest: 'warn',
  //     serviceWorker: { url: '/mockServiceWorker.js' },
  //   });
  // }

  const { default: App } = await import('@app/App.tsx');
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
bootstrap();
