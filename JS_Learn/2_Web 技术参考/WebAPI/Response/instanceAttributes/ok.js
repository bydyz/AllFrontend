/**
 * @file ok.js
 * @description Response.ok 属性 - 检测 HTTP 响应是否成功
 * 
 * ok 属性返回一个布尔值，表示响应是否成功
 * 当 HTTP 状态码在 200-299 范围内时返回 true，否则返回 false
 * 
 * @author 前端学习者
 * @since 2024
 */

/**
 * OK 属性说明
 * =============
 * 
 * Response.ok 是 Response 对象的一个只读实例属性，用于判断 HTTP 请求是否成功。
 * 
 * 工作原理：
 * - 当响应的状态码在 200-299 范围内时，ok 为 true
 * - 任何其他状态码（如 404、500、301 重定向等）都会使 ok 为 false
 * 
 * 与 status 属性的关系：
 * - status 是数字状态码（如 200、404、500）
 * - ok 是布尔值，是 status 是否在成功范围内的简单判断
 * 
 * 常见成功状态码：
 * - 200 OK - 请求成功
 * - 201 Created - 资源创建成功
 * - 204 No Content - 请求成功但无内容返回
 * 
 * 常见失败状态码：
 * - 400 Bad Request - 请求语法错误
 * - 401 Unauthorized - 需要认证
 * - 403 Forbidden - 拒绝访问
 * - 404 Not Found - 资源不存在
 * - 500 Internal Server Error - 服务器内部错误
 */

/**
 * 示例 1：基础使用 - 检查响应是否成功
 * 
 * 使用 fetch 发送请求后，检查 ok 属性来判断请求是否成功
 */
async function checkResponseOk() {
    console.log('=== 示例 1：基础使用 ===');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // ok 属性返回布尔值，表示状态码是否在 200-299 范围内
        console.log('响应状态:', response.ok);           // true (状态码 200)
        console.log('HTTP 状态码:', response.status);     // 200
        
        if (response.ok) {
            const data = await response.json();
            console.log('请求成功，数据:', data);
        } else {
            console.log('请求失败，状态码:', response.status);
        }
    } catch (error) {
        console.error('网络错误:', error);
    }
}

/**
 * 示例 2：处理失败响应 - 404 Not Found
 * 
 * 当请求的资源不存在时，ok 为 false
 */
async function handleNotFound() {
    console.log('\n=== 示例 2：处理 404 响应 ===');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/99999999');
        
        console.log('响应状态:', response.ok);           // false (状态码 404)
        console.log('HTTP 状态码:', response.status);     // 404
        
        if (response.ok) {
            console.log('资源存在');
        } else {
            console.log('资源不存在或请求失败');
        }
    } catch (error) {
        console.error('网络错误:', error);
    }
}

/**
 * 示例 3：处理服务器错误 - 500 Internal Server Error
 * 
 * 当服务器发生内部错误时，ok 为 false
 */
async function handleServerError() {
    console.log('\n=== 示例 3：处理服务器错误 ===');
    
    try {
        // 模拟一个返回 500 的请求
        const response = await fetch('https://httpstat.us/500');
        
        console.log('响应状态:', response.ok);           // false
        console.log('HTTP 状态码:', response.status);     // 500
        
        // 无论如何都应该检查 ok 属性
        if (!response.ok) {
            console.log('服务器错误，请求失败');
        }
    } catch (error) {
        console.error('网络错误:', error);
    }
}

/**
 * 示例 4：批量检查多个请求
 * 
 * 遍历多个 URL，逐一检查响应状态
 */
async function checkMultipleUrls() {
    console.log('\n=== 示例 4：批量检查多个 URL ===');
    
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/99999999',
        'https://httpstat.us/201'
    ];
    
    for (const url of urls) {
        try {
            const response = await fetch(url);
            console.log(`URL: ${url}`);
            console.log(`  ok: ${response.ok}, status: ${response.status}`);
        } catch (error) {
            console.log(`URL: ${url}`);
            console.log(`  请求失败: ${error.message}`);
        }
    }
}

/**
 * 示例 5：使用 ok 属性的最佳实践
 * 
 * 建议始终检查 ok 属性，而不是仅依赖 try-catch
 * 因为网络错误会抛出异常，但 4xx/5xx 错误不会
 */
async function bestPractice() {
    console.log('\n=== 示例 5：最佳实践 ===');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    // 好的做法：同时检查 ok 和捕获异常
    if (response.ok) {
        console.log('✓ 请求成功');
        const data = await response.json();
        console.log('数据:', data);
    } else {
        console.log('✗ 请求失败');
        console.log('状态码:', response.status);
        console.log('状态文本:', response.statusText);
    }
}

// 导出函数（如果作为模块使用）
// module.exports = { checkResponseOk, handleNotFound, handleServerError, checkMultipleUrls, bestPractice };

// 直接运行时执行
if (require.main === module) {
    console.log('运行 Response.ok 属性示例\n');
    console.log('='.repeat(50));
    
    // 依次执行所有示例
    checkResponseOk()
        .then(() => handleNotFound())
        .then(() => handleServerError())
        .then(() => checkMultipleUrls())
        .then(() => bestPractice())
        .then(() => console.log('\n' + '='.repeat(50)))
        .catch(console.error);
}
