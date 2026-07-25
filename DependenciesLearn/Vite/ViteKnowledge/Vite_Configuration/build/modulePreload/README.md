# modulePreload — 模块预加载

控制模块预加载（Module Preload）polyfill 的行为。模块预加载可以让浏览器在执行 JS 之前预先加载依赖模块，提升首屏加载性能。

## 配置方式

- **类型**: `boolean | { polyfill?: boolean, resolveDependencies?: (url: string, deps: string[]) => string[] }`
- **默认值**: `true`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 禁用模块预加载 polyfill
    modulePreload: false,

    // 或者精细控制
    modulePreload: {
      // 是否注入 polyfill 脚本（处理不支持 modulePreload 的旧浏览器）
      polyfill: true,

      // 自定义依赖解析逻辑
      resolveDependencies: (url, deps) => {
        // deps 是当前模块的所有依赖 URL 列表
        // 可以过滤或重排依赖
        return deps.filter(dep => !dep.includes('legacy'))
      }
    }
  }
})
```

## 进阶配置

### 自定义依赖解析

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    modulePreload: {
      polyfill: true,
      // 只预加载关键依赖，跳过非关键模块
      resolveDependencies: (url, deps) => {
        const criticalDeps = deps.filter(dep =>
          dep.includes('main') || dep.includes('vendor')
        )
        return criticalDeps
      }
    }
  }
})
```

## 注意事项

- 禁用 `polyfill` 后，在不支持 `<link rel="modulepreload">` 的浏览器中不会注入 polyfill 脚本
- `resolveDependencies` 回调接收当前模块的 URL 和所有依赖 URL，返回需要预加载的依赖列表
- 在某些 SSR 场景下，可能需要禁用模块预加载
