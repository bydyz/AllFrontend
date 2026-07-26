# 深度解析: async

## Step 1: 介绍名词代表的意义

### 1.1 一句话定义
async 是 JavaScript 中用于声明异步函数的关键字，使异步代码以同步方式书写。

### 1.2 详细定义

- **概念**：async 是 ES2017 引入的声明异步函数的语法糖
- **场景**：处理 Promise 链式调用的异步操作
- **解决问题**：Promise then/catch 链式调用造成的"回调地狱"，使异步代码更易读、更像同步代码
- **所属领域**：JavaScript 异步编程

### 1.3 概念卡片

```
┌─────────────────────────────────────────┐
│  概念: async                            │
├─────────────────────────────────────────┤
│  一句话定义: 异步函数声明关键字          │
│  所属领域: JavaScript                   │
│  解决问题: 回调地狱、代码可读性差        │
│  引入版本: ES2017                       │
└─────────────────────────────────────────┘
```

## Step 2: 介绍其来由

### 2.1 背景与起源

在 async 出现之前，JavaScript 处理异步操作主要依靠：

1. **回调函数**：最早的方式，但容易形成"回调地狱"
   ```javascript
   getData(function(a) {
     getMoreData(a, function(b) {
       getEvenMoreData(b, function(c) {
         // 嵌套越来越深
       });
     });
   });
   ```

2. **Promise**：ES6 引入，改进但仍有链式调用问题
   ```javascript
   getData()
     .then(a => getMoreData(a))
     .then(b => getEvenMoreData(b))
     .then(c => console.log(c));
   ```

3. **async/await**：ES2017 引入，让异步代码像同步代码一样书写
   ```javascript
   const a = await getData();
   const b = await getMoreData(a);
   const c = await getEvenMoreData(b);
   console.log(c);
   ```

### 2.2 演进历程

| 年份 | 版本 | 异步解决方案 |
|------|------|-------------|
| 2009 | ES5 | 回调函数 |
| 2015 | ES6 | Promise |
| 2017 | ES2017 | async/await |

### 2.3 创造者的设计考量

1. **语法简洁**：用同步语法写异步代码
2. **错误处理**：支持 try/catch
3. **调试友好**：堆栈信息更清晰
4. **向后兼容**：基于 Promise 实现

## Step 3: 介绍其所能实现的效果

### 3.1 核心功能

1. **声明异步函数**
   ```javascript
   async function fetchData() {
     const res = await fetch('/api/data');
     return res.json();
   }
   ```

2. **自动返回 Promise**：即使没有 return，也会返回 Promise
   ```javascript
   async function test() {
     // 没有 return
   }
   test() instanceof Promise // true
   ```

3. **自动捕获错误**：函数内的异常会自动成为 Promise 的 reject
   ```javascript
   async function test() {
     throw new Error('error');
   }
   test().catch(e => console.log(e.message)); // 'error'
   ```

### 3.2 使用效果对比

| 场景 | Promise | async/await |
|------|---------|-------------|
| 顺序执行 | then 链式 | await 顺序 |
| 并发执行 | Promise.all | await Promise.all |
| 错误处理 | catch | try/catch |
| 代码可读性 | 一般 | 优秀 |

### 3.3 适用场景

- 网络请求（fetch、axios）
- 文件操作（Node.js）
- 数据库查询
- 定时器操作
- 任何异步操作序列

### 3.4 优缺点分析

**优点**：
- 代码可读性强，像同步代码
- 错误处理使用 try/catch
- 调试堆栈更清晰
- 易于理解和维护

**缺点**：
- 需要等待才能获取结果（阻塞）
- 并发需要使用 Promise.all
- 浏览器兼容性（现代浏览器支持）

## Step 4: 介绍大体实现过程

### 4.1 整体流程涉及的角色

1. **JavaScript 引擎**：解释执行代码
2. **Promise**：异步操作的基础
3. **生成器函数 (Generator)**：async 的底层实现
4. **微任务队列**：await 的执行调度

### 4.2 核心实现原理

async 函数的实现基于 **生成器函数 + 自动执行器**：

```javascript
// async 函数
async function example() {
  const a = await Promise1();
  const b = await Promise2(a);
  return b;
}

// Babel 编译后的原理（简化版）
function example() {
  return regeneratorRuntime.mark(function _callee($this) {
    var a, b;
    return regeneratorRuntime.wrap(function _context($outer) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 2;
            return Promise1();
          case 2:
            a = _context.sent;
            _context.next = 4;
            return Promise2(a);
          case 4:
            b = _context.sent;
            return _context.abrupt('return', b);
          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', Promise.reject(_context.t0));
          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })();
}
```

### 4.3 await 的执行机制

1. **暂停执行**：await 会暂停函数执行
2. **等待 Promise**：等待 Promise 进入 resolved 状态
3. **放入微任务**：resolved 后继续执行的任务放入微任务队列
4. **恢复执行**：从暂停处继续执行

```javascript
async function demo() {
  console.log(1);
  const a = await fetch('/api'); // 暂停
  console.log(2); // fetch 完成后执行
  return a;
}

// 执行顺序：
// 1. console.log(1)
// 2. fetch 发起请求，函数暂停
// 3. fetch 完成，console.log(2) 放入微任务
// 4. 执行微任务，console.log(2)
```

### 4.4 关键API说明

| API | 说明 |
|-----|------|
| `async function` | 声明异步函数 |
| `await` | 等待 Promise 完成 |
| `Promise.resolve()` | 立即 resolved 的 Promise |
| `Promise.reject()` | 立即 rejected 的 Promise |
| `Promise.all()` | 并行等待多个 Promise |

### 4.5 错误处理示例

```javascript
// 正确的错误处理
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('请求失败:', error);
    return null;
  }
}

// 并发请求
async function fetchMultiple() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  return { users, posts };
}
```