/**
 * @file url.js
 * @description Response.url 属性 - 获取响应发起请求的 URL
 * 
 * url 属性返回响应所对应的请求 URL
 * 即使发生了重定向，也返回最终请求的实际 URL（而非原始 URL）
 * 
 * @author 前端学习者
 * @since 2024
 */

/**
 * URL 属性说明
 * =============
 * 
 * Response.url 是 Response 对象的只读实例属性
 * 返回发起请求时使用的完整 URL 地址
 * 
 * 重要特点：
 * - 返回完整的 URL（包含协议、域名、路径、查询参数等）
 * - 如果请求发生了重定向，返回的是最终重定向后的 URL
 * - 如果是跨域请求（CORS），返回的是实际请求的 URL
 * - URL 已经被浏览器标准化处理
 * 
 * 与 Request 的关系：
 * - Request 对象也有 url 属性
 * - Response.url 反映的是实际发出请求的 URL
 * 
 * 使用场景：
 * - 验证请求是否到达预期的端点
 * - 调试重定向问题
 * - 记录日志时获取实际请求的 URL
 */

/**
 * 示例 1：获取基本响应 URL
 * 
 * 获取发起请求的实际 URL
 */
async function getBasicUrl() {
    console.log('=== 示例 1：获取基本响应 URL ===');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // url 返回完整的请求 URL
        console.log('响应 URL:', response.url);
        // 输出类似: https://jsonplaceholder.typicode.com/posts/1
        
        // url 是只读字符串
        console.log('URL 类型:', typeof response.url);  // 'string'
    } catch (error) {
        console.error('请求失败:', error);
    }
}

/**
 * 示例 2：验证请求 URL 与预期是否一致
 * 
 * 检查实际请求的 URL 是否符合预期
 */
async function validateRequestUrl() {
    console.log('\n=== 示例 2：验证请求 URL ===');
    
    // 定义期望的 URL
    const expectedUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    
    // 发起请求
    const response = await fetch(expectedUrl);
    
    // 比较实际 URL 和预期 URL
    console.log('期望 URL:', expectedUrl);
    console.log('实际 URL:', response.url);
    console.log('URL 匹配:', response.url === expectedUrl);
    
    // 解析 URL 获取各部分信息
    const url = new URL(response.url);
    console.log('\nURL 解析信息:');
    console.log('  协议 (protocol):', url.protocol);
    console.log('  主机 (hostname):', url.hostname);
    console.log('  端口 (port):', url.port);
    console.log('  路径 (pathname):', url.pathname);
    console.log('  查询参数 (search):', url.search);
    console.log('  哈希 (hash):', url.hash);
}

/**
 * 示例 3：处理带查询参数的 URL
 * 
 * 获取包含查询参数的请求 URL
 */
async function handleQueryParams() {
    console.log('\n=== 示例 3：带查询参数的 URL ===');
    
    // 发起带查询参数的请求
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
    const queryParams = 'userId=1&_limit=5';
    const fullUrl = `${baseUrl}?${queryParams}`;
    
    const response = await fetch(fullUrl);
    
    console.log('请求 URL:', response.url);
    
    // 使用 URL API 解析和操作 URL
    const url = new URL(response.url);
    
    console.log('\n查询参数解析:');
    url.searchParams.forEach((value, key) => {
        console.log(`  ${key}: ${value}`);
    });
    
    // 获取所有查询参数
    console.log('\n所有参数:', Object.fromEntries(url.searchParams));
}

/**
 * 示例 4：处理重定向后的 URL
 * 
 * 即使发生 HTTP 重定向，url 也会返回最终的实际 URL
 */
async function handleRedirectUrl() {
    console.log('\n=== 示例 4：重定向后的 URL ===');
    
    // 注意：fetch 默认会自动重定向
    // 使用 redirect: 'manual' 可以阻止自动重定向，手动查看 redirect 状态
    
    // 发起一个可能重定向的请求
    const response = await fetch('https://httpbin.org/redirect-to?url=https://jsonplaceholder.typicode.com/posts/1');
    
    console.log('最终响应 URL:', response.url);
    console.log('重定向次数可以从前一个响应中获取');
    
    // 如果需要查看重定向前的 URL，需要使用 redirect: 'manual'
    console.log('\n使用 manual 模式查看重定向:');
    
    const manualResponse = await fetch('https://httpbin.org/redirect-to?url=https://jsonplaceholder.typicode.com/posts/1', {
        redirect: 'manual'
    });
    
    console.log('状态码:', manualResponse.status);
    console.log('状态文本:', manualResponse.statusText);
    console.log('响应类型:', manualResponse.type);
    
    if (manualResponse.status === 301 || manualResponse.status === 302) {
        const location = manualResponse.headers.get('Location');
        console.log('重定向到:', location);
    }
}

/**
 * 示例 5：记录请求日志时使用 URL
 * 
 * 在日志中记录完整的请求 URL 信息
 */
async function loggingWithUrl() {
    console.log('\n=== 示例 5：记录请求日志 ===');
    
    async function logRequestInfo(url) {
        const startTime = Date.now();
        
        try {
            const response = await fetch(url);
            const duration = Date.now() - startTime;
            
            // 构建日志对象
            const logEntry = {
                url: response.url,           // 实际请求的 URL
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                type: response.type,
                duration: duration + 'ms',
                timestamp: new Date().toISOString()
            };
            
            console.log('\n请求日志:');
            console.log(JSON.stringify(logEntry, null, 2));
            
            return response;
        } catch (error) {
            console.error('请求失败:', error.message);
            throw error;
        }
    }
    
    // 记录多个请求
    await logRequestInfo('https://jsonplaceholder.typicode.com/posts/1');
    await logRequestInfo('https://jsonplaceholder.typicode.com/users/1');
}

/**
 * 示例 6：区分不同来源请求的 URL
 * 
 * 比较不同请求方式返回的 url 属性
 */
async function compareDifferentRequests() {
    console.log('\n=== 示例 6：比较不同请求的 URL ===');
    
    // 简单 URL 请求
    const simpleResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    console.log('简单请求 URL:', simpleResponse.url);
    
    // 带查询参数的请求
    const queryResponse = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
    console.log('带查询参数 URL:', queryResponse.url);
    
    // 完整 URL（包括认证信息）
    // 注意：实际使用中不应该在 URL 中直接包含认证信息
    console.log('\n说明：');
    console.log('- Response.url 始终返回完整的绝对 URL');
    console.log('- 即使请求失败，url 也会返回尝试请求的 URL');
    console.log('- 如果是 Service Worker 发起的请求，url 可能不同于原始请求');
}

/**
 * 示例 7：URL 与 Response 类型的关系
 * 
 * 查看不同类型响应的 url 表现
 */
async function urlWithResponseTypes() {
    console.log('\n=== 示例 7：不同响应类型的 URL ===');
    
    // 基础同源响应
    const basicResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    console.log('基础响应 (basic):');
    console.log('  type:', basicResponse.type);
    console.log('  url:', basicResponse.url);
    
    // CORS 响应（跨域请求成功）
    console.log('\nCORS 响应:');
    console.log('  跨域成功时，url 仍然是完整的请求 URL');
    console.log('  type 会是 "cors"');
    
    // 不透明响应（opaque）
    console.log('\n不透明响应 (opaque):');
    console.log('  对于跨域失败或 mode 为 "no-cors" 的请求');
    console.log('  url 可能是空字符串 ""');
    console.log('  无法读取响应内容，但可以检查 url');
    
    // 使用 no-cors 模式发起请求
    const noCorsResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        mode: 'no-cors'
    });
    
    console.log('\nno-cors 模式测试:');
    console.log('  type:', noCorsResponse.type);  // 'opaque'
    console.log('  url:', noCorsResponse.url);    // 可能为空
    console.log('  ok:', noCorsResponse.ok);       // 总是 true
}

// 运行示例
if (require.main === module) {
    console.log('运行 Response.url 属性示例\n');
    console.log('='.repeat(50));
    
    getBasicUrl()
        .then(() => validateRequestUrl())
        .then(() => handleQueryParams())
        .then(() => handleRedirectUrl())
        .then(() => loggingWithUrl())
        .then(() => compareDifferentRequests())
        .then(() => urlWithResponseTypes())
        .then(() => console.log('\n' + '='.repeat(50)))
        .catch(console.error);
}
