# Response Web API 详解

## 概述

`Response` 是 Web API 中 Fetch API 的核心组成部分，代表 HTTP 响应对象。当使用 `fetch()` 发起网络请求后，会返回一个 `Response` 对象，该对象包含了响应的所有信息，如状态码、响应头、响应体等。

### 基本概念

- **来源**: `fetch()` 请求的返回值
- **用途**: 访问和管理 HTTP 响应数据
- **浏览器支持**: Chrome 42+、Firefox 39+、Edge 14+、Safari 10+

### Response 的类型

| 类型 | 说明 | 触发场景 |
|------|------|----------|
| `basic` | 同源响应 | 同源请求成功 |
| `cors` | 跨域成功响应 | 跨域请求成功且服务器允许 |
| `error` | 网络错误 | 网络故障、DNS 解析失败 |
| `opaque` | 不透明响应 | 跨域请求被 CORS 限制 |
| `opaqueredirect` | 重定向响应 | 请求遵循重定向但无法访问详细信息 |

---

## 目录结构

```
Response/
├── constructor/          # 构造函数
│   └── Response.js      # 创建自定义 Response 对象
├── instanceAttributes/  # 实例属性
│   ├── ok.js            # 请求是否成功 (200-299)
│   ├── status.js        # HTTP 状态码
│   ├── statusText.js    # 状态码文本
│   ├── url.js           # 响应 URL
│   ├── type.js          # 响应类型
│   ├── headers.js       # 响应头对象
│   ├── redirected.js    # 是否重定向
│   └── bodyUsed.js      # body 是否已读取
├── instanceMethods/     # 实例方法
│   ├── 01_clone.js      # 克隆响应对象
│   ├── 02_json.js       # 解析 JSON
│   ├── 03_text.js       # 获取文本
│   ├── 04_blob.js       # 获取二进制 Blob
│   ├── 05_formData.js   # 获取表单数据
│   ├── 06_arrayBuffer.js # 获取 ArrayBuffer
│   ├── 07_bytes.js      # 获取 Uint8Array
│   ├── 08_body.js       # ReadableStream body
│   └── 09_bodyUsed.js   # body 读取标记
└── staticMethods/       # 静态方法
    ├── error.js         # 创建错误响应
    ├── redirect.js      # 创建重定向响应
    └── json.js          # 创建 JSON 响应
```

---

## 快速开始

### 基本用法

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 读取响应数据
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('请求失败:', error);
  });
```

### 使用 async/await

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('请求失败:', error);
  }
}
```

---

## 构造函数详解

### new Response(body, init)

手动创建 Response 对象。

```javascript
// 简单文本响应
const response1 = new Response('Hello World', {
  status: 200,
  headers: { 'Content-Type': 'text/plain' }
});

// JSON 响应
const response2 = new Response(JSON.stringify({ message: 'success' }), {
  status: 200,
  headers: { 'Content-Type': 'application/json' }
});

// 错误响应
const response3 = new Response('Not Found', {
  status: 404,
  statusText: 'Not Found'
});
```

**参数说明**:
- `body`: 响应体内容 (字符串、Blob、FormData、ArrayBuffer、ReadableStream、null)
- `init`: 配置对象 { status, statusText, headers }

---

## 实例属性详解

### ok - 请求是否成功

返回布尔值，表示 HTTP 状态码是否在 200-299 范围内。

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`请求失败: ${response.status}`);
  });
```

### status - HTTP 状态码

返回数字状态码 (100-599)。

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    switch (response.status) {
      case 200:
        return response.json();
      case 404:
        return '资源不存在';
      case 500:
        return '服务器错误';
      default:
        return '其他错误';
    }
  });
```

### headers - 响应头

返回 Headers 对象，可遍历和查询响应头。

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    // 获取 Content-Type
    console.log(response.headers.get('Content-Type'));

    // 遍历所有响应头
    for (const [key, value] of response.headers) {
      console.log(`${key}: ${value}`);
    }
  });
```

### bodyUsed - body 是否已读取

防止重复读取响应体。

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    console.log(response.bodyUsed); // false

    response.text().then(text => {
      console.log(response.bodyUsed); // true
      // 不能再次读取，会报错
    });
  });
```

---

## 实例方法详解

### clone() - 克隆响应

允许读取响应体多次。

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    // 克隆响应
    const clone = response.clone();

    // 同时处理 JSON 和缓存
    response.json().then(data => console.log('原始:', data));
    clone.json().then(data => console.log('克隆:', data));
  });
```

### json() - 解析 JSON

将响应体解析为 JSON 对象。

```javascript
fetch('https://api.example.com/api/user')
  .then(response => response.json())
  .then(user => {
    console.log(user.name);
    console.log(user.email);
  });
```

### text() - 获取文本

获取纯文本响应体。

```javascript
fetch('https://api.example.com/text')
  .then(response => response.text())
  .then(text => {
    console.log(text);
  });
```

### blob() - 获取二进制

获取二进制 Blob 数据，适合处理文件、图片。

```javascript
fetch('https://api.example.com/image.png')
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    const img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
  });
```

### arrayBuffer() - 获取 ArrayBuffer

获取原始二进制数据，适合音视频处理。

```javascript
fetch('https://api.example.com/audio.mp3')
  .then(response => response.arrayBuffer())
  .then(buffer => {
    console.log('数据长度:', buffer.byteLength);
    // 可用于 Web Audio API
  });
```

### formData() - 获取 FormData

解析 multipart/form-data 格式的响应。

```javascript
fetch('https://api.example.com/form')
  .then(response => response.formData())
  .then(formData => {
    for (const [key, value] of formData) {
      console.log(`${key}: ${value}`);
    }
  });
```

### body - ReadableStream

底层流式 API，用于处理大文件或实时数据。

```javascript
fetch('https://api.example.com/stream')
  .then(response => {
    const reader = response.body.getReader();
    const stream = new ReadableStream({
      start(controller) {
        function read() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            read();
          });
        }
        read();
      }
    });
    return new Response(stream);
  });
```

---

## 静态方法详解

### Response.error() - 创建错误响应

创建表示网络错误的 Response 对象。

```javascript
// Service Worker 中处理错误
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('离线状态', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    })
  );
});
```

### Response.redirect() - 创建重定向响应

创建重定向响应。

```javascript
// URL 重写
const response = Response.redirect('/new-url', 301);

// 临时重定向
const tempRedirect = Response.redirect('/temporary', 302);
```

### Response.json() - 创建 JSON 响应

快速创建 JSON 格式的响应。

```javascript
// 基本 JSON 响应
const response1 = Response.json({ message: 'success' });

// 自定义状态码
const response2 = Response.json(
  { error: 'Not Found' },
  { status: 404 }
);

// Service Worker 返回 JSON
self.addEventListener('fetch', event => {
  event.respondWith(
    Response.json({ data: 'from Service Worker' })
  );
});
```

---

## 实际应用示例

### 1. 封装 fetch 函数

```javascript
async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`请求失败: ${response.status} - ${error}`);
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

// 使用
const data = await request('https://api.example.com/data');
```

### 2. 文件下载

```javascript
async function downloadFile(url, filename) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('下载失败');
  }

  const blob = await response.blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
```

### 3. 图片预览

```javascript
async function loadImage(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('图片加载失败');
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

// 使用
loadImage('https://example.com/photo.jpg')
  .then(url => {
    const img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
  });
```

### 4. 错误处理模式

```javascript
async function handleResponse(response) {
  const contentType = response.headers.get('Content-Type');

  if (!response.ok) {
    let errorMessage;

    if (contentType?.includes('application/json')) {
      const error = await response.json();
      errorMessage = error.message || JSON.stringify(error);
    } else {
      errorMessage = await response.text();
    }

    throw new Error(`HTTP ${response.status}: ${errorMessage}`);
  }

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

// 使用
const data = await handleResponse(
  await fetch('https://api.example.com/data')
);
```

### 5. 请求缓存策略 (Service Worker)

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) {
          return response;
        }

        const clone = response.clone();
        caches.open('cache-v1').then(cache => {
          cache.put(event.request, clone);
        });

        return response;
      });
    })
  );
});
```

---

## 注意事项

### 1. Body 只能读取一次

```javascript
// 错误示例
fetch(url).then(response => {
  response.text(); // 读取后 bodyUsed 变为 true
  response.json(); // 报错: body 已读取
});

// 正确做法: 使用 clone()
fetch(url).then(response => {
  const clone = response.clone();
  response.text();
  clone.json();
});
```

### 2. 状态码有效性

- 有效状态码范围: 200-599
- 小于 200 或大于 599 的状态码会导致抛出 TypeError

### 3. CORS 限制

- 跨域响应的某些属性可能被限制
- `type` 属性可区分同源/跨域响应
- `opaque` 响应无法读取 body

### 4. 流式响应

- 使用 `body` 属性获取 ReadableStream
- 适合处理大文件或实时数据
- 读取后 bodyUsed 变为 true

---

## 浏览器兼容性

| 特性 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| Response 构造函数 | 42 | 39 | 10 | 14 |
| clone() | 42 | 39 | 10 | 14 |
| json()/text()/blob() | 42 | 39 | 10 | 14 |
| formData() | 60 | 55 | 11 | 16 |
| arrayBuffer() | 42 | 39 | 10 | 14 |
| body (ReadableStream) | 52 | 65 | 14.1 | 79 |
| Response.json() 静态方法 | 42 | 39 | 10 | 14 |

---

## 总结

`Response` 对象是 Fetch API 的核心，提供了丰富的 API 来处理 HTTP 响应：

- **属性**: ok、status、statusText、url、type、headers、redirected、bodyUsed
- **方法**: clone()、json()、text()、blob()、formData()、arrayBuffer()、bytes()、body
- **静态方法**: Response.error()、Response.redirect()、Response.json()

掌握这些 API 可以灵活处理各种网络请求场景，包括 RESTful API 调用、文件下载、图片预览、流式数据处理等。