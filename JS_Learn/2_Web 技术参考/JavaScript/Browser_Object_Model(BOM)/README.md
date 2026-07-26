# BOM（浏览器对象模型）

## 什么是 BOM？

BOM 是 **Browser Object Model**（浏览器对象模型）的缩写，提供与浏览器交互的 API。

### 核心特点

| 特性 | 说明 |
|------|------|
| **非官方标准** | 由浏览器厂商实践形成，现由 WHATWG 维护 |
| **浏览器相关** | 操作浏览器窗口、导航、存储等 |
| **全局对象** | `window` 是 BOM 的顶层对象 |

---

## 历史与现状

### 提出者

BOM 由 **Netscape 公司**在开发 Netscape Navigator 2.0 浏览器时率先实现，随后被其他浏览器厂商（如 Internet Explorer）模仿和扩展。

### 标准化进程

```
Netscape 2.0 (1995) → 浏览器厂商各自实现 → W3C 尝试标准化 → WHATWG HTML Living Standard
```

- W3C 曾尝试将 BOM 内容纳入 DOM Level 0 规范，但未形成正式标准
- 目前由 **WHATWG 社区**维护的 HTML Living Standard 覆盖核心功能

---

## JavaScript 运行时环境

```
JavaScript 运行时环境
│
├── ECMAScript (核心语法)
│   └── 变量、函数、类、Promise 等
│
└── Web API (由浏览器提供)
    │
    ├── DOM (文档操作)
    │   └── document、getElementById 等
    │
    └── BOM (浏览器操作)
        └── window、location、alert 等
```

---

## 核心 BOM 对象详解

### 1. window 对象

`window` 是 BOM 的顶层对象，全局变量和函数都是它的属性。

#### 常用属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `window.innerWidth` | 浏览器窗口内部宽度（不含工具栏） | `window.innerWidth` |
| `window.innerHeight` | 浏览器窗口内部高度 | `window.innerHeight` |
| `window.outerWidth` | 浏览器窗口外部宽度 | `window.outerWidth` |
| `window.outerHeight` | 浏览器窗口外部高度 | `window.outerHeight` |
| `window.screenX` | 窗口相对于屏幕的 X 坐标 | `window.screenX` |
| `window.screenY` | 窗口相对于屏幕的 Y 坐标 | `window.screenY` |
| `window.name` | 窗口名称 | `window.name` |
| `window.opener` | 打开当前窗口的窗口引用 | `window.opener` |

#### 常用方法

```javascript
// 窗口操作
window.open('https://example.com', '_blank');  // 打开新窗口
window.close();  // 关闭当前窗口
window.focus();  // 聚焦窗口
window.blur();   // 失去焦点

// 定时器
const timerId = setTimeout(() => {
    console.log('2秒后执行');
}, 2000);

const intervalId = setInterval(() => {
    console.log('每秒执行');
}, 1000);

clearTimeout(timerId);    // 清除定时器
clearInterval(intervalId); // 清除间隔定时器

// 对话框
alert('提示信息');
const result = confirm('确定吗？');  // true/false
const input = prompt('请输入：', '默认值');  // 用户输入值或null

// 滚动
window.scrollTo(0, 100);  // 滚动到指定位置
window.scrollBy(0, 50);   // 滚动指定距离
window.scrollTo({
    top: 100,
    left: 0,
    behavior: 'smooth'    // 平滑滚动
});

// 剪贴板
await navigator.clipboard.writeText('复制内容');
const text = await navigator.clipboard.readText();
```

#### 窗口尺寸相关示例

```javascript
// 获取窗口尺寸
console.log('窗口宽度:', window.innerWidth);
console.log('窗口高度:', window.innerHeight);

// 响应窗口大小变化
window.addEventListener('resize', () => {
    console.log('新宽度:', window.innerWidth);
    console.log('新高度:', window.innerHeight);
});
```

---

### 2. location 对象

`location` 对象包含当前 URL 信息。

#### 属性详解

```javascript
// 当前 URL: https://example.com:8080/path/page.html?name=John#section1

location.href          // 完整 URL
location.protocol      // 协议: "https:"
location.host          // 主机名+端口: "example.com:8080"
location.hostname      // 主机名: "example.com"
location.port          // 端口: "8080"
location.pathname      // 路径: "/path/page.html"
location.search        // 查询字符串: "?name=John"
location.hash          // 哈希值: "#section1"
location.origin       // 源: "https://example.com:8080"
```

#### 常用方法

```javascript
// 页面导航
location.assign('https://example.com');  // 加载新页面（可后退）
location.replace('https://example.com'); // 替换当前页面（不可后退）
location.reload();                        // 刷新页面
location.reload(true);                    // 强制刷新（跳过缓存）

// 解析查询参数
const params = new URLSearchParams(location.search);
const name = params.get('name');  // "John"
const age = params.get('age');    // null

// 修改 URL（不刷新页面）
history.pushState({ page: 1 }, 'Page 1', '/page1');
history.replaceState({ page: 2 }, 'Page 2', '/page2');
```

#### 实用工具函数

```javascript
// 获取当前页面的完整查询参数对象
function getQueryParams() {
    const params = new URLSearchParams(location.search);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

// 检查是否是 HTTPS
function isHTTPS() {
    return location.protocol === 'https:';
}

// 获取当前页面路径
function getCurrentPath() {
    return location.pathname;
}
```

---

### 3. navigator 对象

`navigator` 对象包含浏览器和系统信息。

#### 常用属性

```javascript
// 浏览器信息
navigator.userAgent      // 用户代理字符串
navigator.appName       // 浏览器名称
navigator.appVersion    // 浏览器版本
navigator.platform      // 操作系统平台
navigator.language      // 浏览器语言
navigator.languages     // 浏览器语言列表

// 功能检测
navigator.cookieEnabled       // 是否启用 Cookie
navigator.onLine             // 是否在线
navigator.doNotTrack         // Do Not Track 设置
navigator.maxTouchPoints     // 最大触摸点数

// 硬件信息
navigator.hardwareConcurrency  // CPU 核心数
navigator.deviceMemory        // 设备内存（GB）
navigator.gpu                  // GPU 信息
```

#### 实用功能检测

```javascript
// 检测浏览器类型
function detectBrowser() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Edg/')) return 'Edge';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
    
    return 'Unknown';
}

// 检测是否为移动设备
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 检测是否支持某个 API
function checkSupport() {
    return {
        serviceWorker: 'serviceWorker' in navigator,
        geolocation: 'geolocation' in navigator,
        notifications: 'Notification' in window,
        webGL: (() => {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && 
                    (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch (e) {
                return false;
            }
        })()
    };
}
```

---

### 4. history 对象

`history` 对象提供浏览器历史记录操作。

#### 常用方法

```javascript
// 导航控制
history.back();      // 后退一页
history.forward();   // 前进一页
history.go(-2);      // 后退 2 页
history.go(1);       // 前进 1 页

// 历史记录操作（HTML5 History API）
history.pushState(
    { page: 'home' },  // 状态对象
    'Home',            // 标题（大多数浏览器忽略）
    '/home'            // URL
);

history.replaceState(
    { page: 'about' },
    'About',
    '/about'
);

// 监听历史变化
window.addEventListener('popstate', (event) => {
    console.log('历史变化:', event.state);
});

// 监听 PushState/ReplaceState
window.addEventListener('popstate', handleRouteChange);
```

#### SPA 路由示例

```javascript
class SimpleRouter {
    constructor() {
        this.routes = {};
        window.addEventListener('popstate', () => this.resolve());
    }
    
    // 注册路由
    addRoute(path, callback) {
        this.routes[path] = callback;
        return this;
    }
    
    // 导航
    navigate(path) {
        history.pushState({ path }, '', path);
        this.resolve();
    }
    
    // 解析当前路由
    resolve() {
        const path = location.pathname;
        const callback = this.routes[path];
        if (callback) {
            callback();
        }
    }
}

// 使用
const router = new SimpleRouter();
router
    .addRoute('/', () => console.log('首页'))
    .addRoute('/about', () => console.log('关于'))
    .addRoute('/contact', () => console.log('联系我们'));

// 导航
router.navigate('/about');
```

---

### 5. screen 对象

`screen` 对象包含屏幕信息。

```javascript
// 屏幕尺寸
screen.width        // 屏幕宽度
screen.height       // 屏幕高度
screen.availWidth   // 可用宽度（不含任务栏）
screen.availHeight  // 可用高度

// 屏幕属性
screen.colorDepth   // 颜色深度
screen.pixelDepth   // 像素深度
screen.orientation  // 屏幕方向

// 示例：获取屏幕信息
function getScreenInfo() {
    return {
        width: screen.width,
        height: screen.height,
        availableWidth: screen.availWidth,
        availableHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth
    };
}
```

---

### 6. frame 对象

```javascript
// 获取 iframe
const iframe = document.getElementById('myFrame');
const iframeWindow = iframe.contentWindow;  // iframe 的 window
const iframeDoc = iframe.contentDocument;   // iframe 的 document

// 跨域限制
// 只有同源才能访问 iframe 的内容
try {
    const iframeContent = iframe.contentDocument.body.innerHTML;
} catch (e) {
    console.log('跨域限制，无法访问');
}
```

---

## 重要定时器详解

### setTimeout / clearTimeout

```javascript
// 基本用法
const timerId = setTimeout(callback, delay, arg1, arg2);

// 示例
setTimeout(() => {
    console.log('2秒后执行');
}, 2000);

// 传递参数
setTimeout((name, age) => {
    console.log(`${name} is ${age}`);
}, 1000, 'John', 25);

// 清除定时器
clearTimeout(timerId);

// 实现防抖函数
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
```

### setInterval / clearInterval

```javascript
// 基本用法
const intervalId = setInterval(callback, interval, arg1, arg2);

// 示例：每秒更新时间
const timeElement = document.getElementById('time');
const intervalId = setInterval(() => {
    timeElement.textContent = new Date().toLocaleTimeString();
}, 1000);

// 清除间隔定时器
clearInterval(intervalId);

// 实现节流函数
function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// requestAnimationFrame 替代 setInterval（更流畅）
function animate() {
    // 动画逻辑
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

---

## 本地存储

### localStorage

```javascript
// 存储数据（永久）
localStorage.setItem('user', JSON.stringify({ name: 'John', age: 25 }));
localStorage.setItem('token', 'abc123');

// 读取数据
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

// 删除数据
localStorage.removeItem('token');

// 清空所有
localStorage.clear();

// 获取所有键
const keys = Object.keys(localStorage);
```

### sessionStorage

```javascript
// 会话存储（关闭标签页后清除）
sessionStorage.setItem('tempData', 'value');
const tempData = sessionStorage.getItem('tempData');
sessionStorage.removeItem('tempData');
sessionStorage.clear();
```

### Cookie

```javascript
// 设置 Cookie
document.cookie = 'username=John; expires=Fri, 31 Dec 2026 23:59:59 GMT; path=/';
document.cookie = 'theme=dark; expires=Fri, 31 Dec 2026 23:59:59 GMT; path=/; secure';

// 读取 Cookie
const cookies = document.cookie;

// 删除 Cookie（设置过期时间）
document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

// Cookie 工具函数
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const [key, val] = v.split('=');
        return key === name ? decodeURIComponent(val) : r;
    }, '');
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}
```

---

## 窗口操作

### 打开新窗口

```javascript
// 基本用法
const newWindow = window.open(
    'https://example.com',  // URL
    '_blank',               // 目标
    'width=400,height=300'  // 特性
);

// 检查弹窗是否被阻止
if (newWindow === null || newWindow.closed) {
    console.log('弹窗被浏览器阻止');
}
```

### 窗口消息通信

```javascript
// 发送消息
const otherWindow = window.open('https://example.com');
otherWindow.postMessage('Hello!', 'https://example.com');

// 接收消息
window.addEventListener('message', (event) => {
    // 验证来源
    if (event.origin !== 'https://example.com') return;
    
    console.log('收到消息:', event.data);
});
```

---

## 事件监听

### 常用事件

```javascript
// 页面加载
window.addEventListener('load', () => {
    console.log('页面完全加载（包括图片、样式等）');
});

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 加载完成（不包括图片等）');
});

// 页面卸载
window.addEventListener('beforeunload', (event) => {
    // 提示用户离开
    event.returnValue = '确定要离开吗？';
});

// 页面可见性变化
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('页面不可见');
    } else {
        console.log('页面可见');
    }
});

// 窗口大小变化
window.addEventListener('resize', () => {
    console.log('窗口大小变化:', window.innerWidth, window.innerHeight);
});

// 滚动
window.addEventListener('scroll', () => {
    console.log('滚动位置:', window.scrollY);
});

// 在线/离线状态
window.addEventListener('online', () => console.log('网络已连接'));
window.addEventListener('offline', () => console.log('网络已断开'));

// 全局错误处理
window.addEventListener('error', (event) => {
    console.error('错误:', event.message);
});

// 未处理的 Promise 拒绝
window.addEventListener('unhandledrejection', (event) => {
    console.error('未处理的 Promise 拒绝:', event.reason);
});
```

---

## 最佳实践

### 1. 性能优化

```javascript
// 防抖（搜索输入）
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce((e) => {
    console.log('搜索:', e.target.value);
}, 300));

// 节流（滚动处理）
window.addEventListener('scroll', throttle(() => {
    console.log('滚动位置:', window.scrollY);
}, 100));

// 使用 requestAnimationFrame 做动画
function animate() {
    // 更新动画
    requestAnimationFrame(animate);
}
```

### 2. 内存管理

```javascript
// 及时清理定时器
let intervalId = setInterval(() => {
    // 定期任务
}, 1000);

// 不再需要时清理
clearInterval(intervalId);

// 移除事件监听
function handleResize() {
    console.log('resize');
}
window.addEventListener('resize', handleResize);

// 组件销毁时移除
window.removeEventListener('resize', handleResize);
```

### 3. 安全注意事项

```javascript
// 避免 XSS 攻击
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// 使用 CSP（内容安全策略）
// 在 HTML 中添加：
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'">

// 谨慎使用 eval
// 避免：
eval(userInput);

// 安全替代：
JSON.parse(userInput);
```

### 4. 跨浏览器兼容

```javascript
// 特性检测而非浏览器检测
if ('serviceWorker' in navigator) {
    // 支持 Service Worker
}

// 使用 polyfill
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement) {
        return this.indexOf(searchElement) !== -1;
    };
}

// 使用 Modernizr 或类似工具检测功能支持
```

---

## 常见问题

### Q: BOM 和 DOM 的区别？

| 方面 | BOM | DOM |
|------|-----|-----|
| 对象 | window, navigator, location 等 | document, element 等 |
| 功能 | 浏览器操作 | 文档操作 |
| 标准 | WHATWG HTML | W3C DOM |

### Q: 如何检测浏览器是否在线？

```javascript
if (navigator.onLine) {
    console.log('在线');
} else {
    console.log('离线');
}

window.addEventListener('online', () => console.log('已连接'));
window.addEventListener('offline', () => console.log('已断开'));
```

### Q: 如何实现页面间数据传递？

```javascript
// 方法 1: URL 参数
location.search = '?name=John';

// 方法 2: localStorage
localStorage.setItem('sharedData', 'value');

// 方法 3: Broadcast Channel（同源）
const channel = new BroadcastChannel('my_channel');
channel.postMessage('Hello');
channel.onmessage = (event) => console.log(event.data);

// 方法 4: Service Worker
navigator.serviceWorker.controller.postMessage('Hello');
```

---

## 参考资源

- [MDN Web Docs - BOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)
- [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)
- [Can I Use](https://caniuse.com/)

---

**最后更新**: 2026年7月26日
