// src/app/providers/index.tsx
import { QueryProvider } from './query';
// import { RouterProvider } from './router';  // 필요 시 다른 provider도 추가

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return <QueryProvider>{children}</QueryProvider>;
};
