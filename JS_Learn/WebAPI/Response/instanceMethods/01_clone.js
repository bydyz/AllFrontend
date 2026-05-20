/**
 * @file 01_clone.js
 * @description Response.clone() 方法 - 克隆响应对象
 * @author LearnJS
 * @date 2026-05-17
 */

/**
 * @section 方法说明
 * 
 * clone() 方法用于创建 Response 对象的完整克隆。
 * 克隆的响应对象在所有方面都与原始响应相同，但存储在不同的变量中。
 * 
 * 这是非常有用的，因为 Response 的主体（body）只能读取一次。
 * 如果需要多次读取响应数据，必须先克隆它。
 * 
 * @section 语法
 * clone()
 * 
 * @section 参数
 * 无
 * 
 * @section 返回值
 * 返回一个新的 Response 对象，是原始响应的克隆
 * 
 * @section 使用场景
 * 1. 需要多次读取同一个响应的内容
 * 2. 需要将响应同时用于多个目的（如显示图片和上传）
 * 3. 需要在不影响原始响应的情况下处理响应数据
 * 4. 在 Service Worker 中复制响应
 * 
 * @section 注意事项
 * - 如果响应体已经被读取（bodyUsed 为 true），clone() 会抛出 TypeError
 * - 克隆的响应会共享相同的底层流，但各自维护独立的读取位置
 * - 克隆响应不会影响原始响动的 bodyUsed 状态
 * - 对大文件使用 clone() 时要谨慎，因为这会在内存中保留两份数据
 * - 背压（backpressure）机制：两个消费者中较快的那个会限制数据生产速度
 */

'use strict';

console.log('=== Response.clone() 方法示例 ===\n');

// ============================================================
// 示例 1：基本克隆 - 读取图片两次
// ============================================================
async function example1CloneImage() {
    console.log('--- 示例 1：基本克隆 - 读取图片两次 ---');
    
    // 创建一个模拟的图片响应
    const imageData = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]); // PNG 文件头
    const blob = new Blob([imageData], { type: 'image/png' });
    const response = new Response(blob);
    
    // 克隆响应
    const clonedResponse = response.clone();
    
    // 从原始响应读取
    const originalBlob = await response.blob();
    console.log('原始响应 Blob 大小:', originalBlob.size);
    console.log('原始响应 bodyUsed:', response.bodyUsed);
    
    // 从克隆响应读取
    const clonedBlob = await clonedResponse.blob();
    console.log('克隆响应 Blob 大小:', clonedBlob.size);
    console.log('克隆响应 bodyUsed:', clonedResponse.bodyUsed);
    
    // 验证两个 Blob 相同
    console.log('两个 Blob 数据相同:', originalBlob.size === clonedBlob.size);
    console.log('');
}

// ============================================================
// 示例 2：同时处理响应多次
// ============================================================
async function example2MultipleUses() {
    console.log('--- 示例 2：同时处理响应多次 ---');
    
    // 模拟一个 JSON API 响应
    const jsonData = JSON.stringify({ 
        message: 'Hello', 
        data: [1, 2, 3, 4, 5] 
    });
    const response = new Response(jsonData, {
        headers: { 'Content-Type': 'application/json' }
    });
    
    // 克隆响应，这样可以用不同的方式处理它
    const clonedResponse = response.clone();
    
    // 使用原始响应获取 JSON
    const json = await response.json();
    console.log('原始响应解析的 JSON:', json);
    
    // 使用克隆响应获取文本
    const text = await clonedResponse.text();
    console.log('克隆响应获取的文本:', text);
    console.log('');
}

// ============================================================
// 示例 3：fetch 中的克隆使用
// ============================================================
async function example3FetchClone() {
    console.log('--- 示例 3：fetch 中的克隆使用 ---');
    console.log('（模拟 fetch 场景，假设有网络请求）\n');
    
    // 创建一个模拟的 fetch 响应
    const mockFetchResponse = async () => {
        const data = JSON.stringify({
            id: 1,
            name: '示例商品',
            price: 99.99,
            description: '这是一个示例商品描述'
        });
        return new Response(data, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    };
    
    // 模拟 fetch 调用
    const response = await mockFetchResponse();
    
    // 克隆响应
    const responseForDisplay = response.clone();
    const responseForProcess = response.clone();
    
    // 第一个克隆：用于显示
    const dataForDisplay = await responseForDisplay.json();
    console.log('用于显示的数据:', dataForDisplay.name);
    
    // 第二个克隆：用于处理
    const dataForProcess = await responseForProcess.json();
    console.log('用于处理的数据:', dataForProcess.price);
    
    console.log('');
}

// ============================================================
// 示例 4：处理已使用 body 的错误
// ============================================================
async function example4BodyUsedError() {
    console.log('--- 示例 4：处理已使用 body 的错误 ---');
    
    const response = new Response('Hello World');
    
    // 先读取响应体
    await response.text();
    
    console.log('bodyUsed 状态:', response.bodyUsed);
    
    // 尝试克隆已使用的响应
    try {
        const cloned = response.clone();
    } catch (error) {
        console.log('错误:', error.message);
        console.log('（预期行为：已使用的 body 无法克隆）');
    }
    console.log('');
}

// ============================================================
// 示例 5：Service Worker 中的使用
// ============================================================
function example5ServiceWorker() {
    console.log('--- 示例 5：Service Worker 中的使用 ---');
    console.log('在 Service Worker 中，clone() 常用于：');
    console.log('1. 缓存响应副本');
    console.log('2. 同时返回响应给客户端并保存到缓存');
    console.log('3. 修改响应后保留原始响应');
    console.log('');
    
    // 模拟 Service Worker 场景
    const cacheResponse = new Response('Cached Content', {
        headers: { 'Content-Type': 'text/plain' }
    });
    
    // 克隆响应用于缓存
    const responseToClient = cacheResponse.clone();
    const responseToCache = cacheResponse.clone();
    
    console.log('原始响应:', responseToClient.bodyUsed);
    console.log('克隆1 (返回给客户端):', responseToClient.bodyUsed);
    console.log('克隆2 (存入缓存):', responseToCache.bodyUsed);
    console.log('');
}

// ============================================================
// 运行所有示例
// ============================================================
async function runAllExamples() {
    console.log('开始运行 clone() 方法的所有示例...\n');
    
    await example1CloneImage();
    await example2MultipleUses();
    await example3FetchClone();
    await example4BodyUsedError();
    example5ServiceWorker();
    
    console.log('=== 所有示例运行完成 ===');
}

// 如果在浏览器环境或 Node.js 环境中运行
if (typeof window !== 'undefined' || typeof global !== 'undefined') {
    runAllExamples().catch(console.error);
}

module.exports = { runAllExamples };
