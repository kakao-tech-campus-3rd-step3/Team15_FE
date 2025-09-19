import { QueryProvider } from './providers/query';
import Router from './routes/Router';

export default function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}
