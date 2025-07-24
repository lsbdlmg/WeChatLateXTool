// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // 输出目录
    outDir: 'dist',

    // 禁用代码分割和哈希文件名
    rollupOptions: {
      input: {
        // 指定入口名称和路径
        main: './src/main.js', // Vue应用入口
        contentScript: './src/contentScript.js', // 内容脚本入口
      },
      output: {
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name].[ext]'
          }
        },
      },
    },
  },
})
