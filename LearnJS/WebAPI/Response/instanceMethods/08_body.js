/**
 * @file 08_body.js
 * @description Response.body 属性 - 响应体的流对象
 * @author LearnJS
 * @date 2026-05-17
 */

/**
 * @section 属性说明
 * 
 * body 是 Response 接口的一个只读属性，返回响应体的 ReadableStream 对象。
 * ReadableStream 提供了读取响应体的底层接口，可以用于流式处理大量数据。
 * 
 * 这是读取响应体最底层的方式，提供了最大的灵活性。
 * 
 * @section 语法
 * const stream = response.body;
 * 
 * @section 参数
 * 无（这是属性，不是方法）
 * 
 * @section 返回值
 * 返回一个 ReadableStream 对象，如果响应没有 body 则返回 null
 * 
 * @section 使用场景
 * 1. 流式读取大文件
 * 2. 实现进度监控
 * 3. 自定义数据处理管道
 * 4. 处理实时数据流
 * 5. 与其他流 API 配合使用
 * 
 * @section 注意事项
 * - 返回的是 ReadableStream，需要使用 getReader() 获取读取器
 * - 一旦创建了读取器，就不能再使用其他方法读取 body
 * - body 只能读取一次，之后 bodyUsed 会变为 true
 * - 支持 BYOB（Bring Your Own Buffer）模式进行零拷贝读取
 * - 可以使用 tee() 方法克隆流
 */

'use strict';

console.log('=== Response.body 属性示例 ===\n');

// ============================================================
// 注意：ReadableStream 是较新的 API，
// 以下示例主要展示概念，用模拟方式演示
// ============================================================

// 模拟 ReadableStream 简化版
class MockReadableStream {
    constructor(data) {
        this.data = data;
        this.readIndex = 0;
    }
    
    getReader() {
        return {
            read: async () => {
                if (this.readIndex >= this.data.length) {
                    return { done: true, value: undefined };
                }
                const chunk = this.data.slice(this.readIndex, this.readIndex + 1);
                this.readIndex += 1;
                return { done: false, value: chunk[0] };
            },
            cancel: async () => {},
            releaseLock: () => {}
        };
    }
    
    getReaderByob() {
        // BYOB (Bring Your Own Buffer) 模式
        return {
            read: async (view) => {
                if (this.readIndex >= this.data.length) {
                    return { done: true, value: undefined };
                }
                const bytesToRead = Math.min(view.byteLength, this.data.length - this.readIndex);
                const chunk = this.data.slice(this.readIndex, this.readIndex + bytesToRead);
                new Uint8Array(view.buffer).set(chunk);
                this.readIndex += bytesToRead;
                return { done: false, value: bytesToRead };
            }
        };
    }
}

// ============================================================
// 示例 1：获取 body 属性
// ============================================================
function example1GetBody() {
    console.log('--- 示例 1：获取 body 属性 ---');
    
    // 创建一个简单的响应
    const response = new Response('Hello World');
    
    // 获取 body 属性
    const body = response.body;
    
    console.log('body 存在:', body !== null);
    console.log('body 类型:', body === null ? 'null' : 'ReadableStream');
    console.log('');
}

// ============================================================
// 示例 2：使用 reader 读取流
// ============================================================
async function example2StreamReader() {
    console.log('--- 示例 2：使用 reader 读取流 ---');
    
    // 模拟数据
    const data = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
    const stream = new MockReadableStream(data);
    
    // 模拟响应
    const response = {
        body: stream
    };
    
    const reader = response.body.getReader();
    const chunks = [];
    
    // 读取所有数据
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }
    
    // 转换为字符串
    const text = String.fromCharCode(...chunks);
    console.log('读取到的文本:', text);
    console.log('读取块数:', chunks.length);
    console.log('');
}

// ============================================================
// 示例 3：流式处理大文件（模拟）
// ============================================================
async function example3LargeFileStream() {
    console.log('--- 示例 3：流式处理大文件（模拟）---');
    
    // 模拟大文件数据
    const largeData = new Uint8Array(100);
    for (let i = 0; i < largeData.length; i++) {
        largeData[i] = i;
    }
    
    const stream = new MockReadableStream(largeData);
    
    // 使用流式读取
    const reader = stream.getReader();
    let totalBytes = 0;
    let chunkCount = 0;
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        totalBytes += value;
        chunkCount++;
        
        // 模拟处理每个数据块
        console.log(`  块 ${chunkCount}: 读取字节值 ${value}`);
    }
    
    console.log(`\n总共读取: ${chunkCount} 块, ${totalBytes} 累计值`);
    console.log('');
}

// ============================================================
// 示例 4：使用 BYOB 模式读取
// ============================================================
async function example4ByobReader() {
    console.log('--- 示例 4：使用 BYOB 模式读取 ---');
    
    // BYOB (Bring Your Own Buffer) - 零拷贝读取
    const data = new Uint8Array([10, 20, 30, 40, 50]);
    const stream = new MockReadableStream(data);
    
    // 创建自己的缓冲区
    const buffer = new ArrayBuffer(10);
    const view = new Uint8Array(buffer);
    
    const reader = stream.getReaderByob();
    
    const { done, value } = await reader.read(view);
    
    console.log('读取完成:', done);
    console.log('读取字节数:', value);
    console.log('缓冲区内容:', Array.from(new Uint8Array(buffer).slice(0, value)));
    console.log('');
}

// ============================================================
// 示例 5：处理 body 为 null 的情况
// ============================================================
function example5NullBody() {
    console.log('--- 示例 5：处理 body 为 null 的情况 ---');
    
    // 创建没有 body 的响应（如 204 No Content）
    const response = new Response(null, {
        status: 204,
        statusText: 'No Content'
    });
    
    console.log('状态:', response.status);
    console.log('状态文本:', response.statusText);
    console.log('body:', response.body);
    console.log('');
}

// ============================================================
// 示例 6：与 bodyUsed 配合使用
// ============================================================
function example6WithBodyUsed() {
    console.log('--- 示例 6：与 bodyUsed 配合使用 ---');
    
    const response = new Response('Test Data');
    
    console.log('读取前:');
    console.log('  body:', response.body !== null ? 'ReadableStream' : null);
    console.log('  bodyUsed:', response.bodyUsed);
    
    // 使用 text() 读取
    response.text().then(() => {
        console.log('\n读取后:');
        console.log('  body:', response.body); // 流已被锁定
        console.log('  bodyUsed:', response.bodyUsed);
    });
    console.log('');
}

// ============================================================
// 示例 7：浏览器中的实际使用说明
// ============================================================
function example7BrowserUsage() {
    console.log('--- 示例 7：浏览器中的实际使用 ---');
    console.log('');
    console.log('在浏览器环境中，body 的典型用法:');
    console.log('');
    console.log('```javascript');
    console.log('// 获取响应');
    console.log('fetch(\'https://api.example.com/large-file\')');
    console.log('  .then(response => {');
    console.log('    const reader = response.body.getReader();');
    console.log('    ');
    console.log('    // 逐块读取');
    console.log('    function read() {');
    console.log('      return reader.read().then(({ done, value }) => {');
    console.log('        if (done) {');
    console.log('          console.log(\'读取完成\');');
    console.log('          return;');
    console.log('        }');
    console.log('        ');
    console.log('        // 处理数据块 value');
    console.log('        console.log(\'收到数据:\', value.length, \'字节\');');
    console.log('        ');
    console.log('        return read();');
    console.log('      });');
    console.log('    }');
    console.log('    ');
    console.log('    return read();');
    console.log('  });');
    console.log('```');
    console.log('');
    
    console.log('注意事项:');
    console.log('1. getReader() 后，不能再使用 json()/text() 等方法');
    console.log('2. 可以使用 TextDecoder 解码文本流');
    console.log('3. 支持取消读取 (reader.cancel())');
    console.log('4. 流的背压会自动处理');
    console.log('');
}

// ============================================================
// 运行所有示例
// ============================================================
async function runAllExamples() {
    console.log('开始运行 body 属性的所有示例...\n');
    
    example1GetBody();
    await example2StreamReader();
    await example3LargeFileStream();
    await example4ByobReader();
    example5NullBody();
    example6WithBodyUsed();
    example7BrowserUsage();
    
    console.log('=== 所有示例运行完成 ===');
}

if (typeof window !== 'undefined' || typeof global !== 'undefined') {
    runAllExamples().catch(console.error);
}

module.exports = { runAllExamples };
