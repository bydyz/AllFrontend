# KaTeX 配置选项详解

## 1. KaTeX 简介

KaTeX 是一个快速、简洁的数学公式渲染库，能够将 LaTeX 数学公式转换为美观的 Web 页面渲染。

## 2. marked-katex-extension 作用

marked-katex-extension 是 MarkedJS 的扩展，用于在 Markdown 解析时自动渲染数学公式。

### 特性

- 支持行内公式：`$E=mc^2$`
- 支持显示公式：`$$E=mc^2$$`
- 支持非标准模式扩展
- 直接集成到 MarkedJS 解析流程

### 安装

```bash
npm install marked katex marked-katex-extension
```

## 3. 配置选项详解

### 3.1 完整配置列表

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| displayMode | boolean | false | 显示模式，数学公式居中显示在单独一行 |
| output | string | htmlAndMathml | 输出格式：htmlAndMathml / html / mathml |
| leqno | boolean | false | 左对齐公式编号样式 |
| fleqn | boolean | false | 公式左对齐显示 |
| throwOnError | boolean | true | 遇到错误时渲染错误而非抛出异常 |
| errorColor | string | #cc0000 | 错误信息的颜色 |
| macros | object | [] | 自定义宏定义 |
| minRuleThickness | number | - | 最小线条厚度 |
| colorIsTextColor | boolean | false | 控制颜色命令的行为 |
| strict | boolean/false/function | false | 严格模式：warn/ignore/error |
| trust | boolean/function | false | 信任输入，启用 HTML 特性 |
| maxSize | number/null | null | 限制用户指定的最大尺寸 |
| maxExpand | number | 1000 | 限制宏展开次数 |
| globalGroup | boolean | false | 全局分组模式 |

### 3.2 marked-katex-extension 特有选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| nonStandard | boolean | false | 允许非标准语法扩展 |

## 4. 使用示例

### 4.1 基础用法

```javascript
const marked = require('marked');
const markedKatex = require('marked-katex-extension');

// 注册扩展
marked.use(markedKatex());

// 解析 Markdown
const markdown = `
行内公式：$E=mc^2$
显示公式：
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$
`;

const html = marked.parse(markdown);
console.log(html);
```

### 4.2 带配置的使用

```javascript
const marked = require('marked');
const markedKatex = require('marked-katex-extension');

marked.use(markedKatex({
  displayMode: true,
  throwOnError: false,
  errorColor: '#ff0000',
  output: 'html',
  macros: {
    '\\pi': '3.14159265359',
    '\\nabla': '\\nabla'
  }
}));
```

### 4.3 文档渲染场景

```javascript
marked.use(markedKatex({
  displayMode: true,
  throwOnError: false,
  errorColor: '#cc0000',
  strict: 'warn',
  output: 'htmlAndMathml'
}));
```

### 4.4 学术论文场景

```javascript
marked.use(markedKatex({
  displayMode: true,
  output: 'htmlAndMathml',
  leqno: false,
  fleqn: false,
  strict: 'error'
}));
```

## 5. 配置详解

### displayMode

控制公式渲染模式。

- `false`：行内模式，公式融入文本
- `true`：显示模式，公式居中显示在单独一行

```javascript
// 行内公式
marked.parse('速度：$v = \\lambda f$');

// 显示公式
marked.parse('积分公式：\n$$\n\\int_0^1 x^2 dx = \\frac{1}{3}\n$$');
```

### throwOnError

错误处理策略。

- `true`：抛出 ParseError 异常
- `false`：渲染错误信息而不抛出

```javascript
// 安全渲染
marked.use(markedKatex({
  throwOnError: false,
  errorColor: '#ff0000'
}));

// 严格错误处理
marked.use(markedKatex({
  throwOnError: true
}));
```

### macros

自定义宏定义。

```javascript
marked.use(markedKatex({
  macros: {
    '\\pi': '3.14159265359',
    '\\nabla': '\\nabla',
    '\\R': '\\mathbb{R}',
    '\\C': '\\mathbb{C}',
    '\\N': '\\mathbb{N}',
    '\\Z': '\\mathbb{Z}'
  }
}));
```

### strict

严格模式设置。

```javascript
// 仅警告
marked.use(markedKatex({
  strict: 'warn'
}));

// 忽略错误
marked.use(markedKatex({
  strict: 'ignore'
}));

// 抛出错误
marked.use(markedKatex({
  strict: 'error'
}));
```

### trust

信任输入，启用 HTML 特性。

```javascript
marked.use(markedKatex({
  trust: true
}));
```

### maxSize

限制用户指定的最大尺寸。

```javascript
marked.use(markedKatex({
  maxSize: 10
}));
```

### maxExpand

限制宏展开次数，防止无限循环。

```javascript
marked.use(markedKatex({
  maxExpand: 100
}));
```

## 6. 非标准模式

启用非标准语法扩展。

```javascript
marked.use(markedKatex({
  nonStandard: true
}));
```

## 7. 最佳实践

### 7.1 文档渲染

```javascript
marked.use(markedKatex({
  displayMode: true,
  throwOnError: false,
  errorColor: '#cc0000',
  strict: 'warn'
}));
```

### 7.2 快速预览

```javascript
marked.use(markedKatex({
  throwOnError: false,
  errorColor: '#ff0000'
}));
```

### 7.3 学术场景

```javascript
marked.use(markedKatex({
  displayMode: true,
  output: 'htmlAndMathml',
  strict: 'error'
}));
```

## 8. 渲染效果示例

### 行内公式

```markdown
速度：$v = \\lambda f$
质量：$m = \\frac{p}{v}$
```

渲染结果：
```
速度：v = λf
质量：m = p/v
```

### 显示公式

```markdown
积分公式：
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$
```

渲染结果：
```
           √π
         ----
        √π
```

### 分数和求和

```markdown
求和公式：
$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$
```

渲染结果：
```
      n(n+1)
-----------
      2
```

## 9. 常见问题

### Q1: 如何处理错误公式？

```javascript
marked.use(markedKatex({
  throwOnError: false,
  errorColor: '#ff0000'
}));
```

### Q2: 如何自定义宏？

```javascript
marked.use(markedKatex({
  macros: {
    '\\pi': '3.14',
    '\\myfunc': '\\operatorname{func}'
  }
}));
```

### Q3: 如何提高安全性？

```javascript
marked.use(markedKatex({
  trust: true,
  strict: 'error'
}));
```

## 10. 参考资源

- [KaTeX 官方文档](https://katex.org/docs/api.html)
- [MarkedJS 文档](https://marked.js.org/)
- [marked-katex-extension GitHub](https://github.com/UziTech/marked-katex-extension)
