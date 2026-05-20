/**
 * @file 03_text.js
 * @description Response.text() 方法 - 获取文本响应体
 * @author LearnJS
 * @date 2026-05-17
 */

/**
 * @section 方法说明
 * 
 * text() 方法用于读取响应体并将其作为文本字符串返回。
 * 返回一个 Promise，解析成功后得到文本内容。
 * 
 * 适用于处理纯文本、HTML、XML 或其他文本格式的响应。
 * 
 * @section 语法
 * text()
 * 
 * @section 参数
 * 无
 * 
 * @section 返回值
 * 返回一个 Promise，该 Promise 解析为文本字符串
 * 
 * @section 使用场景
 * 1. 获取 HTML 页面内容
 * 2. 处理纯文本文件
 * 3. 读取 XML 文档
 * 4. 获取配置文件内容
 * 5. 处理 CSV 数据
 * 
 * @section 注意事项
 * - 返回的是原始文本，不会自动解析
 * - 调用 text() 后，bodyUsed 会变为 true
 * - 对于二进制数据，使用 text() 会得到乱码
 * - 文本编码取决于响应的 Content-Type 头
 * - 大型文本可能会占用大量内存
 */

'use strict';

console.log('=== Response.text() 方法示例 ===\n');

// ============================================================
// 示例 1：基本文本读取
// ============================================================
async function example1BasicText() {
    console.log('--- 示例 1：基本文本读取 ---');
    
    // 创建一个纯文本响应
    const textContent = 'Hello, World!\n欢迎学习 Fetch API。';
    
    const response = new Response(textContent, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
    
    // 使用 text() 读取
    const text = await response.text();
    
    console.log('响应文本:');
    console.log(text);
    console.log('');
}

// ============================================================
// 示例 2：读取 HTML 内容
// ============================================================
async function example2HtmlContent() {
    console.log('--- 示例 2：读取 HTML 内容 ---');
    
    // HTML 内容
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>示例页面</title>
</head>
<body>
    <h1>欢迎访问</h1>
    <p>这是一个测试页面。</p>
</body>
</html>
    `.trim();
    
    const response = new Response(htmlContent, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
    
    const html = await response.text();
    
    console.log('读取到的 HTML 长度:', html.length, '字符');
    console.log('包含 title 标签:', html.includes('<title>'));
    console.log('包含 h1 标签:', html.includes('<h1>'));
    console.log('');
}

// ============================================================
// 示例 3：读取 XML 数据
// ============================================================
async function example3XmlContent() {
    console.log('--- 示例 3：读取 XML 数据 ---');
    
    // XML 内容
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<users>
    <user id="1">
        <name>张三</name>
        <email>zhangsan@example.com</email>
    </user>
    <user id="2">
        <name>李四</name>
        <email>lisi@example.com</email>
    </user>
</users>`;
    
    const response = new Response(xmlContent, {
        headers: { 'Content-Type': 'application/xml' }
    });
    
    const xml = await response.text();
    
    console.log('XML 内容:');
    console.log(xml);
    console.log('');
}

// ============================================================
// 示例 4：读取 CSV 数据
// ============================================================
async function example4CsvContent() {
    console.log('--- 示例 4：读取 CSV 数据 ---');
    
    // CSV 内容
    const csvContent = `姓名,年龄,城市
张三,25,北京
李四,30,上海
王五,28,广州`;
    
    const response = new Response(csvContent, {
        headers: { 'Content-Type': 'text/csv' }
    });
    
    const csv = await response.text();
    
    // 简单解析 CSV
    const lines = csv.split('\n');
    console.log('CSV 行数:', lines.length);
    lines.forEach((line, index) => {
        console.log(`  行 ${index + 1}: ${line}`);
    });
    console.log('');
}

// ============================================================
// 示例 5：处理 JSON 作为文本
// ============================================================
async function example5JsonAsText() {
    console.log('--- 示例 5：处理 JSON 作为文本 ---');
    
    // JSON 数据
    const jsonContent = JSON.stringify(
        { name: '测试', value: 123 },
        null,
        2
    );
    
    const response = new Response(jsonContent, {
        headers: { 'Content-Type': 'application/json' }
    });
    
    // 作为文本读取
    const text = await response.text();
    console.log('作为文本读取的 JSON:');
    console.log(text);
    console.log('类型:', typeof text); // string
    
    // 然后可以手动解析
    const parsed = JSON.parse(text);
    console.log('手动解析后:', parsed);
    console.log('');
}

// ============================================================
// 示例 6：处理二进制数据的文本读取
// ============================================================
async function example6BinaryAsText() {
    console.log('--- 示例 6：二进制数据作为文本读取（会产生乱码）---');
    
    // 二进制数据（模拟图片的前几个字节）
    const binaryData = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
    const blob = new Blob([binaryData]);
    
    const response = new Response(blob, {
        headers: { 'Content-Type': 'image/png' }
    });
    
    const text = await response.text();
    
    console.log('二进制作为文本:', text);
    console.log('长度从', binaryData.length, '变成了', text.length);
    console.log('（预期：二进制数据不应使用 text() 读取）');
    console.log('');
}

// ============================================================
// 示例 7：处理大文本文件
// ============================================================
async function example7LargeText() {
    console.log('--- 示例 7：处理大文本文件（模拟）---');
    
    // 模拟大文本（通过重复构建）
    const paragraph = '这是一段很长的文本内容。';
    const largeText = paragraph.repeat(1000);
    
    const response = new Response(largeText, {
        headers: { 'Content-Type': 'text/plain' }
    });
    
    const startTime = Date.now();
    const text = await response.text();
    const endTime = Date.now();
    
    console.log('文本长度:', text.length, '字符');
    console.log('读取耗时:', endTime - startTime, 'ms');
    console.log('');
}

// ============================================================
// 示例 8：fetch 实际使用场景
// ============================================================
async function example8FetchUsage() {
    console.log('--- 示例 8：fetch 实际使用场景 ---');
    console.log('（模拟获取网页内容）\n');
    
    // 模拟 fetch 返回 HTML
    const mockFetch = async (url) => {
        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${url}</title>
</head>
<body>
    <h1>页面标题</h1>
    <p>页面内容...</p>
</body>
</html>`;
        
        return new Response(html, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    };
    
    const response = await mockFetch('https://example.com/page');
    
    if (response.ok) {
        const html = await response.text();
        
        // 简单提取标题
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        if (titleMatch) {
            console.log('页面标题:', titleMatch[1]);
        }
        
        // 检查是否包含特定内容
        console.log('包含 h1 标签:', html.includes('<h1>'));
    }
    console.log('');
}

// ============================================================
// 运行所有示例
// ============================================================
async function runAllExamples() {
    console.log('开始运行 text() 方法的所有示例...\n');
    
    await example1BasicText();
    await example2HtmlContent();
    await example3XmlContent();
    await example4CsvContent();
    await example5JsonAsText();
    await example6BinaryAsText();
    await example7LargeText();
    await example8FetchUsage();
    
    console.log('=== 所有示例运行完成 ===');
}

if (typeof window !== 'undefined' || typeof global !== 'undefined') {
    runAllExamples().catch(console.error);
}

module.exports = { runAllExamples };
