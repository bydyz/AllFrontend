# 锚点滚动方案演示

前端实现锚点滚动到指定位置的 5 种主流方案。

## 方案总览

| 方案 | 核心原理 | 代码量 | 控制力 | 依赖 |
|------|---------|--------|--------|------|
| CSS scroll-behavior | `scroll-behavior: smooth` + `<a href="#id">` | 1 行 CSS | 低 | 无 |
| scrollIntoView | `element.scrollIntoView({ behavior: 'smooth' })` | ~5 行 | 中 | 无 |
| scrollTo + Easing | `window.scrollTo()` + 缓动函数循环 | ~20 行 | 高 | 无 |
| rAF 自定义 | `requestAnimationFrame` 驱动动画循环 | ~30 行 | 最高 | 无 |
| Lenis 库 | Lenis 接管滚动，提供物理感平滑效果 | ~3 行 | 极高 | lenis |

## 启动

```bash
npm install
npm run dev
```

## 方案详情

### 1. CSS scroll-behavior
最简方案，使用 CSS 属性启用浏览器原生平滑滚动。适用于不依赖 JS 的简单锚点导航。

### 2. scrollIntoView
原生 DOM API，调用 `element.scrollIntoView()` 即可让元素滚动到可视区域。支持 `behavior`、`block`、`inline` 参数。

### 3. scrollTo + 缓动函数
手动计算目标元素的 `offsetTop`，使用 `window.scrollTo()` 配合缓动函数（如 easeInOutCubic）驱动动画。灵活性高，可自定义滚动曲线。

### 4. requestAnimationFrame 自定义动画
使用 rAF 实现完全自定义的滚动动画，支持弹性缓动（easeOutBack）、动画中途打断等高级特性。控制力最强。

### 5. Lenis 平滑滚动库
第三方库，接管浏览器默认滚动行为，通过缓动函数实现物理感更强、更自然的滚动体验。提供 `scrollTo()` API 用于锚点导航。
