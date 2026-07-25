# css.preprocessorMaxWorkers - 预处理器最大线程数

配置 CSS 预处理器编译使用的最大工作线程数。

## 配置方式

- **类型**: `number | string`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    // 使用 4 个线程
    preprocessorMaxWorkers: 4,
  },
})
```

## 进阶配置

使用 CPU 核心数比例：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import os from 'os'

export default defineConfig({
  css: {
    // 使用 50% 的 CPU 核心
    preprocessorMaxWorkers: Math.floor(os.cpus().length / 2),
  },
})
```

使用字符串比例：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    // 使用 75% 的 CPU 核心
    preprocessorMaxWorkers: '75%',
  },
})
```

## 注意事项

- 默认值为 CPU 核心数的 50%
- 过多线程可能占用大量系统资源
- CI/CD 环境建议限制线程数
- Windows 环境下多线程支持可能有限制
