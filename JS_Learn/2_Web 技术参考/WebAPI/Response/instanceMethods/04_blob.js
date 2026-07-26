/**
 * @file 04_blob.js
 * @description Response.blob() 方法 - 获取二进制 Blob 数据
 * @author LearnJS
 * @date 2026-05-17
 */

/**
 * @section 方法说明
 * 
 * blob() 方法用于读取响应体并将其作为 Blob 对象返回。
 * Blob（Binary Large Object）表示原始二进制数据的大对象。
 * 适用于处理文件、图片、音频、视频等二进制数据。
 * 
 * @section 语法
 * blob()
 * 
 * @section 参数
 * 无
 * 
 * @section 返回值
 * 返回一个 Promise，该 Promise 解析为 Blob 对象
 * 
 * @section 使用场景
 * 1. 下载并显示图片
 * 2. 处理文件下载
 * 3. 读取二进制配置文件
 * 4. 处理媒体文件（音频/视频）
 * 5. 与 Canvas API 结合使用
 * 
 * @section 注意事项
 * - Blob 对象包含二进制数据和 MIME 类型
 * - 调用 blob() 后，bodyUsed 会变为 true
 * - 对于 "opaque" 类型的响应，Blob.size 为 0，无实际用途
 * - 可以使用 URL.createObjectURL() 创建对象 URL 来显示图片
 * - Blob 数据可以进一步转换为其他格式（如 ArrayBuffer）
 */

'use strict';

console.log('=== Response.blob() 方法示例 ===\n');

// ============================================================
// 示例 1：基本 Blob 读取
// ============================================================
async function example1BasicBlob() {
    console.log('--- 示例 1：基本 Blob 读取 ---');
    
    // 创建一个二进制响应（模拟文件内容）
    const buffer = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" 的 ASCII
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const response = new Response(blob);
    
    // 使用 blob() 读取
    const resultBlob = await response.blob();
    
    console.log('Blob 类型:', resultBlob.type);
    console.log('Blob 大小:', resultBlob.size, '字节');
    console.log('是 Blob 实例:', resultBlob instanceof Blob);
    console.log('');
}

// ============================================================
// 示例 2：读取图片并显示
// ============================================================
async function example2ImageBlob() {
    console.log('--- 示例 2：读取图片 Blob ---');
    
    // 创建一个模拟的 PNG 图片数据
    // PNG 文件头: 137 80 78 71 13 10 26 10
    const pngHeader = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
    // 模拟一些图片数据
    const imageData = new Uint8Array([...pngHeader, 0, 0, 0, 0, 73, 69, 78, 68]);
    const blob = new Blob([imageData], { type: 'image/png' });
    
    const response = new Response(blob);
    
    const imageBlob = await response.blob();
    
    console.log('图片类型:', imageBlob.type);
    console.log('图片大小:', imageBlob.size, '字节');
    console.log('（实际应用中可使用 URL.createObjectURL 显示）');
    console.log('');
}

// ============================================================
// 示例 3：处理文件下载
// ============================================================
async function example3FileDownload() {
    console.log('--- 示例 3：处理文件下载 ---');
    
    // 模拟 PDF 文件内容
    const pdfContent = '%PDF-1.4 mock pdf content';
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    
    const response = new Response(blob, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="document.pdf"'
        }
    });
    
    const fileBlob = await response.blob();
    
    console.log('文件类型:', fileBlob.type);
    console.log('文件大小:', fileBlob.size, '字节');
    
    // 可以保存到本地或创建下载链接
    console.log('（可用于创建下载链接）');
    console.log('');
}

// ============================================================
// 示例 4：读取音频文件
// ============================================================
async function example4AudioBlob() {
    console.log('--- 示例 4：读取音频 Blob ---');
    
    // 模拟 MP3 文件头
    const mp3Header = new Uint8Array([0x49, 0x44, 0x33]); // "ID3"
    const audioData = new Blob([mp3Header, new Uint8Array(100)], { type: 'audio/mpeg' });
    
    const response = new Response(audioData);
    
    const audioBlob = await response.blob();
    
    console.log('音频类型:', audioBlob.type);
    console.log('音频大小:', audioBlob.size, '字节');
    console.log('（可用于 HTML5 Audio 元素播放）');
    console.log('');
}

// ============================================================
// 示例 5：Blob 转换为其他格式
// ============================================================
async function example5BlobConversion() {
    console.log('--- 示例 5：Blob 转换为其他格式 ---');
    
    const text = 'Hello, Blob!';
    const blob = new Blob([text], { type: 'text/plain' });
    const response = new Response(blob);
    
    const resultBlob = await response.blob();
    
    // 转换为 ArrayBuffer
    const arrayBuffer = await resultBlob.arrayBuffer();
    console.log('转换为 ArrayBuffer:', arrayBuffer.byteLength, '字节');
    
    // 转换为文本
    const textResult = await resultBlob.text();
    console.log('转换为文本:', textResult);
    
    // 转换为 Data URL（需要手动处理）
    const reader = new FileReader();
    reader.onload = () => {
        console.log('转换为 Data URL:', reader.result);
    };
    reader.readAsDataURL(resultBlob);
    console.log('');
}

// ============================================================
// 示例 6：处理 Content-Type 不同的响应
// ============================================================
async function example6DifferentContentTypes() {
    console.log('--- 示例 6：处理不同 Content-Type 的响应 ---');
    
    const types = [
        { type: 'image/png', desc: 'PNG 图片' },
        { type: 'image/jpeg', desc: 'JPEG 图片' },
        { type: 'application/pdf', desc: 'PDF 文档' },
        { type: 'application/zip', desc: 'ZIP 压缩包' },
        { type: 'video/mp4', desc: 'MP4 视频' },
        { type: 'audio/mp3', desc: 'MP3 音频' }
    ];
    
    for (const item of types) {
        // 创建模拟数据
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        const blob = new Blob([data], { type: item.type });
        const response = new Response(blob);
        
        const result = await response.blob();
        console.log(`${item.desc}: type=${result.type}, size=${result.size}`);
    }
    console.log('');
}

// ============================================================
// 示例 7：fetch 中下载图片并显示
// ============================================================
async function example7FetchImage() {
    console.log('--- 示例 7：fetch 中下载图片 ---');
    console.log('（模拟 fetch 下载图片场景）\n');
    
    // 模拟图片数据
    const imageBytes = new Uint8Array([
        137, 80, 78, 71, 13, 10, 26, 10,  // PNG 头
        0, 0, 0, 13, 73, 72, 68, 82,      // IHDR 块
        0, 0, 0, 10, 0, 0, 0, 10          // 宽高 10x10
    ]);
    
    const mockFetchImage = async () => {
        return new Response(new Blob([imageBytes], { type: 'image/png' }));
    };
    
    const response = await mockFetchImage();
    
    if (response.ok) {
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        
        console.log('图片对象 URL:', objectURL);
        console.log('（在浏览器中可赋值给 img.src 显示）');
        
        // 清理
        URL.revokeObjectURL(objectURL);
    }
    console.log('');
}

// ============================================================
// 示例 8：处理大文件
// ============================================================
async function example8LargeFile() {
    console.log('--- 示例 8：处理大文件（模拟）---');
    
    // 模拟大文件数据（这里使用较小的数据演示）
    const chunk = new Uint8Array(1024); // 1KB
    for (let i = 0; i < chunk.length; i++) {
        chunk[i] = i % 256;
    }
    
    // 重复构建模拟大文件
    const largeData = new Blob([chunk, chunk, chunk, chunk, chunk]); // 5KB
    
    const response = new Response(largeData);
    
    const startTime = Date.now();
    const blob = await response.blob();
    const endTime = Date.now();
    
    console.log('文件大小:', (blob.size / 1024).toFixed(2), 'KB');
    console.log('读取耗时:', endTime - startTime, 'ms');
    console.log('');
}

// ============================================================
// 运行所有示例
// ============================================================
async function runAllExamples() {
    console.log('开始运行 blob() 方法的所有示例...\n');
    
    await example1BasicBlob();
    await example2ImageBlob();
    await example3FileDownload();
    await example4AudioBlob();
    await example5BlobConversion();
    await example6DifferentContentTypes();
    await example7FetchImage();
    await example8LargeFile();
    
    console.log('=== 所有示例运行完成 ===');
}

if (typeof window !== 'undefined' || typeof global !== 'undefined') {
    runAllExamples().catch(console.error);
}

module.exports = { runAllExamples };
