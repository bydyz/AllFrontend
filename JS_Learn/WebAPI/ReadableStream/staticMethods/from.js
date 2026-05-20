/**
 * @fileoverview ReadableStream.from() 静态方法示例
 * @description ReadableStream.from() 是 ReadableStream 类的静态方法，用于从可迭代对象或异步可迭代对象创建 ReadableStream。
 * 
 * 该方法可以将各种可迭代对象转换为可读流，包括：
 * - 普通数组
 * - Set
 * - 异步生成器
 * - 其他 ReadableStream（注意：会锁定原始流）
 * - Node.js readable 流
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/from_static
 * @see https://streams.spec.whatwg.org/#rs-from
 */

'use strict';

/**
 * @description 检查浏览器/运行环境是否支持 ReadableStream.from() 方法
 * @returns {boolean} 是否支持该方法
 */
function isFromSupported() {
  return typeof ReadableStream !== 'undefined' && 
         typeof ReadableStream.from === 'function';
}

/**
 * @description 从普通数组创建 ReadableStream
 * @returns {Promise<void>}
 */
async function exampleFromArray() {
  console.log('\n=== 示例1: 从数组创建 ReadableStream ===');
  
  // 检查支持
  if (!isFromSupported()) {
    console.log('⚠️ ReadableStream.from() 在当前环境不支持');
    console.log('支持环境: Firefox 117+, Node.js 20.6.0+, Deno 1.35.0+');
    return;
  }
  
  // 普通数组
  const vegetables = ['Carrot', 'Broccoli', 'Tomato', 'Spinach'];
  
  // 从数组创建 ReadableStream
  const readableStream = ReadableStream.from(vegetables);
  
  console.log('创建的流:', readableStream);
  console.log('是否锁定:', readableStream.locked);
  
  // 消费流数据
  for await (const chunk of readableStream) {
    console.log('读取到的数据:', chunk);
  }
  
  console.log('流已关闭');
}

/**
 * @description 从异步生成器创建 ReadableStream
 * @returns {Promise<void>}
 */
async function exampleFromAsyncGenerator() {
  console.log('\n=== 示例2: 从异步生成器创建 ReadableStream ===');
  
  if (!isFromSupported()) {
    console.log('⚠️ ReadableStream.from() 在当前环境不支持');
    return;
  }
  
  // 定义异步生成器
  async function* asyncGenerator() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
  }
  
  // 从异步迭代器创建 ReadableStream
  const readableStream = ReadableStream.from(asyncGenerator());
  
  console.log('从异步生成器创建的流:', readableStream);
  
  // 消费流数据
  let sum = 0;
  for await (const chunk of readableStream) {
    console.log('读取到的数字:', chunk);
    sum += chunk;
  }
  
  console.log('总和:', sum);
}

/**
 * @description 从 Set 创建 ReadableStream
 * @returns {Promise<void>}
 */
async function exampleFromSet() {
  console.log('\n=== 示例3: 从 Set 创建 ReadableStream ===');
  
  if (!isFromSupported()) {
    console.log('⚠️ ReadableStream.from() 在当前环境不支持');
    return;
  }
  
  // Set 对象
  const fruits = new Set(['Apple', 'Banana', 'Orange', 'Grape']);
  
  // 从 Set 创建 ReadableStream
  const readableStream = ReadableStream.from(fruits);
  
  // 消费流数据
  for await (const chunk of readableStream) {
    console.log('读取到的水果:', chunk);
  }
}

/**
 * @description 从普通生成器（同步）创建 ReadableStream
 * @returns {Promise<void>}
 */
async function exampleFromSyncGenerator() {
  console.log('\n=== 示例4: 从同步生成器创建 ReadableStream ===');
  
  if (!isFromSupported()) {
    console.log('⚠️ ReadableStream.from() 在当前环境不支持');
    return;
  }
  
  // 定义同步生成器
  function* syncGenerator() {
    yield 'first';
    yield 'second';
    yield 'third';
  }
  
  // 从同步生成器创建 ReadableStream
  const readableStream = ReadableStream.from(syncGenerator());
  
  // 消费流数据
  for await (const chunk of readableStream) {
    console.log('读取到的数据:', chunk);
  }
}

/**
 * @description 从另一个 ReadableStream 创建（注意：会锁定原始流）
 * @returns {Promise<void>}
 */
async function exampleFromReadableStream() {
  console.log('\n=== 示例5: 从另一个 ReadableStream 创建（注意：会锁定原始流）===');
  
  if (!isFromSupported()) {
    console.log('⚠️ ReadableStream.from() 在当前环境不支持');
    return;
  }
  
  // 创建原始流
  const originalStream = ReadableStream.from(['a', 'b', 'c', 'd']);
  
  console.log('创建后原始流是否锁定:', originalStream.locked);
  
  // 从原始流创建新流 - 注意：这会锁定原始流！
  // 原始流不能再被读取，直到新流被完全消费
  const newStream = ReadableStream.from(originalStream);
  
  console.log('创建后原始流是否锁定:', originalStream.locked);
  console.log('新流是否锁定:', newStream.locked);
  
  // 消费新流的数据
  console.log('消费新流:');
  for await (const chunk of newStream) {
    console.log('  ', chunk);
  }
  
  // 现在原始流已经被释放
  console.log('原始流现在是否锁定:', originalStream.locked);
}

/**
 * @description 错误示例 - 传入不可迭代的对象
 * @returns {Promise<void>}
 */
async function exampleError() {
  console.log('\n=== 示例6: 错误处理 - 传入不可迭代对象 ===');
  
  if (!isFromSupported()) {
    console.log('⚠️ ReadableStream.from() 在当前环境不支持');
    return;
  }
  
  try {
    // 尝试从数字创建流（会抛出 TypeError）
    const stream = ReadableStream.from(123);
  } catch (error) {
    console.log('捕获到错误:', error.name);
    console.log('错误消息:', error.message);
  }
}

/**
 * @description 使用 getReader 消费流（替代 for await）
 * @returns {Promise<void>}
 */
async function exampleWithReader() {
  console.log('\n=== 示例7: 使用 getReader 消费流 ===');
  
  if (!isFromSupported()) {
    console.log('⚠️ ReadableStream.from() 在当前环境不支持');
    return;
  }
  
  const data = ['hello', 'world', 'stream'];
  const stream = ReadableStream.from(data);
  
  const reader = stream.getReader();
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('流已读完');
        break;
      }
      console.log('读取到:', value);
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * @description 从 Promise 数组创建 ReadableStream
 * @returns {Promise<void>}
 */
async function exampleFromPromises() {
  console.log('\n=== 示例8: 从 Promise 数组创建 ReadableStream ===');
  
  if (!isFromSupported()) {
    console.log('⚠️ ReadableStream.from() 在当前环境不支持');
    return;
  }
  
  // Promise 数组 - 异步迭代
  const promises = [
    Promise.resolve('promise1'),
    Promise.resolve('promise2'),
    Promise.resolve('promise3')
  ];
  
  const stream = ReadableStream.from(promises);
  
  for await (const chunk of stream) {
    console.log('读取到:', chunk);
  }
}

/**
 * @description 主函数 - 运行所有示例
 * @returns {Promise<void>}
 */
async function main() {
  console.log('========================================');
  console.log('ReadableStream.from() 静态方法演示');
  console.log('========================================');
  
  console.log('\n当前环境信息:');
  console.log('  ReadableStream 支持:', typeof ReadableStream !== 'undefined');
  console.log('  from() 方法支持:', isFromSupported());
  
  // 运行所有示例
  await exampleFromArray();
  await exampleFromAsyncGenerator();
  await exampleFromSet();
  await exampleFromSyncGenerator();
  await exampleFromReadableStream();
  await exampleError();
  await exampleWithReader();
  await exampleFromPromises();
  
  console.log('\n========================================');
  console.log('所有示例执行完成');
  console.log('========================================');
}

// 运行主函数
main().catch(console.error);
