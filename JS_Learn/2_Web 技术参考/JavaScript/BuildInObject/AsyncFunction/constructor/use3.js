/**
 * @description AsyncFunction 构造函数 - 多参数重载
 * @description 创建带有多个显式参数的异步函数
 * @param {...string} args - 参数名称列表（有效的 JavaScript 标识符）
 * @param {string} functionBody - 函数体字符串（最后一个参数）
 * @returns {AsyncFunction} 返回一个新的异步函数
 * 
 * @example
 * // 创建带多个参数的异步函数
 * const add = new AsyncFunction('a', 'b', 'c', 'return await Promise.resolve(a + b + c)')
 * add(1, 2, 3).then(result => console.log(result))
 * // 输出: 6
 * 
 * @note
 * - 除最后一个参数外，前面的所有参数都是形式参数名
 * - 最后一个参数是函数体
 * - 参数数量没有硬性限制，但建议保持合理
 * 
 * @compatibility
 * - 所有现代浏览器支持 (Chrome 55+, Firefox 52+, Safari 10.1+, Edge 15+)
 * - Node.js 7.6+
 */

// 获取 AsyncFunction 构造函数
const AsyncFunction = (async function () {}).constructor

// 示例1: 两数相加
const add = new AsyncFunction('a', 'b', 'return await Promise.resolve(a + b)')
add(10, 20).then(result => {
  console.log('示例1 - 两数相加:', result)
  // 输出: 示例1 - 两数相加: 30
})

// 示例2: 三数相乘
const multiply = new AsyncFunction('x', 'y', 'z', 'return x * y * z')
multiply(2, 3, 4).then(result => {
  console.log('示例2 - 三数相乘:', result)
  // 输出: 示例2 - 三数相乘: 24
})

// 示例3: 组合对象
const createUser = new AsyncFunction('id', 'name', 'age', `
  const user = { id, name, age, createdAt: new Date().toISOString() }
  return user
`)
createUser(1, '张三', 25).then(result => {
  console.log('示例3 - 创建用户对象:', result)
  // 输出类似: { id: 1, name: "张三", age: 25, createdAt: "2025-..." }
})

// 示例4: 多个参数 + 异步操作
const processItems = new AsyncFunction('items', 'multiplier', 'delay', `
  const results = []
  for (const item of items) {
    await new Promise(resolve => setTimeout(resolve, delay))
    results.push(item * multiplier)
  }
  return results
`)
processItems([1, 2, 3], 10, 50).then(result => {
  console.log('示例4 - 批量处理:', result)
  // 输出: 示例4 - 批量处理: [10, 20, 30]
})

// 示例5: 使用 rest 参数的模拟 (通过 arguments)
const sum = new AsyncFunction('...numbers', `
  let total = 0
  for (const n of numbers) total += n
  return total
`)
sum(1, 2, 3, 4, 5).then(result => {
  console.log('示例5 - 可变参数求和:', result)
  // 输出: 示例5 - 可变参数求和: 15
})

console.log('所有多参数重载示例执行完毕')
