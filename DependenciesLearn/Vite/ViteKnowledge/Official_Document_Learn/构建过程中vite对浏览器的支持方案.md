# 构建过程中Vite对浏览器的支持方案

## 一、概述

Vite在生产环境构建时，通过`build.target`配置和`@vitejs/plugin-legacy`插件，为不同浏览器提供差异化支持。默认以Baseline广泛可用的浏览器为目标平台（发布至少2.5年的浏览器），同时支持通过配置降低目标版本或使用legacy插件兼容旧版浏览器。

---

## 二、浏览器目标配置（build.target）

### 2.1 配置说明

| 属性 | 说明 |
|------|------|
| **类型** | `string \| string[]` |
| **默认值** | `'baseline-widely-available'` |
| **作用** | 决定最终打包产物的浏览器兼容性目标 |

### 2.2 特殊值说明

| 值 | 说明 |
|----|------|
| `'baseline-widely-available'` | 针对2026-01-01广泛可用的Baseline浏览器：`['chrome111', 'edge111', 'firefox114', 'safari16.4']` |
| `'esnext'` | 假设有原生动态导入支持，只执行最低限度转译 |

### 2.3 自定义目标

支持以下格式：
- ES版本：`'es2015'`、`'es2020'`
- 浏览器版本：`'chrome58'`、`'safari14'`
- 数组形式：`['chrome58', 'firefox57', 'safari11']`

### 2.4 版本演进

| Vite版本 | 默认target | 具体浏览器版本 |
|----------|------------|----------------|
| Vite 5 | `'modules'` | `['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']` |
| Vite 6 | `'modules'` | `['chrome107', 'edge107', 'firefox104', 'safari16']` |
| Vite 7 | `'baseline-widely-available'` | `['chrome111', 'edge111', 'firefox114', 'safari16.4']` |

---

## 三、代码降级的两种方式

### 3.1 语法转译（Syntax Transpilation）

将高版本JavaScript语法转换为低版本浏览器能理解的等效语法。

**示例：**
```javascript
// 可选链
a?.b  →  a === null || a === void 0 ? void 0 : a.b

// 箭头函数
() => {}  →  function() {}

// const/let
const a = 1;  →  var a = 1;
```

### 3.2 API填充（Polyfilling）

在低版本浏览器中提供原生缺失的函数或对象实现。

**示例：**
- `Promise`：IE11没有Promise对象
- `Array.prototype.flat()`：旧版浏览器不支持
- `Object.hasOwn()`：ES2022新静态方法

### 3.3 关键区别

| 方式 | 处理内容 | 工具 |
|------|----------|------|
| 语法转译 | JavaScript语法 | Oxc Transformer / Babel |
| API填充 | 浏览器API缺失 | core-js |

> **注意**：`build.target`只解决语法问题，不解决API缺失问题。

---

## 四、@vitejs/plugin-legacy 插件

### 4.1 插件作用

为不支持原生ESM的旧浏览器提供兼容方案，自动生成：
- Legacy版本的chunk（SystemJS模块）
- Polyfill chunk（SystemJS运行时 + 必要的polyfill）
- 条件加载的`<script nomodule>`标签

### 4.2 安装

```bash
npm add -D @vitejs/plugin-legacy terser
```

### 4.3 基础配置

```javascript
// vite.config.js
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
}
```

### 4.4 核心配置项

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `targets` | `string \| string[]` | `'last 2 versions and not dead, > 0.3%, Firefox ESR'` | Legacy浏览器目标 |
| `polyfills` | `boolean \| string[]` | `true` | 是否生成polyfill chunk |
| `modernPolyfills` | `boolean \| string[]` | `false` | 是否为现代浏览器生成polyfill |
| `renderLegacyChunks` | `boolean` | `true` | 是否生成legacy chunk |
| `renderModernChunks` | `boolean` | `true` | 是否生成现代chunk |

### 4.5 使用示例

#### 场景1：仅支持现代浏览器（含API兼容）

```javascript
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      modernPolyfills: true,
      renderLegacyChunks: false
    })
  ]
}
```

#### 场景2：支持主流浏览器

```javascript
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
      modernPolyfills: true
    })
  ]
}
```

#### 场景3：精确控制polyfill

```javascript
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      polyfills: ['es.promise.finally', 'es/map', 'es/set'],
      modernPolyfills: ['es.promise.finally']
    })
  ]
}
```

---

## 五、构建产物说明

### 5.1 默认构建产物

| 文件 | 说明 |
|------|------|
| `index-xxx.js` | 现代浏览器chunk（type="module"） |
| `index-legacy-xxx.js` | 旧浏览器chunk（nomodule，SystemJS） |
| `polyfills-legacy-xxx.js` | polyfill + SystemJS运行时 |

### 5.2 HTML注入

```html
<!-- 现代浏览器 -->
<script type="module" src="/assets/index-xxx.js"></script>

<!-- 旧浏览器 -->
<script nomodule src="/assets/polyfills-legacy-xxx.js"></script>
<script nomodule src="/assets/index-legacy-xxx.js"></script>
```

---

## 六、最佳实践

### 6.1 配置建议

1. **明确兼容目标**：确定需要支持的最低浏览器版本
2. **区分转译与Polyfill**：`build.target`处理语法，`plugin-legacy`处理API
3. **按需启用**：不需要旧浏览器支持时，关闭`renderLegacyChunks`
4. **开启modernPolyfills**：确保现代浏览器也有必要的API兼容

### 6.2 完整配置示例

```javascript
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  build: {
    target: 'baseline-widely-available'
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
      modernPolyfills: true,
      renderLegacyChunks: true
    })
  ]
})
```

### 6.3 性能优化

| 优化项 | 配置 | 效果 |
|--------|------|------|
| 不支持IE | `targets: ['defaults', 'not IE 11']` | 减少polyfill体积 |
| 仅现代浏览器 | `renderLegacyChunks: false` | 不生成legacy chunk |
| 精确polyfill | `modernPolyfills: ['es.promise']` | 按需注入polyfill |

---

## 七、注意事项

1. **terser依赖**：`@vitejs/plugin-legacy`需要安装terser进行代码压缩
2. **CSP策略**：legacy插件需要内联脚本，如有严格CSP要求需添加对应hash
3. **开发环境**：legacy配置仅在生产构建时生效，开发服务器不处理
4. **包体积**：legacy构建会显著增加产物体积，需权衡兼容性与性能

---

## 八、参考链接

- [Vite官方文档 - 构建选项](https://cn.vitejs.dev/config/build-options)
- [Baseline浏览器兼容性](https://web-platform-dx.github.io/web-features/)
- [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)
