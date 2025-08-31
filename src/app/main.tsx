import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { worker } from '@shared/api/mocks/browser.ts';
import { config } from '@/shared/utils/config.ts';
import '@/app/main.css';

if (config.useMock) {
  worker.start({ onUnhandledRequest: 'bypass' });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
