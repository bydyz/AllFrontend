# target — 浏览器兼容目标

指定构建产物的目标浏览器环境，决定了代码降级的程度和 polyfill 策略。

## 配置方式

- **类型**: `string | string[]`
- **默认值**: `'baseline-widely-available'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 目标为现代浏览器，不做额外降级
    target: 'esnext',

    // 目标为特定的浏览器版本
    target: 'es2015',

    // 同时指定多个目标
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13'],

    // 使用 baseline 配置（Vite 6+ 默认值）
    target: 'baseline-widely-available',
  }
})
```

## 可选值说明

| 值 | 说明 |
|---|------|
| `'modules'` | 支持原生 ES Module 的浏览器（等同于 `['es2020', 'edge88', ...]`） |
| `'esnext'` | 不做任何降级，直接输出现代代码 |
| `'es2015'` / `'es2020'` 等 | 目标为指定的 ECMAScript 版本 |
| `'baseline-widely-available'` | Vite 6+ 默认值，基于 Web Platform Baseline |
| 浏览器版本数组 | 如 `['chrome87', 'firefox78']`，使用 browserslist 语法 |

## 进阶配置

使用 `browserslist` 配置文件（`package.json` 或 `.browserslistrc`）来统一管理目标：

```json
// package.json
{
  "browserslist": [
    "defaults",
    "not IE 11",
    "maintained node versions"
  ]
}
```

## 注意事项

- 设置 `target: 'esnext'` 可以跳过大部分降级转换，获得更小的产物体积
- 如果需要兼容 IE11，应配合 `@vitejs/plugin-legacy` 插件使用
- `target` 同时影响 JS 和 CSS 的降级行为
