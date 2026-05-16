/**
 * ReadableStream.locked 属性说明文档
 * 
 * ReadableStream 实例的 locked 属性 - 表示流是否被读者锁定
 * 
 * 属性信息:
 * - 类型: boolean (只读)
 * - 中文名称: 流锁定状态
 * - 作用: 返回一个布尔值，表示当前可读流是否被锁定到一个读者（reader）
 * 
 * 锁定释放方式:
 * 1. 读者调用 releaseLock() 方法释放锁
 * 2. 流正常读取完毕（达到结束状态）
 * 3. 流被取消（cancel）
 * 4. 流出错（errored）
 * 
 * @since Streams API - 2019年1月广泛支持
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/locked
 * @see https://streams.spec.whatwg.org/#rs-locked
 */

// -------------------- 示例 1: 基本用法 - 检查流是否被锁定 --------------------

console.log('=== 示例 1: 基本用法 ===');
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('Hello');
    controller.enqueue('World');
    controller.close();
  }
});

console.log('初始状态 locked:', stream.locked); // false

// 获取读者 - 此时流被锁定
const reader = stream.getReader();
console.log('获取读者后 locked:', stream.locked); // true

// 释放锁
reader.releaseLock();
console.log('释放锁后 locked:', stream.locked); // false


// -------------------- 示例 2: 锁定状态下尝试获取新读者会抛出错误 --------------------

console.log('\n=== 示例 2: 锁定状态下尝试获取新读者 ===');
function testLockedThrowsError() {
  const stream2 = new ReadableStream({
    start(controller) {
      controller.enqueue('data');
      controller.close();
    }
  });

  // 第一次获取读者
  const reader1 = stream2.getReader();
  console.log('第一个读者获取后 locked:', stream2.locked); // true

  // 尝试第二个读者会抛出 TypeError
  try {
    const reader2 = stream2.getReader();
  } catch (error) {
    console.log('尝试获取第二个读者时出错:', error.name); // TypeError
    console.log('错误信息:', error.message); // Could not start reader...
  }

  // 释放第一个读者后，可以再次获取
  reader1.releaseLock();
  console.log('释放后 locked:', stream2.locked); // false

  const reader3 = stream2.getReader();
  console.log('重新获取读者后 locked:', stream2.locked); // true
  reader3.releaseLock();
}

testLockedThrowsError();


// -------------------- 示例 3: 使用 for await...of 时流会被自动锁定 --------------------

console.log('\n=== 示例 3: for await...of 自动锁定 ===');
// 注意: Node.js 环境需要 Promise.prototype Symbol.asyncIterator 支持
// 以下是模拟同步版本
function testAsyncIterationLock() {
  const stream3 = new ReadableStream({
    start(controller) {
      controller.enqueue('chunk1');
      controller.enqueue('chunk2');
      controller.enqueue('chunk3');
      controller.close();
    }
  });

  console.log('for await 前 locked:', stream3.locked); // false

  // 使用手动迭代来模拟 for await...of 的锁定行为
  const reader = stream3.getReader();
  console.log('获取读者后 locked:', stream3.locked); // true

  // 读取所有数据
  reader.read().then(({ value, done }) => {
    console.log('读取到的数据:', value);
    console.log('读取后 locked:', stream3.locked); // true
    
    reader.releaseLock();
    console.log('释放后 locked:', stream3.locked); // false
    console.log('\n=== for await...of 示例结束 ===');
  });
}

testAsyncIterationLock();
