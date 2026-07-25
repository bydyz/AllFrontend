# sourcemapIgnoreList

配置在 sourcemap 中忽略哪些源文件，用于优化 sourcemap 大小。

## 配置方式

- **类型**: `false | (sourcePath: string, sourcemapPath: string) => boolean`
- **默认值**: `(sourcePath) => sourcePath.includes('node_modules')`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 默认行为：忽略 node_modules 中的文件
    sourcemapIgnoreList: (sourcePath) => sourcePath.includes('node_modules'),

    // 禁用 sourcemap 忽略
    sourcemapIgnoreList: false,

    // 自定义忽略规则
    sourcemapIgnoreList: (sourcePath, sourcemapPath) => {
      // 忽略测试文件
      if (sourcePath.includes('.test.') || sourcePath.includes('.spec.')) {
        return true
      }

      // 忽略类型定义文件
      if (sourcePath.endsWith('.d.ts')) {
        return true
      }

      // 忽略 node_modules
      if (sourcePath.includes('node_modules')) {
        return true
      }

      return false
    }
  }
})
```

## 进阶配置

### 精细控制忽略规则

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    sourcemapIgnoreList: (sourcePath, sourcemapPath) => {
      // 忽略以下类型的文件：
      const ignorePatterns = [
        'node_modules',
        'dist',
        '.test.',
        '.spec.',
        '.d.ts',
        'coverage',
        'types/generated'
      ]

      return ignorePatterns.some(pattern =>
        sourcePath.includes(pattern)
      )
    }
  }
})
```

### 生产环境配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,
    // 构建时的 sourcemap 忽略配置
    rollupOptions: {
      output: {
        // 生产环境可能需要不同的忽略规则
        sourcemapIgnoreList: (sourcePath) => {
          // 忽略所有非源代码文件
          return !sourcePath.includes('/src/')
        }
      }
    }
  }
})
```

## 函数参数说明

```typescript
(sourcePath: string, sourcemapPath: string) => boolean
```

- `sourcePath`: 源文件的路径（相对于项目根目录）
- `sourcemapPath`: sourcemap 文件的路径
- 返回值：`true` 表示忽略该文件，`false` 表示保留

## 使用场景

### 场景一：减小 sourcemap 大小

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    sourcemapIgnoreList: (sourcePath) => {
      // 忽略大型依赖的 sourcemap
      const largeDeps = ['lodash', 'moment', 'antd']
      return largeDeps.some(dep => sourcePath.includes(dep))
    }
  }
})
```

### 场景二：调试时保留特定文件

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    sourcemapIgnoreList: (sourcePath) => {
      // 保留自定义 hook 的 sourcemap
      if (sourcePath.includes('hooks/')) {
        return false
      }

      // 忽略其他 node_modules
      return sourcePath.includes('node_modules')
    }
  }
})
```

## 注意事项

- 此配置仅在开发模式下影响浏览器 sourcemap
- 生产环境的 sourcemap 需要在 `build.rollupOptions` 中配置
- 忽略文件可以减小 sourcemap 体积，提高性能
- 调试时可能需要临时禁用或调整忽略规则
- 默认规则会忽略 `node_modules`，这是推荐的做法
