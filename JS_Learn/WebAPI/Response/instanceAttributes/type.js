/**
 * @file type.js
 * @description Response.type 属性 - 获取响应的类型
 * 
 * type 属性返回响应的类型，标识响应的来源和可访问性
 * 主要用于区分同源响应、跨域响应、错误响应等不同类型的响应
 * 
 * @author 前端学习者
 * @since 2024
 */

/**
 * Type 属性说明
 * =============
 * 
 * Response.type 是 Response 对象的只读实例属性
 * 返回一个字符串，表示响应的类型（type）
 * 
 * 响应类型详解：
 * 1. "basic" - 基础响应（同源响应）
 *    - 最常见的正常响应类型
 *    - 可以访问所有响应属性和 body
 * 
 * 2. "cors" - CORS 响应（跨域成功响应）
 *    - 跨域请求成功返回的响应
 *    - 浏览器允许通过 JavaScript 访问部分属性
 *    - 需要服务器正确配置 CORS 头部
 * 
 * 3. "error" - 错误响应（网络错误）
 *    - 网络层面的错误（如 DNS 解析失败、连接超时）
 *    - 不包含任何响应内容
 *    - status 为 0，statusText 为空
 * 
 * 4. "opaque" - 不透明响应
 *    - 跨域请求失败或 mode 为 "no-cors" 时的响应
 *    - 无法读取响应内容（body 为空）
 *    - ok 始终为 true，status 为 0
 *    - 只能检查 type 或 bodyUsed
 * 
 * 5. "opaqueredirect" - 不透明重定向响应
 *    - fetch 的 redirect: 'error' 模式产生的不透明重定向
 *    - 很少见，几乎不会遇到
 * 
 * 响应类型的决定因素：
 * - 请求的 mode（same-origin, cors, no-cors）
 * - 跨域资源共享 (CORS) 策略
 * - 网络连接状态
 * - HTTP 重定向处理方式
 */

/**
 * 示例 1：查看基础响应的类型
 * 
 * 同源请求返回的响应类型为 "basic"
 */
async function getBasicResponseType() {
    console.log('=== 示例 1：基础响应类型 ===');
    
    try {
        // 同源请求（或 CORS 允许的跨域请求）
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // type 属性返回响应类型
        console.log('响应类型:', response.type);       // 'basic' 或 'cors'
        console.log('类型说明:', getTypeDescription(response.type));
    } catch (error) {
        console.error('请求失败:', error);
    }
}

/**
 * 辅助函数：获取类型描述
 */
function getTypeDescription(type) {
    const descriptions = {
        'basic': '基础响应（同源响应，可完全访问）',
        'cors': 'CORS 响应（跨域成功响应，部分可访问）',
        'error': '错误响应（网络错误，无响应内容）',
        'opaque': '不透明响应（跨域失败，无法读取内容）',
        'opaqueredirect': '不透明重定向响应'
    };
    return descriptions[type] || '未知类型';
}

/**
 * 示例 2：处理不同响应类型
 * 
 * 根据响应类型采取不同的处理方式
 */
async function handleDifferentTypes() {
    console.log('\n=== 示例 2：处理不同响应类型 ===');
    
    // 定义不同响应类型的测试场景
    const testCases = [
        {
            name: '正常 CORS 请求',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            options: {}
        },
        {
            name: 'no-cors 模式请求',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            options: { mode: 'no-cors' }
        }
    ];
    
    for (const testCase of testCases) {
        console.log(`\n测试: ${testCase.name}`);
        
        try {
            const response = await fetch(testCase.url, testCase.options);
            
            console.log('  type:', response.type);
            console.log('  status:', response.status);
            console.log('  ok:', response.ok);
            console.log('  bodyUsed:', response.bodyUsed);
            
            // 根据类型做不同处理
            handleByType(response);
        } catch (error) {
            console.log('  请求失败:', error.message);
        }
    }
}

/**
 * 根据响应类型处理响应
 */
function handleByType(response) {
    switch (response.type) {
        case 'basic':
            console.log('  -> 可以完全访问响应内容');
            break;
        case 'cors':
            console.log('  -> 可以部分访问响应（CORS 允许的部分）');
            break;
        case 'error':
            console.log('  -> 网络错误，无法读取内容');
            break;
        case 'opaque':
            console.log('  -> 不透明响应，无法读取内容但可以检查属性');
            break;
        default:
            console.log('  -> 未知类型');
    }
}

/**
 * 示例 3：模拟 opaque 响应
 * 
 * 使用 no-cors 模式创建不透明响应
 */
async function simulateOpaqueResponse() {
    console.log('\n=== 示例 3：不透明响应（opaque） ===');
    
    // 使用 mode: 'no-cors' 发起跨域请求
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        mode: 'no-cors'
    });
    
    console.log('响应类型:', response.type);       // 'opaque'
    console.log('状态码:', response.status);       // 0
    console.log('ok:', response.ok);               // true
    console.log('URL:', response.url);             // 可能是空字符串
    
    // 不透明响应的特点
    console.log('\n不透明响应特点:');
    console.log('- status 始终为 0');
    console.log('- ok 始终为 true');
    console.log('- 无法读取 body 内容');
    console.log('- 无法获取响应头');
    console.log('- 只能检查 type 属性');
}

/**
 * 示例 4：模拟 error 响应
 * 
 * 当网络错误发生时，返回 error 类型的响应
 */
async function simulateErrorResponse() {
    console.log('\n=== 示例 4：错误响应（error） ===');
    
    // 使用一个不存在的域名
    try {
        const response = await fetch('https://this-domain-does-not-exist-12345.com/api');
        
        console.log('响应类型:', response.type);       // 'error'
        console.log('状态码:', response.status);       // 0
        console.log('状态文本:', response.statusText); // ''
        console.log('URL:', response.url);             // ''
    } catch (error) {
        // fetch 会抛出异常
        console.log('请求异常:', error.message);
    }
    
    console.log('\n注意：error 类型响应通常伴随着 fetch 异常');
    console.log('但 Response 对象仍会被创建，只是 type 为 "error"');
}

/**
 * 示例 5：响应类型与安全限制
 * 
 * 了解不同响应类型的安全限制
 */
async function understandSecurityLimits() {
    console.log('\n=== 示例 5：响应类型与安全限制 ===');
    
    console.log('响应类型安全对照表:');
    console.log('-'.repeat(60));
    console.log('类型        | body读取 | headers | url   | 可用属性');
    console.log('-'.repeat(60));
    console.log('basic       | ✓        | ✓       | ✓     | 全部');
    console.log('cors        | ✓        | 部分    | ✓     | 全部');
    console.log('error       | ✗        | ✗       | ✗     | 仅 type');
    console.log('opaque      | ✗        | ✗       | ?     | 仅 type/bodyUsed');
    console.log('-'.repeat(60));
    
    // 演示各种限制
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    console.log('\n测试基础响应:');
    console.log('bodyUsed:', response.bodyUsed);
    
    // 读取 body
    const data = await response.json();
    console.log('bodyUsed (读取后):', response.bodyUsed);
}

/**
 * 示例 6：检查响应类型的实用函数
 * 
 * 创建便捷函数来检查响应类型
 */
async function createTypeCheckFunctions() {
    console.log('\n=== 示例 6：响应类型检查函数 ===');
    
    // 定义类型检查函数
    const isBasic = (response) => response.type === 'basic';
    const isCors = (response) => response.type === 'cors';
    const isError = (response) => response.type === 'error';
    const isOpaque = (response) => response.type === 'opaque';
    const isSuccess = (response) => response.ok && response.type !== 'error' && response.type !== 'opaque';
    
    // 测试函数
    const testCases = [
        { url: 'https://jsonplaceholder.typicode.com/posts/1', options: {} },
        { url: 'https://jsonplaceholder.typicode.com/posts/1', options: { mode: 'no-cors' } },
    ];
    
    for (const testCase of testCases) {
        const response = await fetch(testCase.url, testCase.options);
        
        console.log(`\n请求: ${testCase.url} (${JSON.stringify(testCase.options)})`);
        console.log('  type:', response.type);
        console.log('  isBasic():', isBasic(response));
        console.log('  isCors():', isCors(response));
        console.log('  isOpaque():', isOpaque(response));
        console.log('  isError():', isError(response));
        console.log('  isSuccess():', isSuccess(response));
    }
}

/**
 * 示例 7：综合示例 - 根据类型处理响应
 * 
 * 根据响应类型采取不同的处理策略
 */
async function comprehensiveTypeHandling() {
    console.log('\n=== 示例 7：综合类型处理 ===');
    
    // 统一的响应处理函数
    async function processResponse(response) {
        // 先检查响应类型
        console.log('\n检查响应类型...');
        
        switch (response.type) {
            case 'error':
                console.log('→ 网络错误，需要重试或检查网络连接');
                return null;
                
            case 'opaque':
                console.log('→ 跨域请求被阻止（no-cors 模式）');
                console.log('  这是一个不透明响应，无法读取内容');
                return null;
                
            case 'basic':
            case 'cors':
                // 正常处理
                if (!response.ok) {
                    console.log(`→ HTTP 错误: ${response.status} ${response.statusText}`);
                    return null;
                }
                
                console.log('→ 成功响应，解析数据...');
                const data = await response.json();
                return data;
                
            default:
                console.log('→ 未知响应类型');
                return null;
        }
    }
    
    // 测试不同的请求场景
    const scenarios = [
        { name: '正常请求', url: 'https://jsonplaceholder.typicode.com/posts/1' },
    ];
    
    for (const scenario of scenarios) {
        console.log(`\n场景: ${scenario.name}`);
        const response = await fetch(scenario.url);
        const result = await processResponse(response);
        if (result) {
            console.log('数据预览:', JSON.stringify(result).substring(0, 100) + '...');
        }
    }
}

// 运行示例
if (require.main === module) {
    console.log('运行 Response.type 属性示例\n');
    console.log('='.repeat(50));
    
    getBasicResponseType()
        .then(() => handleDifferentTypes())
        .then(() => simulateOpaqueResponse())
        .then(() => simulateErrorResponse())
        .then(() => understandSecurityLimits())
        .then(() => createTypeCheckFunctions())
        .then(() => comprehensiveTypeHandling())
        .then(() => console.log('\n' + '='.repeat(50)))
        .catch(console.error);
}
