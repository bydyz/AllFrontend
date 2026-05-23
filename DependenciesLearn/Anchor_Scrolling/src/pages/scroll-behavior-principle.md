# CSS `scroll-behavior` 方案实现原理

## 概述

CSS `scroll-behavior` 是 CSSOM View 模块定义的标准属性，用于控制文档或容器内滚动行为的呈现方式。它允许开发者声明式地启用平滑滚动效果，无需编写任何 JavaScript。

## 核心机制

### 1. 属性赋值

```css
html { scroll-behavior: smooth; }
```

该属性可接受两个值：
- `auto`（默认）：立即跳转到目标位置
- `smooth`：以浏览器内部实现的缓动算法平滑滚动

### 2. 触发条件

`smooth` 行为仅在以下**编程式滚动操作**中生效：
- `<a href="#target-id">` 点击触发的锚点导航
- `window.scrollTo()` / `element.scrollTo()` 调用
- `element.scrollIntoView()` 调用
- `element.scrollLeft` / `element.scrollTop` 赋值

用户手动滚动（鼠标滚轮、拖拽滚动条、触摸滑动）不受该属性影响。

### 3. 实现层次

CSS `scroll-behavior` 实际由浏览器引擎实现：

```
用户点击 <a href="#target">
  ↓
浏览器解析 hash → 查找 id="target" 的元素
  ↓
检查 scroll-behavior 值
  ├─ auto   → 立即设置 scrollTop/scrollLeft
  └─ smooth → 启动内置动画引擎
                ↓
               缓动函数计算插值位置
                ↓
               逐帧更新 scrollTop
                ↓
               到达目标位置 → 触发 scroll 事件
```

## 本演示的架构

```
body { scroll-behavior: smooth; }    ← 全局启用
         │
    ┌────┴────┐
    │         │
 <nav>     <section id="sb-intro">
 <a href="#sb-intro">        id="sb-intro"
 <a href="#sb-comparison">   id="sb-comparison"
    │
    └─ 点击 → 浏览器接管 → 平滑滚动
```

## 与 JS 方案的交互

CSS `scroll-behavior` 与 JS 滚动 API 协作方式：

```js
// 如果 CSS 已设置 scroll-behavior: smooth
element.scrollIntoView()
// 等价于
element.scrollIntoView({ behavior: 'smooth' })
// 不需要显式传参，CSS 属性提供了默认值
```

本演示页面中的 `<a href="#sb-xxx">` 是纯 HTML 行为，不依赖任何 JS。hash 路由的 router 函数检测到不匹配路径时静默忽略，让浏览器原生的锚点滚动行为得以正常执行。

## 浏览器内部实现（以 Chromium 为例）

Chromium 的平滑滚动实现在 `cc/animation` 层：

1. **ScrollNode** 接收滚动请求，检测 `scroll-behavior`
2. 如果是 `smooth`，创建 **ScrollAnimation** 对象
3. ScrollAnimation 使用内置的 `ScrollAnimation::Curve` 缓动函数（类似 easeInOutQuad）
4. 动画由 compositor 线程驱动，独立于主线程
5. 每一帧更新 scroll offset，直到到达目标位置

关键代码路径大致为：
```
ScrollableArea::ScrollTo()
  → ScrollAnimator::UserScroll()
    → ScrollAnimator::AnimateScroll()
      → ScrollAnimation::Apply()
        → AnimationCurve::GetValue()  ← 缓动函数在这里计算
```

## 优缺点分析

### 优点
- **零代码**：一行 CSS 解决问题
- **零依赖**：浏览器原生支持
- **高性能**：由浏览器 compositor 层驱动，不占用 JS 主线程
- **无障碍友好**：浏览器自动处理 `:target` 伪类和焦点管理
- **可渐进增强**：不支持 `scroll-behavior` 的浏览器自动降级为即时跳转

### 缺点
- **无法自定义缓动**：只能使用浏览器内置的缓动曲线
- **无法中断**：滚动开始后不能中途停止或转向
- **无法监听进度**：没有 API 获取当前滚动动画的进度
- **无法同步交互**：不能和其他动画（如视差、滚动驱动动画）同步
- **不支持物理效果**：没有弹性、惯性等物理感

## 适用场景

- 文档内目录跳转
- 单页应用的 Section 导航
- 回到顶部按钮
- 对滚动效果要求不高的后台管理页面

## 浏览器兼容性

| 浏览器 | 版本支持 |
|--------|----------|
| Chrome | 61+ |
| Firefox | 36+ |
| Safari | 15.4+ |
| Edge | 79+ |
| IE | 不支持 |

## 参考

- [CSS Scroll Behavior Module Level 1 (W3C)](https://drafts.csswg.org/cssom-view/#scrolling)
- [MDN: scroll-behavior](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior)
- [Chromium Scroll Animation 源码](https://source.chromium.org/chromium/chromium/src/+/main:cc/animation/scroll_animation.cc)
