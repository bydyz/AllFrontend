# define - 全局常量替换

定义在编译时被静态替换的全局常量，常用于注入构建时的版本号、环境标志等。

## 配置方式

- **类型**: `Record<string, any>`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    // 注入应用版本号
    __APP_VERSION__: JSON.stringify('1.0.0'),
    // 注入构建时间
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    // 注入功能开关
    __FEATURE_FLAG__: true,
  },
})
```

## 进阶配置

使用 `loadEnv` 注入环境变量：

```javascript
// vite.config.js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      // 注入所有 VITE_ 开头的环境变量
      ...Object.fromEntries(
        Object.entries(env)
          .filter(([key]) => key.startsWith('VITE_'))
          .map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)])
      ),
    },
  }
})
```

配合 TypeScript 类型提示：

```typescript
// env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 注意事项

- 值会被直接替换到代码中，字符串需要用 `JSON.stringify` 包裹
- 不要替换 `import.meta.env` 的内置属性
- 生产构建时会被完全移除，不会增加包体积
