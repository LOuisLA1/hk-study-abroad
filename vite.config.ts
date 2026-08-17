import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 适配 GitHub Pages 相对路径
  server: {
    port: 3000,
    open: false,
  }
});
