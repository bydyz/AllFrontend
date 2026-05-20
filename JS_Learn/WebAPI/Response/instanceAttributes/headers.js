/**
 * @file headers.js
 * @description Response.headers 属性 - 获取 HTTP 响应头
 * 
 * headers 属性返回一个 Headers 对象，包含响应的所有 HTTP 头信息
 * Headers 对象提供了多种方法来读取和操作响应头
 * 
 * @author 前端学习者
 * @since 2024
 */

/**
 * Headers 属性说明
 * =============
 * 
 * Response.headers 是 Response 对象的只读实例属性
 * 返回一个 Headers 对象实例
 * 
 * Headers 对象概述：
 * - 存储 HTTP 响应头键值对
 * - 支持多种迭代方式（for...of, forEach）
 * - 方法区分大小写
 * - 可以获取常见的响应头如 Content-Type、Content-Length 等
 * 
 * 常用响应头说明：
 * - Content-Type: 响应内容的 MIME 类型（如 application/json）
 * - Content-Length: 响应内容的长度（字节）
 * - Content-Encoding: 响应内容的编码方式（如 gzip）
 * - Cache-Control: 缓存控制指令
 * - Set-Cookie: 设置 Cookie（服务器端设置）
 * - ETag: 资源版本标识
 * - Last-Modified: 资源最后修改时间
 * - Server: 服务器信息
 * - Date: 响应时间
 * 
 * 注意：
 * - 跨域响应的 headers 可能受限制
 * - 某些敏感头信息可能无法通过 JavaScript 访问
 * - 不透明响应（opaque）的 headers 为空
 */

/**
 * 示例 1：获取响应头信息
 * 
 * 使用 fetch 获取响应后，访问 headers 对象
 */
async function getBasicHeaders() {
    console.log('=== 示例 1：获取响应头信息 ===');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // headers 返回一个 Headers 对象
        console.log('headers 对象:', response.headers);
        console.log('headers 类型:', response.headers.constructor.name);
        
        // 使用 has() 检查是否存在某个 header
        console.log('\n检查常用 headers:');
        console.log('has("content-type"):', response.headers.has('content-type'));
        console.log('has("content-length"):', response.headers.has('content-length'));
        console.log('has("server"):', response.headers.has('server'));
    } catch (error) {
        console.error('请求失败:', error);
    }
}

/**
 * 示例 2：获取响应头的值
 * 
 * 使用 get() 方法获取特定响应头的值
 */
async function getHeaderValue() {
    console.log('\n=== 示例 2：获取响应头值 ===');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    // get() 方法返回字符串值（如果存在）
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    const contentLength = response.headers.get('content-length');
    console.log('Content-Length:', contentLength);
    
    const date = response.headers.get('date');
    console.log('Date:', date);
    
    // 获取不存在的 header 返回 null
    const notExist = response.headers.get('x-custom-header');
    console.log('X-Custom-Header:', notExist);  // null
    
    // 注意：header 名称不区分大小写
    console.log('\n大小写不敏感测试:');
    console.log('get("Content-Type"):', response.headers.get('Content-Type'));
    console.log('get("content-type"):', response.headers.get('content-type'));
    console.log('get("CONTENT-TYPE"):', response.headers.get('CONTENT-TYPE'));
    // 三者结果相同
}

/**
 * 示例 3：遍历所有响应头
 * 
 * 使用 forEach 或 for...of 遍历所有响应头
 */
async function iterateHeaders() {
    console.log('\n=== 示例 3：遍历响应头 ===');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    console.log('使用 forEach 遍历:');
    response.headers.forEach((value, name) => {
        console.log(`  ${name}: ${value}`);
    });
    
    console.log('\n使用 for...of 遍历:');
    for (const [name, value] of response.headers) {
        console.log(`  ${name}: ${value}`);
    }
    
    console.log('\n使用 entries() 遍历:');
    for (const entry of response.headers.entries()) {
        console.log(`  ${entry[0]}: ${entry[1]}`);
    }
    
    console.log('\n使用 keys() 获取所有 header 名称:');
    for (const name of response.headers.keys()) {
        console.log(`  - ${name}`);
    }
    
    console.log('\n使用 values() 获取所有 header 值:');
    for (const value of response.headers.values()) {
        console.log(`  - ${value}`);
    }
}

/**
 * 示例 4：解析常见的响应头
 * 
 * 解析 Content-Type、Content-Length 等常用头
 */
async function parseCommonHeaders() {
    console.log('\n=== 示例 4：解析常用响应头 ===');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    // 解析 Content-Type
    const contentType = response.headers.get('content-type');
    console.log('原始 Content-Type:', contentType);
    
    // 解析出 MIME 类型和字符集
    const parts = contentType.split(';').map(s => s.trim());
    console.log('MIME 类型:', parts[0]);
    
    // 提取字符集
    const charsetMatch = contentType.match(/charset=([^;]+)/);
    if (charsetMatch) {
        console.log('字符集:', charsetMatch[1]);
    }
    
    // 解析 Content-Length
    const contentLength = response.headers.get('content-length');
    console.log('\nContent-Length:', contentLength, '字节');
    
    // 解析 Cache-Control
    const cacheControl = response.headers.get('cache-control');
    console.log('Cache-Control:', cacheControl);
    
    // 解析 ETag
    const etag = response.headers.get('etag');
    console.log('ETag:', etag);
    
    // 解析 Last-Modified
    const lastModified = response.headers.get('last-modified');
    console.log('Last-Modified:', lastModified);
    
    // 转换为 Date 对象
    if (lastModified) {
        const date = new Date(lastModified);
        console.log('解析为 Date:', date.toLocaleString());
    }
}

/**
 * 示例 5：处理 JSON 响应的响应头
 * 
 * 根据响应头信息决定如何处理响应
 */
async function handleJsonResponse() {
    console.log('\n=== 示例 5：JSON 响应处理 ===');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    // 检查 Content-Type
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
        console.log('检测到 JSON 响应');
        
        // 解析 JSON
        const data = await response.json();
        console.log('数据:', data);
        
        // 获取响应大小
        const contentLength = response.headers.get('content-length');
        console.log('响应大小:', contentLength, '字节');
        
        // 估算实际数据大小（JSON 字符串长度）
        const jsonString = JSON.stringify(data);
        console.log('JSON 字符串长度:', jsonString.length, '字符');
    } else {
        console.log('非 JSON 响应');
    }
}

/**
 * 示例 6：检查特定响应头
 * 
 * 检查缓存、认证等相关响应头
 */
async function checkSpecificHeaders() {
    console.log('\n=== 示例 6：检查特定响应头 ===');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    // 检查缓存相关头
    console.log('缓存控制:');
    console.log('  Cache-Control:', response.headers.get('cache-control'));
    console.log('  ETag:', response.headers.get('etag'));
    console.log('  Last-Modified:', response.headers.get('last-modified'));
    console.log('  Expires:', response.headers.get('expires'));
    
    // 检查安全相关头
    console.log('\n安全相关:');
    console.log('  X-Frame-Options:', response.headers.get('x-frame-options'));
    console.log('  X-Content-Type-Options:', response.headers.get('x-content-type-options'));
    console.log('  Strict-Transport-Security:', response.headers.get('strict-transport-security'));
    
    // CORS 相关头
    console.log('\nCORS 相关:');
    console.log('  Access-Control-Allow-Origin:', response.headers.get('access-control-allow-origin'));
    console.log('  Access-Control-Allow-Methods:', response.headers.get('access-control-allow-methods'));
}

/**
 * 示例 7：Headers 对象的实用性检查
 * 
 * 展示 Headers 对象提供的实用方法
 */
async function headersUtilityMethods() {
    console.log('\n=== 示例 7：Headers 实用方法 ===');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const headers = response.headers;
    
    // has() - 检查 header 是否存在
    console.log('has("content-type"):', headers.has('content-type'));
    console.log('has("x-unknown"):', headers.has('x-unknown'));
    
    // get() - 获取 header 值
    console.log('\nget("content-type"):', headers.get('content-type'));
    
    // 注意：虽然规范说 get 只能获取第一个值
    // 但实际实现中某些头可能有多个值
    // 可以用 getAll() 获取所有值（如果支持）
    // console.log(headers.getAll('set-cookie'));  // 部分浏览器支持
    
    // forEach() - 遍历所有 headers
    console.log('\n遍历 headers:');
    headers.forEach((value, key) => {
        console.log(`  ${key}: ${value}`);
    });
}

/**
 * 示例 8：处理跨域响应的 headers 限制
 * 
 * 了解跨域请求中 headers 的限制
 */
async function corsHeadersLimitation() {
    console.log('\n=== 示例 8：跨域响应头限制 ===');
    
    // 跨域请求 - 假设请求成功
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'GET',
        mode: 'cors'
    });
    
    console.log('响应类型:', response.type);
    console.log('Content-Type:', response.headers.get('content-type'));
    
    console.log('\n跨域响应头限制说明:');
    console.log('- 只能获取 CORS 允许的响应头');
    console.log('- 简单请求通常允许: Content-Type、Content-Language 等');
    console.log('- 完整 CORS 响应头需要服务器配置 Access-Control-Expose-Headers');
    
    // 不透明响应的 headers
    console.log('\n不透明响应 (no-cors):');
    const opaqueResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        mode: 'no-cors'
    });
    
    console.log('type:', opaqueResponse.type);
    console.log('headers 数量:', opaqueResponse.headers.keys().length);
    console.log('说明: no-cors 模式下无法访问任何 headers');
}

/**
 * 示例 9：实用工具函数 - 创建响应头检查器
 * 
 * 创建便捷函数来检查特定类型的响应头
 */
async function createHeaderChecker() {
    console.log('\n=== 示例 9：响应头检查工具 ===');
    
    // 创建响应头检查工具函数
    function analyzeResponseHeaders(response) {
        const headers = response.headers;
        const analysis = {
            contentType: headers.get('content-type'),
            contentLength: headers.get('content-length'),
            cacheControl: headers.get('cache-control'),
            etag: headers.get('etag'),
            lastModified: headers.get('last-modified'),
            server: headers.get('server'),
            date: headers.get('date'),
            
            // 派生信息
            isJson: (headers.get('content-type') || '').includes('application/json'),
            isHtml: (headers.get('content-type') || '').includes('text/html'),
            isXml: (headers.get('content-type') || '').includes('xml'),
            isCompressed: headers.has('content-encoding'),
            
            // 缓存信息
            isCacheable: (headers.get('cache-control') || '').includes('public'),
            maxAge: parseCacheControl(headers.get('cache-control'))
        };
        
        return analysis;
    }
    
    // 解析 Cache-Control 中的 max-age
    function parseCacheControl(cacheControl) {
        if (!cacheControl) return null;
        const match = cacheControl.match(/max-age=(\d+)/);
        return match ? parseInt(match[1]) : null;
    }
    
    // 测试工具函数
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const analysis = analyzeResponseHeaders(response);
    
    console.log('响应头分析结果:');
    console.log('  是 JSON:', analysis.isJson);
    console.log('  是 HTML:', analysis.isHtml);
    console.log('  是否压缩:', analysis.isCompressed);
    console.log('  是否可缓存:', analysis.isCacheable);
    console.log('  最大缓存时间:', analysis.maxAge, '秒');
    console.log('  服务器:', analysis.server);
    console.log('  响应时间:', analysis.date);
}

// 运行示例
if (require.main === module) {
    console.log('运行 Response.headers 属性示例\n');
    console.log('='.repeat(50));
    
    getBasicHeaders()
        .then(() => getHeaderValue())
        .then(() => iterateHeaders())
        .then(() => parseCommonHeaders())
        .then(() => handleJsonResponse())
        .then(() => checkSpecificHeaders())
        .then(() => headersUtilityMethods())
        .then(() => corsHeadersLimitation())
        .then(() => createHeaderChecker())
        .then(() => console.log('\n' + '='.repeat(50)))
        .catch(console.error);
}
