# @vitejs/plugin-vue

Vite 官方提供的 Vue 3 单文件组件（SFC）编译插件，是 Vue 3 项目的基础依赖。

## 基本安装

```bash
npm install @vitejs/plugin-vue -D
```

## 基本用法

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),  // 启用 Vue 3 SFC 支持
  ],
})
```

## 常用选项

### template.transformAssetUrls

控制模板中资源 URL 的转换行为：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // 自定义资源 URL 转换规则
        transformAssetUrls: {
          video: ['src', 'poster'],
          source: ['src'],
          object: ['data-src'],
          // img 标签默认已支持 src
        },
      },
    }),
  ],
})
```

### 自定义编译器选项

```javascript
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 自定义指令（如 v-loading）
          isCustomElement: (tag) => tag === 'el-icon',
          // 编译器行为调整
        },
      },
    }),
  ],
})
```

## 进阶配置

### 与 JSX 插件配合使用

```javascript
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),     // SFC 支持
    vueJsx(),  // JSX/TSX 支持
  ],
})
```

### 生产环境优化

```javascript
export default defineConfig({
  plugins: [
    vue({
      // 生产环境移除开发时警告
      template: {
        compilerOptions: {
          // 根据环境变量条件编译
        },
      },
    }),
  ],
  build: {
    // Vue 3 会自动 tree-shake 未使用的 API
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
})
```

## 注意事项

- `@vitejs/plugin-vue` 仅支持 Vue 3，Vue 2 请使用 `@vitejs/plugin-vue2`
- 插件默认启用热模块替换（HMR），修改 SFC 后浏览器即时更新
- 如果使用了 TypeScript，需要配合 `vue-tsc` 进行类型检查
- 插件会自动处理 `<style>` 标块的热更新
