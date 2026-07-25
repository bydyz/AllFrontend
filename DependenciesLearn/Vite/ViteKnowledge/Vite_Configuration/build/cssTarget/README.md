# cssTarget — CSS 兼容目标

指定 CSS 转换的目标浏览器环境。与 `target` 不同，`cssTarget` 只影响 CSS 降级，不影响 JS。

## 配置方式

- **类型**: `string | string[]`
- **默认值**: 与 `target` 相同

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // JS 目标为 esnext，CSS 目标为 es2015
    target: 'esnext',
    cssTarget: 'es2015',

    // CSS 目标为特定浏览器
    cssTarget: ['chrome61', 'firefox60'],

    // 单独控制 CSS 的兼容性
    cssTarget: 'ie11',
  }
})
```

## 进阶配置

### 分离 JS 和 CSS 目标

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // JS 不做降级
    target: 'esnext',
    // CSS 需要兼容旧浏览器
    cssTarget: 'chrome61',
  }
})
```

## 注意事项

- 仅在使用 Lightening CSS（默认 CSS 处理器）时生效
- 可以让 CSS 保持现代语法（如 CSS 变量），而 JS 进行降级
- 适用于只需要 CSS 兼容性的场景，减少不必要的 CSS 转换开销
