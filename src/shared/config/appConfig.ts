/**
 * 환경 변수 설정
 */

export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  useMock: import.meta.env.VITE_USE_MOCK === true,
} as const;

export const isLocalStage = import.meta.env.MODE === 'development';
export const isProductionStage = import.meta.env.MODE === 'production';
