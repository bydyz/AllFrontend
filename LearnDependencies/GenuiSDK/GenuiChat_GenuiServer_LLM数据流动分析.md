# GenuiChat 组件、GenuiServer 服务与大模型数据流动分析

## 一、架构概述

三个核心组件的职责：

| 组件 | 职责 | 技术栈 |
|------|------|--------|
| **GenuiChat** | Vue 3 前端组件，封装对话 UI、会话管理、流式渲染 | Vue 3 |
| **GenuiServer** | Node.js 后端服务，提供 OpenAI 兼容 API，SSE 流式响应 | Node.js/Express |
| **大模型** | 通过 baseURL 配置的 LLM（如 OpenAI、DeepSeek 等） | 第三方 API |

---

## 二、数据流动时序图

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  User       │     │  GenuiChat  │     │  GenuiServer│     │   LLM       │
│ (浏览器)    │     │  (Vue组件)  │     │  (后端服务) │     │ (大模型)    │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │                   │
       │  1.输入消息        │                   │                   │
       │──────────────────>│                   │                   │
       │                   │                   │                   │
       │                   │  2.构建请求体      │                   │
       │                   │  (messages+       │                   │
       │                   │   metadata)        │                   │
       │                   │──────────────────>│                   │
       │                   │                   │                   │
       │                   │                   │  3.转发请求        │
       │                   │                   │  (to LLM API)      │
       │                   │                   │──────────────────>│
       │                   │                   │                   │
       │                   │                   │  4.流式响应        │
       │                   │                   │  (SSE chunks)      │
       │                   │                   │<──────────────────│
       │                   │                   │                   │
       │                   │                   │  5.转换SSE格式     │
       │                   │<──────────────────│                   │
       │                   │                   │                   │
       │  6.流式渲染UI      │                   │                   │
       │<─────────────────│                   │                   │
       │                   │                   │                   │
```

---

## 三、详细数据流动分析

### 3.1 请求阶段

#### GenuiChat 构建请求体

**请求体结构：**

```typescript
{
  model: "deepseek-v3",        // 大模型名称
  messages: [                  // 对话历史
    { role: "system", content: "你是一个助手" },
    { role: "user", content: "用户输入" }
  ],
  stream: true,                // 启用流式
  temperature: 0.7,
  metadata: {
    tinygenui: JSON.stringify({
      framework: "Vue",
      customComponents: [...], // 自定义组件
      customExamples: [...],   // 示例
      customSnippets: [...],  // 片段
      customActions: [...]     // 动作
    })
  }
}
```

**关键特点：**

- 使用 `metadata.tinygenui` 传递 GenUI 配置
- 配置包含自定义组件 schema，帮助 LLM 生成正确结构
- 支持 `customFetch` 覆盖默认请求逻辑

#### 自定义 Fetch 示例

```typescript
const customFetch: CustomFetch = async (url, options) => {
  // 添加认证头
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
```

---

### 3.2 服务器转发阶段

#### GenuiServer 处理流程

```
1. 接收 POST /chat/completions 请求
2. 解析 JSON 请求体
3. 提取 messages、model、temperature、metadata
4. 调用大模型 API (通过 baseURL)
5. 接收流式响应
6. 转换为 SSE 格式返回给前端
```

#### 启动服务示例

```typescript
import { startServer } from '@opentiny/genui-sdk-server';

startServer({
  port: 3100,
  baseURL: 'https://api.openai.com/v1',
  apiKey: 'your-api-key',
  maxAttempts: 10,
});
```

#### SSE 响应格式

```
data: {"id":"chatcmpl-xxx","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"Hello"},"finish_reason":null}]}

data: {"id":"chatcmpl-xxx","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"!"},"finish_reason":null}]}

data: [DONE]
```

---

### 3.3 流式渲染阶段

#### GenuiChat 接收并处理

1. 监听 SSE 流事件
2. 解析 `delta.content`
3. 检测是否为 JSON Schema 或普通文本
4. 逐步更新 UI（流式渲染）
5. 状态更新：`generating` → `finished`

#### Schema 解析逻辑

```typescript
// 检测是否是 GenUI schema
if (content.startsWith('{') && content.includes('componentName')) {
  // 解析为 CardSchema
  renderComponent(content);
} else {
  // 普通文本
  appendText(content);
}
```

#### CardSchema 结构

```typescript
type CardSchema = {
  id?: string;                    // 根节点可选 id
  methods?: Methods;              // 方法集合
  state?: Record<string, any>;    // 全局状态，表单双向绑定
  componentName: string;          // 根组件名，通常为 Page
  props?: Record<string, any>;    // 根组件属性集合
  children?: NodeSchema[];         // 根子节点数组
  css?: string;                   // 全局 CSS 样式字符串
};

type NodeSchema = {
  id?: string;                    // 节点唯一标识
  componentName: string;          // 组件名
  props?: Record<string, any>;    // 组件属性集合
  children?: NodeSchema[] | string; // 子节点数组或字符串
  slot?: string | any;           // 插槽内容
  loop?: Record<string, any>;     // 循环渲染配置
  condition?: boolean | any;     // 条件渲染配置
};
```

---

## 四、数据流动特点总结

| 特点 | 说明 |
|------|------|
| **双向流式** | 请求和响应都是流式处理，减少等待时间 |
| **结构化输出** | LLM 返回 JSON Schema，渲染为 Vue 组件 |
| **配置下沉** | 通过 metadata.tinygenui 将组件配置传给 LLM |
| **中间层转发** | Server 充当 LLM 的代理，统一 API 规范 |
| **状态管理** | 前端维护会话历史，支持多会话管理 |
| **可扩展性** | 支持 customFetch、customComponents 自定义 |

---

## 五、关键代码路径

| 阶段 | 文件路径 | 说明 |
|------|----------|------|
| 前端请求构建 | GenuiChat 组件 | 构建 messages + metadata |
| 网络请求 | custom-fetch.ts | 默认 fetch 或自定义请求 |
| 服务器转发 | equipChatCompletions() | 调用 LLM API |
| 流式响应 | SSE 处理 | 前端逐步接收 |
| UI 渲染 | GenuiRenderer | 解析 Schema → 动态渲染组件 |

---

## 六、完整调用链

```
用户输入
    ↓
GenuiChat.buildRequest()
    ↓ (messages + metadata.tinygenui)
GenuiChat.fetch() / customFetch
    ↓ POST /chat/completions
GenuiServer.receiveRequest()
    ↓ (转发)
LLM API (baseURL)
    ↓ (流式响应)
GenuiServer.convertToSSE()
    ↓ (SSE chunks)
GenuiChat.parseStream()
    ↓ (检测 schema)
GenuiRenderer.render()
    ↓
用户界面 (Vue 组件)
```

---

## 七、相关文档

- [GenuiChat 组件文档](https://docs.opentiny.design/genui-sdk/components/chat.html)
- [GenuiServer 使用文档](https://docs.opentiny.design/genui-sdk/guide/server-usage.html)
- [快速开始指南](https://docs.opentiny.design/genui-sdk/guide/quick-start)