# Server-Sent Events (SSE) 数据格式详细分析

## 一、SSE 是什么？

### 1.1 一句话定义

Server-Sent Events（SSE）是一种基于 HTTP 协议的服务器推送技术，允许服务器单向向客户端发送实时更新。

### 1.2 详细定义

- **概念**：SSE 是 HTML5 引入的一种服务器推送机制，通过 HTTP 长连接实现服务器向客户端的实时数据推送
- **解决问题**：实现服务器到客户端的单向实时通信，避免轮询的性能开销
- **所属领域**：Web 实时通信技术
- **对比**：与 WebSocket 不同，SSE 是单向通信（只能服务器→客户端），但更轻量、更简单

---

## 二、SSE 数据格式详解

### 2.1 整体格式结构

SSE 消息由多个**字段行**组成，每条消息之间用**空行**分隔：

```
field1:value1
field2:value2
field3:value3

field1:value1
field2:value2
```

### 2.2 支持的字段

| 字段名 | 必填 | 说明 | 示例 |
|--------|------|------|------|
| `data` | **是** | 消息内容，可以是多行 | `data: Hello World` |
| `id` | 否 | 事件ID，用于断线重连 | `id: 1001` |
| `event` | 否 | 自定义事件类型 | `event: message` |
| `retry` | 否 | 重连时间（毫秒） | `retry: 5000` |
| `comment` | 否 | 注释行，会被忽略 | `: This is a comment` |

---

## 三、简单数据格式示例分析

### 3.1 示例 1：最简单消息

```
data: Hello SSE
```

**分析**：
- 只有一个 `data` 字段
- 客户端接收到的数据：`"Hello SSE"`
- 这是 SSE 最基本的用法

---

### 3.2 示例 2：带 ID 的消息（推荐使用）

```
id: 1001
data: {"type": "update", "content": "Server time: 14:30:00"}
```

**分析**：
- `id: 1001` — 事件标识符
- `data` — 消息内容（JSON 格式）
- 客户端接收到的数据对象：`{ type: "update", content: "Server time: 14:30:00" }`
- **重要**：如果连接断开，浏览器会自动带上 `Last-Event-ID` 头重连，服务器可据此发送缺失的数据

---

### 3.3 示例 3：多行 data 字段

```
data: {
data:   "message": "Hello",
data:   "status": "success"
data: }
```

**分析**：
- 多行 `data` 会被**拼接**成一个完整的字符串
- 拼接时会自动添加换行符 `\n`
- 最终接收到的数据：
  ```
  {
    "message": "Hello",
    "status": "success"
  }
  ```
- 常用于传输 JSON 数据

---

### 3.4 示例 4：自定义事件类型

```
event: login
data: User has logged in
id: 1002
```

**分析**：
- `event: login` — 声明这是一个 `login` 事件
- 客户端可以通过 `EventSource` 的 `addEventListener('login', handler)` 来监听特定事件
- 如果不指定 `event`，默认为 `message` 事件

---

### 3.5 示例 5：设置重连时间

```
retry: 3000
data: Connection established
```

**分析**：
- `retry: 3000` — 告诉客户端如果连接断开，下次重连前等待 3000 毫秒
- 默认重连时间由浏览器决定（通常 1-5 秒）
- 适合需要控制更新频率的场景

---

### 3.6 示例 6：完整的多条消息流

```
: This is a comment line, ignored by client

id: 1
event: message
data: First message

id: 2
data: Second message

id: 3
event: error
data: Error occurred
```

**分析**：
- **第1行**：`:` 开头是注释行，完全被忽略
- **空行**：分隔两条消息
- **消息1**：包含 id、event、data
- **消息2**：只有 id 和 data
- **消息3**：自定义 event 为 error

---

## 四、完整示例：服务器响应示例

### 4.1 HTTP 响应头

```http
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

- `Content-Type` 必须为 `text/event-stream`
- `Cache-Control: no-cache` 防止缓存
- `Connection: keep-alive` 保持长连接

### 4.2 完整响应示例

```http
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

id: 1
event: stock-update
data: {"symbol": "AAPL", "price": 175.50, "time": "14:30:00"}

id: 2
event: stock-update
data: {"symbol": "GOOGL", "price": 140.25, "time": "14:30:01"}

id: 3
event: notification
data: {"title": "Market Update", "message": "Stocks updated"}
```

---

## 五、客户端接收示例

### 5.1 JavaScript 接收代码

```javascript
const eventSource = new EventSource('/api/stream');

// 监听所有消息（默认事件）
eventSource.onmessage = (event) => {
  console.log('Default:', event.data);
};

// 监听自定义事件
eventSource.addEventListener('stock-update', (event) => {
  const data = JSON.parse(event.data);
  console.log('Stock:', data.symbol, data.price);
});

// 监听通知事件
eventSource.addEventListener('notification', (event) => {
  console.log('Notification:', event.data);
});

// 错误处理
eventSource.onerror = (error) => {
  console.error('SSE Error:', error);
};
```

---

## 六、数据格式要点总结

### 6.1 核心规则

1. **每条消息以空行结束**（两个换行符 `\n\n`）
2. **data 字段是必须的**，其他字段可选
3. **多行 data 会自动拼接**，中间用 `\n` 连接
4. **注释行**以 `:` 开头，用于保活或说明
5. **id 字段**用于断线重连的标记

### 6.2 与 JSON 的关系

- SSE 的 `data` 字段内容通常是 **JSON 格式字符串**
- 客户端需要自行 `JSON.parse()` 解析
- 也可以传输纯文本

### 6.3 适用场景

- 股票行情实时更新
- 新闻/通知推送
- 进度条/状态更新
- 聊天消息接收（单向）
- 物联网设备状态监控