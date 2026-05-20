# GenuiServer 中间服务器作用分析

## 一、GenuiServer 定位

GenuiServer 是 GenuiChat（前端）与大模型（LLM）之间的中间层服务，其本质是一个 **Node.js/Express 后端代理服务器**。

---

## 二、核心作用

### 2.1 请求转发

- **接收前端请求**：GenuiChat 通过 POST 请求将对话消息发送给 GenuiServer
- **转发至大模型**：GenuiServer 根据配置的 baseURL（如 OpenAI、DeepSeek API）将请求转发给目标 LLM
- **处理流程**：

```
接收 POST /chat/completions
    ↓
解析 JSON 请求体（messages、model、temperature、metadata）
    ↓
调用大模型 API
    ↓
接收流式响应
```

### 2.2 响应转换

- **流式响应接收**：从大模型接收 SSE（Server-Sent Events）流式数据
- **格式转换**：将大模型的响应转换为标准 SSE 格式返回给前端
- **SSE 格式示例**：

```
data: {"id":"chatcmpl-xxx","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"Hello"},"finish_reason":null}]}
data: [DONE]
```

### 2.3 API 代理与统一规范

- 提供 **OpenAI 兼容 API** 接口，屏蔽不同大模型 API 的差异
- 前端只需对接 GenuiServer，无需关心底层大模型的具体实现
- 支持配置不同的 baseURL 和 apiKey，灵活切换大模型

### 2.4 配置管理

- 通过启动参数配置：

```typescript
startServer({
  port: 3100,              // 服务端口
  baseURL: 'https://api.openai.com/v1',  // 大模型 API 地址
  apiKey: 'your-api-key', // 认证密钥
  maxAttempts: 10,         // 重试次数
});
```

---

## 三、在数据流中的位置

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  User       │     │  GenuiChat  │     │ GenuiServer │     │    LLM      │
│ (浏览器)    │     │  (Vue组件)  │     │ (中间服务器) │     │  (大模型)    │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │                   │
       │ 1. 输入消息        │                   │                   │
       │──────────────────>│                   │                   │
       │                   │ 2. 构建请求        │                   │
       │                   │──────────────────>│                   │
       │                   │                   │ 3. 转发请求        │
       │                   │                   │─────────────────>│
       │                   │                   │ 4. 流式响应        │
       │                   │                   │<─────────────────│
       │                   │ 5. 转换SSE格式     │                   │
       │                   │<──────────────────│                   │
       │ 6. 流式渲染UI      │                   │                   │
       │<─────────────────│                   │                   │
```

---

## 四、关键能力总结

| 能力 | 说明 |
|------|------|
| **请求代理** | 接收前端请求，透明转发至目标 LLM |
| **响应转换** | 将 LLM 响应转换为 SSE 格式 |
| **API 统一** | 提供 OpenAI 兼容接口，屏蔽底层差异 |
| **流式处理** | 支持流式请求和响应，减少延迟 |
| **灵活配置** | 支持自定义 baseURL、apiKey、端口等 |
| **错误处理** | 支持重试机制（maxAttempts 配置） |

---

## 五、与前端的交互

前端（GenuiServer）通过以下方式与 GenuiServer 交互：

1. **自定义 Fetch**：支持通过 `customFetch` 自定义请求逻辑（如添加认证头）
2. **Metadata 传递**：通过 `metadata.tinygenui` 传递 GenUI 配置（自定义组件、示例、动作等）
3. **流式接收**：监听 SSE 事件，逐步获取响应内容

---

## 六、总结

GenuiServer 在整个架构中充当了 **中间层/代理层** 的角色：

- **对前端**：作为统一的 API 入口，接收请求并返回 SSE 流式响应
- **对大模型**：作为客户端，将请求转发给目标 LLM 并处理响应

这种设计使得：
1. 前端无需直接暴露大模型 API 密钥
2. 可以灵活切换不同大模型（只需修改 baseURL）
3. 统一了 API 调用规范，降低了前端开发复杂度
4. 便于在后端添加日志、监控、缓存等扩展功能