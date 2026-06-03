# Node.js 内置模块总览

> 基于 Node.js LTS 版本整理，按功能类别分组。每个模块均为 `require('xxx')` 或 `import('xxx')` 直接引入，无需安装。

---

## 一、文件系统与路径

### 1. `fs`（File System）
文件系统操作，提供同步、异步、Promise 三套 API。
```javascript
const fs = require('fs');
fs.readFileSync('/path');          // 同步读
fs.readFile('/path', cb);          // 回调异步
fs.promises.readFile('/path');     // Promise 异步
```

### 2. `fs/promises`
`fs` 的 Promise 版本，推荐现代代码使用。
```javascript
const fsp = require('fs/promises');
await fsp.readFile('/path', 'utf-8');
```

### 3. `path`
跨平台路径字符串处理（拼接、解析、规范化）。
```javascript
path.join('a', 'b', 'c.txt');    // a/b/c.txt
path.extname('a.txt');           // .txt
path.resolve('a', 'b');          // 绝对路径
```

### 4. `os`
操作系统信息（平台、CPU、内存、网络接口等）。
```javascript
os.platform();    // 'win32' / 'linux' / 'darwin'
os.cpus();        // CPU 信息
os.totalmem();    // 总内存
```

### 5. `url`
URL 解析与格式化（遵循 WHATWG URL 标准）。
```javascript
new URL('https://a.com/b?x=1#h');
```

---

## 二、网络通信

### 6. `http`
HTTP 服务器与客户端。
```javascript
http.createServer((req, res) => res.end('hi')).listen(3000);
```

### 7. `https`
HTTPS 版本的 `http`，基于 TLS。

### 8. `http2`
HTTP/2 协议支持，支持多路复用、头部压缩、Server Push。

### 9. `net`
底层 TCP / IPC（命名管道、Unix 域套接字）通信。
```javascript
net.createServer(socket => socket.end('hello')).listen(5000);
```

### 10. `dgram`
UDP 数据报通信。
```javascript
const udp = dgram.createSocket('udp4');
udp.bind(41234);
```

### 11. `dns`
DNS 查询（解析域名、反向解析）。
```javascript
dns.lookup('example.com', (err, addr) => {});
dns.resolve4('example.com', (err, addrs) => {});
```

### 12. `tls` / `ssl`
TLS/SSL 加密通信，构建 HTTPS、安全套接字。

---

## 三、二进制数据

### 13. `buffer`
固定长度的二进制数据缓冲区，Node 特有全局类。
```javascript
Buffer.from('hello');
Buffer.alloc(10);
Buffer.concat([a, b]);
```

### 14. `string_decoder`
将 Buffer 流解码为字符串，避免多字节字符被截断。

### 15. `TypedArray` / `DataView`（来自 ES，非 Node 独有）
`Uint8Array`、`Float32Array` 等底层二进制数组。

---

## 四、事件与异步

### 16. `events`
事件触发器，Node 事件模型基石。
```javascript
const ee = new EventEmitter();
ee.on('data', d => console.log(d));
ee.emit('data', 1);
```

### 17. `async_hooks`
异步资源追踪（追踪 Promise、setTimeout、回调的完整生命周期），用于 APM、链路追踪。

---

## 五、流（Stream）

### 18. `stream`
流式数据处理，四种类型：`Readable`、`Writable`、`Duplex`、`Transform`。
```javascript
stream.pipeline(src, transform, dest, err => {});
process.stdin.pipe(process.stdout);
```

---

## 六、进程与子进程

### 19. `process`（全局对象，无需 require）
当前进程信息与控制（环境变量、参数、退出、信号）。
```javascript
process.argv;
process.env.NODE_ENV;
process.exit(0);
```

### 20. `child_process`
创建子进程。
```javascript
cp.exec('ls', cb);
cp.spawn('node', ['app.js']);
cp.fork('worker.js');           // 衍生 Node 子进程
```

### 21. `cluster`
多进程集群，利用多核 CPU（基于 `child_process.fork`）。
```javascript
if (cluster.isPrimary) {
    cluster.fork(); cluster.fork();
} else {
    http.createServer(...).listen(8000);
}
```

### 22. `worker_threads`
工作线程（真正的线程，共享内存 via `SharedArrayBuffer`），适合 CPU 密集任务。

---

## 七、模块系统

### 23. `module`
模块加载系统（`require`、`exports`、缓存机制）。

### 24. `require`（全局函数）
CommonJS 模块加载。

### 25. `vm`
V8 虚拟机沙箱，编译运行代码字符串。
```javascript
vm.runInNewContext('x + 1', { x: 2 });  // 3
```

---

## 八、工具与算法

### 26. `util`
工具函数集合。
```javascript
util.promisify(fs.readFile);    // 回调转 Promise
util.format('%s:%d', 'a', 1);   // 格式化
util.inspect(obj);              // 调试输出
util.types.isPromise(x);        // 类型判断
```

### 27. `crypto`
加密、哈希、签名、HMAC、随机数。
```javascript
crypto.createHash('sha256').update('hi').digest('hex');
crypto.randomBytes(16);
crypto.createCipheriv('aes-256-cbc', key, iv);
```

### 28. `querystring`（已弃用，推荐 `URLSearchParams`）
URL 查询字符串解析与序列化。

### 29. `assert`
断言测试，主要用于测试代码。
```javascript
assert.strictEqual(1 + 1, 2);
assert.deepEqual([1], [1]);
```

### 30. `timers`（多数为全局）
`setTimeout`、`setInterval`、`setImmediate`、`promisify(setTimeout)`。

---

## 九、调试与诊断

### 31. `console`（全局）
标准输出、错误输出、格式化打印。

### 32. `perf_hooks`
高精度性能度量（`PerformanceObserver`、`performance.now()`）。

### 33. `trace_events`
底层跟踪事件（Node 内部使用，配合 `--trace-events-enabled` 启动参数）。

### 34. `v8`
V8 引擎接口（堆快照、垃圾回收、统计信息）。
```javascript
v8.getHeapStatistics();
v8.writeHeapSnapshot();
```

### 35. `report`
诊断报告（崩溃、性能问题的 JSON 报告）。

### 36. `diagnostics_channel`
诊断通道，发布/订阅式诊断事件（用于 APM 工具）。

---

## 十、错误处理

### 37. `error`（内置 `Error`、`TypeError`、`RangeError` 等）
错误对象体系。Node 额外扩展了 `SystemError`、`AssertionError`、`NodeError`。

---

## 十一、操作系统 API

### 38. `readline`
逐行读取输入流（CLI 交互）。
```javascript
const rl = readline.createInterface({ input: process.stdin });
rl.question('Name? ', a => console.log(a));
```

### 39. `repl`
可嵌入的交互式解释器（自己实现一个 Node REPL）。

### 40. `tty`
终端 TTY 检测（`process.stdout.isTTY`）。

### 41. `string_decoder`（见二进制分组）

### 42. `punycode`（已弃用）
Unicode 域名编码（Punycode），建议使用 `url.domainToASCII`。

---

## 十二、国际化与编码

### 43. `Intl`（全局）
国际化 API（日期、数字、复数、排序格式化）。

### 44. `String` / `TextEncoder` / `TextDecoder`（Web 全局）
字符串与字节序列相互转换（WHATWG 标准）。

---

## 十三、测试（Node ≥ 18）

### 45. `node:test`
内置测试运行器，无需安装 Jest / Mocha。
```javascript
const test = require('node:test');
test('add', t => {
    t.assert.strictEqual(1 + 1, 2);
});
```

---

## 十四、实验性与新增模块

### 46. `fetch`（全局，Node ≥ 18）
内置 Fetch API，基于 `undici`。

### 47. `undici`
现代 HTTP/1.1 + HTTP/2 客户端（`fetch` 底层实现）。

### 48. `test/reporters`
测试报告器（`tap`、`spec`、`junit`）。

### 49. `sqlite`（Node ≥ 22 内置）
内置 SQLite 数据库（实验性稳定中）。

---

## 十五、其他

| 模块 | 简介 |
|------|------|
| `_stream_wrap` | 流底层封装（不推荐直接使用） |
| `sys` | `util` 的旧名（已弃用） |
| `wasi` | WebAssembly 系统接口，让 WASM 访问 OS 资源 |
| `inspector` | V8 Inspector 协议，支持 DevTools 调试 |

---

## 速查总表（按类别）

| 类别 | 模块 |
|------|------|
| **文件系统** | `fs`, `fs/promises`, `path`, `os`, `url` |
| **网络** | `http`, `https`, `http2`, `net`, `dgram`, `dns`, `tls` |
| **二进制** | `buffer`, `string_decoder` |
| **事件异步** | `events`, `async_hooks` |
| **流** | `stream` |
| **进程** | `process`, `child_process`, `cluster`, `worker_threads` |
| **模块系统** | `module`, `vm` |
| **工具** | `util`, `crypto`, `querystring`, `assert`, `timers` |
| **调试** | `console`, `perf_hooks`, `v8`, `report`, `diagnostics_channel`, `trace_events` |
| **OS API** | `readline`, `repl`, `tty` |
| **国际化** | `Intl`, `TextEncoder`, `TextDecoder` |
| **测试** | `node:test` |
| **新特性** | `fetch`, `undici`, `sqlite` |

---

## 学习建议

1. **优先掌握**：`fs`、`path`、`http`、`events`、`stream`、`process`、`util`、`buffer`
2. **网络方向深入**：`net`、`http2`、`tls`、`dgram`、`dns`
3. **性能与诊断**：`perf_hooks`、`v8`、`async_hooks`、`cluster`、`worker_threads`
4. **现代 API**：`fs/promises`、`node:test`、`fetch`、`undici`
5. **配合框架**：Express/Koa 基于 `http`；Fastify 优化 `http`；NestJS 抽象整个流程

---

## 官方文档

完整 API 请参考：[https://nodejs.org/api/](https://nodejs.org/api/)
