/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // 브라우저 환경 시뮬레이션
    setupFiles: "./src/test/setupTests.ts", // 공통 세팅 파일
    globals: true, // describe/it/beforeAll 등을 전역으로 사용
  },
});
