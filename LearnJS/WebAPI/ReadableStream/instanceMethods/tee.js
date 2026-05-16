/**
 * @fileOverview ReadableStream.tee() 方法示例
 * @description tee() 方法将当前可读流进行"分支"，返回一个包含两个新的 ReadableStream 实例的数组。
 *               每个流接收相同的传入数据，可以独立读取。
 * @author Frontend Learning
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/tee
 */

/**
 * @description tee() 方法详解
 * 
 * 【方法概述】
 * tee() 方法是 ReadableStream 的实例方法，用于对可读流进行分支。
 * 它返回一个两元素数组，每个元素都是新的 ReadableStream 实例。
 * 这两个分支流接收相同的数据，可以独立读取。
 * 
 * 【语法】
 * tee()
 * 
 * 【参数】
 * 无参数
 * 
 * 【返回值】
 * @returns {ReadableStream[]} - 返回一个包含两个 ReadableStream 实例的数组
 *   - [0]: 第一个分支的 ReadableStream
 *   - [1]: 第二个分支的 ReadableStream
 * 
 * 【使用场景】
 * 1. Service Worker 中同时向浏览器和缓存传输数据
 * 2. 需要对同一数据流进行多次独立处理
 * 3. 实现数据的"复制"功能
 * 4. 多消费者场景（如同时播放和下载）
 * 
 * 【背压行为】
 * - 分支流会按照较快消费者的速度部分传递背压
 * - 未读数据会在较慢的消费者的内部队列中无限制地排队
 * - 如果两个分支都有未读元素在内部队列，原始流的控制器队列开始填充
 * - 填充满后控制器停止调用底层源的 pull()
 * 
 * 【重要注意事项】
 * - 分支流会锁定原始流
 * - 如果只需要一个分支，应该同时取消两个分支以释放资源
 * - 读取大流时不应以不同速度并行读取
 */

// ========== 示例代码 ==========

/**
 * @example 示例1：基本分支操作
 * @description 创建分支流并独立读取
 */
function basicTeeExample() {
  // 创建源流
  const sourceStream = new ReadableStream({
    start(controller) {
      controller.enqueue('数据A');
      controller.enqueue('数据B');
      controller.enqueue('数据C');
      controller.close();
    }
  });

  // 使用 tee() 分支
  const [branch1, branch2] = sourceStream.tee();

  console.log('源流锁定:', sourceStream.locked); // true

  // 读取第一个分支
  const reader1 = branch1.getReader();
  console.log('分支1读者获取');
  
  // 读取第二个分支
  const reader2 = branch2.getReader();
  console.log('分支2读者获取');

  // 读取第一个分支的数据
  reader1.read().then(({ done, value }) => {
    console.log('分支1读取:', value); // 数据A
    return reader1.read();
  }).then(({ done, value }) => {
    console.log('分支1读取:', value); // 数据B
  });

  // 读取第二个分支的数据
  reader2.read().then(({ done, value }) => {
    console.log('分支2读取:', value); // 数据A（相同的数据）
    return reader2.read();
  }).then(({ done, value }) => {
    console.log('分支2读取:', value); // 数据B
  });
}

/**
 * @example 示例2：同时处理分支流
 * @description 两个分支并行读取相同的数据
 */
function parallelBranchReading() {
  const stream = new ReadableStream({
    start(controller) {
      for (let i = 1; i <= 5; i++) {
        controller.enqueue(`块-${i}`);
      }
      controller.close();
    }
  });

  const [streamA, streamB] = stream.tee();

  // 并行读取两个分支
  function readStream(reader, name) {
    return reader.read().then(({ done, value }) => {
      if (done) {
        console.log(`${name} 完成`);
        return;
      }
      console.log(`${name} 读取: ${value}`);
      return readStream(reader, name);
    });
  }

  // 同时开始读取两个分支
  Promise.all([
    readStream(streamA.getReader(), '分支A'),
    readStream(streamB.getReader(), '分支B')
  ]).then(() => {
    console.log('所有分支读取完成');
  });
}

/**
 * @example 示例3：Service Worker 场景
 * @description 模拟同时向浏览器和缓存传输数据
 */
function serviceWorkerExample() {
  // 模拟网络响应流
  const responseStream = new ReadableStream({
    start(controller) {
      const data = [
        '<html>',
        '<body>',
        '<h1>Hello</h1>',
        '</body>',
        '</html>'
      ];
      data.forEach(line => controller.enqueue(line));
      controller.close();
    }
  });

  // 分支流：一个给浏览器，一个给缓存
  const [toBrowser, toCache] = responseStream.tee();

  // 模拟浏览器处理
  const browserReader = toBrowser.getReader();
  const browserChunks = [];
  
  // 模拟缓存处理
  const cacheWriter = new WritableStream({
    chunks: [],
    write(chunk) {
      this.chunks.push(chunk);
      return Promise.resolve();
    },
    close() {
      console.log('缓存写入完成:', this.chunks.join(''));
    }
  });

  // 同时处理两个分支
  function readToBrowser() {
    return browserReader.read().then(({ done, value }) => {
      if (done) {
        console.log('浏览器读取完成:', browserChunks.join(''));
        return;
      }
      browserChunks.push(value);
      return readToBrowser();
    });
  }

  // 管道传输到缓存
  const cachePromise = toCache.pipeTo(cacheWriter);

  // 等待两者都完成
  Promise.all([readToBrowser(), cachePromise])
    .then(() => {
      console.log('浏览器和缓存处理都完成');
    });
}

/**
 * @example 示例4：顺序读取分支
 * @description 先读一个分支，再读另一个
 */
function sequentialReading() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue('第一个');
      controller.enqueue('第二个');
      controller.enqueue('第三个');
      controller.close();
    }
  });

  const [branch1, branch2] = stream.tee();

  // 先完全读取分支1
  const reader1 = branch1.getReader();
  const branch1Data = [];

  function readBranch1() {
    return reader1.read().then(({ done, value }) => {
      if (done) {
        console.log('分支1数据:', branch1Data);
        // 读取分支2
        return readBranch2();
      }
      branch1Data.push(value);
      return readBranch1();
    });
  }

  // 再读取分支2
  function readBranch2() {
    const reader2 = branch2.getReader();
    const branch2Data = [];
    
    function readLoop() {
      return reader2.read().then(({ done, value }) => {
        if (done) {
          console.log('分支2数据:', branch2Data);
          return;
        }
        branch2Data.push(value);
        return readLoop();
      });
    }
    
    return readLoop();
  }

  readBranch1();
}

/**
 * @example 示例5：背压行为示例
 * @description 展示分支流的背压处理
 */
function backpressureExample() {
  let pullCount = 0;
  
  const source = new ReadableStream({
    start(controller) {
      console.log('源流启动');
    },
    pull(controller) {
      pullCount++;
      console.log(`底层源 pull 被调用 (第${pullCount}次)`);
      if (pullCount <= 3) {
        controller.enqueue(`数据块-${pullCount}`);
      } else {
        controller.close();
      }
    }
  });

  const [slowBranch, fastBranch] = source.tee();

  const slowReader = slowBranch.getReader();
  const fastReader = fastBranch.getReader();

  // 慢速消费者
  function slowConsumer() {
    return slowReader.read().then(({ done, value }) => {
      if (done) return;
      console.log('慢消费者读取:', value);
      return new Promise(r => setTimeout(() => r(), 1000)).then(slowConsumer);
    });
  }

  // 快速消费者
  function fastConsumer() {
    return fastReader.read().then(({ done, value }) => {
      if (done) return;
      console.log('快消费者读取:', value);
      return fastConsumer();
    });
  }

  // 快速消费者会更快消耗数据，触发底层源继续提供数据
  fastConsumer();
  setTimeout(() => slowConsumer(), 500);
}

/**
 * @example 示例6：取消分支
 * @description 展示如何正确取消分支流
 */
function cancelBranchesExample() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue('数据1');
      controller.enqueue('数据2');
      controller.enqueue('数据3');
      console.log('源流启动');
    },
    cancel(reason) {
      console.log('源流取消:', reason);
    }
  });

  const [branch1, branch2] = stream.tee();

  // 读取一些数据后取消第一个分支
  const reader1 = branch1.getReader();
  
  reader1.read().then(({ done, value }) => {
    console.log('分支1读取:', value);
    // 取消第一个分支
    return branch1.cancel('不再需要');
  }).then(() => {
    console.log('分支1已取消');
    // 第二个分支仍然可用
    const reader2 = branch2.getReader();
    return reader2.read();
  }).then(({ done, value }) => {
    console.log('分支2读取:', value); // 仍是数据1（两个分支从相同位置开始）
  });
}

/**
 * @example 示例7：处理大流时的注意事项
 * @description 警告：以不同速度并行读取大流会导致内存问题
 */
function largeStreamWarning() {
  // 创建一个产生大量数据的流
  const largeStream = new ReadableStream({
    start(controller) {
      console.log('大流已启动 - 注意：以不同速度读取可能导致内存问题');
    },
    pull(controller) {
      // 模拟产生数据
      controller.enqueue(`大量数据-${Date.now()}`);
    }
  });

  const [branch1, branch2] = largeStream.tee();

  // 快速读取分支1
  const reader1 = branch1.getReader();
  const fastRead = () => {
    reader1.read().then(({ done, value }) => {
      if (!done) fastRead();
    });
  };
  fastRead();

  // 慢速读取分支2（模拟场景）
  const reader2 = branch2.getReader();
  const slowRead = () => {
    reader2.read().then(({ done, value }) => {
      if (!done) {
        setTimeout(slowRead, 1000); // 每秒读一次
      }
    });
  };
  // 延迟启动慢读
  setTimeout(slowRead, 5000);

  console.log('警告：这种模式会导致未读数据在内存中堆积');
  console.log('应该使用完全背压到较慢分支的实现');
}

// 运行示例
console.log('=== tee() 方法示例 ===\n');

// basicTeeExample();
// parallelBranchReading();
// serviceWorkerExample();
// sequentialReading();
// backpressureExample();
// cancelBranchesExample();
// largeStreamWarning();

// 如果在浏览器或 Node 环境中运行
if (typeof window !== 'undefined' || typeof global !== 'undefined') {
  basicTeeExample();
}

module.exports = {
  basicTeeExample,
  parallelBranchReading,
  serviceWorkerExample,
  sequentialReading,
  backpressureExample,
  cancelBranchesExample,
  largeStreamWarning
};
