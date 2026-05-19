/**
 * @file 09_bodyUsed.js
 * @description Response.bodyUsed 属性 - 标记响应体是否已被读取
 * @author LearnJS
 * @date 2026-05-17
 */

/**
 * @section 属性说明
 * 
 * bodyUsed 是 Response 接口的一个只读布尔属性，用于声明响应体是否已被读取。
 * 这是一个重要的状态标记，帮助开发者了解响应体的使用情况。
 * 
 * Response 的主体只能读取一次（因为流只能遍历一次），
 * bodyUsed 属性用于追踪这个状态。
 * 
 * @section 语法
 * const used = response.bodyUsed;
 * 
 * @section 参数
 * 无（这是属性，不是方法）
 * 
 * @section 返回值
 * 返回一个布尔值：
 * - true: 响应体已被读取
 * - false: 响应体尚未被读取
 * 
 * @section 使用场景
 * 1. 检查响应是否已被读取
 * 2. 防止重复读取已使用的响应
 * 3. 调试响应状态
 * 4. 在调用 clone() 前检查是否可以克隆
 * 
 * @section 注意事项
 * - 一旦读取了响应体（使用任何读取方法），bodyUsed 会变为 true
 * - 使用 clone() 不会改变原始响应的 bodyUsed 状态
 * - 读取 body 属性（ReadableStream）也会使 bodyUsed 变为 true
 * - 如果尝试读取已使用的响应体的克隆，不会影响原始响应的 bodyUsed
 * - bodyUsed 是内部状态，直接修改它不会生效
 */

'use strict';

console.log('=== Response.bodyUsed 属性示例 ===\n');

// ============================================================
// 示例 1：基本 bodyUsed 检查
// ============================================================
function example1BasicCheck() {
    console.log('--- 示例 1：基本 bodyUsed 检查 ---');
    
    // 创建新响应
    const response = new Response('Hello World');
    
    console.log('读取前 bodyUsed:', response.bodyUsed);
    console.log('预期: false (未读取)');
    console.log('');
    
    // 读取响应体
    response.text().then(() => {
        console.log('读取后 bodyUsed:', response.bodyUsed);
        console.log('预期: true (已读取)');
        console.log('');
    });
}

// ============================================================
// 示例 2：不同读取方法对 bodyUsed 的影响
// ============================================================
async function example2DifferentMethods() {
    console.log('--- 示例 2：不同读取方法对 bodyUsed 的影响 ---');
    
    // 测试 text()
    const response1 = new Response('Text Data');
    console.log('使用 text() 前:', response1.bodyUsed);
    await response1.text();
    console.log('使用 text() 后:', response1.bodyUsed);
    
    // 测试 json()
    const response2 = new Response('{}');
    console.log('\n使用 json() 前:', response2.bodyUsed);
    await response2.json();
    console.log('使用 json() 后:', response2.bodyUsed);
    
    // 测试 blob()
    const response3 = new Response(new Blob(['']));
    console.log('\n使用 blob() 前:', response3.bodyUsed);
    await response3.blob();
    console.log('使用 blob() 后:', response3.bodyUsed);
    
    // 测试 arrayBuffer()
    const response4 = new Response(new Blob(['']));
    console.log('\n使用 arrayBuffer() 前:', response4.bodyUsed);
    await response4.arrayBuffer();
    console.log('使用 arrayBuffer() 后:', response4.bodyUsed);
    
    // 测试 bytes()
    const response5 = new Response(new Blob(['']));
    console.log('\n使用 bytes() 前:', response5.bodyUsed);
    await response5.bytes();
    console.log('使用 bytes() 后:', response5.bodyUsed);
    
    console.log('\n结论: 所有读取方法都会将 bodyUsed 设为 true');
    console.log('');
}

// ============================================================
// 示例 3：clone() 与 bodyUsed 的关系
// ============================================================
async function example3CloneBodyUsed() {
    console.log('--- 示例 3：clone() 与 bodyUsed 的关系 ---');
    
    const originalResponse = new Response('Original Data');
    
    console.log('初始状态:');
    console.log('  原始响应 bodyUsed:', originalResponse.bodyUsed);
    
    // 克隆响应
    const clonedResponse = originalResponse.clone();
    
    console.log('\n克隆后:');
    console.log('  原始响应 bodyUsed:', originalResponse.bodyUsed);
    console.log('  克隆响应 bodyUsed:', clonedResponse.bodyUsed);
    console.log('  （克隆创建时，两个都是 false）');
    
    // 读取克隆的响应
    await clonedResponse.text();
    
    console.log('\n读取克隆后:');
    console.log('  原始响应 bodyUsed:', originalResponse.bodyUsed);
    console.log('  克隆响应 bodyUsed:', clonedResponse.bodyUsed);
    console.log('  （读取克隆不影响原始响应）');
    
    console.log('\n结论: clone() 创建的响应有独立的 bodyUsed 状态');
    console.log('');
}

// ============================================================
// 示例 4：使用 body 属性后 bodyUsed 为 true
// ============================================================
async function example4BodyProperty() {
    console.log('--- 示例 4：使用 body 属性后 bodyUsed 为 true ---');
    
    const response = new Response('Stream Data');
    
    console.log('读取 body 前:', response.bodyUsed);
    console.log('body 是否存在:', response.body !== null);
    
    // 获取 body 并创建 reader
    const reader = response.body.getReader();
    
    // 注意：在某些实现中，获取 reader 就会使 bodyUsed 变为 true
    console.log('\n获取 reader 后:', response.bodyUsed);
    console.log('（读取流也会标记 body 已使用）');
    
    // 关闭 reader
    reader.cancel();
    console.log('');
}

// ============================================================
// 示例 5：防止重复读取
// ============================================================
async function example5PreventReuse() {
    console.log('--- 示例 5：防止重复读取 ---');
    
    const response = new Response('Important Data');
    
    // 第一次读取
    const text = await response.text();
    console.log('第一次读取成功:', text);
    console.log('bodyUsed:', response.bodyUsed);
    
    // 尝试第二次读取
    try {
        const textAgain = await response.text();
        console.log('第二次读取成功:', textAgain);
    } catch (error) {
        console.log('第二次读取失败:', error.message);
        console.log('（预期行为：不能重复读取已使用的响应体）');
    }
    console.log('');
}

// ============================================================
// 示例 6：在调用 clone 前的检查
// ============================================================
async function example6CheckBeforeClone() {
    console.log('--- 示例 6：在调用 clone 前的检查 ---');
    
    // 场景 1: 未读取的响应
    const response1 = new Response('Data 1');
    console.log('场景 1 - 未读取:');
    console.log('  bodyUsed:', response1.bodyUsed);
    console.log('  可以克隆:', !response1.bodyUsed);
    
    // 场景 2: 已读取的响应
    const response2 = new Response('Data 2');
    await response2.text();
    console.log('\n场景 2 - 已读取:');
    console.log('  bodyUsed:', response2.bodyUsed);
    console.log('  可以克隆:', !response2.bodyUsed);
    
    try {
        const cloned = response2.clone();
        console.log('  克隆成功（某些实现允许）');
    } catch (e) {
        console.log('  克隆失败:', e.message);
    }
    console.log('');
}

// ============================================================
// 示例 7：检查已使用的响应
// ============================================================
async function example7CheckUsedResponse() {
    console.log('--- 示例 7：检查已使用的响应状态 ---');
    
    const response = new Response(JSON.stringify({ name: 'Test' }), {
        headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('初始状态:');
    console.log('  ok:', response.ok);
    console.log('  status:', response.status);
    console.log('  bodyUsed:', response.bodyUsed);
    console.log('  body:', response.body !== null ? 'ReadableStream' : null);
    
    // 读取响应
    const data = await response.json();
    console.log('\n读取后状态:');
    console.log('  解析的数据:', data);
    console.log('  bodyUsed:', response.bodyUsed);
    console.log('  body:', response.body); // 可能为 null 或流已关闭
    
    // 检查流是否仍可读
    console.log('  流是否可用:', response.bodyUsed ? '不可用' : '可用');
    console.log('');
}

// ============================================================
// 运行所有示例
// ============================================================
async function runAllExamples() {
    console.log('开始运行 bodyUsed 属性的所有示例...\n');
    
    example1BasicCheck();
    await example2DifferentMethods();
    await example3CloneBodyUsed();
    await example4BodyProperty();
    await example5PreventReuse();
    await example6CheckBeforeClone();
    await example7CheckUsedResponse();
    
    console.log('=== 所有示例运行完成 ===');
}

if (typeof window !== 'undefined' || typeof global !== 'undefined') {
    runAllExamples().catch(console.error);
}

module.exports = { runAllExamples };
