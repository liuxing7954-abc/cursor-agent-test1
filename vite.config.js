import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { copyFileSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 构建后复制 index.html 为 404.html，用于 GitHub Pages SPA 路由支持
    {
      name: 'copy-404',
      writeBundle() {
        try {
          copyFileSync('dist/index.html', 'dist/404.html');
          console.log('✓ 已创建 404.html 用于 GitHub Pages SPA 路由支持');
        } catch (err) {
          console.error('创建 404.html 失败:', err);
        }
      }
    }
  ],
  base: '/cursor-agent-test1/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
