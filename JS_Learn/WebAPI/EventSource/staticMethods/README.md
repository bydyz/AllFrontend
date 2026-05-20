# EventSource 静态方法说明

## 概述

经过查阅 MDN Web 文档和 HTML 标准规范，可以确认：

**EventSource 接口没有任何静态方法。**

## EventSource API 结构

EventSource 是 Web API 中用于实现服务器发送事件（Server-Sent Events，SSE）的接口。以下是该接口的完整结构：

### 1. 构造函数

`javascript
new EventSource(url)
new EventSource(url, options)
`

- 参数：
  - url：字符串，表示服务器端点的 URL 地址
  - options：可选配置对象
    - withCredentials：布尔值，默认 false，是否携带 CORS 凭证

- 返回值：返回一个新的 EventSource 实例

- 使用场景：创建与服务器的事件流连接，用于接收服务器推送的消息

### 2. 实例属性（只读）

| 属性名 | 类型 | 说明 |
|--------|------|------|
| url | 字符串 | 服务器端点的 URL 地址 |
| withCredentials | 布尔值 | 是否携带 CORS 凭证 |
| readyState | 数值 | 连接状态：0（CONNECTING）、1（OPEN）、2（CLOSED） |

### 3. 实例常量

| 常量名 | 数值 | 说明 |
|--------|------|------|
| EventSource.CONNECTING | 0 | 连接中状态 |
| EventSource.OPEN | 1 | 已连接状态 |
| EventSource.CLOSED | 2 | 已关闭状态 |

### 4. 实例方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| close() | 无 | undefined | 关闭 SSE 连接 |

### 5. 事件处理程序

| 事件名 | 说明 |
|--------|------|
| onopen | 连接打开时触发 |
| onmessage | 收到消息时触发 |
| onerror | 连接出错时触发 |

## 为什么没有静态方法？

根据 HTML 标准规范，EventSource 接口被定义为：

`webidl
[Exposed=(Window,Worker)]
interface EventSource : EventTarget {
  constructor(USVString url, optional EventSourceInit eventSourceInitDict = {});

  readonly attribute USVString url;
  readonly attribute boolean withCredentials;

  const unsigned short CONNECTING = 0;
  const unsigned short OPEN = 1;
  const unsigned short CLOSED = 2;
  readonly attribute unsigned short readyState;

  attribute EventHandler onopen;
  attribute EventHandler onmessage;
  attribute EventHandler onerror;
  undefined close();
};
`

从接口定义可以看出，EventSource 只有：
- 一个构造函数（非静态方法）
- 若干实例属性和方法
- 若干静态常量（用于表示连接状态）

没有任何静态方法定义。

## 与其他 API 的对比

与 EventSource 类似的 API 中，有些确实提供了静态方法：

| API | 静态方法 | 说明 |
|-----|----------|------|
| Notification | Notification.requestPermission() | 请求通知权限 |
| Notification | Notification.permission | 获取当前权限状态 |
| AbortSignal | AbortSignal.abort() | 创建一个已终止的信号 |
| AbortSignal | AbortSignal.timeout() | 创建一个超时信号 |

但 EventSource 不属于上述情况，它只是一个简单的 SSE 客户端接口。

## 总结

EventSource 作为服务器发送事件的客户端实现，设计上不包含任何静态方法。要使用 EventSource，必须通过 new EventSource(url) 构造函数创建实例，然后通过实例方法来管理连接和接收消息。

如需进一步了解 EventSource 的使用方法，请参考：
- MDN EventSource 文档：https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource
- HTML 标准 - Server-Sent Events：https://html.spec.whatwg.org/multipage/server-sent-events.html
