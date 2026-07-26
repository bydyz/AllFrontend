/**
 * @description AsyncFunction 实例属性
 * 
 * @note
 * AsyncFunction 实例继承自 Function 对象，因此它具有 Function 对象的所有属性。
 * AsyncFunction 实例本身没有特殊的实例属性。
 * 
 * @example
 * const asyncFunc = new AsyncFunction('a', 'b', 'return await Promise.resolve(a + b)');
 * 
 * // 继承自 Function 的属性
 * console.log(asyncFunc.length); // 参数数量
 * console.log(asyncFunc.name);  // 函数名称
 * console.log(asyncFunc.prototype); // 原型对象
 * 
 * @compatibility
 * - 所有现代浏览器都支持
 * - Node.js 7.6+ 支持
 */
function demonstrateAsyncFunctionAttributes() {
  // 创建一个 AsyncFunction 实例
  const asyncFunc = new AsyncFunction('x', 'y', 'return await Promise.resolve(x * y)');
  
  console.log('AsyncFunction 实例属性示例:');
  
  // length 属性 - 参数数量
  console.log('参数数量 (length):', asyncFunc.length);
  
  // name 属性 - 函数名称
  console.log('函数名称 (name):', asyncFunc.name);
  
  // prototype 属性 - 原型对象
  console.log('原型对象 (prototype):', asyncFunc.prototype);
  
  // constructor 属性 - 构造函数
  console.log('构造函数 (constructor):', asyncFunc.constructor);
  
  // 继承自 Function 的其他属性
  console.log('可调用 (callable):', typeof asyncFunc === 'function');
  console.log('可构造 (constructable):', asyncFunc.constructor === AsyncFunction);
  
  console.log('AsyncFunction 实例属性示例结束');
}

// 运行示例
demonstrateAsyncFunctionAttributes();