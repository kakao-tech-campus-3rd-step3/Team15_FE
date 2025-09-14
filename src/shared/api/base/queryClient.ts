import { QueryClient } from '@tanstack/react-query';

// QueryClient 생성
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패 시 재시도 횟수 (기본: 3)
      refetchOnWindowFocus: false, // 브라우저 포커스 시 자동 리패치 비활성화
      staleTime: 1000 * 60, // 1분 동안 fresh 상태 유지
    },
    mutations: {
      retry: 0, // mutation은 보통 자동 재시도하지 않음
    },
  },
});
