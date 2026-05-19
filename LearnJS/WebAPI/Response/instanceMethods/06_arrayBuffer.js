/**
 * @file 06_arrayBuffer.js
 * @description Response.arrayBuffer() 方法 - 获取 ArrayBuffer 数据
 * @author LearnJS
 * @date 2026-05-17
 */

/**
 * @section 方法说明
 * 
 * arrayBuffer() 方法用于读取响应体并将其作为 ArrayBuffer 返回。
 * ArrayBuffer 表示固定长度的二进制数据缓冲区。
 * 它是处理二进制原始数据的底层接口，可以转换为其他二进制格式。
 * 
 * 适用于需要处理原始二进制数据的场景，如 WebGL、Web Audio 等。
 * 
 * @section 语法
 * arrayBuffer()
 * 
 * @section 参数
 * 无
 * 
 * @section 返回值
 * 返回一个 Promise，该 Promise 解析为 ArrayBuffer 对象
 * 
 * @section 使用场景
 * 1. 处理二进制协议数据
 * 2. WebGL 纹理数据处理
 * 3. Web Audio API 音频数据处理
 * 4. 自定义二进制格式解析
 * 5. 与 TypedArrays 结合使用
 * 
 * @section 注意事项
 * - ArrayBuffer 是固定长度的，无法修改
 * - 调用 arrayBuffer() 后，bodyUsed 会变为 true
 * - ArrayBuffer 可以通过视图（View）来读取和修改
 * - 适用于处理固定大小的二进制数据
 * - 可以转换为 Blob 或其他格式
 */

'use strict';

console.log('=== Response.arrayBuffer() 方法示例 ===\n');

// ============================================================
// 示例 1：基本 ArrayBuffer 读取
// ============================================================
async function example1BasicArrayBuffer() {
    console.log('--- 示例 1：基本 ArrayBuffer 读取 ---');
    
    // 创建二进制数据
    const data = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
    const blob = new Blob([data]);
    const response = new Response(blob);
    
    // 使用 arrayBuffer() 读取
    const arrayBuffer = await response.arrayBuffer();
    
    console.log('ArrayBuffer 字节长度:', arrayBuffer.byteLength);
    console.log('是 ArrayBuffer 实例:', arrayBuffer instanceof ArrayBuffer);
    console.log('');
}

// ============================================================
// 示例 2：处理图像数据
// ============================================================
async function example2ImageData() {
    console.log('--- 示例 2：处理图像数据 ---');
    
    // 模拟 BMP 图像数据（BMP 文件头）
    const bmpHeader = new Uint8Array([
        0x42, 0x4D,             // "BM"
        0x46, 0x00, 0x00, 0x00, // 文件大小
        0x00, 0x00,             // 保留
        0x00, 0x00,             // 保留
        0x36, 0x00, 0x00, 0x00  // 像素数据偏移
    ]);
    
    const blob = new Blob([bmpHeader], { type: 'image/bmp' });
    const response = new Response(blob);
    
    const buffer = await response.arrayBuffer();
    
    console.log('图像数据大小:', buffer.byteLength, '字节');
    
    // 读取前几个字节来识别格式
    const view = new Uint8Array(buffer);
    console.log('文件头标识:', String.fromCharCode(view[0], view[1]));
    console.log('');
}

// ============================================================
// 示例 3：处理音频数据
// ============================================================
async function example3AudioData() {
    console.log('--- 示例 3：处理音频数据 ---');
    
    // 模拟 WAV 文件头（简化版）
    const wavHeader = new Uint8Array([
        0x52, 0x49, 0x46, 0x46, // "RIFF"
        0x24, 0x00, 0x00, 0x00, // 文件大小 - 8
        0x57, 0x41, 0x56, 0x45, // "WAVE"
        0x66, 0x6D, 0x74, 0x20, // "fmt "
        0x10, 0x00, 0x00, 0x00, // 块大小
        0x01, 0x00,             // 音频格式 (PCM)
        0x01, 0x00,             // 通道数 (单声道)
        0x44, 0xAC, 0x00, 0x00, // 采样率 (44100)
        0x88, 0x58, 0x01, 0x00, // 字节率
        0x02, 0x00,             // 块对齐
        0x10, 0x00,             // 位深度
        0x64, 0x61, 0x74, 0x61  // "data"
    ]);
    
    const blob = new Blob([wavHeader], { type: 'audio/wav' });
    const response = new Response(blob);
    
    const buffer = await response.arrayBuffer();
    
    console.log('音频数据大小:', buffer.byteLength, '字节');
    console.log('（可以使用 Web Audio API 解码）');
    console.log('');
}

// ============================================================
// 示例 4：使用 TypedArrays 读取数据
// ============================================================
async function example4TypedArrays() {
    console.log('--- 示例 4：使用 TypedArrays 读取数据 ---');
    
    // 创建包含各种类型数据的 ArrayBuffer
    const buffer = new ArrayBuffer(16);
    const uint8View = new Uint8Array(buffer);
    const uint16View = new Uint16Array(buffer);
    const uint32View = new Uint32Array(buffer);
    
    // 填充数据
    uint8View[0] = 0x01;  // 1
    uint8View[1] = 0x02;  // 2
    uint16View[1] = 0x0403; // 低字节序
    uint32View[1] = 0x08070605;
    
    const blob = new Blob([buffer]);
    const response = new Response(blob);
    
    const resultBuffer = await response.arrayBuffer();
    
    // 使用不同视图读取
    const readUint8 = new Uint8Array(resultBuffer);
    const readUint16 = new Uint16Array(resultBuffer);
    const readUint32 = new Uint32Array(resultBuffer);
    
    console.log('Uint8Array 视图:');
    console.log('  [0]:', readUint8[0], '(0x01)');
    console.log('  [1]:', readUint8[1], '(0x02)');
    
    console.log('Uint16Array 视图:');
    console.log('  [0]:', readUint16[0]);
    console.log('  [1]:', readUint16[1]);
    
    console.log('Uint32Array 视图:');
    console.log('  [0]:', readUint32[0]);
    console.log('  [1]:', readUint32[1]);
    console.log('');
}

// ============================================================
// 示例 5：二进制协议解析
// ============================================================
async function example5ProtocolParsing() {
    console.log('--- 示例 5：二进制协议解析 ---');
    
    // 模拟自定义二进制协议
    // 协议格式: [版本:1字节][命令:1字节][长度:2字节][数据:n字节][校验:1字节]
    const protocolData = new Uint8Array([
        0x01,       // 版本: 1
        0x03,       // 命令: 3 (获取数据)
        0x04, 0x00, // 长度: 4
        0x41, 0x42, 0x43, 0x44, // 数据: "ABCD"
        0x2A        // 校验和
    ]);
    
    const blob = new Blob([protocolData]);
    const response = new Response(blob);
    
    const buffer = await response.arrayBuffer();
    const view = new Uint8Array(buffer);
    
    // 解析协议
    const version = view[0];
    const command = view[1];
    const length = view[2] | (view[3] << 8);
    const data = Array.from(view.slice(4, 4 + length)).map(b => String.fromCharCode(b)).join('');
    const checksum = view[buffer.byteLength - 1];
    
    console.log('协议解析结果:');
    console.log('  版本:', version);
    console.log('  命令:', command);
    console.log('  数据长度:', length);
    console.log('  数据:', data);
    console.log('  校验和:', checksum);
    console.log('');
}

// ============================================================
// 示例 6：ArrayBuffer 与 Blob 互转
// ============================================================
async function example6ArrayBufferBlobConversion() {
    console.log('--- 示例 6：ArrayBuffer 与 Blob 互转 ---');
    
    const original = 'Hello, ArrayBuffer!';
    const encoder = new TextEncoder();
    const encoded = encoder.encode(original);
    
    const blob = new Blob([encoded]);
    const response = new Response(blob);
    
    const buffer = await response.arrayBuffer();
    
    console.log('原始字符串:', original);
    console.log('ArrayBuffer 长度:', buffer.byteLength);
    
    // 转回字符串
    const decoded = new TextDecoder().decode(buffer);
    console.log('解码后:', decoded);
    console.log('相同:', original === decoded);
    console.log('');
}

// ============================================================
// 示例 7：WebGL 纹理数据
// ============================================================
async function example7WebGLTexture() {
    console.log('--- 示例 7：WebGL 纹理数据处理 ---');
    
    // 模拟 RGBA 像素数据（2x2 像素）
    const pixels = new Uint8Array([
        255, 0, 0, 255,     // 红色像素
        0, 255, 0, 255,     // 绿色像素
        0, 0, 255, 255,     // 蓝色像素
        255, 255, 0, 255    // 黄色像素
    ]);
    
    const blob = new Blob([pixels]);
    const response = new Response(blob);
    
    const buffer = await response.arrayBuffer();
    
    const pixelView = new Uint8Array(buffer);
    
    console.log('纹理数据 (RGBA):');
    for (let i = 0; i < pixelView.length; i += 4) {
        console.log(`  像素 ${i / 4 + 1}: R=${pixelView[i]}, G=${pixelView[i+1]}, B=${pixelView[i+2]}, A=${pixelView[i+3]}`);
    }
    console.log('（可以用于 WebGL texImage2D）');
    console.log('');
}

// ============================================================
// 运行所有示例
// ============================================================
async function runAllExamples() {
    console.log('开始运行 arrayBuffer() 方法的所有示例...\n');
    
    await example1BasicArrayBuffer();
    await example2ImageData();
    await example3AudioData();
    await example4TypedArrays();
    await example5ProtocolParsing();
    await example6ArrayBufferBlobConversion();
    await example7WebGLTexture();
    
    console.log('=== 所有示例运行完成 ===');
}

if (typeof window !== 'undefined' || typeof global !== 'undefined') {
    runAllExamples().catch(console.error);
}

module.exports = { runAllExamples };
