# async
1. 非 Promise 值 
2. Promise 值
3. 不写 return 语句
4. 函数体内抛出错误   或  返回一个 rejected 的 Promise



# await

## 特点

1. `await` 关键字 用于等待一个异步操作完成。
2. `await` 关键字 出现在 `async` 函数内部（或者在支持顶级 await 的模块中）。
3. `await` 关键字 会暂停当前 async 函数的执行，直到其后面的表达式“完成”（settled），然后返回最终结果。


## 后面可以跟的表达式主要分为三类

理论上，await 后面可以跟任何表达式

### 举例

1. 字面量：`await 1`
2. 变量：`await someVariable`
3. 函数调用：`await someFunction()`
4. 运算表达式：`await (x + y)`
5. 直接抛出错误：`await (() => { throw new Error('oops'); })()` —— 但这个错误会被包装成 rejected Promise


### 分情况说明

1. Promise 对象       等待 Promise 解决（解决 即是 变为 成功状态 或 拒绝状态）
2. 非 Promise 值      自动将其包装为 Promise.resolve(expression)，然后等待（实际上立即返回）。
3.  thenable 对象     当作 Promise 处理


* 如果被等待的 Promise 解决为成功状态，await 表达式的值将会是该 Promise 的解决值。
* 如果被等待的 Promise 解决为拒绝状态，await 表达式会抛出一个异常，你可以通过 try...catch 块来捕获这个异常。
* await 后面接的是一个普通函数，JavaScript 引擎会将该函数的返回值包装成一个 resolved 的 Promise


## 返回值

* 如果 await 后面是一个非 Promise 值，则直接返回该值。
* 如果 await 后面是一个 Promise，则返回该 Promise 解决后的值。