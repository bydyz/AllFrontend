# 配置示例

```javascript
server: {
  port: 82,
  host: true,
  open: true,
  proxy: {
    [`^/api`]: {
      target: "http://110.41.184.250:8080/",
      changeOrigin: true,
    },
  },
},
```

这个 Vite 代理配置的核心原理是 **开发服务器反向代理**。


## 工作原理图解 

```yaml
浏览器前端 (localhost:82) 
    ↓
    ↓ 请求 http://localhost:82/api/login
    ↓
Vite 开发服务器 (监听82端口)
    ↓
    ↓ 代理转发
    ↓
真实后端服务器 (110.41.184.250:8080)
    ↓
返回响应
    ↓
Vite 开发服务器
    ↓
浏览器前端
```


## 配置逐行解析 

```javascript
server: {
  port: 82,           // 开发服务器运行在82端口
  host: true,         // 允许局域网访问
  open: true,         // 启动时自动打开浏览器
  
  proxy: {            // 代理配置
    [`^/api`]: {      // 匹配所有以 /api 开头的请求
      target: "http://110.41.184.250:8080/",  // 转发到这个地址
      changeOrigin: true,  // 关键配置
    },
  },
}
```


## 核心原理详解

1. 路径匹配与重写
```javascript
[`^/api`]: {  // 正则匹配，匹配所有以 /api 开头的请求路径
  target: "http://110.41.184.250:8080/",
  // 实际转发：http://localhost:82/api/login → http://110.41.184.250:8080/api/login
}
```
请求路径中的 /api会被保留，并拼接到目标地址后。

2. changeOrigin: true的作用（关键）
这个选项做了三件重要的事：
  * 修改请求的 Host 头
      ```javascript
      // 代理前的请求头
      Host: localhost:82
      Origin: http://localhost:82



      // 代理后的请求头（修改后）
      Host: 110.41.184.250:8080
      Origin: http://110.41.184.250:8080
      ```
      这会让后端服务器认为请求来自同源，从而绕过浏览器的同源策略限制。

  * 防止 CORS 问题
      由于浏览器看到的是向 localhost:82发起的请求（同源），不会触发 CORS 预检请求，从根本上避免了跨域问题。

  * 处理 cookie 和认证
      因为浏览器认为是同源请求，所以会自动携带 cookie，无需设置 withCredentials。

3. 与直接请求的区别
**不使用代理**（有问题）：
```yaml
浏览器 → http://110.41.184.250:8080/api/login
    ↓
触发CORS检查，需要服务器配置CORS头
    ↓
需要设置 withCredentials
    ↓
服务器需返回正确的CORS响应头
```

**使用代理**（无跨域问题）：
```yaml
浏览器 → http://localhost:82/api/login  ← 同源请求！
    ↓
Vite服务器 → http://110.41.184.250:8080/api/login
    ↓
响应返回浏览器
```
整个过程对浏览器来说完全是同源请求。


## 代理的详细工作流程
```yaml
1. 浏览器请求: GET http://localhost:82/api/user/list
2. Vite收到请求，匹配到 /api 前缀
3. Vite修改请求头：
   - 目标地址改为: http://110.41.184.250:8080/api/user/list
   - 修改 Host 为: 110.41.184.250:8080
   - 保留其他请求头和请求体
4. Vite向后端发起真实请求
5. 后端返回响应
6. Vite将响应原样返回给浏览器
```


## 常见配置扩展

1. 路径重写
```javascript
proxy: {
  '/api': {
    target: 'http://110.41.184.250:8080/',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')  // 去掉 /api 前缀
  }
}
// 转发: /api/login → http://110.41.184.250:8080/login
```
2. WebSocket 代理
```javascript
proxy: {
  '/api': {
    target: 'http://110.41.184.250:8080/',
    changeOrigin: true,
    ws: true  // 代理WebSocket
  }
}
```
3. 更精确的匹配
```javascript
proxy: {
  // 只代理API请求
  '/api': {
    target: 'http://api.server.com',
    changeOrigin: true
  },
  // 静态资源不走代理
  '^/assets/': {
    target: 'http://static.server.com',
    changeOrigin: true
  }
}
```


## 注意事项 
1. 仅限开发环境：Vite 代理只在开发服务器运行时有效，生产环境需要 Nginx/Apache 反向代理
2. 代理是透明的：浏览器完全感知不到代理的存在，所有 Cookie、Session 都正常工作
3. 调试技巧：在浏览器 Network 面板中，看到的是对 localhost:82的请求，但实际数据来自后端服务器
4. 性能影响：所有请求都经过 Vite 服务器中转，可能会有轻微延迟，但避免了 CORS 的复杂性