/**
 * @fileOverview ReadableStream.getReader() 方法示例
 * @description getReader() 方法用于创建读者并锁定流。在流被锁定期间，其他读者无法获取，直到当前读者被释放。
 * @author Frontend Learning
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader
 */

/**
 * @description getReader() 方法详解
 * 
 * 【方法概述】
 * getReader() 方法是 ReadableStream 的实例方法，用于创建一个读者（reader）来读取流中的数据。
 * 调用此方法会锁定流，防止其他读者同时读取。
 * 
 * 【语法】
 * getReader()
 * getReader(options)
 * 
 * 【参数】
 * @param {Object} [options] - 可选参数，包含以下属性：
 * @param {string} [options.mode] - 指定要创建的读者类型：
 *   - "byob": 创建 ReadableStreamBYOBReader，用于读取字节流（支持零拷贝传输）
 *   - undefined 或省略: 创建 ReadableStreamDefaultReader，用于读取普通数据块
 * 
 * 【返回值】
 * @returns {ReadableStreamDefaultReader|ReadableStreamBYOBReader} - 返回一个读者实例
 *   - 未指定 mode 或为 undefined: 返回 ReadableStreamDefaultReader
 *   - mode 为 "byob": 返回 ReadableStreamBYOBReader
 * 
 * 【异常】
 * @throws {RangeError} - 如果提供的 mode 值不是 "byob" 或 undefined
 * @throws {TypeError} - 如果流已被锁定，或者不是 ReadableStream
 * @throws {TypeError} - 如果请求 BYOB 读者但流不是字节流（未设置 type: "bytes"）
 * 
 * 【使用场景】
 * 1. 从网络请求中读取数据（如 fetch 响应体）
 * 2. 手动逐块读取流数据
 * 3. 需要对流进行更精细的控制
 * 4. 读取字节流以支持零拷贝传输
 * 
 * 【流的锁定机制】
 * - 当流被锁定时，只能有一个读者
 * - 释放锁定的两种方式：
 *   1. 读者读取完所有数据（流关闭）
 *   2. 调用 reader.releaseLock()
 */

// ========== 示例代码 ==========

/**
 * @example 示例1：基本获取读者并读取数据
 * @description 创建一个自定义流，获取读者，逐块读取数据
 */
function basicGetReaderExample() {
  // 创建一个简单的可读流
  const stream = new ReadableStream({
    start(controller) {
      console.log('流已启动');
      // 入队一些数据
      controller.enqueue('Hello');
      controller.enqueue(' ');
      controller.enqueue('World');
      controller.close(); // 关闭流
    }
  });

  // 获取读者 - 这会锁定流
  const reader = stream.getReader();
  
  console.log('流是否被锁定:', stream.locked); // true

  // 读取数据
  function readAll() {
    return reader.read().then(({ done, value }) => {
      if (done) {
        console.log('流已读完');
        console.log('流是否仍被锁定:', stream.locked); // false（流关闭后自动释放）
        return;
      }
      
      console.log('读取到:', value);
      return readAll();
    });
  }

  readAll();
}

/**
 * @example 示例2：使用 for...of 循环读取
 * @description 利用 ReadableStreamDefaultReader 的可迭代性
 */
function readWithForOfLoop() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue('第一块');
      controller.enqueue('第二块');
      controller.enqueue('第三块');
      controller.close();
    }
  });

  const reader = stream.getReader();

  // 使用循环读取所有数据
  let result;
  while (!(result = reader.read()).done) {
    console.log('块:', result.value);
  }
  console.log('读取完成');
}

/**
 * @example 示例3：使用 BYOB 读者读取字节流
 * @description 创建支持零拷贝传输的字节流读者
 */
function getBYOBReaderExample() {
  // 创建一个字节流（设置 type: "bytes"）
  const byteStream = new ReadableStream({
    type: 'bytes',
    start(controller) {
      // 提供一些字节数据
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode('字节数据1'));
      controller.enqueue(encoder.encode('字节数据2'));
      controller.close();
    }
  });

  // 获取 BYOB 读者
  const reader = byteStream.getReader({ mode: 'byob' });
  console.log('读者类型:', reader.constructor.name); // ReadableStreamBYOBReader

  // 读取数据
  const buffer = new Uint8Array(10);
  
  reader.read(buffer).then(({ done, value }) => {
    if (done) {
      console.log('读取完成');
      return;
    }
    console.log('读取到:', new TextDecoder().decode(value));
    console.log('缓冲区内容:', buffer);
  });
}

/**
 * @example 示例4：从 Fetch 响应中获取读者
 * @description 展示从网络请求中读取数据的典型用法
 */
function fetchGetReaderExample() {
  // 模拟 fetch 响应
  const mockResponse = {
    body: new ReadableStream({
      start(controller) {
        // 模拟网络数据
        const data = ['A', 'B', 'C', 'D', 'E'];
        data.forEach(char => controller.enqueue(char));
        controller.close();
      }
    })
  };

  // 从响应体获取读者
  const reader = mockResponse.body.getReader();
  const decoder = new TextDecoder();
  const chunks = [];

  function pump() {
    return reader.read().then(({ done, value }) => {
      if (done) {
        console.log('所有数据:', chunks.join(''));
        return chunks;
      }
      
      chunks.push(decoder.decode(value, { stream: true }));
      return pump();
    });
  }

  pump();
}

/**
 * @example 示例5：释放读者锁
 * @description 展示如何释放读者对流的锁定，允许其他读者获取
 */
function releaseLockExample() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue('数据块1');
      controller.enqueue('数据块2');
      controller.enqueue('数据块3');
    }
  });

  // 获取第一个读者
  const reader1 = stream.getReader();
  console.log('流已锁定:', stream.locked); // true

  // 读取一些数据
  reader1.read().then(({ done, value }) => {
    console.log('Reader1 读取:', value);
    
    // 释放 Reader1 的锁
    reader1.releaseLock();
    console.log('Reader1 释放锁:', stream.locked); // false
    
    // 现在可以获取新的读者
    const reader2 = stream.getReader();
    console.log('Reader2 获取锁:', stream.locked); // true
    
    return reader2.read();
  }).then(({ done, value }) => {
    console.log('Reader2 读取:', value);
  });
}

/**
 * @example 示例6：处理错误场景
 * @description 展示如何处理 getReader 的异常情况
 */
function errorHandlingExample() {
  // 场景1：尝试获取已锁定流的读者
  const stream1 = new ReadableStream({
    start(controller) {
      controller.enqueue('数据');
    }
  });

  const reader1 = stream1.getReader();
  
  try {
    // 尝试再次获取读者 - 会抛出 TypeError
    stream1.getReader();
  } catch (error) {
    console.error('错误: 流已被锁定');
  }

  // 场景2：BYOB 模式下非字节流
  const stream2 = new ReadableStream({
    start(controller) {
      controller.enqueue('普通数据');
    }
  });

  try {
    // 尝试以 byob 模式获取读者 - 会抛出 TypeError
    stream2.getReader({ mode: 'byob' });
  } catch (error) {
    console.error('错误: 不是字节流');
  }
}

// 运行示例
console.log('=== getReader() 方法示例 ===\n');

// basicGetReaderExample();
// readWithForOfLoop();
// getBYOBReaderExample();
// fetchGetReaderExample();
// releaseLockExample();
// errorHandlingExample();

// 如果在浏览器或 Node 环境中运行
if (typeof window !== 'undefined' || typeof global !== 'undefined') {
  basicGetReaderExample();
}

module.exports = {
  basicGetReaderExample,
  readWithForOfLoop,
  getBYOBReaderExample,
  fetchGetReaderExample,
  releaseLockExample,
  errorHandlingExample
};
