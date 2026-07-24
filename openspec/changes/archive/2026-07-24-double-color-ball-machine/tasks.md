## 1. 模块注册

- [x] 1.1 创建 `src/6DoubleColorBall/index.vue` 文件，包含基础 SFC 结构（`<script setup>`、`<template>`、`<style scoped lang="scss">`）
- [x] 1.2 在 `src/App.vue` 的 `componentsConfig` 数组中添加新模块入口 `{ name: "双色球摇号机", loader: () => import("./6DoubleColorBall/index.vue") }`

## 2. 号码生成逻辑

- [x] 2.1 实现 `generateOneSet()` 函数：生成 6 个不重复红球（1-33，升序）+ 1 个蓝球（1-16）
- [x] 2.2 实现 `generateTenSets()` 函数：调用 `generateOneSet()` 10 次，返回 10 组号码数组
- [x] 2.3 用 `ref` 管理当前展示的号码数据状态

## 3. 摇杆交互（3D 旋转式）

- [x] 3.1 实现摇杆 HTML 结构：球头 + 杆身 + 底座，金属渐变色样式
- [x] 3.2 实现 `mousedown`/`touchstart` 事件：记录初始位置，开始拖拽
- [x] 3.3 实现 `mousemove`/`touchmove` 事件：计算 Y 轴位移，用 `transform: rotateX()` 更新杆子角度（80px → -35°），限制最大角度
- [x] 3.4 实现 `mouseup`/`touchend` 事件：判断是否拉到底（≥80%），决定是否触发号码生成
- [x] 3.5 实现松手回弹：CSS `transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)` 弹性回弹到 `rotateX(0deg)`

## 4. 号码展示（左右布局）

- [x] 4.1 实现左右布局：左侧摇杆区域 + 右侧号码展示区域，flex 水平排列
- [x] 4.2 实现号码展示区 HTML 结构：10 行，每行序号 + 7 个球（红/蓝）
- [x] 4.3 实现球的样式：圆形、红色/蓝色背景、白色数字、补零显示

## 5. 球从底部浮入动画

- [x] 5.1 定义 `@keyframes ballRiseIn`：从底部浮入 + 过冲回弹 + 缩放
- [x] 5.2 为每个球应用动画，用 `--i` CSS 变量控制 `animation-delay: calc(var(--i) * 80ms)`
- [x] 5.3 定义 10 组号码的 stagger 延迟（每组间隔 200ms）

## 6. 动画重置（:key 方式）

- [x] 6.1 为结果容器绑定 `:key="animationKey"`，每次触发生成时 `animationKey++`
- [x] 6.2 移除旧的 `slideOut/slideIn` 动画逻辑和 `animationPhase` 状态

## 7. 音效合成

- [x] 7.1 初始化 AudioContext，在 `mousedown` 时 `resume()`
- [x] 7.2 实现 `playClick()`：摇杆咔嗒声（square 波，200→100Hz，50ms）
- [x] 7.3 实现 `playBoing()`：弹簧回弹声（sine 波，800→200Hz，100ms）
- [x] 7.4 实现 `playBounce()`：球弹跳声（sine 波，600Hz，30ms）
- [x] 7.5 实现 `playComplete()`：完成提示音（sine 波，523+659Hz 双音叠加，200ms）
- [x] 7.6 在对应交互节点调用音效：按下→咔嗒，松手→弹簧，球入场→弹跳，全部完成→提示音

## 8. 整体样式与收尾

- [x] 8.1 实现页面整体布局：标题、左侧摇杆区域、右侧号码展示区域的排版
- [x] 8.2 添加摇杆底座和操作提示文字
- [x] 8.3 验证全部功能：摇杆旋转交互、号码生成、球从底部浮入动画、音效播放、动画重置
