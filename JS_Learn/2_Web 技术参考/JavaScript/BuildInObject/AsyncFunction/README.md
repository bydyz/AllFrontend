# AsyncFunction API 文档

## 概述

**`AsyncFunction`** 对象为[异步函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)提供方法。在 JavaScript 中，**每个异步函数实际上都是一个 `AsyncFunction` 对象**。

> **注意**：`AsyncFunction` **不是**全局对象。它可以通过以下代码获取：
> ```javascript
> const AsyncFunction = async function () {}.constructor;
> ```

`AsyncFunction` 是 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 的子类，因此继承自 `Function.prototype` 的所有方法和属性。

## 自有成员

| 类别 | 成员 | 说明 |
|------|------|------|
| **构造函数** | `AsyncFunction()` | 多个重载版本，支持不同数量的形式参数 |
| **实例属性** | `[Symbol.toStringTag]` | 原型上的自有属性，值为 `"AsyncFunction"` |
| **实例方法** | (无) | 所有实例方法均继承自 `Function.prototype` |
| **静态方法** | (无) | 所有静态方法均继承自 `Function.prototype` |

## 使用场景

- **运行时动态生成异步函数**：在无法预先确定函数逻辑时使用
- **代码生成和编译**：动态创建异步处理逻辑
- **某些 DSL（领域特定语言）实现**：将字符串代码转换为可执行异步函数

## 基础使用示例

```javascript
// 获取 AsyncFunction 构造函数
const AsyncFunction = async function () {}.constructor;

// 创建带参数的异步函数
const asyncFunc = new AsyncFunction('a', 'b', 'return await Promise.resolve(a + b)');

// 调用异步函数（始终返回 Promise）
asyncFunc(1, 2).then(result => {
  console.log(result); // 输出: 3
});
```

## 目录结构

- [constructor/](constructor/) - 构造函数重载文档（use1.js ~ use3.js）
- [instanceAttributes/](instanceAttributes/) - 实例属性文档
- ~~instanceMethods/~~ - 无自有实例方法（继承自 `Function.prototype`）
- ~~staticMethods/~~ - 无自有静态方法（继承自 `Function.prototype`）