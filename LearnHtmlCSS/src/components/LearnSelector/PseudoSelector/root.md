# CSS `:root` 伪类详解

## 基本定义

`:root` 匹配文档的根元素，在 HTML 中就是 `<html>` 元素。

## 主要作用

### 1. 定义 CSS 变量（CSS Custom Properties）

```css
:root {
  --primary-color: #3498db;
  --font-size-base: 16px;
  --spacing: 8px;
}

body {
  color: var(--primary-color);
  font-size: var(--font-size-base);
}
```

**优点**：全局可访问，易于维护和主题化。

---

### 2. 全局样式设置

```css
:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  box-sizing: border-box;
}
```

---

### 3. CSS 变量主题切换

```css
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
  }
}

body {
  background: var(--bg-color);
  color: var(--text-color);
}
```

---

### 4. 与 `html` 标签的区别

| 特性 | `:root` | `html` |
|------|---------|--------|
| 优先级 | 更高（伪类） | 元素选择器 |
| 语义 | 表示文档根 | HTML 元素 |
| 用途 | 定义变量/全局样式 | 基础样式 |

---

### 5. 实际应用场景

- **主题系统**：light/dark 模式切换
- **设计系统**：统一管理颜色、间距、字体
- **响应式设计**：基于媒体查询调整变量值
- **组件库**：提供 CSS 变量供用户覆盖

---

## 总结

`:root` 是现代 CSS 架构中非常重要的工具，尤其配合 CSS 变量使用，能够实现高效的样式管理和主题切换。



# 三者比较

在 HTML 文档中

* html → 元素选择器，匹配 `<html>` 元素。
* :root → 伪类选择器，也匹配文档的根元素，在 HTML 中就是 `<html>`。
* html:root → 同时满足既是 html 元素又是根节点的元素，依然指向同一个 `<html>`。

优先级：html:root > :root > html