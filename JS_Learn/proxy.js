// manual-proxy.js
const http = require("http");
const https = require("https");

class SimpleProxy {
  constructor(target) {
    this.target = new URL(target);
  }

  // 处理客户端请求
  async handleRequest(clientReq, clientRes) {
    const options = {
      hostname: this.target.hostname,
      port: this.target.port,
      path: clientReq.url,
      method: clientReq.method,
      headers: { ...clientReq.headers },
    };

    // 修改 Host 头（模拟 changeOrigin: true）
    options.headers.host = this.target.host;

    // 选择 HTTP 或 HTTPS
    const transport = this.target.protocol === "https:" ? https : http;

    // 创建到目标服务器的请求
    const proxyReq = transport.request(options, proxyRes => {
      // 将目标服务器的响应头复制给客户端
      clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);

      // 管道传输响应体
      proxyRes.pipe(clientRes);
    });

    // 错误处理
    proxyReq.on("error", err => {
      console.error("代理请求失败:", err);
      clientRes.writeHead(500);
      clientRes.end("Proxy Error");
    });

    // 管道传输请求体
    clientReq.pipe(proxyReq);
  }
}

// 使用示例
const proxy = new SimpleProxy("http://110.41.184.250:8081");

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api")) {
    proxy.handleRequest(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("手动实现代理运行在 http://localhost:3000");
});
