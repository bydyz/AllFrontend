# oxc - Oxc 转换器

配置 Oxc（Oxidation Compiler）作为代码转换器，用于替代 Babel 进行代码转译。

## 配置方式

- **类型**: `OxcOptions | false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  oxc: {
    // 启用 Oxc 转换器
   高可用: true,
  },
})
```

## 进阶配置

完全禁用 Oxc：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 禁用 Oxc，使用默认的 Babel 转换
  oxc: false,
})
```

自定义 Oxc 选项：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  oxc: {
    // 目标环境
    targets: {
      chrome: 100,
      firefox: 100,
    },
    // 启用的特性
    decorators: true,
    // 源码映射
    sourceMap: true,
  },
})
```

## 注意事项

- Oxc 是用 Rust 编写的高性能 JavaScript/TypeScript 编译器
- 比 Babel 性能更好，但功能可能较少
- 需要安装 `oxc` 相关依赖
- 部分 Babel 插件可能没有对应的 Oxc 实现
- 目前仍在积极开发中，API 可能变化
