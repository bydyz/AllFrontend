# Client/Offset/Scroll API 参考文档

## 概述

本文档汇总了 DOM 元素中 `clientXXX`、`offsetXXX` 和 `scrollXXX` 系列属性的使用方法和区别。

## 目录

- [Client 系列](#client-系列)
- [Offset 系列](#offset-系列)
- [Scroll 系列](#scroll-系列)
- [API 对比总结](#api-对比总结)
- [常见使用场景](#常见使用场景)

---

## Client 系列

### clientWidth

**只读属性，返回元素的内部宽度（以像素为单位）**

**包含内容：**
- 元素的内边距（padding）
- **不包含**边框（border）
- **不包含**外边距（margin）
- **不包含**垂直滚动条（如果存在）

**计算公式：**
```
clientWidth = CSS width + padding-left + padding-right - 水平滚动条宽度
```

**特殊说明：**
- 如果元素没有 CSS 样式，值为 0
- 在 `<html>` 元素或怪异模式下的 `<body>` 上使用时，返回视口宽度（不包含滚动条）
- 值会被四舍五入取整数

**示例：**
```javascript
const element = document.getElementById('myElement');
console.log(element.clientWidth); // 获取元素的内部宽度
```

---

### clientHeight

**只读属性，返回元素的内部高度（以像素为单位）**

**包含内容：**
- 元素的内边距（padding）
- **不包含**边框（border）
- **不包含**外边距（margin）
- **不包含**水平滚动条（如果存在）

**计算公式：**
```
clientHeight = CSS height + padding-top + padding-bottom - 垂直滚动条高度
```

**特殊说明：**
- 如果元素没有 CSS 样式，值为 0
- 在 `<html>` 元素或怪异模式下的 `<body>` 上使用时，返回视口高度（不包含滚动条）
- 值会被四舍五入取整数

**示例：**
```javascript
const element = document.getElementById('myElement');
console.log(element.clientHeight); // 获取元素的内部高度
```

---

### clientLeft

**只读属性，返回元素的左边框宽度（以像素为单位）**

**包含内容：**
- 左边框的宽度

**不包含：**
- 左外边距（margin）
- 左内边距（padding）
- 内容区域

**特殊说明：**
- 对于 `display: inline` 的元素，返回 0
- 如果文本方向是 `rtl` 且有左侧滚动条，则包含滚动条宽度

**计算公式：**
```
clientLeft = border-left-width
```

**示例：**
```javascript
const element = document.getElementById('myElement');
console.log(element.clientLeft); // 获取左边框宽度
```

---

### clientTop

**只读属性，返回元素的上边框宽度（以像素为单位）**

**包含内容：**
- 上边框的宽度

**不包含：**
- 上外边距（margin）
- 上内边距（padding）
- 内容区域

**特殊说明：**
- 对于 `display: inline` 的元素，返回 0
- 计算值为边框宽度的整数

**计算公式：**
```
clientTop = border-top-width
```

**示例：**
```javascript
const element = document.getElementById('myElement');
console.log(element.clientTop); // 获取上边框宽度
```

---

## Offset 系列

### offsetWidth

**只读属性，返回元素的布局宽度（以像素为单位）**

**包含内容：**
- 元素的内边距（padding）
- 元素的边框（border）
- **不包含**外边距（margin）

**不包含：**
- 伪元素（如 `::before` 或 `::after`）

**特殊说明：**
- 值会被四舍五入取整数
- 如果元素被隐藏（`display: none`），值为 0
- 对于文档主体（document.body），返回的是总线性内容高度而不是元素的高度

**计算公式：**
```
offsetWidth = CSS width + padding-left + padding-right + border-left + border-right
```

**示例：**
```javascript
const element = document.getElementById('myElement');
console.log(element.offsetWidth); // 获取元素的布局宽度
```

---

### offsetHeight

**只读属性，返回元素的布局高度（以像素为单位）**

**包含内容：**
- 元素的内边距（padding）
- 元素的边框（border）
- **不包含**外边距（margin）

**不包含：**
- 伪元素（如 `::before` 或 `::after`）

**特殊说明：**
- 值会被四舍五入取整数
- 如果元素被隐藏（`display: none`），值为 0

**计算公式：**
```
offsetHeight = CSS height + padding-top + padding-bottom + border-top + border-bottom
```

**示例：**
```javascript
const element = document.getElementById('myElement');
console.log(element.offsetHeight); // 获取元素的布局高度
```

---

### offsetLeft

**只读属性，返回元素相对于 offsetParent 的左边距离**

**包含内容：**
- 左边框
- 左内边距
- 左外边距

**不包含：**
- offsetParent 的边距和边框

**特殊说明：**
- 值为整数
- 对于块级元素，返回元素边框盒相对于 offsetParent 的位置
- 对于行内级元素，返回第一个边框盒的位置（需使用 `getClientRects()` 获取尺寸）
- `offsetWidth` 和 `offsetHeight` 描述的是边界框的尺寸

**计算公式：**
```
offsetLeft = offsetParent content-box left + padding-left + border-left
```

**示例：**
```javascript
const element = document.getElementById('myElement');
console.log(element.offsetLeft); // 获取相对于 offsetParent 的左边距离
```

---

### offsetTop

**只读属性，返回元素相对于 offsetParent 的上边距离**

**包含内容：**
- 上边框
- 上内边距
- 上外边距

**不包含：**
- offsetParent 的边距和边框

**特殊说明：**
- 值为整数
- 对于块级元素，返回元素边框盒相对于 offsetParent 的位置
- 对于行内级元素，返回第一个边框盒的位置

**计算公式：**
```
offsetTop = offsetParent content-box top + padding-top + border-top
```

**示例：**
```javascript
const element = document.getElementById('myElement');
console.log(element.offsetTop); // 获取相对于 offsetParent 的上边距离
```

---

## Scroll 系列

### scrollWidth

**只读属性，返回元素内容宽度（以像素为单位）**

**包含内容：**
- 所有可见和不可见的内容
- 内边距（padding）
- **不包含**边框（border）
- **不包含**外边距（margin）
- **不包含**垂直滚动条（如果存在）
- **包含**伪元素的宽度

**计算公式：**
```
scrollWidth = 内容总宽度（包括溢出部分）
```

**特殊说明：**
- 值会被四舍五入取整数
- 如果内容不需要水平滚动，则等于 `clientWidth`
- 用于检测内容是否溢出

**示例：**
```javascript
const element = document.getElementById('myElement');

// 检测内容是否溢出
if (element.scrollWidth > element.clientWidth) {
  console.log('内容溢出');
}

console.log(element.scrollWidth); // 获取内容总宽度
```

---

### scrollHeight

**只读属性，返回元素内容高度（以像素为单位）**

**包含内容：**
- 所有可见和不可见的内容
- 内边距（padding）
- **不包含**边框（border）
- **不包含**外边距（margin）
- **不包含**水平滚动条（如果存在）
- **包含**伪元素的高度

**计算公式：**
```
scrollHeight = 内容总高度（包括溢出部分）
```

**特殊说明：**
- 值会被四舍五入取整数
- 如果内容不需要垂直滚动，则等于 `clientHeight`
- 用于判断元素是否滚动到底部

**示例：**
```javascript
const element = document.getElementById('myElement');

// 判断是否滚动到底部
if (Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 1) {
  console.log('已滚动到底部');
}

console.log(element.scrollHeight); // 获取内容总高度
```

---

### scrollLeft

**可读/可写属性，返回水平滚动距离（以像素为单位）**

**包含内容：**
- 从左到右滚动的像素数

**特殊说明：**
- 如果元素不可滚动，值为 0
- 设置值小于 0 时，会被设置为 0
- 设置值大于最大滚动位置时，会被设置为最大滚动位置
- 如果文本方向是 `rtl`，滚动条在最右侧时为 0，向左滚动时为负数
- 在显示比例缩放的设备上，可能包含小数

**计算公式：**
```
scrollLeft = 已滚动的水平距离
```

**示例：**
```javascript
const element = document.getElementById('myElement');

// 设置滚动位置
element.scrollLeft = 100;

// 获取当前滚动位置
console.log(element.scrollLeft); // 获取水平滚动距离
```

---

### scrollTop

**可读/可写属性，返回垂直滚动距离（以像素为单位）**

**包含内容：**
- 从上到下滚动的像素数

**特殊说明：**
- 如果元素不可滚动，值为 0
- 设置值小于 0 时，会被设置为 0
- 设置值大于最大滚动位置时，会被设置为最大滚动位置
- 对于 `flex-direction: column-reverse`，元素向上增长时可能为负值
- Safari 中过度滚动时可能超出最大值
- 在亚像素精度的设备上，可能包含小数

**计算公式：**
```
scrollTop = 已滚动的垂直距离
```

**示例：**
```javascript
const element = document.getElementById('myElement');

// 设置滚动位置
element.scrollTop = 100;

// 获取当前滚动位置
console.log(element.scrollTop); // 获取垂直滚动距离
```

---

## API 对比总结

### 尺寸对比表

| API | 包含内边距 | 包含边框 | 包含外边距 | 包含滚动条 | 可滚动内容 |
|-----|-----------|---------|-----------|-----------|-----------|
| `clientWidth/Height` | ✅ | ❌ | ❌ | ❌（包含） | ❌ |
| `offsetWidth/Height` | ✅ | ✅ | ❌ | ❌（包含） | ❌ |
| `scrollWidth/Height` | ✅ | ❌ | ❌ | ❌（包含） | ✅ |

### 位置对比表

| API | 包含边框 | 相对位置 | 包含外边距 | 使用场景 |
|-----|---------|---------|-----------|---------|
| `clientLeft/Top` | ✅ | 相对内容区域 | ❌ | 获取边框宽度 |
| `offsetLeft/Top` | ✅ | 相对 offsetParent | ✅ | 获取元素位置 |
| `scrollLeft/Top` | ❌ | 相对内容区域 | ❌ | 获取滚动位置 |

### 元素可见区域

**Client 系列表示元素的可见区域：**
- `clientWidth = 内容宽度 + 左右内边距`
- `clientHeight = 内容高度 + 上下内边距`
- 用于获取元素可见部分的尺寸

**Scroll 系列表示完整内容区域：**
- `scrollWidth = 完整内容宽度`
- `scrollHeight = 完整内容高度`
- 用于获取所有内容的尺寸（包括被隐藏的部分）

**Offset 系列表示布局盒：**
- `offsetWidth = 内容 + 内边距 + 边框`
- `offsetHeight = 内容 + 内边距 + 边框`
- 用于获取元素的实际布局尺寸

---

## 常见使用场景

### 1. 判断元素是否溢出

```javascript
function isOverflowing(element) {
  return element.scrollHeight > element.clientHeight ||
         element.scrollWidth > element.clientWidth;
}

// 使用示例
if (isOverflowing(document.getElementById('content'))) {
  console.log('内容溢出容器');
}
```

### 2. 判断是否滚动到底部

```javascript
function isScrolledToBottom(element) {
  const tolerance = 1; // 允许的误差范围
  return Math.abs(
    element.scrollHeight - element.clientHeight - element.scrollTop
  ) < tolerance;
}
```

### 3. 检测元素是否可滚动

```javascript
function isScrollable(element) {
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.overflowY !== 'visible' &&
         computedStyle.overflowY !== 'hidden';
}
```

### 4. 获取元素完整位置

```javascript
function getBoundingClientRectDetailed(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
    width: element.offsetWidth,
    height: element.offsetHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
    scrollTop: element.scrollTop,
    scrollLeft: element.scrollLeft
  };
}
```

### 5. 计算元素实际高度

```javascript
function getActualHeight(element) {
  return element.offsetHeight + element.clientTop;
}
```

### 6. 创建一个可滚动的容器

```javascript
function createScrollableContainer() {
  const container = document.createElement('div');
  container.style.height = '200px';
  container.style.overflowY = 'auto';
  container.style.border = '1px solid #ccc';
  
  const content = document.createElement('div');
  content.style.height = '400px';
  content.textContent = '这是一个很长的内容...';
  
  container.appendChild(content);
  return container;
}
```

### 7. 实现平滑滚动到元素顶部

```javascript
function scrollToTop(element, behavior = 'smooth') {
  element.scrollTo({
    top: 0,
    behavior
  });
}

// 使用示例
scrollToTop(document.getElementById('myElement'));
```

### 8. 获取元素的 CSS 盒模型信息

```javascript
function getBoxModel(element) {
  return {
    contentWidth: element.clientWidth,
    contentHeight: element.clientHeight,
    paddingWidth: element.offsetWidth - element.clientWidth,
    paddingHeight: element.offsetHeight - element.clientHeight,
    borderWidth: element.offsetWidth - element.clientWidth - element.offsetWidth,
    borderHeight: element.offsetHeight - element.clientHeight - element.offsetHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight
  };
}
```

### 9. 检测页面滚动位置

```javascript
function getPageScrollPosition() {
  return {
    x: window.pageXOffset || window.scrollX,
    y: window.pageYOffset || window.scrollY
  };
}
```

### 10. 获取视口尺寸

```javascript
function getViewportSize() {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
}
```

---

## 注意事项

### 1. 值的精度

- `clientXXX`、`offsetXXX`、`scrollWidth`、`scrollHeight` 返回整数
- `scrollLeft`、`scrollTop` 可能包含小数（在亚像素设备上）
- 如需高精度，使用 `getBoundingClientRect()`

### 2. 隐藏元素

- 隐藏元素（`display: none`）的尺寸为 0
- 不可见但占位元素（`visibility: hidden`）的尺寸正常

### 3. 浏览器兼容性

- 所有 API 自 2015 年 7 月起在主流浏览器中广泛可用
- 基线特性，兼容性良好

### 4. offsetParent

- `offsetParent` 是最近的 positioned（有定位）的祖先元素
- 如果没有 positioned 祖先，则 `offsetParent` 是 `<body>` 或 `<html>`
- 使用 `offsetLeft` 和 `offsetTop` 时要注意 `offsetParent` 的影响

### 5. RTL 方向

- 在 `direction: rtl` 的元素上，滚动条在最右侧
- `scrollLeft` 可能为负数（从右向左滚动时）

---

## 参考链接

- [MDN - Element.clientWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth)
- [MDN - Element.clientHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight)
- [MDN - Element.clientWidth](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)
- [MDN - Element.clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight)
- [MDN - Element.scrollWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollWidth)
- [MDN - Element.scrollHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight)
- [MDN - Element.scrollLeft](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollLeft)
- [MDN - Element.scrollTop](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop)

---

## 更新时间

- 最后更新：2025-06-21
- 数据来源：MDN Web Docs
