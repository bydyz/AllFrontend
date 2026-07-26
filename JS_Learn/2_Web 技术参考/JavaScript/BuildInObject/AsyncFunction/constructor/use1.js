/**
 * @description AsyncFunction 构造函数 - 无参数重载
 * @description 创建一个没有显式参数的异步函数
 * @param {string} functionBody - 函数体字符串
 * @returns {AsyncFunction} 返回一个新的异步函数
 * 
 * @example
 * // 创建无参数的异步函数
 * const fn = new AsyncFunction('return "Hello from async function"');
 * fn().then(result => console.log(result));
 * // 输出: "Hello from async function"
 * 
 * @note
 * - 当只传入一个参数时，该参数被视为函数体
 * - 函数体必须返回一个 Promise 或使用 await
 * - 返回的函数是异步函数，调用时会返回 Promise
 * 
 * @compatibility
 * - 所有现代浏览器支持 (Chrome 55+, Firefox 52+, Safari 10.1+, Edge 15+)
 * - Node.js 7.6+
 */

// 获取 AsyncFunction 构造函数（它不是全局对象）
const AsyncFunction = (async function () {}).constructor

// 示例1: 最基本的用法 - 返回字符串
const greet = new AsyncFunction('return "你好，AsyncFunction！"')
greet().then(result => {
  console.log('示例1 - 无参数异步函数:', result)
  // 输出: 示例1 - 无参数异步函数: 你好，AsyncFunction！
})

// 示例2: 使用 await 处理异步操作
const fetchGreeting = new AsyncFunction(`
  const greeting = await Promise.resolve("异步世界")
  return greeting
`)
fetchGreeting().then(result => {
  console.log('示例2 - 使用 await:', result)
  // 输出: 示例2 - 使用 await: 异步世界
})

// 示例3: 延时后返回值
const delayed = new AsyncFunction(`
  await new Promise(resolve => setTimeout(resolve, 100))
  return "100ms 后返回"
`)
delayed().then(result => {
  console.log('示例3 - 延时操作:', result)
  // 输出: 示例3 - 延时操作: 100ms 后返回
})

// 示例4: 错误处理
const errorFn = new AsyncFunction(`
  throw new Error("函数内抛出的错误")
`)
errorFn().catch(err => {
  console.log('示例4 - 错误处理:', err.message)
  // 输出: 示例4 - 错误处理: 函数内抛出的错误
})

console.log('所有无参数重载示例执行完毕')
