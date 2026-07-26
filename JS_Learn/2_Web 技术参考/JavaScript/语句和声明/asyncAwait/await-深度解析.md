# 深度解析: await

## Step 1: 介绍名词代表的意义

### 1.1 一句话定义
await 是 JavaScript 中用于等待 Promise 完成并获取其结果的运算符。

### 1.2 详细定义

- **概念**：await 是 async 函数内的暂停运算符，用于等待 Promise 解决
- **场景**：在 async 函数内部等待异步操作完成
- **解决问题**：让异步代码以同步顺序执行，避免 Promise 链式调用
- **所属领域**：JavaScript 异步编程
- **配合使用**：必须用于 async 函数内部

### 1.3 概念卡片

```
┌─────────────────────────────────────────┐
│  概念: await                            │
├─────────────────────────────────────────┤
│  一句话定义: Promise 等待运算符          │
│  所属领域: JavaScript                   │
│  解决问题: 异步代码同步书写              │
│  配合使用: 必须在 async 函数中使用       │
└─────────────────────────────────────────┘
```

## Step 2: 介绍其来由

### 2.1 背景与起源

await 是配合 async/await 语法一起引入的：

- **引入时间**：ES2017 (ES8)
- **设计目标**：让异步代码更像同步代码
- **配合语法**：必须与 async 函数配合使用

### 2.2 演进历程

在 await 出现前，异步等待需要：

1. **回调函数**：
   ```javascript
   getData(function(result) {
     console.log(result); // 需要在回调中获取结果
   });
   ```

2. **Promise then**：
   ```javascript
   getData().then(result => {
     console.log(result); // 在 then 中获取
   });
   ```

3. **await**：
   ```javascript
   const result = await getData();
   console.log(result); // 直接获取，像同步代码
   ```

### 2.3 创造者的设计考量

1. **暂停而非阻塞**：暂停函数执行，但不阻塞主线程
2. **微任务调度**：基于微任务队列，实现非阻塞
3. **错误传播**：自动将 Promise 的 reject 转为异常
4. **返回值**：直接获取 Promise 的 resolved 值

## Step 3: 介绍其所能实现的效果

### 3.1 核心功能

1. **等待 Promise**
   ```javascript
   const result = await fetch('/api/data');
   // fetch 完成前，函数暂停执行
   // fetch 完成后，result 获得 resolved 值
   ```

2. **非值等待**
   ```javascript
   await saveToDatabase(data);
   // 等待操作完成，不需要返回值
   ```

3. **等待数组**
   ```javascript
   const results = await Promise.all([
     fetch('/api/1'),
     fetch('/api/2'),
     fetch('/api/3')
   ]);
   ```

### 3.2 使用效果对比

| 场景 | Promise | await |
|------|---------|-------|
| 等待单个 | `then` | 直接赋值 |
| 并发等待 | `Promise.all` | `await Promise.all` |
| 错误处理 | `catch` | `try/catch` |
| 顺序执行 | 链式 then | 顺序 await |

### 3.3 适用场景

- 等待网络请求完成
- 等待文件读取
- 等待数据库查询
- 等待计算完成
- 等待多个并发任务

### 3.4 优缺点分析

**优点**：
- 代码简洁，像同步代码
- 错误处理使用 try/catch
- 调试堆栈清晰
- 逻辑顺序清晰

**缺点**：
- 必须配合 async 使用
- 不等待会立即返回 Promise 对象
- 并发需要 Promise.all
- 浏览器兼容性（现代浏览器）

## Step 4: 介绍大体实现过程

### 4.1 整体流程涉及的角色

1. **JavaScript 引擎**：执行代码
2. **Promise**：异步操作基础
3. **微任务队列**：await 的调度
4. **生成器**：函数暂停/恢复

### 4.2 await 的执行机制

```
┌──────────────────────────────────────────────────────────┐
│                    await 执行流程                        │
├──────────────────────────────────────────────────────────┤
│  1. 执行 await 表达式，得到 Promise                       │
│  2. 检查 Promise 状态                                    │
│  3. 如果 resolved：获取值，恢复执行                       │
│  4. 如果 rejected：抛出异常                              │
│  5. 如果 pending：暂停函数，加入微任务队列                │
│  6. Promise resolved 后，从微任务队列恢复执行             │
└──────────────────────────────────────────────────────────┘
```

### 4.3 核心实现原理

await 的实现基于 **状态机 + 微任务**：

```javascript
// 源代码
async function demo() {
  console.log(1);
  const a = await fetch('/api');  // 暂停点
  console.log(2);
  return a;
}

// 编译后的原理（简化）
function demo() {
  return new Promise((resolve, reject) => {
    // Step 1: 执行 console.log(1)
    console.log(1);
    
    // Step 2: 执行 fetch，创建 Promise
    const promise = fetch('/api');
    
    // Step 3: 定义 onFulfilled 回调
    const onFulfilled = (value) => {
      try {
        // 恢复执行，a 获得值
        const a = value;
        console.log(2);
        resolve(a);
      } catch (error) {
        reject(error);
      }
    };
    
    // Step 4: 检查状态
    if (promise.state === 'fulfilled') {
      // 直接执行（同步完成情况）
      onFulfilled(promise.value);
    } else if (promise.state === 'pending') {
      // 等待完成，加入微任务
      promise.then(onFulfilled);
    }
  });
}
```

### 4.4 微任务队列详解

await 的关键是非阻塞：

```javascript
async function demo() {
  console.log('start');
  const res = await fetch('/api');  // 暂停，fetch 异步执行
  console.log('done');              // fetch 完成后执行
  
  console.log('also');             // 立即执行
  return res;
}

// 执行顺序分析：
// 1. console.log('start')  - 立即执行
// 2. fetch('/api')         - 发起异步请求
// 3. 函数暂停，控制权返回
// 4. 其他同步代码执行（如 console.log('also')）
// 5. fetch 完成，'done' 放入微任务队列
// 6. 微任务执行，console.log('done')
```

### 4.5 关键特性说明

| 特性 | 说明 |
|------|------|
| 暂停函数 | await 处暂停执行 |
| 非阻塞 | 不阻塞主线程 |
| 微任务调度 | 恢复执行在微任务中 |
| 值穿透 | 非 Promise 会自动包装 |
| 错误传播 | reject 转为 throw |

### 4.6 实际使用示例

```javascript
// 1. 等待网络请求
async function loadUser() {
  const res = await fetch('/api/user');
  const user = await res.json();
  return user;
}

// 2. 错误处理
async function safeLoad() {
  try {
    const res = await fetch('/api/data');
    return await res.json();
  } catch (e) {
    console.error('加载失败:', e);
    return null;
  }
}

// 3. 并发请求
async function loadMultiple() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  return { users, posts };
}

// 4. 值穿透（非 Promise 自动转 Promise）
async function demo() {
  const value = await 'hello';  // 自动 await Promise.resolve('hello')
  console.log(value);          // 'hello'
}
```