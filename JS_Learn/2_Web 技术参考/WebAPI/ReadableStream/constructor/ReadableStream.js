/**
 * ReadableStream 构造器详解
 * 
 * 参考文档：https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/ReadableStream
 * 
 * =====================================================
 * 目录：
 * 1. 构造器语法
 * 2. 参数详解
 *    2.1 underlyingSource 参数
 *    2.2 queuingStrategy 参数
 * 3. 创建 ReadableStream 实例
 * 4. 使用场景示例
 * 5. 异常情况
 * =====================================================
 */

/**
 * =====================================================
 * 1. 构造器语法
 * =====================================================
 * 
 * new ReadableStream()
 * new ReadableStream(underlyingSource)
 * new ReadableStream(underlyingSource, queuingStrategy)
 * 
 * 注意：虽然所有参数在技术上是可选的，但省略 underlyingSource 
 * 将导致一个没有源的流，无法读取（读取器返回的 promise 永远不会解决）。
 */

/**
 * =====================================================
 * 2.1 underlyingSource 参数详解
 * =====================================================
 * 
 * 一个包含方法和属性的对象，定义了构造的流实例的行为。
 * underlyingSource 可以包含以下属性：
 */

/**
 * @typedef {Object} UnderlyingSource
 * @property {function(ReadableStreamDefaultController|ReadableByteStreamController): void|Promise<void>} [start] - 
 *   立即在对象构造时调用的方法。此方法的内容由开发者定义，
 *   应旨在获取流源，并执行设置流功能所需的任何其他操作。
 *   如果此过程要异步完成，它可以返回一个 promise 来表示成功或失败。
 *   传递给此方法的 controller 参数是一个 ReadableStreamDefaultController 
 *   或 ReadableByteStreamController，取决于 type 属性的值。
 * 
 * @property {function(ReadableStreamDefaultController|ReadableByteStreamController): void|Promise<void>} [pull] - 
 *   此方法也由开发者定义，当流的内部 chunk 队列未满时会被重复调用，
 *   直到达到其高水位标记。如果 pull() 返回一个 promise，
 *   那么在它完成之前不会再被调用；如果 promise 拒绝，流将变为错误状态。
 *   传递给此方法的 controller 参数同上。此方法可用于控制流获取更多 chunk。
 *   此函数不会调用，直到 start() 成功完成。此外，它只会被重复调用，
 *   如果它至少入队一个 chunk 或完成一个 BYOB 请求。
 * 
 * @property {function(any): void|Promise<void>} [cancel] - 
 *   此方法也由开发者定义，如果应用程序信号要取消流（例如调用了 
 *   ReadableStream.cancel()）将被调用。内容应执行释放对流源的访问所需的任何操作。
 *   如果此过程是异步的，它可以返回一个 promise 来表示成功或失败。
 *   reason 参数包含描述流被取消原因的字符串。
 * 
 * @property {string} [type] - 
 *   此属性控制正在处理的流类型。如果包含值设置为 "bytes"，
 *   传递的 controller 对象将是一个能够处理 BYOB（bring your own buffer）/字节流的 
 *   ReadableByteStreamController。如果不包含，传递的 controller 将是 ReadableStreamDefaultController。
 *   值只能是 "bytes" 或 undefined。
 * 
 * @property {number} [autoAllocateChunkSize] - 
 *   对于字节流，开发者可以设置 autoAllocateChunkSize 为正整数以开启流的自动分配功能。
 *   设置后，流实现将在需要时自动在 ReadableByteStreamController.byobRequest 中
 *   分配指定大小的视图缓冲区。
 *   这必须设置为启用与默认 ReadableStreamDefaultReader 一起使用的零拷贝传输。
 *   如果未设置，默认读取器仍会流式传输数据，但 byobRequest 将始终为 null，
 *   到消费者的传输必须通过流的内部队列进行。
 */

/**
 * =====================================================
 * 2.2 queuingStrategy 参数详解
 * =====================================================
 * 
 * 一个可选定义流的队列策略的对象。这需要两个参数：
 */

/**
 * @typedef {Object} QueuingStrategy
 * @property {number} highWaterMark - 
 *   一个非负整数 - 定义在应用背压之前可以包含在内部队列中的所有 chunk 的总大小。
 * 
 * @property {function(any): number} [size] - 
 *   一个包含 chunk 参数的方法 - 表示每个 chunk 的大小（以字节为单位）。
 * 
 * 注意：您可以定义自己的自定义 queuingStrategy，或使用 ByteLengthQueuingStrategy 
 * 或 CountQueuingStrategy 的实例作为此对象值。
 * 如果未提供 queuingStrategy，则使用的默认值与 highWaterMark 为 1 的 CountQueuingStrategy 相同。
 */

// =====================================================
// 3. 创建 ReadableStream 实例 - 基础示例
// =====================================================

/**
 * @description 创建基本的 ReadableStream 实例
 * @returns {ReadableStream} 可读流实例
 */
function createBasicReadableStream() {
  const stream = new ReadableStream({
    /**
     * start() - 在流创建时立即调用
     * 用于初始化流源
     */
    start(controller) {
      console.log('流已启动');
      
      // 可以在这里做一些初始化工作
      // 例如连接到数据源、建立连接等
      
      // 如果初始化是异步的，可以返回 Promise
    },

    /**
     * pull() - 当流的内部队列未满时重复调用
     * 用于向流中推送更多数据
     */
    pull(controller) {
      // 当消费者读取数据时，队列不满时会调用此方法
      // 可以在这里入队更多数据
      
      // 示例：入队一个数据块
      // controller.enqueue('some data');
      
      // 如果没有更多数据，可以调用 close()
      // controller.close();
    },

    /**
     * cancel() - 当流被取消时调用
     * 用于清理资源
     */
    cancel(reason) {
      console.log('流被取消，原因:', reason);
      // 清理资源、关闭连接等
    }
  });

  return stream;
}

// =====================================================
// 4. 使用场景示例
// =====================================================

// -------------------- 示例 1: 从定时器生成数据 --------------------

/**
 * @description 创建一个定时生成数据的 ReadableStream
 * @param {number} interval - 生成数据的间隔（毫秒）
 * @param {number} maxCount - 最大生成次数
 * @returns {ReadableStream}
 * @example
 * const stream = createTimerStream(1000, 5);
 * const reader = stream.getReader();
 * reader.read().then(({ value, done }) => console.log(value));
 */
function createTimerStream(interval = 1000, maxCount = 5) {
  let count = 0;
  let timerId = null;

  return new ReadableStream({
    start(controller) {
      console.log('[TimerStream] 开始生成数据...');
      
      timerId = setInterval(() => {
        if (count >= maxCount) {
          clearInterval(timerId);
          controller.close();  // 关闭流
          console.log('[TimerStream] 数据生成完成，流已关闭');
          return;
        }

        const data = `消息 ${count + 1} - ${new Date().toLocaleTimeString()}`;
        controller.enqueue(data);
        count++;
        console.log(`[TimerStream] 已入队: ${data}`);
      }, interval);
    },

    cancel(reason) {
      console.log(`[TimerStream] 取消原因: ${reason}`);
      if (timerId) {
        clearInterval(timerId);
      }
    }
  });
}

// -------------------- 示例 2: 从数组读取数据 --------------------

/**
 * @description 创建一个从数组读取数据的 ReadableStream
 * @param {Array} dataArray - 要读取的数据数组
 * @returns {ReadableStream}
 */
function createArrayStream(dataArray) {
  let index = 0;

  return new ReadableStream({
    start(controller) {
      console.log('[ArrayStream] 初始化完成');
    },

    pull(controller) {
      if (index < dataArray.length) {
        controller.enqueue(dataArray[index]);
        index++;
      } else {
        controller.close();
      }
    },

    cancel(reason) {
      console.log(`[ArrayStream] 取消: ${reason}`);
    }
  });
}

// -------------------- 示例 3: 自定义队列策略 --------------------

/**
 * @description 创建带有自定义队列策略的 ReadableStream
 * @returns {ReadableStream}
 */
function createStreamWithCustomStrategy() {
  return new ReadableStream(
    {
      start(controller) {
        // 生成一些数据
        for (let i = 0; i < 10; i++) {
          controller.enqueue(`数据块 ${i}`);
        }
        controller.close();
      }
    },
    {
      // 自定义队列策略
      highWaterMark: 3,  // 队列中最多保留 3 个 chunk
      size(chunk) {
        return 1;  // 每个 chunk 大小为 1
      }
    }
  );
}

// -------------------- 示例 4: 字节流 (type: "bytes") --------------------

/**
 * @description 创建字节类型的 ReadableStream（用于处理二进制数据）
 * @returns {ReadableStream}
 */
function createByteStream() {
  return new ReadableStream(
    {
      type: 'bytes',  // 声明为字节流
      start(controller) {
        // 创建一些二进制数据
        const encoder = new TextEncoder();
        const data = encoder.encode('Hello, Byte Stream!');
        
        controller.enqueue(data);
        controller.close();
      }
    },
    {
      highWaterMark: 1024 * 1024,  // 1MB 高水位标记
      size(chunk) {
        return chunk.byteLength;  // 按字节大小计算
      }
    }
  );
}

// -------------------- 示例 5: 使用 autoAllocateChunkSize --------------------

/**
 * @description 创建带有自动分配功能的字节流
 * @returns {ReadableStream}
 */
function createAutoAllocatingByteStream() {
  return new ReadableStream(
    {
      type: 'bytes',
      autoAllocateChunkSize: 1024,  // 自动分配 1KB 的缓冲区
      start(controller) {
        // 模拟大文件数据
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        controller.enqueue(data);
        controller.close();
      }
    },
    {
      highWaterMark: 1024 * 10  // 10KB
    }
  );
}

// -------------------- 示例 6: 完整消费示例 --------------------

/**
 * @description 完整演示如何创建和消费 ReadableStream
 * @returns {Promise<void>}
 */
async function consumeReadableStreamDemo() {
  console.log('=== 完整示例：创建和消费 ReadableStream ===\n');

  // 创建流
  const stream = createTimerStream(500, 3);
  
  // 获取读取器（这会锁定流）
  const reader = stream.getReader();
  
  console.log(`流是否已锁定: ${stream.locked}`);

  try {
    while (true) {
      const { value, done } = await reader.read();
      
      if (done) {
        console.log('\n读取完成！');
        break;
      }
      
      console.log(`读取到数据: ${value}`);
    }
  } catch (error) {
    console.error('读取错误:', error);
  } finally {
    // 释放读取器
    reader.releaseLock();
    console.log(`流是否仍锁定: ${stream.locked}`);
  }
}

// -------------------- 示例 7: 使用 for await...of 消费流 --------------------

/**
 * @description 使用异步迭代器消费流
 * @returns {Promise<void>}
 */
async function consumeStreamWithAsyncIterator() {
  console.log('=== 使用 for await...of 消费流 ===\n');

  const stream = createTimerStream(300, 3);

  // ReadableStream 支持异步迭代协议
  for await (const chunk of stream) {
    console.log(`异步迭代读取: ${chunk}`);
  }
  
  console.log('流已完全读取');
}

// =====================================================
// 5. 异常情况说明
// =====================================================

/**
 * @description ReadableStream 构造器可能抛出的异常
 * 
 * RangeError:
 *   当提供的 type 值既不是 "bytes" 也不是 undefined 时抛出。
 *   type 属性只能是 "bytes" 或 undefined（默认）。
 */

// =====================================================
// 导出所有函数（用于 Node.js 环境）
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createBasicReadableStream,
    createTimerStream,
    createArrayStream,
    createStreamWithCustomStrategy,
    createByteStream,
    createAutoAllocatingByteStream,
    consumeReadableStreamDemo,
    consumeStreamWithAsyncIterator
  };
}

// =====================================================
// 直接运行示例（如果在浏览器或 Node 环境中）
// =====================================================

// 如果是直接运行此文件
if (typeof window !== 'undefined' || typeof global !== 'undefined') {
  console.log('ReadableStream 构造器详解 - 示例代码');
  console.log('=====================================\n');
  
  // 可以取消注释以下行来运行示例
  // consumeReadableStreamDemo().then(() => console.log('\n演示完成'));
  // consumeStreamWithAsyncIterator().then(() => console.log('\n异步迭代演示完成'));
}

