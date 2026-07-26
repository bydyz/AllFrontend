/**
 * @file status.js
 * @description Response.status 属性 - 获取 HTTP 响应状态码
 * 
 * status 属性返回 HTTP 响应状态码的数字值
 * 状态码范围：100-599，表示不同的响应类型
 * 
 * @author 前端学习者
 * @since 2024
 */

/**
 * Status 属性说明
 * =============
 * 
 * Response.status 是 Response 对象的只读实例属性，返回一个数字
 * 这个数字就是 HTTP 响应状态码（Status Code）
 * 
 * HTTP 状态码分类：
 * - 1xx (100-199): 信息性状态码 - 请求已接收，继续处理
 * - 2xx (200-299): 成功状态码 - 请求已成功接收、理解、处理
 * - 3xx (300-399): 重定向状态码 - 需要进一步操作来完成请求
 * - 4xx (400-499): 客户端错误状态码 - 请求有语法错误或无法实现
 * - 5xx (500-599): 服务器错误状态码 - 服务器未能实现合法的请求
 * 
 * 常见状态码示例：
 * - 200: OK，请求成功
 * - 201: Created，资源创建成功
 * - 204: No Content，成功但无返回内容
 * - 301: Moved Permanently，永久重定向
 * - 302: Found，临时重定向
 * - 304: Not Modified，资源未修改（缓存）
 * - 400: Bad Request，请求语法错误
 * - 401: Unauthorized，需要认证
 * - 403: Forbidden，拒绝访问
 * - 404: Not Found，资源不存在
 * - 405: Method Not Allowed，请求方法不支持
 * - 500: Internal Server Error，服务器内部错误
 * - 502: Bad Gateway，网关错误
 * - 503: Service Unavailable，服务不可用
 */

/**
 * 示例 1：获取基本响应状态码
 * 
 * 使用 fetch 获取数据，查看响应的状态码
 */
async function getBasicStatus() {
    console.log('=== 示例 1：获取基本状态码 ===');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // status 返回数字状态码
        console.log('状态码:', response.status);           // 200
        console.log('状态码类型:', typeof response.status); // 'number'
        
        // 根据状态码做不同处理
        if (response.status === 200) {
            console.log('请求成功!');
            const data = await response.json();
            console.log('返回数据:', data);
        }
    } catch (error) {
        console.error('请求失败:', error);
    }
}

/**
 * 示例 2：处理不同类型的响应状态码
 * 
 * 根据状态码判断响应类型并做相应处理
 */
async function handleDifferentStatusCodes() {
    console.log('\n=== 示例 2：处理不同状态码 ===');
    
    // 定义不同状态的 URL
    const testCases = [
        { url: 'https://httpstat.us/200', expected: '成功' },
        { url: 'https://httpstat.us/201', expected: '创建成功' },
        { url: 'https://httpstat.us/301', expected: '重定向' },
        { url: 'https://httpstat.us/400', expected: '客户端错误' },
        { url: 'https://httpstat.us/404', expected: '资源不存在' },
        { url: 'https://httpstat.us/500', expected: '服务器错误' }
    ];
    
    for (const testCase of testCases) {
        try {
            const response = await fetch(testCase.url, { redirect: 'manual' });
            
            console.log(`\nURL: ${testCase.url}`);
            console.log(`  状态码: ${response.status}`);
            console.log(`  预期: ${testCase.expected}`);
            console.log(`  状态类型: ${getStatusType(response.status)}`);
        } catch (error) {
            console.log(`URL: ${testCase.url} - 请求失败: ${error.message}`);
        }
    }
}

/**
 * 辅助函数：根据状态码判断类型
 * @param {number} status - HTTP 状态码
 * @returns {string} 状态码类型描述
 */
function getStatusType(status) {
    if (status >= 100 && status < 200) return '信息性';
    if (status >= 200 && status < 300) return '成功';
    if (status >= 300 && status < 400) return '重定向';
    if (status >= 400 && status < 500) return '客户端错误';
    if (status >= 500 && status < 600) return '服务器错误';
    return '未知';
}

/**
 * 示例 3：使用 switch 处理不同状态码
 * 
 * 根据具体状态码执行不同的业务逻辑
 */
async function handleWithSwitch() {
    console.log('\n=== 示例 3：使用 Switch 处理状态码 ===');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    console.log('当前状态码:', response.status);
    
    // 使用 switch 根据不同状态码做不同处理
    switch (response.status) {
        case 200:
            console.log('处理 200 OK 响应');
            const data = await response.json();
            console.log('数据:', data);
            break;
        case 201:
            console.log('处理 201 Created 响应');
            break;
        case 204:
            console.log('处理 204 No Content 响应');
            break;
        case 301:
        case 302:
            console.log('处理重定向');
            break;
        case 400:
            console.log('处理 400 Bad Request');
            break;
        case 401:
            console.log('处理 401 Unauthorized');
            break;
        case 403:
            console.log('处理 403 Forbidden');
            break;
        case 404:
            console.log('处理 404 Not Found');
            break;
        case 500:
            console.log('处理 500 Internal Server Error');
            break;
        default:
            console.log('处理其他状态码:', response.status);
    }
}

/**
 * 示例 4：状态码范围判断
 * 
 * 使用数值范围判断响应的成功与否
 */
async function statusCodeRangeCheck() {
    console.log('\n=== 示例 4：状态码范围判断 ===');
    
    const testStatuses = [200, 201, 204, 301, 302, 400, 401, 403, 404, 500, 502, 503];
    
    // 模拟不同状态码的处理
    for (const status of testStatuses) {
        let message;
        
        // 判断状态码范围
        if (status >= 200 && status < 300) {
            message = '✓ 成功响应 (2xx)';
        } else if (status >= 300 && status < 400) {
            message = '↔ 重定向 (3xx)';
        } else if (status >= 400 && status < 500) {
            message = '✗ 客户端错误 (4xx)';
        } else if (status >= 500 && status < 600) {
            message = '✗ 服务器错误 (5xx)';
        } else {
            message = '? 未知状态';
        }
        
        console.log(`状态码 ${status}: ${message}`);
    }
}

/**
 * 示例 5：与 ok 属性结合使用
 * 
 * status 和 ok 的关系与区别
 */
async function compareStatusAndOk() {
    console.log('\n=== 示例 5：status 与 ok 的区别 ===');
    
    const testUrls = [
        'https://httpstat.us/200',
        'https://httpstat.us/201',
        'https://httpstat.us/301',
        'https://httpstat.us/400',
        'https://httpstat.us/404',
        'https://httpstat.us/500'
    ];
    
    for (const url of testUrls) {
        try {
            const response = await fetch(url, { redirect: 'manual' });
            
            console.log(`\nURL: ${url}`);
            console.log(`  status: ${response.status}`);
            console.log(`  ok: ${response.ok}`);
            console.log(`  关系: ok = (status >= 200 && status < 300)`);
        } catch (error) {
            console.log(`URL: ${url} - 请求失败`);
        }
    }
}

// 运行示例
if (require.main === module) {
    console.log('运行 Response.status 属性示例\n');
    console.log('='.repeat(50));
    
    getBasicStatus()
        .then(() => handleDifferentStatusCodes())
        .then(() => handleWithSwitch())
        .then(() => statusCodeRangeCheck())
        .then(() => compareStatusAndOk())
        .then(() => console.log('\n' + '='.repeat(50)))
        .catch(console.error);
}
