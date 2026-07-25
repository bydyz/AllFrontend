# warmup

配置开发服务器启动时的文件预热，提前转换文件以加快首次访问速度。

## 配置方式

- **类型**: `{ clientFiles?, ssrFiles? }`
- **默认值**: `{ clientFiles: [], ssrFiles: [] }`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    warmup: {
      clientFiles: [],  // 预热客户端文件
      ssrFiles: []      // 预热 SSR 文件
    }
  }
})
```

## 进阶配置

### 预热常用页面和组件

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    warmup: {
      // 预热客户端文件
      clientFiles: [
        './src/main.ts',
        './src/App.vue',
        './src/views/Home.vue',
        './src/components/Header.vue',
        './src/api/index.ts'
      ],

      // 预热 SSR 文件（如果使用 SSR）
      ssrFiles: [
        './src/entry-server.ts',
        './src/views/Home.vue'
      ]
    }
  }
})
```

### 使用 glob 模式预热

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    warmup: {
      clientFiles: [
        // 预热所有 Vue 组件
        './src/components/**/*.vue',

        // 预热所有页面
        './src/views/**/*.vue',

        // 预热工具函数
        './src/utils/**/*.ts'
      ]
    }
  }
})
```

## 工作流程

```
开发服务器启动
    ↓
扫描预热文件列表
    ↓
后台转换文件
    ↓
缓存转换结果
    ↓
首次访问时直接使用缓存
```

## 注意事项

- 预热文件会在服务器启动后后台执行，不阻塞启动过程
- 只预热你确定会访问的文件，过多预热会增加启动时间
- 预热的文件路径相对于项目根目录
- 预热结果会被缓存，文件修改后缓存会自动失效
- 对于大型项目，建议只预热核心入口文件
