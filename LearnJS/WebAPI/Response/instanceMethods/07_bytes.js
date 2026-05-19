/**
 * @file 07_bytes.js
 * @description Response.bytes() 方法 - 获取 Uint8Array 数据
 * @author LearnJS
 * @date 2026-05-17
 */

/**
 * @section 方法说明
 * 
 * bytes() 方法用于读取响应体并将其作为 Uint8Array 返回。
 * Uint8Array 是 TypedArray 的一种，表示 8 位无符号整数数组。
 * 它是处理原始字节数据的便捷方式，特别适合二进制数据的读取和处理。
 * 
 * bytes() 是较新的方法，比 arrayBuffer() 更直接地返回字节数组。
 * 
 * @section 语法
 * bytes()
 * 
 * @section 参数
 * 无
 * 
 * @section 返回值
 * 返回一个 Promise，该 Promise 解析为 Uint8Array 对象
 * 
 * @section 使用场景
 * 1. 处理二进制原始数据
 * 2. 读取固定大小的二进制数据
 * 3. 与其他使用字节数组的 API 配合使用
 * 4. 解析自定义二进制协议
 * 5. 处理流式数据
 * 
 * @section 注意事项
 * - 返回的是 Uint8Array，可以直接作为数组使用
 * - 调用 bytes() 后，bodyUsed 会变为 true
 * - Uint8Array 的每个元素是 0-255 之间的整数
 * - 可以转换为 ArrayBuffer（通过 .buffer 属性）
 * - 比 arrayBuffer() 更适合需要直接操作字节的场景
 * - 浏览器支持情况可能不如其他方法广泛
 */

'use strict';

console.log('=== Response.bytes() 方法示例 ===\n');

// ============================================================
// 示例 1：基本 Bytes 读取
// ============================================================
async function example1BasicBytes() {
    console.log('--- 示例 1：基本 Bytes 读取 ---');
    
    // 创建二进制数据
    const data = new Uint8Array([72, 101, 108, 108, 111, 32, 66, 121, 116, 101, 115]);
    const blob = new Blob([data]);
    const response = new Response(blob);
    
    // 使用 bytes() 读取
    const bytes = await response.bytes();
    
    console.log('Uint8Array 长度:', bytes.length);
    console.log('第一个字节:', bytes[0], '(H)');
    console.log('数据类型:', bytes.constructor.name);
    console.log('');
}

// ============================================================
// 示例 2：处理文本数据
// ============================================================
async function example2TextAsBytes() {
    console.log('--- 示例 2：处理文本数据 ---');
    
    // 文本转 bytes
    const text = 'Hello World';
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    
    const blob = new Blob([encoded]);
    const response = new Response(blob);
    
    const bytes = await response.bytes();
    
    console.log('原始文本:', text);
    console.log('字节长度:', bytes.length);
    console.log('字节数组:', Array.from(bytes));
    
    // 转回文本
    const decoded = new TextDecoder().decode(bytes);
    console.log('解码后:', decoded);
    console.log('');
}

// ============================================================
// 示例 3：处理图像字节
// ============================================================
async function example3ImageBytes() {
    console.log('--- 示例 3：处理图像字节 ---');
    
    // 模拟 PNG 文件结构
    const pngBytes = new Uint8Array([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,  // PNG 签名
        0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,  // IHDR 块
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,  // 1x1 像素
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE  // 颜色类型等
    ]);
    
    const blob = new Blob([pngBytes], { type: 'image/png' });
    const response = new Response(blob);
    
    const bytes = await response.bytes();
    
    console.log('PNG 签名检查:');
    console.log('  前 8 字节:', Array.from(bytes.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join(' '));
    console.log('  是有效 PNG:', bytes[0] === 0x89 && bytes[1] === 0x50);
    console.log('');
}

// ============================================================
// 示例 4：字节数组操作
// ============================================================
async function example4ByteOperations() {
    console.log('--- 示例 4：字节数组操作 ---');
    
    const data = new Uint8Array([10, 20, 30, 40, 50]);
    const blob = new Blob([data]);
    const response = new Response(blob);
    
    const bytes = await response.bytes();
    
    console.log('原始字节:', Array.from(bytes));
    
    // 数组操作
    console.log('遍历:');
    bytes.forEach((b, i) => console.log(`  [${i}]: ${b}`));
    
    // 切片
    const slice = bytes.slice(1, 4);
    console.log('切片 [1:4]:', Array.from(slice));
    
    // 子数组（共享内存）
    const sub = bytes.subarray(1, 4);
    console.log('子数组 [1:4]:', Array.from(sub));
    console.log('');
}

// ============================================================
// 示例 5：二进制协议处理
// ============================================================
async function example5ProtocolBytes() {
    console.log('--- 示例 5：二进制协议处理 ---');
    
    // 模拟简单的二进制消息协议
    // 格式: [类型:1字节][序号:2字节][长度:1字节][数据][校验:1字节]
    const message = new Uint8Array([
        0x01,       // 类型: 文本
        0x05, 0x00, // 序号: 5 (小端序)
        0x04,       // 长度: 4
        0x48, 0x65, 0x6C, 0x6C, // "Hell"
        0x6F,       // "o" (第5个，实际上长度是5)
        0x00        // 校验
    ]);
    
    const blob = new Blob([message]);
    const response = new Response(blob);
    
    const bytes = await response.bytes();
    
    // 解析
    const type = bytes[0];
    const sequence = bytes[1] | (bytes[2] << 8);
    const length = bytes[3];
    const data = Array.from(bytes.slice(4, 4 + length)).map(b => String.fromCharCode(b)).join('');
    
    console.log('协议解析:');
    console.log('  类型:', type);
    console.log('  序号:', sequence);
    console.log('  长度:', length);
    console.log('  数据:', data);
    console.log('');
}

// ============================================================
// 示例 6：与 ArrayBuffer 比较
// ============================================================
async function example6CompareArrayBuffer() {
    console.log('--- 示例 6：bytes() 与 arrayBuffer() 比较 ---');
    
    const data = new Uint8Array([1, 2, 3, 4, 5]);
    const blob = new Blob([data]);
    
    // 使用 bytes()
    const response1 = new Response(blob);
    const bytesResult = await response1.bytes();
    
    // 使用 arrayBuffer()
    const response2 = new Response(blob);
    const arrayBufferResult = await response2.arrayBuffer();
    
    console.log('bytes() 结果:');
    console.log('  类型:', bytesResult.constructor.name);
    console.log('  长度:', bytesResult.length);
    console.log('  直接访问:', bytesResult[0], bytesResult[1], bytesResult[2]);
    
    console.log('\narrayBuffer() 结果:');
    console.log('  类型:', arrayBufferResult.constructor.name);
    console.log('  长度:', arrayBufferResult.byteLength);
    console.log('  需要视图:', new Uint8Array(arrayBufferResult)[0]);
    
    console.log('\nbytes() 更适合直接字节操作');
    console.log('arrayBuffer() 适合需要底层Buffer的场景');
    console.log('');
}

// ============================================================
// 示例 7：处理大块数据
// ============================================================
async function example7LargeData() {
    console.log('--- 示例 7：处理大块数据（模拟）---');
    
    // 创建 10KB 的测试数据
    const chunk = new Uint8Array(1024);
    for (let i = 0; i < chunk.length; i++) {
        chunk[i] = i % 256;
    }
    
    // 重复 10 次 = 10KB
    const largeData = new Blob([chunk, chunk, chunk, chunk, chunk,
                                chunk, chunk, chunk, chunk, chunk]);
    
    const response = new Response(largeData);
    
    const startTime = Date.now();
    const bytes = await response.bytes();
    const endTime = Date.now();
    
    console.log('数据大小:', (bytes.length / 1024).toFixed(2), 'KB');
    console.log('读取耗时:', endTime - startTime, 'ms');
    console.log('前 10 字节:', Array.from(bytes.slice(0, 10)));
    console.log('后 10 字节:', Array.from(bytes.slice(-10)));
    console.log('');
}

// ============================================================
// 运行所有示例
// ============================================================
async function runAllExamples() {
    console.log('开始运行 bytes() 方法的所有示例...\n');
    
    await example1BasicBytes();
    await example2TextAsBytes();
    await example3ImageBytes();
    await example4ByteOperations();
    await example5ProtocolBytes();
    await example6CompareArrayBuffer();
    await example7LargeData();
    
    console.log('=== 所有示例运行完成 ===');
}

if (typeof window !== 'undefined' || typeof global !== 'undefined') {
    runAllExamples().catch(console.error);
}

module.exports = { runAllExamples };
