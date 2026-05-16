/**
 * @fileOverview ReadableStream.cancel() 方法示例
 * @description cancel() 方法用于取消可读流。当消费者完全不再需要流中的数据时，调用此方法表示放弃对流的兴趣。
 *               取消后，流中的所有数据都将丢失，流将变得不可读。
 * @author Frontend Learning
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/cancel
 */

/**
 * @description cancel() 方法详解
 * 
 * 【方法概述】
 * cancel() 方法是 ReadableStream 的实例方法，用于取消可读流。
 * 当消费者完全 finished 使用流中的数据，并且不再需要任何更多数据时，使用此方法。
 * 
 * 【语法】
 * cancel()
 * cancel(reason)
 * 
 * 【参数】
 * @param {string} [reason] - 可选参数，一个可读的人类可读的取消原因。
 *                             此参数将传递给底层源，底层源可能使用或忽略它。
 * 
 * 【返回值】
 * @returns {Promise<undefined>} - 返回一个 Promise，当流取消完成时 resolve，值为 undefined。
 * 
 * 【异常】
 * @throws {TypeError} - 如果尝试取消的流不是 ReadableStream，或者流已被锁定。
 * 
 * 【使用场景】
 * 1. 完全 finished 使用流，不再需要任何数据
 * 2. 提前终止读取操作
 * 3. 在搜索场景中找到目标后放弃剩余数据
 * 4. 用户取消操作时清理资源
 * 
 * 【与 close() 的区别】
 * - cancel(): 完全放弃流，丢弃所有排队的数据，流不再可读
 * - close(): 正常关闭流，读取完所有排队的数据后结束
 */

// ========== 示例代码 ==========

/**
 * @example 示例1：基本取消流
 * @description 创建一个自定义流，然后在适当时机取消它
 */
function basicCancelExample() {
  // 创建一个简单的可读流
  const stream = new ReadableStream({
    start(controller) {
      // 入队一些数据
      for (let i = 1; i <= 5; i++) {
        controller.enqueue(`chunk-${i}`);
      }
      console.log('流已启动，5个数据块已入队');
    },
    cancel(reason) {
      // 当流被取消时调用
      console.log('流被取消，原因:', reason);
    }
  });

  // 获取读者并读取一些数据
  const reader = stream.getReader();
  
  // 读取前两个块
  reader.read().then(({ done, value }) => {
    console.log('读取1:', value, 'done:', done);
    return reader.read();
  }).then(({ done, value }) => {
    console.log('读取2:', value, 'done:', done);
    
    // 取消流 - 剩余的数据将被丢弃
    return stream.cancel('不再需要更多数据');
  }).then(() => {
    console.log('流已成功取消');
  }).catch(err => {
    console.error('错误:', err);
  });
}

/**
 * @example 示例2：搜索场景中取消流
 * @description 在流中搜索特定内容，找到后取消流
 */
function searchAndCancelExample() {
  // 模拟从网络获取的数据流
  const stream = new ReadableStream({
    start(controller) {
      const data = [
        '这是第一行文本',
        '这是第二行包含关键词',
        '这是第三行',
        '这是第四行',
        '这是第五行'
      ];
      data.forEach(item => controller.enqueue(item));
      controller.close();
    }
  });

  const searchTerm = '关键词';
  const reader = stream.getReader();

  function readChunk() {
    return reader.read().then(({ done, value }) => {
      if (done) {
        console.log('搜索完成，未找到目标');
        return;
      }
      
      console.log('检查:', value);
      
      if (value.includes(searchTerm)) {
        console.log('找到目标! 取消流...');
        return stream.cancel(`找到目标: ${searchTerm}`);
      }
      
      return readChunk();
    });
  }

  readChunk().then(() => {
    console.log('操作完成');
  }).catch(err => {
    console.error('错误:', err);
  });
}

/**
 * @example 示例3：从Fetch响应中取消流
 * @description 从网络请求中获取流，找到需要的内容后取消
 */
function fetchCancelExample() {
  // 注意：这是一个模拟示例，实际使用时需要有效的URL
  // 模拟创建响应流
  const mockResponse = {
    body: new ReadableStream({
      start(controller) {
        const chunks = [
          '{"status": "loading", "data": null}',
          '{"status": "progress", "data": "20%"}',
          '{"status": "progress", "data": "50%"}',
          '{"status": "complete", "data": "100%"}'
        ];
        chunks.forEach(chunk => controller.enqueue(chunk));
        controller.close();
      }
    })
  };

  const reader = mockResponse.body.getReader();
  const decoder = new TextDecoder();
  let foundComplete = false;

  function processStream() {
    return reader.read().then(({ done, value }) => {
      if (done || foundComplete) {
        return;
      }

      const text = decoder.decode(value, { stream: true });
      console.log('收到数据:', text);

      try {
        const parsed = JSON.parse(text);
        if (parsed.status === 'complete') {
          foundComplete = true;
          console.log('任务完成，取消剩余数据传输');
          return mockResponse.body.cancel('已完成');
        }
      } catch (e) {
        // 继续读取
      }

      return processStream();
    });
  }

  processStream().then(() => {
    console.log('处理完成');
  }).catch(err => {
    console.error('错误:', err);
  });
}

/**
 * @example 示例4：处理取消错误
 * @description 展示如何正确处理 cancel() 可能抛出的错误
 */
function cancelWithErrorHandling() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue('数据块1');
      controller.enqueue('数据块2');
    }
  });

  // 尝试在获取读者后取消（这会失败，因为流已被锁定）
  const reader = stream.getReader();
  
  // 尝试取消已锁定的流会抛出 TypeError
  try {
    stream.cancel('尝试取消');
  } catch (error) {
    console.error('取消失败:', error.message);
    // 正确做法：先释放读者锁，或者使用读者来取消
    reader.cancel('通过读者取消').then(() => {
      console.log('通过读者成功取消');
    });
  }
}

// 运行示例
console.log('=== cancel() 方法示例 ===\n');

// basicCancelExample();
// searchAndCancelExample();
// fetchCancelExample();
// cancelWithErrorHandling();

// 如果在浏览器环境，可以直接运行
if (typeof window !== 'undefined' || typeof global !== 'undefined') {
  basicCancelExample();
}

module.exports = {
  basicCancelExample,
  searchAndCancelExample,
  fetchCancelExample,
  cancelWithErrorHandling
};
