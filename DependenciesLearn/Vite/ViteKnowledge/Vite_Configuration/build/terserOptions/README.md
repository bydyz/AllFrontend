# terserOptions — Terser 选项

当使用 `terser` 作为压缩器时，配置 Terser 的具体压缩行为。

## 配置方式

- **类型**: `TerserOptions`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      // 压缩选项
      compress: {
        // 移除所有 console.*
        drop_console: true,
        // 移除 debugger
        drop_debugger: true,
        // 移除未使用的变量
        pure_funcs: ['console.log'],
      },
      // 混淆选项
      mangle: {
        // 保留类名
        keep_classnames: true,
        // 保留函数名
        keep_fnames: false,
      },
      // 格式化选项
      format: {
        // 移除注释
        comments: false,
      },
    }
  }
})
```

## 常用选项

### 压缩选项（compress）

```javascript
terserOptions: {
  compress: {
    drop_console: true,    // 移除 console.*
    drop_debugger: true,   // 移除 debugger
    pure_funcs: ['console.log', 'console.info'], // 标记纯函数（移除调用）
    dead_code: true,       // 移除未使用的代码
    collapse_vars: true,   // 折叠变量
    reduce_vars: true,     // 优化变量使用
  }
}
```

### 混淆选项（mangle）

```javascript
terserOptions: {
  mangle: {
    keep_classnames: true,  // 保留类名
    keep_fnames: true,      // 保留函数名（Vue 组件需要）
    toplevel: false,        // 不混淆顶层变量
  }
}
```

### 格式化选项（format）

```javascript
terserOptions: {
  format: {
    comments: false,           // 移除所有注释
    ascii_only: true,          // 只输出 ASCII 字符
    wrap_func_args: false,     // 不包装函数参数
  }
}
```

## 注意事项

- 仅在 `minify: 'terser'` 时生效
- `drop_console: true` 常用于生产环境移除调试日志
- `keep_fnames: true` 在使用 `Vue.extend` 或需要保留函数名时必须设置
- Terser 选项与 terser 库的配置完全兼容
