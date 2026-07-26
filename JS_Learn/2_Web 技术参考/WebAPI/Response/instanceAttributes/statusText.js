/**
 * @file statusText.js
 * @description Response.statusText 属性 - 获取 HTTP 响应状态文本
 * 
 * statusText 属性返回与状态码对应的状态文本（Status Text）
 * 是 HTTP 状态码的人类可读描述
 * 
 * @author 前端学习者
 * @since 2024
 */

/**
 * StatusText 属性说明
 * =============
 * 
 * Response.statusText 是 Response 对象的只读实例属性
 * 返回与 HTTP 状态码对应的状态文本（也称为 Status Message）
 * 
 * 特点：
 * - 与 status 属性一起使用，status 是数字，statusText 是字符串
 * - statusText 是 HTTP 规范定义的标准文本，不可自定义
 * - 如果是自定义状态码，statusText 可能为空字符串
 * 
 * 常见状态码与状态文本对应关系：
 * - 200 OK - 请求成功
 * - 201 Created - 资源创建成功
 * - 204 No Content - 请求成功但无返回内容
 * - 301 Moved Permanently - 资源永久移动
 * - 302 Found - 资源临时移动
 * - 304 Not Modified - 资源未修改
 * - 400 Bad Request - 请求语法错误
 * - 401 Unauthorized - 请求需要认证
 * - 403 Forbidden - 服务器拒绝请求
 * - 404 Not Found - 资源未找到
 * - 405 Method Not Allowed - 方法不允许
 * - 500 Internal Server Error - 服务器内部错误
 * - 502 Bad Gateway - 网关错误
 * - 503 Service Unavailable - 服务不可用
 */

/**
 * 示例 1：获取状态文本
 * 
 * 同时获取 status 和 statusText，了解完整的响应状态
 */
async function getStatusText() {
    console.log('=== 示例 1：获取状态文本 ===');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // status 是数字，statusText 是对应的文本描述
        console.log('状态码:', response.status);         // 200
        console.log('状态文本:', response.statusText);   // 'OK'
        
        console.log('完整状态: ' + response.status + ' ' + response.statusText);
        // 输出: "200 OK"
    } catch (error) {
        console.error('请求失败:', error);
    }
}

/**
 * 示例 2：处理不同响应类型的状态文本
 * 
 * 查看不同状态码对应的状态文本
 */
async function handleVariousStatusTexts() {
    console.log('\n=== 示例 2：各种状态码的状态文本 ===');
    
    const testUrls = [
        { url: 'https://httpstat.us/200', desc: '成功' },
        { url: 'https://httpstat.us/201', desc: '创建成功' },
        { url: 'https://httpstat.us/204', desc: '无内容' },
        { url: 'https://httpstat.us/301', desc: '永久重定向' },
        { url: 'https://httpstat.us/302', desc: '临时重定向' },
        { url: 'https://httpstat.us/400', desc: '请求错误' },
        { url: 'https://httpstat.us/401', desc: '未授权' },
        { url: 'https://httpstat.us/403', desc: '禁止访问' },
        { url: 'https://httpstat.us/404', desc: '未找到' },
        { url: 'https://httpstat.us/500', desc: '服务器错误' }
    ];
    
    for (const test of testUrls) {
        try {
            const response = await fetch(test.url, { redirect: 'manual' });
            
            console.log(`${test.desc}: ${response.status} ${response.statusText}`);
        } catch (error) {
            console.log(`${test.desc}: 请求失败 - ${error.message}`);
        }
    }
}

/**
 * 示例 3：结合 status 和 statusText 进行错误处理
 * 
 * 根据状态信息向用户显示友好的错误消息
 */
async function errorHandlingWithStatusText() {
    console.log('\n=== 示例 3：使用状态文本进行错误处理 ===');
    
    async function fetchWithErrorMessage(url) {
        try {
            const response = await fetch(url);
            
            // 成功响应
            if (response.ok) {
                return { success: true, data: await response.json() };
            }
            
            // 失败响应 - 使用 statusText 生成错误消息
            return {
                success: false,
                error: {
                    code: response.status,
                    message: response.statusText,
                    // 生成用户友好的消息
                    friendlyMessage: getFriendlyMessage(response.status, response.statusText)
                }
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: -1,
                    message: 'Network Error',
                    friendlyMessage: '网络连接失败，请检查您的网络设置'
                }
            };
        }
    }
    
    // 辅助函数：生成友好的错误消息
    function getFriendlyMessage(status, statusText) {
        const messages = {
            400: '请求格式有误，请检查输入内容',
            401: '您需要登录才能访问此资源',
            403: '您没有权限访问此资源',
            404: '请求的资源不存在',
            408: '请求超时，请稍后重试',
            500: '服务器内部错误，请稍后重试',
            502: '网关错误，请稍后重试',
            503: '服务暂时不可用，请稍后重试',
            504: '网关超时，请稍后重试'
        };
        
        return messages[status] || `${status} ${statusText}`;
    }
    
    // 测试不同的错误情况
    const testUrls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://httpstat.us/404',
        'https://httpstat.us/500'
    ];
    
    for (const url of testUrls) {
        const result = await fetchWithErrorMessage(url);
        
        console.log(`\n请求: ${url}`);
        if (result.success) {
            console.log('✓ 成功:', result.data.title);
        } else {
            console.log('✗ 失败');
            console.log('  错误代码:', result.error.code);
            console.log('  原始消息:', result.error.message);
            console.log('  友好消息:', result.error.friendlyMessage);
        }
    }
}

/**
 * 示例 4：记录完整的请求日志
 * 
 * 在调试时记录完整的响应状态信息
 */
async function loggingWithStatusText() {
    console.log('\n=== 示例 4：记录完整请求日志 ===');
    
    // 模拟一个完整的请求日志函数
    function logResponse(response, requestStartTime) {
        const duration = Date.now() - requestStartTime;
        
        console.log('\n┌─────────────────────────────');
        console.log('│ HTTP 响应日志');
        console.log('├─────────────────────────────');
        console.log(`│ URL:      ${response.url}`);
        console.log(`│ Status:   ${response.status} ${response.statusText}`);
        console.log(`│ OK:       ${response.ok}`);
        console.log(`│ Type:     ${response.type}`);
        console.log(`│ Duration: ${duration}ms`);
        console.log('└─────────────────────────────');
    }
    
    const startTime = Date.now();
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    logResponse(response, startTime);
}

/**
 * 示例 5：status 和 statusText 的组合判断
 * 
 * 使用 status 和 statusText 进行精确的响应判断
 */
async function combinedStatusCheck() {
    console.log('\n=== 示例 5：组合状态检查 ===');
    
    // 创建响应对象模拟器（实际环境中从 fetch 获取）
    // 注意：Response 构造函数不能直接实例化，这里仅作示例
    
    // 模拟一些常见的响应场景
    const scenarios = [
        { status: 200, statusText: 'OK', expected: '成功' },
        { status: 201, statusText: 'Created', expected: '创建成功' },
        { status: 204, statusText: 'No Content', expected: '无内容返回' },
        { status: 301, statusText: 'Moved Permanently', expected: '永久重定向' },
        { status: 400, statusText: 'Bad Request', expected: '请求错误' },
        { status: 404, statusText: 'Not Found', expected: '资源不存在' },
        { status: 500, statusText: 'Internal Server Error', expected: '服务器错误' }
    ];
    
    console.log('常见状态码与状态文本对照表：');
    console.log('-'.repeat(50));
    
    for (const scenario of scenarios) {
        // 判断是否成功 (2xx)
        const isSuccess = scenario.status >= 200 && scenario.status < 300;
        
        console.log(
            `${scenario.status.toString().padEnd(4)} | ` +
            `${scenario.statusText.padEnd(25)} | ` +
            `${scenario.expected.padEnd(12)} | ` +
            `成功: ${isSuccess ? '是' : '否'}`
        );
    }
}

/**
 * 示例 6：自定义状态码的情况
 * 
 * 当使用非标准状态码时，statusText 可能为空
 */
async function handleCustomStatus() {
    console.log('\n=== 示例 6：非标准状态码 ===');
    
    // 注意：浏览器中 fetch 不会返回自定义状态码
    // 这里展示概念，实际返回的 statusText 为空的情况很少
    
    console.log('说明：非标准状态码（如 418 I\'m a teapot）');
    console.log('某些服务器可能返回非标准状态码');
    console.log('此时 statusText 可能为空字符串或非标准文本');
    
    // 模拟一个可能的场景
    console.log('\n例如：418 I\'m a teapot（我是一个茶壶）');
    console.log('status: 418');
    console.log('statusText: "I\'m a teapot"');
}

// 运行示例
if (require.main === module) {
    console.log('运行 Response.statusText 属性示例\n');
    console.log('='.repeat(50));
    
    getStatusText()
        .then(() => handleVariousStatusTexts())
        .then(() => errorHandlingWithStatusText())
        .then(() => loggingWithStatusText())
        .then(() => combinedStatusCheck())
        .then(() => handleCustomStatus())
        .then(() => console.log('\n' + '='.repeat(50)))
        .catch(console.error);
}
