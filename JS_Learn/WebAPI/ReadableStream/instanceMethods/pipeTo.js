/**
 * @fileOverview ReadableStream.pipeTo() 方法示例
 * @description pipeTo() 方法将当前可读流传输到指定的 WritableStream，并返回一个 Promise，
 *               当传输成功完成时 resolve，遇到错误时 reject。
 * @author Frontend Learning
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/pipeTo
 */

/**
 * @description pipeTo() 方法详解
 * 
 * 【方法概述】
 * pipeTo() 方法是 ReadableStream 的实例方法，用于将可读流的内容传输到可写流。
 * 它返回一个 Promise，当整个管道操作成功完成时 resolve，发生错误时 reject。
 * 
 * 【语法】
 * pipeTo(destination)
 * pipeTo(destination, options)
 * 
 * 【参数】
 * @param {WritableStream} destination - 目标可写流，数据将被写入此处
 * @param {Object} [options] - 可选的管道选项：
 *   - preventClose: true - 关闭源 ReadableStream 不再导致目标 WritableStream 关闭
 *   - preventAbort: true - 源 ReadableStream 的错误不再中止目标 WritableStream
 *   - preventCancel: true - 目标 WritableStream 的错误不再取消源 ReadableStream
 * 
 * 【返回值】
 * @returns {Promise<undefined>} - 返回一个 Promise，管道完成时 resolve（值为 undefined）
 * 
 * 【使用场景】
 * 1. 将网络响应数据写入文件系统
 * 2. 流式处理和存储数据
 * 3. 将一个流的数据传输到另一个流
 * 4. 构建数据处理管道
 * 
 * 【背压（Backpressure）】
 * - pipeTo() 自动处理背压
 * - 如果可写流无法接受更多数据，可读流会自动暂停
 * 
 * 【与 pipeThrough() 的区别】
 * - pipeTo(): 传输到终点，返回 Promise，无法链式操作
 * - pipeThrough(): 通过转换流，返回转换后的流，可继续链式操作
 */

// ========== 示例代码 ==========

/**
 * @example 示例1：基本管道传输
 * @description 将可读流的数据传输到可写流
 */
function basicPipeToExample() {
  // 源可读流
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue('第一部分数据\n');
      controller.enqueue('第二部分数据\n');
      controller.enqueue('第三部分数据\n');
      controller.close();
    }
  });

  // 目标可写流（模拟）
  let writtenData = '';
  const writableStream = new WritableStream({
    write(chunk) {
      return new Promise((resolve) => {
        writtenData += chunk;
        console.log('写入:', chunk.trim());
        resolve();
      });
    },
    close() {
      console.log('可写流已关闭');
      console.log('全部数据:', writtenData);
    },
    abort(err) {
      console.error('可写流错误:', err);
    }
  });

  // 使用 pipeTo 传输
  readableStream.pipeTo(writableStream)
    .then(() => {
      console.log('管道传输成功完成');
    })
    .catch(err => {
      console.error('管道传输失败:', err);
    });
}

/**
 * @example 示例2：模拟文件写入
 * @description 模拟将网络响应写入文件
 */
function fileWriteExample() {
  // 模拟网络响应体（可读流）
  const responseBody = new ReadableStream({
    start(controller) {
      const data = [
        '<html>',
        '<body>',
        '<h1>Hello World</h1>',
        '<p>This is a test page</p>',
        '</body>',
        '</html>'
      ];
      data.forEach(line => controller.enqueue(line + '\n'));
      controller.close();
    }
  });

  // 模拟文件写入流
  const fileStream = new WritableStream({
    chunks: [],
    write(chunk) {
      return new Promise((resolve) => {
        this.chunks.push(chunk);
        console.log('写入 chunk:', chunk.trim());
        setTimeout(resolve, 100); // 模拟异步写入
      });
    },
    close() {
      console.log('文件写入完成');
      console.log('文件内容:');
      console.log(this.chunks.join(''));
    }
  });

  // 传输到文件流
  responseBody.pipeTo(fileStream)
    .then(() => {
      console.log('文件保存成功');
    });
}

/**
 * @example 示例3：使用选项控制管道行为
 * @description 使用 preventCancel 选项
 */
function pipeWithOptions() {
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue('数据1');
      controller.enqueue('数据2');
      controller.close();
    },
    cancel(reason) {
      console.log('源流取消:', reason);
    }
  });

  const writable = new WritableStream({
    write(chunk) {
      console.log('写入:', chunk);
      // 模拟在写入过程中出现问题
      if (chunk === '数据2') {
        return Promise.reject(new Error('写入失败'));
      }
      return Promise.resolve();
    },
    close() {
      console.log('可写流关闭');
    },
    abort(err) {
      console.log('可写流中止:', err.message);
    }
  });

  // 使用 preventCancel：可写流错误不会取消源流
  readable.pipeTo(writable, { preventCancel: true })
    .then(() => {
      console.log('管道完成');
    })
    .catch(err => {
      console.log('管道错误（预期）:', err.message);
    });
}

/**
 * @example 示例4：背压处理
 * @description 展示 pipeTo 自动处理背压
 */
function backpressureExample() {
  // 慢速源流
  const slowSource = new ReadableStream({
    start(controller) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < 5) {
          controller.enqueue(`chunk-${i++}`);
          console.log(`源: 产生 chunk-${i-1}`);
        } else {
          clearInterval(timer);
          controller.close();
        }
      }, 100);
    }
  });

  // 慢速目标流（写入速度慢）
  const slowDest = new WritableStream({
    write(chunk) {
      return new Promise((resolve) => {
        console.log(`目标: 开始写入 ${chunk}`);
        setTimeout(() => {
          console.log(`目标: 完成写入 ${chunk}`);
          resolve();
        }, 200); // 写入比产生慢
      });
    },
    close() {
      console.log('目标流关闭');
    }
  });

  // pipeTo 会自动处理速度差异
  slowSource.pipeTo(slowDest)
    .then(() => {
      console.log('管道完成');
    });
}

/**
 * @example 示例5：完整的 HTTP 响应处理
 * @description 模拟处理 fetch 响应并将数据写入
 */
function httpResponseExample() {
  // 模拟 fetch 响应
  const mockFetchResponse = {
    body: new ReadableStream({
      start(controller) {
        const chunks = [
          JSON.stringify({ type: 'header', data: 'response' }),
          JSON.stringify({ type: 'body', data: 'content' }),
          JSON.stringify({ type: 'footer', data: 'end' })
        ];
        chunks.forEach(chunk => controller.enqueue(chunk));
        controller.close();
      }
    })
  };

  // 模拟存储流
  const storageStream = new WritableStream({
    storedData: [],
    write(chunk) {
      return new Promise((resolve) => {
        this.storedData.push(chunk);
        console.log('存储:', chunk);
        resolve();
      });
    },
    close() {
      console.log('存储完成，共存储', this.storedData.length, '项');
    }
  });

  // 将响应体管道传输到存储
  mockFetchResponse.body.pipeTo(storageStream)
    .then(() => {
      console.log('HTTP 响应处理完成');
    })
    .catch(err => {
      console.error('处理失败:', err);
    });
}

/**
 * @example 示例6：处理管道错误
 * @description 展示如何处理管道中的错误
 */
function errorHandlingExample() {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue('good');
      controller.enqueue('bad');
      controller.enqueue('more');
    },
    cancel(reason) {
      console.log('源取消:', reason);
    }
  });

  const dest = new WritableStream({
    write(chunk) {
      if (chunk === 'bad') {
        return Promise.reject(new Error('遇到错误数据'));
      }
      console.log('写入:', chunk);
      return Promise.resolve();
    },
    close() {
      console.log('目标关闭');
    },
    abort(err) {
      console.log('目标中止:', err.message);
    }
  });

  source.pipeTo(dest)
    .then(() => {
      console.log('成功');
    })
    .catch(err => {
      console.log('管道失败:', err.message);
      // 管道失败后，源流可能处于错误状态
      console.log('源流锁定状态:', source.locked);
    });
}

// 运行示例
console.log('=== pipeTo() 方法示例 ===\n');

// basicPipeToExample();
// fileWriteExample();
// pipeWithOptions();
// backpressureExample();
// httpResponseExample();
// errorHandlingExample();

// 如果在浏览器或 Node 环境中运行
if (typeof window !== 'undefined' || typeof global !== 'undefined') {
  basicPipeToExample();
}

module.exports = {
  basicPipeToExample,
  fileWriteExample,
  pipeWithOptions,
  backpressureExample,
  httpResponseExample,
  errorHandlingExample
};
