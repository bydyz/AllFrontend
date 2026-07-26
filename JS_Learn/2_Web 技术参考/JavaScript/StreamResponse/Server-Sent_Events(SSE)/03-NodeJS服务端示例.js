/**
 * Server-Sent Events (SSE) Node.js 服务端示例
 *
 * SSE 是一种基于 HTTP 的服务器推送技术，允许服务器主动向客户端发送实时更新。
 * 与 WebSocket 不同，SSE 是单向通信（只能服务器 -> 客户端），但更简单且基于 HTTP。
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * 创建 HTTP 服务器
 * @param {http.IncomingMessage} req - 客户端请求对象
 * @param {http.ServerResponse} res - 服务器响应对象
 */
const server = http.createServer((req, res) => {
  // ============================================================
  // 路由: /sse - SSE 端点
  // ============================================================
  if (req.url === '/sse') {
    // 设置 SSE 所需的 HTTP 响应头
    // Content-Type 必须是 text/event-stream，这是 SSE 的标准 MIME 类型
    // Cache-Control: no-cache 防止浏览器缓存响应
    // Connection: keep-alive 保持连接打开，允许持续推送数据
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',  // SSE 必须使用此 Content-Type
      'Cache-Control': 'no-cache',           // 禁用缓存，确保实时性
      'Connection': 'keep-alive',            // 保持长连接不断开
      'Access-Control-Allow-Origin': '*'    // 允许跨域访问（生产环境应限制具体域名）
    });

    console.log('Client connected - 客户端已连接');

    // ============================================================
    // 定时发送消息
    // ============================================================
    let counter = 0;

    // 每 2 秒发送一条消息
    const interval = setInterval(() => {
      counter++;

      // 每 3 条消息切换一次事件类型：
      // 3 的倍数 -> notification（通知事件）
      // 其他    -> update（更新事件）
      const eventType = counter % 3 === 0 ? 'notification' : 'update';

      // 构建要发送的数据对象
      const data = JSON.stringify({
        message: `Message #${counter}`,
        timestamp: new Date().toISOString(),
        type: eventType
      });

      // ============================================================
      // SSE 消息格式说明：
      // 每一行格式为: 字段名: 值\n
      // 必须以空行（\n\n）结束一个事件
      // ============================================================

      // id: 事件唯一标识符，客户端可用于追踪或重连后恢复
      res.write(`id: ${counter}\n`);

      // event: 自定义事件名称，客户端可以通过 addEventListener 监听特定事件
      res.write(`event: ${eventType}\n`);

      // data: 实际传输的数据内容，可以是任意字符串（通常是 JSON）
      res.write(`data: ${data}\n\n`);

      // ============================================================
      // 结束条件：发送 10 条消息后关闭流
      // ============================================================
      if (counter >= 10) {
        // 发送结束消息
        res.write('data: {"message": "Stream finished"}\n\n');

        // 清除定时器，停止发送
        clearInterval(interval);

        // 关闭响应连接
        res.end();
      }
    }, 2000);  // 2 秒间隔

    // ============================================================
    // 处理客户端断开连接
    // 当客户端关闭连接（刷新页面、关闭标签等）时触发
    // ============================================================
    req.on('close', () => {
      clearInterval(interval);  // 清理定时器，避免内存泄漏
      console.log('Client disconnected - 客户端已断开连接');
    });

  // ============================================================
  // 路由: / - 主页，返回客户端示例 HTML
  // ============================================================
  } else if (req.url === '/') {
    // 拼接当前目录下的 HTML 文件路径
    const htmlPath = path.join(__dirname, '02-客户端示例代码.html');

    // 读取并返回 HTML 文件
    fs.readFile(htmlPath, (err, data) => {
      if (err) {
        // 文件读取失败
        res.writeHead(500);
        res.end('Error loading HTML');
      } else {
        // 成功返回 HTML
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });

  // ============================================================
  // 其他路由: 404 Not Found
  // ============================================================
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// ============================================================
// 启动服务器并监听端口
// ============================================================
server.listen(3000, () => {
  console.log('SSE Server running at http://localhost:3000/');
  console.log('SSE endpoint: http://localhost:3000/sse');
});

/**
 * SSE 消息格式详解:
 *
 * 字段          | 说明
 * ------------- | ----------------------------------------
 * id            | 事件唯一标识符，可用于 lastEventId
 * event         | 自定义事件名，客户端可按名称监听
 * data          | 事件数据内容，以空行结束
 * retry         | 重连时间（毫秒），客户端自动重连
 *
 * 示例:
 * id: 1\n                    <- 事件 ID
 * event: update\n            <- 事件类型
 * data: {"msg":"hello"}\n\n <- 数据 + 结束标记
 *
 * 客户端监听方式:
 * source.addEventListener('update', (e) => { ... })
 */