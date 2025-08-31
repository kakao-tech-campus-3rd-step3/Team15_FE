/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USE_MOCK: boolean;
  // 여기에 필요한 환경변수를 추가하세요
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
