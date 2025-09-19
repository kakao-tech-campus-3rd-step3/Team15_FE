// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // mode = 'development' | 'production'
  const env = loadEnv(mode, process.cwd(), ''); // '' prefix로 모든 env 로드
  console.log('VITE_API_BASE_URL =', env.VITE_API_BASE_URL);

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL, // 여기서는 env 사용
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@app': path.resolve(__dirname, 'src/app'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@entities': path.resolve(__dirname, 'src/entities'),
        '@features': path.resolve(__dirname, 'src/features'),
        '@widgets': path.resolve(__dirname, 'src/widgets'),
        '@pages': path.resolve(__dirname, 'src/pages'),
      },
    },
  };
});
