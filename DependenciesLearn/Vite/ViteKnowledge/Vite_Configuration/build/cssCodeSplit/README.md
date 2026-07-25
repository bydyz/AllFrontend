# cssCodeSplit — CSS 代码分割

控制是否对 CSS 进行代码分割。开启后，动态导入的模块对应的 CSS 会被提取为独立文件，按需加载。

## 配置方式

- **类型**: `boolean`
- **默认值**: `true`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 启用 CSS 代码分割（默认）
    cssCodeSplit: true,

    // 禁用 CSS 代码分割，所有 CSS 合并为一个文件
    cssCodeSplit: false,
  }
})
```

## 进阶配置

### 配合动态导入使用

```javascript
// main.js
// 这个模块的 CSS 会被单独提取为一个文件
const module = await import('./dynamic-module.js')

// 只有在 dynamic-module.js 被加载时，对应的 CSS 才会加载
// 实现 CSS 的按需加载
```

## 注意事项

- 禁用后，所有 CSS 会被合并到一个 `index.css` 文件中
- 在库模式（`build.lib`）下，CSS 代码分割默认被禁用
- 启用 CSS 代码分割可以减少首屏加载的 CSS 体积
- 适用于多页面应用（MPA）和有大量动态导入的场景
