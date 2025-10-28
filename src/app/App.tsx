import ErrorBoundary from '@/shared/ui/boundary/ErrorBoundary';
import { QueryProvider } from './providers/query';
import Router from './routes/Router';
import FallbackError from '@/shared/ui/states/FallbackError';

export default function App() {
  return (
    <QueryProvider>
      <ErrorBoundary fallback={FallbackError}>
        <Router />
      </ErrorBoundary>
    </QueryProvider>
  );
}
