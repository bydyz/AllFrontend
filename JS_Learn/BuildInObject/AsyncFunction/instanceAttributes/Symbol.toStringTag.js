/**
 * @description AsyncFunction.prototype[Symbol.toStringTag]
 * @description AsyncFunction 实例的 Symbol.toStringTag 属性
 * @type {string}
 * @default "AsyncFunction"
 * 
 * @note
 * - [Symbol.toStringTag] 是 AsyncFunction.prototype 的自有属性
 * - 在使用 Object.prototype.toString() 时会被用到
 * - 值为固定字符串 "AsyncFunction"
 * - 该属性不可写、不可枚举、不可配置
 * 
 * @example
 * const AsyncFunction = (async function() {}).constructor
 * const fn = new AsyncFunction('return 1')
 * console.log(Object.prototype.toString.call(fn))
 * // 输出: "[object AsyncFunction]"
 * 
 * @compatibility
 * - 所有现代浏览器支持 (Chrome 55+, Firefox 52+, Safari 10.1+, Edge 15+)
 * - Node.js 7.6+
 */

// 获取 AsyncFunction 构造函数
const AsyncFunction = (async function () {}).constructor

console.log('=== AsyncFunction.prototype[Symbol.toStringTag] ===')

// 示例1: 获取 [Symbol.toStringTag] 的值
const toStringTag = Object.getOwnPropertyDescriptor(
  AsyncFunction.prototype,
  Symbol.toStringTag
)
console.log('示例1 - 属性描述符:', toStringTag)
// 输出: { value: "AsyncFunction", writable: false, enumerable: false, configurable: true }

// 示例2: 通过 toString() 验证
const fn1 = new AsyncFunction('return "test"')
const typeTag = Object.prototype.toString.call(fn1)
console.log('示例2 - 类型标签:', typeTag)
// 输出: "[object AsyncFunction]"

// 示例3: 与普通函数对比
const regularFunc = function () {}
console.log('示例3 - 普通函数类型:', Object.prototype.toString.call(regularFunc))
// 输出: "[object Function]"

// 示例4: 与 async 函数表达式对比
const asyncFunc = async function () {}
console.log('示例4 - async 函数类型:', Object.prototype.toString.call(asyncFunc))
// 输出: "[object AsyncFunction]"

console.log('=== 属性特性总结 ===')
console.log('值:', AsyncFunction.prototype[Symbol.toStringTag])
console.log('是否自有属性:', Object.prototype.hasOwnProperty.call(AsyncFunction.prototype, Symbol.toStringTag))
console.log('可枚举:', AsyncFunction.prototype.propertyIsEnumerable(Symbol.toStringTag))
console.log('注意: [Symbol.toStringTag] 是 AsyncFunction 原型上唯一的自有属性')
