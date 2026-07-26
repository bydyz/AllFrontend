# Fetch + ReadableStream 数据格式详解

## 一、基本概念

### 1.1 fetch() 返回的数据结构

```js
const response = await fetch('https://api.example.com/data');
```

`response` 是一个 **Response 对象**，包含：

| 属性 | 类型 | 说明 |
|------|------|------|
| `ok` | boolean | HTTP 状态码是否在 200-299 范围 |
| `status` | number | HTTP 状态码 |
| `statusText` | string | 状态文本 |
| `headers` | Headers | 响应头对象 |
| `url` | string | 请求 URL |
| `body` | ReadableStream | 响应体（流数据）|

### 1.2 response.body 的真实类型

```js
console.log(response.body);           // ReadableStream
console.log(response.body instanceof ReadableStream); // true
```

`response.body` **直接就是 ReadableStream 实例**，这是浏览器提供的原生流。

---

## 二、读取流数据

### 2.1 获取 Reader

```js
const reader = response.body.getReader();
```

返回一个 `ReadableStreamDefaultReader` 对象。

### 2.2 read() 方法的返回值

```js
const result = await reader.read();
```

返回格式：
```js
{
  done: boolean,           // 是否读取完毕
  value: Uint8Array | undefined  // 当前数据块（Uint8Array 类型）
}
```

---

## 三、数据格式详解

### 3.1 value 的真实类型

- `value` 是 **Uint8Array**（类型化数组），不是字符串
- 每个元素是一个字节（0-255）
- 必须用 TextDecoder 解码为字符串

### 3.2 实际数据示例

```js
// 假设服务器返回文本 "Hello World"
const { done, value } = await reader.read();

console.log(done);      // false（可能还有数据）
console.log(value);     // Uint8Array(11) [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
console.log(value.length); // 11
```

对应字符：
```
H = 72
e = 101
l = 108
l = 108
o = 111
  = 32 (空格)
W = 87
o = 111
r = 114
l = 108
d = 100
```

### 3.3 解码为字符串

```js
const decoder = new TextDecoder();
const text = decoder.decode(value);
// "Hello World"
```

对于大文本，使用流式解码：
```js
const decoder = new TextDecoder();
let fullText = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  fullText += decoder.decode(value, { stream: true });
}
```

---

## 四、完整示例代码

```js
async function fetchStreamExample() {
  try {
    const response = await fetch('https://api.example.com/large-data');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let chunks = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        console.log('流读取完成');
        break;
      }

      // value 是 Uint8Array
      console.log('收到数据块:', value);
      console.log('解码后:', decoder.decode(value));

      chunks.push(value);
    }

    // 合并所有块并解码
    const allData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
    let offset = 0;
    chunks.forEach(chunk => {
      allData.set(chunk, offset);
      offset += chunk.length;
    });

    console.log('完整数据:', decoder.decode(allData));

  } catch (error) {
    console.error('请求失败:', error);
  }
}
```

---

## 五、关键点总结

| 要点 | 说明 |
|------|------|
| response | Response 对象（非流） |
| response.body | ReadableStream 实例 |
| reader.read() | 返回 `{ done, value }` |
| value 类型 | Uint8Array（字节数组） |
| 解码工具 | TextDecoder |
| 解码结果 | 字符串 |

---

## 六、与其他流的关系

```
Response.body (ReadableStream)
       │
       ▼
getReader() → ReadableStreamDefaultReader
       │
       ▼
read() → { done, value }
       │
       ▼
TextDecoder.decode(value) → 字符串
```

这就是浏览器中 fetch 获取流式数据的完整流程。