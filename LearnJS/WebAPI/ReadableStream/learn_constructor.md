# ReadableStream 构造器详解

## 基本语法

```javascript
new ReadableStream(startController)
new ReadableStream(startController, strategy)
```

## 参数说明

### 1. startController（必需）

一个函数，在流创建时立即调用，接收一个 `ReadableStreamDefaultController` 参数：

```javascript
const stream = new ReadableStream((controller) => {
  // controller 是 ReadableStreamDefaultController 实例
  controller.enqueue('hello');
  controller.close();
});
```

`controller` 对象提供以下方法：

| 方法 | 说明 |
|------|------|
| `enqueue(chunk)` | 将数据块推入流中 |
| `close()` | 关闭流 |
| `error(error)` | 触发错误 |

### 2. strategy（可选）

一个包含 `highWaterMark` 和 `size` 函数的对象，用于背压控制：

```javascript
const stream = new ReadableStream(
  (controller) => {
    // ...
  },
  {
    highWaterMark: 3,    // 内部队列最大容量（默认 1）
    size(chunk) {         // 计算每个 chunk 的大小
      return chunk.length;
    }
  }
);
```

## 完整示例

### 示例 1：基本用法

```javascript
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('第一块数据');
    controller.enqueue('第二块数据');
    controller.close();
  }
});

const reader = stream.getReader();
reader.read().then(({ value, done }) => console.log(value)); // "第一块数据"
```

### 示例 2：异步生成数据

```javascript
function createAsyncStream(dataList) {
  return new ReadableStream({
    async start(controller) {
      for (const data of dataList) {
        controller.enqueue(data);
        await new Promise(r => setTimeout(r, 100)); // 模拟延迟
      }
      controller.close();
    }
  });
}

const stream = createAsyncStream(['a', 'b', 'c']);
```

### 示例 3：背压控制

```javascript
const stream = new ReadableStream(
  {
    start(controller) {
      for (let i = 0; i < 100; i++) {
        controller.enqueue('data-' + i);
      }
      controller.close();
    }
  },
  {
    highWaterMark: 2,  // 队列积压 2 个 chunk 后暂停
    size: (chunk) => 1
  }
);
```

## 底层机制

### 内部队列

ReadableStream 内部维护一个队列：
1. `enqueue()` 将数据放入队列
2. 当消费者调用 `read()` 时，从队列取出数据
3. 当队列达到 `highWaterMark` 时，自动暂停生产

### 状态转换

```
创建 → 开始（start）→ 可读 → 关闭
              ↓
            错误
```

## 使用场景

1. **处理大文件**：分块读取，避免内存溢出
2. **流式 API**：Server-Sent Events、WebSocket 数据处理
3. **转换流**：配合 TransformStream 进行数据处理
4. **Web Fetch**：如 `response.body.getReader()` 获取流读取器

## 浏览器兼容性

- Chrome 43+
- Firefox 65+
- Safari 14.1+
- Edge 14+

支持率：约 97%