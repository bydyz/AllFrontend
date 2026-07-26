/**
 * @description AsyncFunction 构造函数 - 单参数重载
 * @description 创建一个带有一个显式参数的异步函数
 * @param {string} arg1 - 第一个参数名称（有效的 JavaScript 标识符）
 * @param {string} functionBody - 函数体字符串
 * @returns {AsyncFunction} 返回一个新的异步函数
 * 
 * @example
 * // 创建带一个参数的异步函数
 * const double = new AsyncFunction('x', 'return await Promise.resolve(x * 2)')
 * double(5).then(result => console.log(result))
 * // 输出: 10
 * 
 * @note
 * - 参数名称必须是有效的 JavaScript 标识符
 * - 参数可以在函数体中使用
 * - 函数体可以包含 await 表达式
 * 
 * @compatibility
 * - 所有现代浏览器支持 (Chrome 55+, Firefox 52+, Safari 10.1+, Edge 15+)
 * - Node.js 7.6+
 */

// 获取 AsyncFunction 构造函数
const AsyncFunction = (async function () {}).constructor

// 示例1: 数值计算
const square = new AsyncFunction('x', 'return await Promise.resolve(x * x)')
square(4).then(result => {
  console.log('示例1 - 计算平方:', result)
  // 输出: 示例1 - 计算平方: 16
})

// 示例2: 字符串处理
const greet = new AsyncFunction('name', 'return `你好，${name}！`')
greet('世界').then(result => {
  console.log('示例2 - 字符串处理:', result)
  // 输出: 示例2 - 字符串处理: 你好，世界！
})

// 示例3: 布尔判断
const isAdult = new AsyncFunction('age', 'return age >= 18')
isAdult(20).then(result => {
  console.log('示例3 - 布尔判断 (20):', result)
  // 输出: 示例3 - 布尔判断 (20): true
})
isAdult(15).then(result => {
  console.log('示例3 - 布尔判断 (15):', result)
  // 输出: 示例3 - 布尔判断 (15): false
})

// 示例4: 异步数据获取 (模拟)
const fetchData = new AsyncFunction('id', `
  const data = await Promise.resolve({ id, name: "用户" + id })
  return data
`)
fetchData(42).then(result => {
  console.log('示例4 - 异步数据:', result)
  // 输出: 示例4 - 异步数据: { id: 42, name: "用户42" }
})

console.log('所有单参数重载示例执行完毕')
