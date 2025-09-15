import { AppProvider } from './providers';
import Router from './routes/Router';

export default function App() {
  return (
    <AppProvider>
      <Router />;
    </AppProvider>
  );
}
