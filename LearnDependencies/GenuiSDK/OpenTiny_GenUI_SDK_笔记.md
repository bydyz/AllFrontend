# OpenTiny GenUI SDK 学习笔记

## 一、什么是 Schema 协议

Schema 是"模式/结构"的统称，不同领域有各自的 Schema 规范：

| 领域 | 格式 | 用途 |
|------|------|------|
| JSON Schema | JSON | 验证 JSON 数据结构 |
| XML Schema (XSD) | XML | 验证 XML 文档 |
| Schema.org | JSON-LD/RDFa | SEO 结构化数据 |
| 数据库 Schema | DDL | 定义表结构 |

## 二、GenUI-SDK Schema 协议

### 2.1 概述

Schema 协议是一个基于 JSON 的**声明式 UI 描述协议**，用于定义和渲染用户界面。

- **设计原则**：
  - 声明式：使用声明式结构描述 UI
  - 平台无关：通过组件注册表映射到具体实现
  - 类型安全：通过类型定义确保正确性
  - 可扩展：支持自定义组件

### 2.2 核心概念

#### Schema 对象
- 必须包含 `componentName` 字段，通常为 `"Page"`

#### 节点（Node）
- `componentName`：组件名称（必需）
- `id`：节点唯一标识
- `props`：组件属性
- `children`：子节点数组
- `slot`：插槽内容
- `loop`：循环渲染配置
- `condition`：条件渲染配置

#### 根节点（RootNode）
- `state`：全局状态
- `methods`：方法集合
- `css`：全局样式

### 2.3 属性值类型

```typescript
// JS 表达式 - 用于动态计算
{ "type": "JSExpression", "value": "this.state.name", "model": true }

// JS 函数 - 用于事件处理
{ "type": "JSFunction", "value": "function() { ... }" }

// 插槽
{ "type": "JSSlot", "value": "..." }

// 原始值
"string" | number | boolean | null
```

### 2.4 示例结构

```json
{
  "componentName": "Page",
  "state": { "count": 0 },
  "methods": {
    "handleClick": { "type": "JSFunction", "value": "function() { ... }" }
  },
  "children": [
    {
      "componentName": "Text",
      "props": {
        "text": { "type": "JSExpression", "value": "this.state.count" }
      }
    },
    {
      "componentName": "Button",
      "props": {
        "onClick": { "type": "JSExpression", "value": "this.handleClick" }
      }
    }
  ]
}
```

## 三、组件体系

### 3.1 渲染器组件

| 组件 | 说明 |
|------|------|
| **GenuiRenderer** | 核心渲染组件，将 Schema 解析渲染为 UI |
| **GenuiChat** | 对话组件，内部封装了会话管理、流式返回、生成状态 |

### 3.2 关系

```
GenuiChat (上层封装)
  └── 内置了 GenuiRenderer
  └── 提供开箱即用的对话体验

GenuiRenderer (底层渲染器)
  └── 解析 Schema 协议
  └── 渲染为 Vue/Angular 组件
  └── 支持自定义组件库
```

## 四、NPM 包结构

| 包名 | 用途 |
|------|------|
| `@opentiny/genui-core` | 核心逻辑 |
| `@opentiny/genui-sdk-vue` | Vue3 渲染器 |
| `@opentiny/genui-sdk-ng` | Angular 渲染器 |
| `@opentiny/genui-sdk-vue` | 已发布到 npm |

## 五、功能特性

- **条件渲染**：`condition` 字段支持布尔值或 JSExpression
- **循环渲染**：`loop` + `loopArgs` 实现列表渲染
- **双向绑定**：`model: true` 实现表单双向绑定
- **状态管理**：`state` 定义状态，`methods` 定义方法
- **事件处理**：支持引用 methods 或直接定义 JSFunction
- **样式**：`css` 字段定义全局样式

## 六、常用组件

### 布局组件
- `CanvasFlexBox` - 弹性布局容器
- `div` - 通用容器

### 基础组件
- `Text` - 文本组件
- `img` - 图片组件

### 业务组件
- `TinyTabs` / `TinyTabItem` - 标签页
- `TinyCarousel` / `TinyCarouselItem` - 轮播图
- `TinyButton` - 按钮

## 七、相关资源

- [官方文档](https://docs.opentiny.design/genui-sdk/)
- [Schema 协议规范](https://docs.opentiny.design/genui-sdk/schema/protocol.html)
- [GitHub](https://github.com/opentiny/genui-sdk)
- [Playground](https://playground.opentiny.design/genui-sdk)