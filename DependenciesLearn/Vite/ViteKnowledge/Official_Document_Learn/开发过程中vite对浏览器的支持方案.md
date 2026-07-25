# Vite 现代浏览器支持方案详解

> 来源：Vite 官方文档 - 开发过程中浏览器支持说明

---

## 原文

> 在开发过程中，Vite 假设使用的是现代浏览器。这意味着该浏览器支持大多数最新的 JavaScript 和 CSS 功能。因此，Vite 将 `esnext` 设置为转换目标。这可以防止语法降低，使 Vite 能够尽可能接近原始源代码提供模块。Vite 会注入一些运行时代码以使开发服务器正常工作。这些代码使用了 Baseline 中包含的功能，该功能在每个主要版本发布时（此主要版本为 2026-01-01）新增。

---

## 逐层解析

### 1. "Vite 假设使用的是现代浏览器"

**背景**：传统工具（如 Webpack + Babel）会将代码转译为 ES5，以兼容 IE11 等老旧浏览器。

**Vite 的选择**：
- 开发阶段**不降级**语法
- 直接使用最新 JS 特性：`??`、`?.`、`for...of`、`async/await` 等
- 目标是 Chrome 88+、Firefox 78+、Safari 14+ 等现代浏览器

---

### 2. "esnext 设置为转换目标"

```js
// vite.config.js 中的等效配置
export default {
  build: {
    target: 'esnext'  // 不做语法降级
  }
}
```

**对比**：

| 工具 | target | 结果 |
|------|--------|------|
| Webpack + Babel | `['ie 11']` | 代码被转译成 ES5，大量 helper 代码 |
| Vite | `esnext` | 保持原始语法，代码更小更快 |

---

### 3. "防止语法降低"（Transpilation Downlevel）

**语法降低**指将新语法转为旧语法：

```js
// 原始代码（ES2020）
const result = arr?.find(x => x.id === 1) ?? 'default';

// 转译为 ES5 后（体积膨胀）
var result;
if (arr != null) {
  result = arr.find(function(x) { return x.id === 1; });
}
if (result === null || result === undefined) {
  result = 'default';
}
```

**Vite 不做这个转换**，所以：
- 开发服务器启动**极快**（无需 Babel 编译）
- 代码**更接近源码**，调试友好

---

### 4. "Baseline 中包含的功能"

**Baseline** 是一个浏览器兼容性标准（由 WebDX Community Group 定义），标记"所有主流浏览器都支持"的功能。

```
时间线示例：
2025-01-01：Array.groupBy() 进入 Baseline
2025-07-01：Promise.withResolvers() 进入 Baseline  
2026-01-01：某些新特性进入 Baseline  ← 文档提到的时间点
```

**Vite 的运行时代码**（如 HMR 热更新、模块交互逻辑）只使用已进入 Baseline 的特性，确保在所有现代浏览器中稳定运行。

---

## Vite 的开发哲学

```
传统方式：源码 → Babel降级 → 浏览器执行（慢、代码膨胀）
Vite方式：源码 → 直接发送给浏览器（快、体积小）
```

**代价**：放弃对 IE11 等老旧浏览器的支持

**收益**：开发体验极致流畅，HMR 毫秒级响应

---

## 总结

| 要点 | 说明 |
|------|------|
| 目标浏览器 | 现代浏览器（Chrome、Firefox、Safari 最新两个版本） |
| 转换目标 | `esnext`，不做语法降级 |
| 运行时代码 | 使用 Baseline 标准功能，确保兼容性 |
| 开发体验 | 启动快、HMR 快、代码接近源码 |
| 适用场景 | 现代浏览器环境，无需兼容 IE11 |
