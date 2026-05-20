/**
 * @fileOverview ReadableStream.pipeThrough() 方法示例
 * @description pipeThrough() 方法提供了一种链式传输流的方式，通过转换流或其他可写/可读对来传输当前流。
 * @author Frontend Learning
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/pipeThrough
 */

/**
 * @description pipeThrough() 方法详解
 * 
 * 【方法概述】
 * pipeThrough() 方法是 ReadableStream 的实例方法，用于将当前可读流通过一个转换流或可写/可读对进行传输。
 * 它提供了一种链式操作流的方式，可以在数据传输过程中对数据进行转换。
 * 
 * 【语法】
 * pipeThrough(transformStream)
 * pipeThrough(transformStream, options)
 * 
 * 【参数】
 * @param {TransformStream|Object} transformStream - 转换流或具有 { writable, readable } 结构的对象
 *   - 转换流由一个可写流和一个可读流组成，共同将数据从一种形式转换为另一种形式
 *   - 例如：TextDecoder 将字节转换为字符串，视频解码器将编码字节转换为未压缩视频帧
 * @param {Object} [options] - 可选的管道选项：
 *   - preventClose: true - 关闭源 ReadableStream 不再导致目标 WritableStream 关闭
 *   - preventAbort: true - 源 ReadableStream 的错误不再中止目标 WritableStream
 *   - preventCancel: true - 目标 WritableStream 的错误不再取消源 ReadableStream
 * 
 * 【返回值】
 * @returns {ReadableStream} - 返回转换后的可读流（transformStream 的 readable 端）
 * 
 * 【使用场景】
 * 1. 数据格式转换（如字节转字符串）
 * 2. 压缩/解压
 * 3. 加密/解密
 * 4. 图像处理
 * 5. 构建管道链
 * 
 * 【管道锁定】
 * - 管道传输通常会锁定流，持续期间禁止其他读者获取
 * 
 * 【与 pipeTo() 的区别】
 * - pipeThrough(): 返回转换后的流，可继续链式操作
 * - pipeTo(): 返回 Promise，表示管道完成，无法继续链式操作
 */

// ========== 示例代码 ==========

/**
 * @example 示例1：使用 TextDecoder 转换流
 * @description 将字节流转换为文本流
 */
function textDecoderExample() {
  // 创建一个提供字节的流
  const byteStream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode('Hello '));
      controller.enqueue(encoder.encode('World!'));
      controller.close();
    }
  });

  // 使用 TextDecoder 创建转换流
  const textDecoder = new TextDecoderStream();
  
  // 通过管道传输
  const textStream = byteStream.pipeThrough(textDecoder);
  
  // 读取转换后的文本
  const reader = textStream.getReader();
  
  function read() {
    return reader.read().then(({ done, value }) => {
      if (done) {
        console.log('读取完成');
        return;
      }
      console.log('文本:', value);
      return read();
    });
  }
  
  read();
}

/**
 * @example 示例2：使用自定义 TransformStream
 * @description 创建自定义转换流对数据进行转换
 */
function customTransformExample() {
  // 创建自定义转换流：将数字乘以2
  const doubleTransform = new TransformStream({
    transform(chunk, controller) {
      const doubled = chunk * 2;
      controller.enqueue(doubled);
    }
  });

  // 创建源流
  const sourceStream = new ReadableStream({
    start(controller) {
      controller.enqueue(1);
      controller.enqueue(2);
      controller.enqueue(3);
      controller.enqueue(4);
      controller.close();
    }
  });

  // 管道传输
  const transformedStream = sourceStream.pipeThrough(doubleTransform);
  
  // 读取结果
  const reader = transformedStream.getReader();
  const results = [];

  function read() {
    return reader.read().then(({ done, value }) => {
      if (done) {
        console.log('结果:', results); // [2, 4, 6, 8]
        return;
      }
      results.push(value);
      return read();
    });
  }

  read();
}

/**
 * @example 示例3：链式管道操作
 * @description 多个 pipeThrough 链式调用
 */
function chainedPipeExample() {
  // 源流：数字
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(1);
      controller.enqueue(2);
      controller.enqueue(3);
      controller.close();
    }
  });

  // 转换流1：乘以10
  const multiplyBy10 = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk * 10);
    }
  });

  // 转换流2：加上5
  const addFive = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk + 5);
    }
  });

  // 链式管道
  const resultStream = source
    .pipeThrough(multiplyBy10)
    .pipeThrough(addFive);

  // 读取最终结果: 15, 25, 35
  const reader = resultStream.getReader();
  const results = [];

  function read() {
    return reader.read().then(({ done, value }) => {
      if (done) {
        console.log('链式结果:', results);
        return;
      }
      results.push(value);
      return read();
    });
  }

  read();
}

/**
 * @example 示例4：带选项的管道传输
 * @description 使用 preventCancel 选项
 */
function pipeWithOptionsExample() {
  // 源流
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue('A');
      controller.enqueue('B');
      controller.enqueue('C');
      controller.close();
    }
  });

  // 转换流
  const upperCaseTransform = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk.toUpperCase());
    }
  });

  // 使用选项：preventCancel 防止取消源流
  const result = source.pipeThrough(upperCaseTransform, {
    preventCancel: true
  });

  // 读取结果
  const reader = result.getReader();
  
  reader.read().then(({ done, value }) => {
    console.log('值:', value); // 'A'
    // 尝试取消结果流
    return result.cancel('不再需要');
  }).catch(err => {
    console.log('取消错误（预期）:', err.message);
    // 由于 preventCancel: true，源流不会被取消
  });
}

/**
 * @example 示例5：文本编码转换
 * @description 将字符串转换为指定编码的字节
 */
function textEncoderExample() {
  // 源流：文本
  const textStream = new ReadableStream({
    start(controller) {
      controller.enqueue('你好，');
      controller.enqueue('世界！');
      controller.close();
    }
  });

  // 使用 TextEncoderStream 将文本转换为字节
  const encoder = new TextEncoderStream();
  
  // 管道传输
  const byteStream = textStream.pipeThrough(encoder);
  
  // 读取字节
  const reader = byteStream.getReader();
  
  function readBytes() {
    return reader.read().then(({ done, value }) => {
      if (done) {
        console.log('字节读取完成');
        return;
      }
      console.log('字节数组:', Array.from(value));
      return readBytes();
    });
  }
  
  readBytes();
}

/**
 * @example 示例6：完整的数据处理管道
 * @description 模拟文件读取和处理流程
 */
function completePipelineExample() {
  // 模拟原始数据源（字节流）
  const rawDataStream = new ReadableStream({
    start(controller) {
      const data = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'];
      data.forEach(char => controller.enqueue(char));
      controller.close();
    }
  });

  // 步骤1：字节转文本
  const decoder = new TextDecoderStream();
  
  // 步骤2：文本转大写
  const upperCase = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk.toUpperCase());
    }
  });

  // 步骤3：添加标记
  const withPrefix = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue('[DATA] ' + chunk);
    }
  });

  // 构建管道
  const finalStream = rawDataStream
    .pipeThrough(decoder)
    .pipeThrough(upperCase)
    .pipeThrough(withPrefix);

  // 消费最终结果
  const reader = finalStream.getReader();
  
  reader.read().then(({ done, value }) => {
    console.log('最终结果:', value);
    // 输出: [DATA] HELLO WORLD
  });
}

// 运行示例
console.log('=== pipeThrough() 方法示例 ===\n');

// textDecoderExample();
// customTransformExample();
// chainedPipeExample();
// pipeWithOptionsExample();
// textEncoderExample();
// completePipelineExample();

// 如果在浏览器或 Node 环境中运行
if (typeof window !== 'undefined' || typeof global !== 'undefined') {
  textDecoderExample();
}

module.exports = {
  textDecoderExample,
  customTransformExample,
  chainedPipeExample,
  pipeWithOptionsExample,
  textEncoderExample,
  completePipelineExample
};
