## Context

NativeDevelopLearn 是一个前端技术演示合集，每个模块是一个独立的 Vue SFC，通过 App.vue 的 tab 导航切换。项目使用 Vue 3 + Vite + Tailwind CSS 4 + SCSS，无路由。目前项目中没有任何 `@keyframes` 动画和 Web Audio API 代码，本模块将首次引入这两项技术。

## Goals / Non-Goals

**Goals:**
- 实现一个视觉完整、交互流畅的双色球摇号机页面
- 左右布局：左侧摇杆操作区，右侧号码展示区
- 旋转式摇杆：杆子绕根部固定点旋转，具有真实的拉杆手感和弹性回弹效果
- 10 组号码以球从底部浮入弹跳的动画方式依次展示
- 再次摇号时动画从头播放（DOM 重渲染）
- 用 Web Audio API 纯代码合成 4 种音效，无外部音频文件
- 遵循项目现有代码风格（`<script setup>`、SCSS scoped、自包含单文件）

**Non-Goals:**
- 不做历史记录功能
- 不做"机选一注"单注模式
- 不做响应式适配（本项目为学习演示，桌面优先）
- 不引入新的 npm 依赖
- 不做号码校验或真实开奖对比功能

## Decisions

### 1. 摇杆实现：CSS 3D rotateX + transform-origin

**选择**: 用 `transform: rotateX(${angle}deg)` 控制杆子绕 X 轴（水平轴）旋转，产生 3D 前倾效果。父容器加 `perspective: 400px` 提供 3D 透视。`transform-origin: bottom center` 固定根部。`mousedown/mousemove/mouseup` 驱动拖拽，鼠标 Y 差值映射为旋转角度。

```
perspective: 400px（父容器）
transform-origin: bottom center（根部固定）
transform: rotateX(0~35deg)（向前倾斜）

鼠标下拉 0px  →  0°（杆子直立）
鼠标下拉 80px →  35°（杆子前倾）
映射公式：angle = (delta / 80) * 35
```

**替代方案**:
- `rotate()` 2D 平面旋转: 不符合真实摇杆物理，杆子不是在屏幕平面内转
- `top` + 位移: 不符合真实摇杆物理

**理由**: `rotateX` 精确模拟真实摇杆绕水平轴前倾的物理行为，配合 `perspective` 产生自然的 3D 视觉效果，`transform` 只触发 composite，性能优秀。

### 2. 弹性回弹：CSS transition cubic-bezier

**选择**: 松手后用 `transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)` 实现弹性回弹到 `rotate(0deg)`。

**理由**: cubic-bezier 超过 1.0 的值能自然产生过冲回弹效果，与旋转 transition 无缝切换。

### 3. 号码生成：纯函数 + Set 去重

**选择**: 红球用 `Set` 去重 + `Array.sort()` 排序，蓝球独立随机。

**理由**: 简单直接，`Set` 天然去重，对于 33 选 6 的规模性能完全足够。

### 4. 球入场动画：CSS @keyframes translateY + --i 延迟

**选择**: 球从底部浮入，用 `translateY` 从正值到 0。每个球用 `animation-delay: calc(var(--i) * 80ms)` 控制依次入场。

```css
@keyframes ballRiseIn {
  0%   { transform: translateY(40px) scale(0.5); opacity: 0; }
  60%  { transform: translateY(-5px) scale(1.05); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
```

**理由**: 从底部升起符合"摇杆拉下→球升起"的因果逻辑，scale 过冲模拟弹跳。

### 5. 动画重置：:key 强制 DOM 重渲染

**选择**: 用 `:key="animationKey"` 绑定结果容器，每次触发生成时 `animationKey++`，Vue 销毁旧 DOM 创建新 DOM，动画自动从头播放。

**替代方案**:
- `slideOut/slideIn` class 切换: 之前方案，需要管理多个动画阶段状态
- `v-if` + `nextTick`: 与 `:key` 效果相同但写法更繁琐

**理由**: `:key` 是 Vue 中最简洁的动画重置方式，无需手动管理动画状态机，代码量最少。

### 6. 音效合成：Web Audio API OscillatorNode

**选择**: 4 种音效全部用 `OscillatorNode` + `GainNode` 合成。

| 音效 | 波形 | 频率变化 | 时长 |
|------|------|---------|------|
| 咔嗒 | square | 200→100Hz | 50ms |
| 弹簧 | sine | 800→200Hz | 100ms |
| 球弹跳 | sine | 600Hz 固定 | 30ms |
| 完成 | sine | 523+659Hz 双音 | 200ms |

**理由**: 零依赖、零文件，纯代码控制，符合项目"原生前端"的学习定位。

## Risks / Trade-offs

- **[AudioContext 限制]** 现代浏览器要求用户交互后才能播放音频 → 在 `mousedown` 事件中调用 `audioCtx.resume()`
- **[移动端兼容]** 触摸事件与鼠标事件并行处理 → 同时绑定 touch/mouse 事件
- **[动画性能]** 10 组 × 7 球 = 70 个同时运动的元素 → 每个球用 `transform` + `opacity` 动画，只触发 composite
- **[旋转角度映射]** 鼠标 Y 差值到角度的线性映射可能不够自然 → 后续可考虑非线性映射
