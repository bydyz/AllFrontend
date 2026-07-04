# 深度解析: em 与 rem

## Step 1: 介绍概念代表的意义

### 1.1 一句话定义
- **em**: 相对于当前元素的字体大小（font-size）进行计算的 CSS 单位
- **rem**: 相对于根元素（html）的字体大小进行计算的 CSS 单位

### 1.2 详细定义

#### em
- **概念**: em 是一个相对长度单位，其值相对于当前元素的 font-size 来计算
- **场景**: 用于字体大小、内外边距、边框等 CSS 属性
- **解决问题**: 提供基于当前元素上下文的相对尺寸计算
- **所属领域**: CSS 长度单位

#### rem
- **概念**: rem (root em) 是一个相对长度单位，其值相对于根元素 html 的 font-size 来计算
- **场景**: 用于字体大小、内外边距、边框等 CSS 属性
- **解决问题**: 提供基于文档根元素的统一相对尺寸计算
- **所属领域**: CSS 长度单位

### 1.3 概念卡片

| 特性 | em | rem |
|------|-----|------|
| **全称** | em (typographical unit) | root em |
| **基准元素** | 当前元素 | html 根元素 |
| **计算方式** | 相对于当前元素的 font-size | 相对于 html 的 font-size |
| **默认值** | 继承父元素的 font-size | 默认 16px |
| **级联特性** | 会受父元素影响 | 不受父元素影响 |
| **典型用途** | 组件内部的相对尺寸 | 全局响应式设计 |

---

## Step 2: 介绍其来由

### 2.1 背景与起源

**em 单位的起源**
- **时间**: 1980 年代
- **来源**: 源自排版行业，em 最初指的是当前字体的大写字母 "M" 的宽度
- **CSS 引入**: CSS1 (1996年) 就已支持 em 单位

**rem 单位的引入**
- **时间**: CSS3 规范中引入
- **标准**: CSS Values and Units Module Level 3
- **目的**: 解决 em 单位在嵌套时计算复杂的问题

### 2.2 演进历程

```
1980s: em 单位在排版行业诞生
   ↓
1996: CSS1 规范支持 em 单位
   ↓
2010: CSS3 规范引入 rem 单位
   ↓
2012: 现代浏览器普遍支持 rem
   ↓
现在: rem 成为响应式设计的主流单位
```

### 2.3 创造者的设计考量

**em 的设计思路**
- 继承排版传统的相对概念
- 提供基于当前上下文的灵活尺寸
- 允许组件内部的独立缩放

**rem 的设计思路**
- 解决 em 嵌套导致的计算复杂性
- 提供统一的全局基准
- 简化响应式设计的实现

---

## Step 3: 介绍其所能实现的效果

### 3.1 核心功能

#### em 的核心功能
```css
/* 基于当前元素 font-size 的相对计算 */
.parent {
  font-size: 20px;
}

.child {
  font-size: 1.5em; /* 20px * 1.5 = 30px */
  padding: 1em;     /* 30px * 1 = 30px */
}
```

#### rem 的核心功能
```css
/* 基于根元素 html 的相对计算 */
html {
  font-size: 16px;
}

.element {
  font-size: 1.5rem; /* 16px * 1.5 = 24px */
  padding: 1rem;     /* 16px * 1 = 16px */
}
```

### 3.2 使用效果对比

#### 示例 1: 嵌套结构
```html
<div class="container">
  <div class="wrapper">
    <div class="element">文本</div>
  </div>
</div>
```

```css
/* 使用 em */
.container { font-size: 20px; }
.wrapper { font-size: 1.5em; }     /* 30px */
.element { font-size: 1.5em; }     /* 45px - 嵌套累积 */
.element { padding: 1em; }         /* 45px */

/* 使用 rem */
html { font-size: 16px; }
.container { font-size: 20px; }
.wrapper { font-size: 1.5rem; }    /* 24px - 不受父元素影响 */
.element { font-size: 1.5rem; }    /* 24px - 始终基于 html */
.element { padding: 1rem; }        /* 16px */
```

#### 示例 2: 响应式字体
```css
/* 使用 em 实现响应式 */
html { font-size: 16px; }
@media (max-width: 768px) {
  html { font-size: 14px; }
}

h1 { font-size: 2em; }  /* 移动端: 28px, 桌面端: 32px */
p { font-size: 1em; }   /* 移动端: 14px, 桌面端: 16px */

/* 使用 rem 实现响应式 */
html { font-size: 16px; }
@media (max-width: 768px) {
  html { font-size: 14px; }
}

h1 { font-size: 2rem; }  /* 移动端: 28px, 桌面端: 32px */
p { font-size: 1rem; }   /* 移动端: 14px, 桌面端: 16px */
```

### 3.3 适用场景

#### em 适用场景
1. **组件内部的相对尺寸**: 需要根据组件自身的字体大小调整间距
2. **可复用的 UI 组件**: 组件内部使用 em 可以根据父容器缩放
3. **图标与文本对齐**: 图标大小相对于文本进行对齐
4. **边框和圆角**: 需要与字体大小保持比例关系

#### rem 适用场景
1. **全局响应式设计**: 需要统一控制整体布局尺寸
2. **字体大小设置**: 避免嵌套导致的字体大小不可控
3. **间距和边距**: 需要全局一致的间距系统
4. **媒体查询断点**: 配合根字体大小实现响应式

### 3.4 优缺点分析

#### em 的优缺点

**优点**
- ✅ 组件封装性好: 组件内部尺寸相互关联
- ✅ 灵活性高: 可以根据上下文独立缩放
- ✅ 适合嵌套组件: 内部元素自动继承比例关系
- ✅ 兼容性极好: 所有浏览器都支持

**缺点**
- ❌ 计算复杂: 嵌套时需要逐层计算
- ❌ 可预测性差: 不同上下文中同一 em 值可能不同
- ❌ 调试困难: 需要查看每一层的 font-size
- ❌ 维护成本高: 修改一处可能影响多处

#### rem 的优缺点

**优点**
- ✅ 计算简单: 始终基于 html 的 font-size
- ✅ 可预测性强: 同一 rem 值在任何地方都相同
- ✅ 易于维护: 修改根字体大小即可全局调整
- ✅ 响应式友好: 配合媒体查询非常方便

**缺点**
- ❌ 组件封装性差: 无法根据父元素独立缩放
- ❌ 灵活性较低: 所有元素共享同一基准
- ❌ 浏览器兼容性: IE9 及以下不支持（现代项目影响小）
- ❌ 全局影响: 修改根字体大小会影响所有 rem 单位

---

## Step 4: 介绍大体实现过程

### 4.1 整体流程图

```
┌─────────────────────────────────────────────────────────────┐
│                    CSS 单位计算流程                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐ │
│  │   解析 em    │      │   解析 rem   │      │   解析 px    │ │
│  └──────┬──────┘      └──────┬──────┘      └──────┬──────┘ │
│         │                    │                    │         │
│         ▼                    ▼                    ▼         │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐ │
│  │ 获取当前元素 │      │ 获取 html   │      │   直接使用   │ │
│  │ font-size   │      │ font-size   │      │   绝对值     │ │
│  └──────┬──────┘      └──────┬──────┘      └──────┬──────┘ │
│         │                    │                    │         │
│         ▼                    ▼                    │         │
│  ┌─────────────┐      ┌─────────────┐            │         │
│  │ 递归计算父元 │      │   直接计算   │            │         │
│  │ 素 font-size│      │   最终值     │            │         │
│  └──────┬──────┘      └──────┬──────┘            │         │
│         │                    │                    │         │
│         ▼                    ▼                    ▼         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              计算最终 CSS 像素值                        │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 核心实现原理

#### em 的计算原理
```javascript
function calculateEm(element, emValue) {
  // 1. 获取当前元素的 font-size
  let currentFontSize = getComputedStyle(element).fontSize;
  
  // 2. 如果当前元素没有设置 font-size，递归向上查找
  if (!element.style.fontSize) {
    currentFontSize = calculateEm(element.parentElement, emValue);
  }
  
  // 3. 计算最终值
  return parseFloat(currentFontSize) * emValue;
}
```

#### rem 的计算原理
```javascript
function calculateRem(remValue) {
  // 1. 获取 html 元素的 font-size
  const rootFontSize = getComputedStyle(document.documentElement).fontSize;
  
  // 2. 直接计算
  return parseFloat(rootFontSize) * remValue;
}
```

### 4.3 代码示例

#### em 使用示例
```css
/* 组件样式 - 使用 em 实现内部相对尺寸 */
.card {
  font-size: 16px;
  padding: 1.5em;      /* 24px */
  border: 0.125em solid #ccc; /* 2px */
}

.card-title {
  font-size: 1.25em;   /* 20px */
  margin-bottom: 0.5em; /* 10px */
}

.card-content {
  font-size: 1em;      /* 16px */
  line-height: 1.5em;  /* 24px */
}

/* 当卡片在不同上下文中时 */
.sidebar .card {
  font-size: 14px;     /* 整个卡片会缩小 */
}

.main .card {
  font-size: 18px;     /* 整个卡片会放大 */
}
```

#### rem 使用示例
```css
/* 全局样式 - 使用 rem 实现响应式 */
html {
  font-size: 16px;
}

/* 移动端 */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

/* 平板端 */
@media (min-width: 769px) and (max-width: 1024px) {
  html {
    font-size: 15px;
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  html {
    font-size: 16px;
  }
}

/* 组件样式 - 使用 rem */
.container {
  max-width: 1200rem;  /* 19200px */
  margin: 0 auto;
}

.header {
  padding: 2rem;       /* 32px */
}

.font-small {
  font-size: 0.875rem; /* 14px */
}

.font-normal {
  font-size: 1rem;     /* 16px */
}

.font-large {
  font-size: 1.25rem;  /* 20px */
}
```

#### 混合使用示例
```css
/* 最佳实践: 混合使用 em 和 rem */
html {
  font-size: 16px;
}

/* 全局布局使用 rem */
.container {
  max-width: 75rem;    /* 1200px */
  margin: 0 auto;
  padding: 0 1.5rem;   /* 24px */
}

/* 组件内部使用 em */
.card {
  font-size: 1rem;     /* 16px */
  padding: 1.5em;      /* 24px */
  border-radius: 0.5em; /* 8px */
}

.card-title {
  font-size: 1.25em;   /* 20px */
  margin-bottom: 0.75em; /* 12px */
}

.card-content {
  font-size: 0.875em;  /* 14px */
  line-height: 1.6em;  /* 22.4px */
}

/* 按钮组件使用 em */
.button {
  font-size: 1rem;
  padding: 0.75em 1.5em; /* 12px 24px */
}

.button-small {
  font-size: 0.875em;  /* 继承按钮的 14px */
  padding: 0.5em 1em;
}
```

### 4.4 关键 API 说明

#### CSS 属性
```css
/* 字体大小 */
font-size: 1em;
font-size: 1rem;

/* 内边距 */
padding: 1em;
padding: 1rem;

/* 外边距 */
margin: 1em;
margin: 1rem;

/* 边框 */
border: 0.1em solid #000;
border: 0.1rem solid #000;

/* 圆角 */
border-radius: 0.5em;
border-radius: 0.5rem;

/* 行高 */
line-height: 1.5em;
line-height: 1.5rem;
```

#### JavaScript 获取计算值
```javascript
// 获取元素的计算 font-size
function getComputedFontSize(element) {
  const computedStyle = window.getComputedStyle(element);
  return parseFloat(computedStyle.fontSize);
}

// 获取根元素 font-size
function getRootFontSize() {
  return parseFloat(
    window.getComputedStyle(document.documentElement).fontSize
  );
}

// 将 rem 转换为 px
function remToPx(remValue) {
  return remValue * getRootFontSize();
}

// 将 em 转换为 px（需要指定元素）
function emToPx(element, emValue) {
  return emValue * getComputedFontSize(element);
}
```

### 4.5 浏览器兼容性

| 浏览器 | em | rem |
|--------|-----|------|
| Chrome | ✅ 1.0+ | ✅ 4.0+ |
| Firefox | ✅ 1.0+ | ✅ 3.6+ |
| Safari | ✅ 1.0+ | ✅ 5.0+ |
| Edge | ✅ 12+ | ✅ 15+ |
| IE | ✅ 6+ | ✅ 9+ |

**注意**: 现代项目中，rem 的兼容性已不是问题。

---

## 总结与推荐

### 1. 选择建议

#### 使用 em 的场景
- ✅ 构建可复用的 UI 组件库
- ✅ 需要组件内部相对缩放
- ✅ 图标与文本的大小对齐
- ✅ 边框、圆角等需要与字体保持比例

#### 使用 rem 的场景
- ✅ 全局响应式设计
- ✅ 字体大小设置
- ✅ 布局间距和边距
- ✅ 需要全局统一控制的场景

### 2. 最佳实践

```css
/* 推荐的混合使用方式 */
html {
  font-size: 16px;
}

/* 全局布局: rem */
.header, .footer, .container {
  padding: 0 1.5rem;
}

/* 字体大小: rem */
h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; }
p { font-size: 1rem; }

/* 组件内部: em */
.card {
  font-size: 1rem;
  padding: 1.5em;
}

.button {
  font-size: 1rem;
  padding: 0.75em 1.5em;
}

/* 边框和圆角: em (与字体保持比例) */
.input {
  font-size: 1rem;
  padding: 0.5em 0.75em;
  border: 0.1em solid #ccc;
  border-radius: 0.25em;
}
```

### 3. 一句话总结

> **em 适合组件内部的相对尺寸，rem 适合全局响应式设计。现代项目推荐以 rem 为主，em 为辅的混合使用方式。**
