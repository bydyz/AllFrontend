# 配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      // 键 (Key)：入口的名称（chunk name）。它主要用作输出文件名的占位符（如 [name]），同时也能让配置结构更清晰。不影响生成的html文件的文件名
      // 值 (Value)：入口文件的绝对路径。在 Vite 项目中，为了构建完整的页面，通常指向 index.html 文件。也是后续生成的 html文件的文件名 的名称
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
      },
      output: {
        dir: 'dist',
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // 将 node_modules 中的代码单独打包
          }
        }
      },
      external: ['lodash', 'axios'], // 指定 lodash 和 axios 为外部模块
    },
  },
});
```