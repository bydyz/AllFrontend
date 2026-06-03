# Node.js HTTP 模块完整指南

本文档全面介绍 Node.js 内置的 `http` 模块的各种用法。

## 目录

- [创建 HTTP 服务器](#创建-http-服务器)
- [处理 HTTP 请求](#处理-http-请求)
- [发送 HTTP 响应](#发送-http-响应)
- [请求方法](#请求方法)
- [URL 处理](#url-处理)
- [请求头处理](#请求头处理)
- [请求体处理](#请求体处理)
- [事件处理](#事件处理)
- [HTTPS 支持](#https-支持)
- [模块常用方法](#模块常用方法)
- [完整的 HTTP 服务器示例](#完整的-http-服务器示例)

---

## 创建 HTTP 服务器

### 使用 createServer

`http.createServer()` 方法创建一个 HTTP 服务器实例。

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // 请求处理逻辑
  res.end('Hello World');
});

server.listen(3000);
```

### 配置选项

可以传入配置对象来设置服务器选项：

```javascript
const server = http.createServer({
  hostname: '127.0.0.1',
  port: 3000,
  path: '/',
  method: 'GET'
}, (req, res) => {
  res.end('Server with options');
});
```

### 配置对象属性

- `hostname`: 服务器主机名，默认为 `localhost`
- `port`: 监听端口号
- `path`: 请求路径，默认为 `/`
- `method`: 请求方法，默认为 `GET`
- `family`: IP 版本，4 或 6

---

## 处理 HTTP 请求

### req 对象属性

请求对象 `req` 包含以下主要属性：

```javascript
const server = http.createServer((req, res) => {
  // 获取请求 URL
  console.log(req.url);        // 例如: '/users?id=123&name=test'
  console.log(req.method);     // 例如: 'GET', 'POST', 'PUT', 'DELETE'

  // 获取请求头
  console.log(req.headers);    // 所有请求头
  console.log(req.headers['content-type']); // 单个请求头

  // 请求方法
  console.log(req.method === 'GET'); // true/false

  // 请求 URL 中的查询参数
  console.log(req.query); // 需要手动解析

  // 请求 URL 路径
  console.log(req.pathname); // 例如: '/users'

  // 获取请求路径中的参数
  console.log(req.params);  // 例如: { id: '123' }
});
```

---

## 发送 HTTP 响应

### res 对象方法

响应对象 `res` 提供多种方法来发送响应：

```javascript
const server = http.createServer((req, res) => {
  // 1. 发送简单文本响应
  res.end('Hello World');

  // 2. 发送状态码和响应体
  res.statusCode = 200;
  res.end('OK');

  // 3. 设置响应头
  res.setHeader('Content-Type', 'text/plain');
  res.end('Response with headers');

  // 4. 设置多个响应头
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'X-Custom-Header': 'custom-value',
    'Set-Cookie': ['session=abc', 'token=xyz']
  });
  res.end('Response with multiple headers');

  // 5. 转发请求到另一个服务器
  const options = {
    hostname: 'example.com',
    port: 80,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxyReq = http.request(options, (proxyRes) => {
    // 转发响应状态码
    res.statusCode = proxyRes.statusCode;
    // 转发响应头
    proxyRes.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });
    // 转发响应体
    proxyRes.pipe(res);
  });

  req.pipe(proxyReq);
});
```

### 响应状态码

常用状态码：

- `200`: 成功
- `201`: 已创建
- `204`: 无内容
- `301`: 永久重定向
- `302`: 临时重定向
- `304`: 未修改
- `400`: 请求错误
- `401`: 未授权
- `403`: 禁止访问
- `404`: 未找到
- `500`: 服务器错误
- `502`: 网关错误
- `503`: 服务不可用

```javascript
const server = http.createServer((req, res) => {
  // 设置状态码
  res.statusCode = 404;

  // 或者使用便捷方法
  res.status(404).end('Not Found');
});
```

---

## 请求方法

支持所有 HTTP 请求方法：

```javascript
const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      handleGetRequest(req, res);
      break;
    case 'POST':
      handlePostRequest(req, res);
      break;
    case 'PUT':
      handlePutRequest(req, res);
      break;
    case 'DELETE':
      handleDeleteRequest(req, res);
      break;
    case 'HEAD':
      handleHeadRequest(req, res);
      break;
    case 'OPTIONS':
      handleOptionsRequest(req, res);
      break;
    case 'PATCH':
      handlePatchRequest(req, res);
      break;
    default:
      res.statusCode = 405;
      res.end('Method Not Allowed');
  }
});

function handleGetRequest(req, res) {
  res.end('GET request handled');
}

function handlePostRequest(req, res) {
  let data = '';
  req.on('data', chunk => data += chunk);
  req.on('end', () => {
    res.end('POST request handled: ' + data);
  });
}
```

---

## URL 处理

### 基本 URL 处理

```javascript
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://' + req.headers.host);
  console.log(url.pathname);  // 路径部分
  console.log(url.search);    // 查询字符串
  console.log(url.searchParams); // 查询参数对象

  // 获取查询参数
  const userId = url.searchParams.get('id');
  const userName = url.searchParams.get('name');

  // 检查参数是否存在
  if (url.searchParams.has('id')) {
    res.end('User ID: ' + userId);
  }
});

// 使用 URL 解析
const parsedUrl = new URL('/users?id=123&name=test', 'http://example.com');
console.log(parsedUrl.pathname);   // '/users'
console.log(parsedUrl.searchParams.get('id')); // '123'
```

---

## 请求头处理

### 获取请求头

```javascript
const server = http.createServer((req, res) => {
  // 获取单个请求头
  const contentType = req.headers['content-type'];
  const userAgent = req.headers['user-agent'];

  // 获取所有请求头
  const allHeaders = req.headers;

  // 获取 Host 头
  const host = req.headers.host;

  // 获取 Cookie
  const cookie = req.headers.cookie;
});
```

### 发送请求头

```javascript
const server = http.createServer((req, res) => {
  // 设置响应头
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Request-ID', generateRequestId());

  // 设置多个响应头
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify({ data: 'hello' })),
    'Access-Control-Allow-Origin': '*'
  });

  res.end(JSON.stringify({ data: 'hello' }));
});
```

---

## 请求体处理

### 读取 POST 请求体

```javascript
const server = http.createServer((req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    // body 现在包含完整的请求体
    console.log('Request body:', body);
    res.end('Received: ' + body);
  });

  req.on('error', (err) => {
    console.error('Error:', err);
    res.statusCode = 400;
    res.end('Invalid request');
  });
});
```

### 设置请求体编码

```javascript
const server = http.createServer((req, res) => {
  // 设置为 Buffer 模式（默认）
  // request.setEncoding(null) 或不调用

  // 设置为字符串模式
  req.setEncoding('utf8');

  // 设置为二进制字符串模式
  req.setEncoding('binary');

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    res.end(body);
  });
});
```

### 处理 JSON 请求体

```javascript
const server = http.createServer((req, res) => {
  let body = '';

  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      res.end('Received JSON: ' + JSON.stringify(data));
    } catch (e) {
      res.statusCode = 400;
      res.end('Invalid JSON');
    }
  });
});
```

### 处理表单数据

```javascript
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    let body = '';

    req.setEncoding('utf8');

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const params = new URLSearchParams(body);
      const username = params.get('username');
      const password = params.get('password');

      res.end(`Username: ${username}, Password: ${password}`);
    });
  }
});
```

---

## 事件处理

### 常用事件

```javascript
const server = http.createServer((req, res) => {
  // 请求开始
  console.log('New request:', req.method, req.url);

  // 接收数据块
  req.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length, 'bytes');
  });

  // 请求结束
  req.on('end', () => {
    console.log('Request completed');
  });

  // 请求错误
  req.on('error', (err) => {
    console.error('Request error:', err);
  });

  // 响应结束
  res.on('finish', () => {
    console.log('Response finished');
  });

  res.end('Hello');
});

// 服务器事件
server.on('listening', () => {
  console.log('Server is listening');
});

server.on('close', () => {
  console.log('Server is closing');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Port is already in use');
  } else {
    console.error('Server error:', err);
  }
});
```

---

## HTTPS 支持

### 创建 HTTPS 服务器

```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
};

const server = https.createServer(options, (req, res) => {
  res.end('HTTPS Server');
});

server.listen(443);
```

### 使用自签名证书（开发环境）

```javascript
const https = require('https');
const fs = require('fs');

// 自签名证书（仅用于开发）
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, (req, res) => {
  res.end('HTTPS Server with self-signed cert');
});

server.listen(3443);
```

### 在同一服务器上同时支持 HTTP 和 HTTPS

```javascript
const http = require('http');
const https = require('https');
const fs = require('fs');

const httpOptions = {
  hostname: '127.0.0.1',
  port: 80
};

const httpsOptions = {
  hostname: '127.0.0.1',
  port: 443,
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const httpServer = http.createServer((req, res) => {
  res.end('HTTP Server');
});

const httpsServer = https.createServer(httpsOptions, (req, res) => {
  res.end('HTTPS Server');
});

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
```

---

## 模块常用方法

### http.get()

发起 GET 请求：

```javascript
http.get('http://example.com', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });
}).on('error', (err) => {
  console.error('Error:', err);
});
```

### http.request()

发起自定义请求：

```javascript
const options = {
  hostname: 'example.com',
  port: 80,
  path: '/api/users',
  method: 'GET',
  headers: {
    'User-Agent': 'MyApp/1.0',
    'Accept': 'application/json'
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);

  res.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});

req.on('error', (err) => {
  console.error('Request error:', err);
});

req.end();
```

### POST 请求示例

```javascript
const postData = JSON.stringify({
  username: 'testuser',
  password: 'testpass'
});

const options = {
  hostname: 'example.com',
  port: 80,
  path: '/api/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);

  res.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});

req.on('error', (err) => {
  console.error('Request error:', err);
});

req.write(postData);
req.end();
```

---

## 完整的 HTTP 服务器示例

### RESTful API 服务器

```javascript
const http = require('http');
const url = require('url');
const fs = require('fs');

// 模拟数据库
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理 OPTIONS 预检请求
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 路由处理
  if (pathname === '/api/users' && method === 'GET') {
    getUsers(req, res);
  } else if (pathname === '/api/users' && method === 'POST') {
    createUser(req, res);
  } else if (pathname.startsWith('/api/users/') && method === 'GET') {
    getUserById(req, res, parsedUrl.pathname);
  } else if (pathname.startsWith('/api/users/') && method === 'PUT') {
    updateUser(req, res, parsedUrl.pathname);
  } else if (pathname.startsWith('/api/users/') && method === 'DELETE') {
    deleteUser(req, res, parsedUrl.pathname);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

function getUsers(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

function createUser(req, res) {
  let body = '';

  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const newUser = JSON.parse(body);

      // 简单验证
      if (!newUser.name || !newUser.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Name and email are required' }));
        return;
      }

      newUser.id = users.length + 1;
      users.push(newUser);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}

function getUserById(req, res, pathname) {
  const id = pathname.split('/')[3];

  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'User not found' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
}

function updateUser(req, res, pathname) {
  const id = pathname.split('/')[3];

  const userIndex = users.findIndex(u => u.id === parseInt(id));

  if (userIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'User not found' }));
    return;
  }

  let body = '';
  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const updatedData = JSON.parse(body);

      users[userIndex] = { ...users[userIndex], ...updatedData };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users[userIndex]));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}

function deleteUser(req, res, pathname) {
  const id = pathname.split('/')[3];

  const userIndex = users.findIndex(u => u.id === parseInt(id));

  if (userIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'User not found' }));
    return;
  }

  users.splice(userIndex, 1);

  res.writeHead(204).end();
}

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### 文件服务器

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## 总结

Node.js 的 `http` 模块提供了强大的 HTTP 服务器和客户端功能：

- ✅ 创建 HTTP/HTTPS 服务器
- ✅ 处理各种 HTTP 请求方法
- ✅ 解析 URL 和查询参数
- ✅ 处理请求头和响应头
- ✅ 读取和解析请求体（JSON、表单等）
- ✅ 事件驱动处理请求
- ✅ 转发请求和响应
- ✅ 支持 CORS 跨域
- ✅ 可用于构建 RESTful API
- ✅ 可用于静态文件服务器

使用 `http` 模块可以轻松构建高性能的 Web 服务器和 API 服务。
