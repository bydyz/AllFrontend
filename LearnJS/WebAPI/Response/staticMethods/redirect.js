/**
 * @file redirect.js
 * @description Response.redirect() 静态方法文档 - 返回一个重定向响应的 Response 对象
 * @author 前端学习者
 * @date 2024
 * 
 * ===================================================================
 * Response.redirect() 方法详解
 * ===================================================================
 * 
 * 【用途】
 * Response.redirect() 是一个静态方法，用于创建一个重定向响应的 Response 对象。
 * 这个方法可以方便地创建特定状态码的重定向响应，常用于：
 * - URL 重写或别名处理
 * - 统一跳转页面（如登录后跳转）
 * - 临时或永久重定向
 * - API 路径重定向
 * 
 * 【语法】
 * Response.redirect(url, status)
 * 
 * 【参数】
 * @param {string} url - 重定向的目标 URL（必填）
 *   - 可以是相对路径或绝对路径
 *   - 如果是相对路径，会基于当前 URL 进行解析
 * @param {number} status - HTTP 状态码（可选，默认值为 302）
 *   - 常用的重定向状态码：
 *     - 301: Moved Permanently（永久重定向）
 *     - 302: Found（临时重定向，原来的语义）
 *     - 303: See Other（查看其他位置，用于 POST 重定向到 GET）
 *     - 307: Temporary Redirect（临时重定向，保持请求方法）
 *     - 308: Permanent Redirect（永久重定向，保持请求方法）
 *   - 如果传入无效的状态码，会抛出 RangeError 错误
 * 
 * 【返回值】
 * - 返回一个 Response 对象
 * - 响应状态码为指定的状态码（默认 302）
 * - 响应头中包含 Location 头，值为重定向的 URL
 * - 响应体的 type 为 "basic" 或其他普通类型
 * 
 * 【使用场景】
 * 1. Service Worker 中拦截请求并重定向到其他 URL
 * 2. 在中间件或代理服务器中实现 URL 重写
 * 3. 处理已废弃的 API 路径并重定向到新路径
 * 4. 实现统一的登录跳转逻辑
 * 5. A/B 测试中的流量分配
 * 
 * 【注意事项】
 * - 如果传入无效的 URL，会抛出 TypeError 错误
 * - 状态码必须在 301-399 范围内（重定向状态码范围）
 * - 如果状态码不在有效范围内，会抛出 RangeError 错误
 * - 重定向响应通常需要浏览器自动处理才会生效
 * 
 * ===================================================================
 */

// ============================================================================
// 示例代码
// ============================================================================

/**
 * 示例 1：基本用法 - 创建临时重定向
 * 说明：创建一个 302 临时重定向到指定 URL
 */
function basicRedirect() {
  console.log('=== 示例 1: 基本用法 - 临时重定向 ===');
  
  // 创建 302 临时重定向（默认状态码）
  const tempRedirect = Response.redirect('https://example.com/new-page');
  
  console.log('临时重定向响应:');
  console.log('  status:', tempRedirect.status);        // 302
  console.log('  statusText:', tempRedirect.statusText); // "Found"
  console.log('  url:', tempRedirect.url);              // 重定向后的 URL
  console.log('  ok:', tempRedirect.ok);                // true
  console.log('  type:', tempRedirect.type);            // "basic"
  
  // 获取 Location 头
  console.log('  Location:', tempRedirect.headers.get('Location')); // "https://example.com/new-page"
  
  return tempRedirect;
}

/**
 * 示例 2：创建永久重定向 - 301
 * 说明：使用 301 状态码表示资源已永久移动到新位置
 */
function permanentRedirect() {
  console.log('\n=== 示例 2: 永久重定向 - 301 ===');
  
  // 创建 301 永久重定向
  const permanentRedirect = Response.redirect('https://example.com/new-location', 301);
  
  console.log('永久重定向响应:');
  console.log('  status:', permanentRedirect.status);        // 301
  console.log('  statusText:', permanentRedirect.statusText); // "Moved Permanently"
  console.log('  Location:', permanentRedirect.headers.get('Location'));
  
  return permanentRedirect;
}

/**
 * 示例 3：创建 307 临时重定向
 * 说明：307 会保持原始请求方法（GET 仍然是 GET，POST 仍然是 POST）
 */
function temporaryRedirect307() {
  console.log('\n=== 示例 3: 临时重定向 - 307 ===');
  
  // 创建 307 临时重定向（保持请求方法）
  const redirect307 = Response.redirect('https://example.com/temp', 307);
  
  console.log('307 重定向响应:');
  console.log('  status:', redirect307.status);        // 307
  console.log('  statusText:', redirect307.statusText); // "Temporary Redirect"
  console.log('  Location:', redirect307.headers.get('Location'));
  
  return redirect307;
}

/**
 * 示例 4：创建 303 重定向
 * 说明：303 通常用于 POST 请求后重定向到 GET 页面
 */
function seeOtherRedirect() {
  console.log('\n=== 示例 4: See Other - 303 ===');
  
  // 创建 303 重定向（常用于表单提交后跳转）
  const redirect303 = Response.redirect('https://example.com/success', 303);
  
  console.log('303 重定向响应:');
  console.log('  status:', redirect303.status);        // 303
  console.log('  statusText:', redirect303.statusText); // "See Other"
  console.log('  Location:', redirect303.headers.get('Location'));
  
  // 实际应用场景说明
  console.log('\n使用场景:');
  console.log('  303 通常用于表单提交后，强制将 POST 请求转换为 GET 请求');
  console.log('  这样可以防止用户刷新页面时重复提交表单');
  
  return redirect303;
}

/**
 * 示例 5：使用相对路径
 * 说明：可以传入相对路径，会基于当前 URL 进行解析
 */
function relativePathRedirect() {
  console.log('\n=== 示例 5: 相对路径重定向 ===');
  
  // 创建相对路径的重定向
  // 注意：在 Service Worker 或特定环境中，相对路径会基于当前请求 URL 解析
  const relativeRedirect = Response.redirect('./new-page.html', 302);
  
  console.log('相对路径重定向:');
  console.log('  status:', relativeRedirect.status);
  console.log('  Location:', relativeRedirect.headers.get('Location'));
  
  return relativeRedirect;
}

/**
 * 示例 6：在 Service Worker 中使用
 * 说明：展示如何在 Service Worker 中使用 redirect 方法
 */
function serviceWorkerRedirectExample() {
  console.log('\n=== 示例 6: Service Worker 重定向示例 ===');
  
  // 这是一个 Service Worker 中常见的重定向模式
  // 实际代码通常在 sw.js 文件中
  
  /* 
  // Service Worker 代码示例：
  self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // 示例：将旧版 API 路径重定向到新版
    if (url.pathname.startsWith('/api/v1/')) {
      // 将 /api/v1/* 重定向到 /api/v2/*
      const newPath = url.pathname.replace('/api/v1/', '/api/v2/');
      const newUrl = `${url.origin}${newPath}`;
      
      event.respondWith(Response.redirect(newUrl, 301));
      return;
    }
    
    // 其他请求继续处理
    event.respondWith(fetch(event.request));
  });
  */
  
  // 模拟 Service Worker 重定向逻辑
  const handleRedirect = (requestUrl, oldVersion, newVersion) => {
    // 检查是否需要重定向
    const url = new URL(requestUrl);
    
    if (url.pathname.startsWith(`/api/${oldVersion}/`)) {
      // 构建新的 URL
      const newPath = url.pathname.replace(`/api/${oldVersion}/`, `/api/${newVersion}/`);
      const newUrl = `${url.origin}${newPath}`;
      
      console.log(`重定向: ${requestUrl} -> ${newUrl}`);
      
      // 返回 301 永久重定向
      return Response.redirect(newUrl, 301);
    }
    
    return null;
  };
  
  // 测试重定向
  const oldApiUrl = 'https://api.example.com/api/v1/users';
  const newApiUrl = 'https://api.example.com/api/v2/users';
  
  const result = handleRedirect(oldApiUrl, 'v1', 'v2');
  
  if (result) {
    console.log('重定向响应:');
    console.log('  status:', result.status);
    console.log('  Location:', result.headers.get('Location'));
  }
  
  return handleRedirect;
}

/**
 * 示例 7：无效状态码错误处理
 * 说明：展示当传入无效状态码时的错误
 */
function invalidStatusError() {
  console.log('\n=== 示例 7: 无效状态码错误 ===');
  
  // 尝试使用无效的状态码
  // 注意：重定向状态码必须在 301-399 范围内
  try {
    // 这将抛出 RangeError: Invalid status code
    // const invalidRedirect = Response.redirect('https://example.com', 200);
    
    // 为了安全，我们不实际执行这行代码
    console.log('如果使用无效状态码（如 200），会抛出 RangeError');
    console.log('有效范围: 301-399（重定向状态码）');
    console.log('\n常用有效状态码:');
    console.log('  301 - Moved Permanently（永久重定向）');
    console.log('  302 - Found（临时重定向）');
    console.log('  303 - See Other（查看其他位置）');
    console.log('  307 - Temporary Redirect（临时重定向，保持方法）');
    console.log('  308 - Permanent Redirect（永久重定向，保持方法）');
  } catch (error) {
    console.log('错误:', error.message);
  }
  
  return null;
}

/**
 * 示例 8：实际应用场景 - URL 别名重定向
 * 说明：展示一个完整的 URL 别名处理场景
 */
function urlAliasRedirect() {
  console.log('\n=== 示例 8: URL 别名重定向应用 ===');
  
  // 定义 URL 别名映射表
  const urlAliases = {
    '/about': '/about-us',
    '/home': '/',
    '/products': '/shop',
    '/contact-us': '/contact'
  };
  
  // 模拟请求处理函数
  const handleRequest = (requestPath) => {
    // 检查是否有对应的别名
    if (urlAliases[requestPath]) {
      const newPath = urlAliases[requestPath];
      console.log(`别名重定向: ${requestPath} -> ${newPath}`);
      
      // 创建 301 永久重定向（SEO 友好）
      return Response.redirect(newPath, 301);
    }
    
    // 没有别名，返回原始请求
    console.log(`无别名，保持原路径: ${requestPath}`);
    return null;
  };
  
  // 测试不同的路径
  const testPaths = ['/about', '/home', '/products', '/unknown'];
  
  testPaths.forEach(path => {
    const result = handleRequest(path);
    if (result) {
      console.log(`  -> 状态码: ${result.status}, 目标: ${result.headers.get('Location')}`);
    }
  });
  
  return handleRequest;
}

/**
 * 示例 9：比较不同重定向方法
 * 说明：展示 301、302、303、307、308 的区别
 */
function compareRedirectStatus() {
  console.log('\n=== 示例 9: 不同重定向状态码对比 ===');
  
  const targetUrl = 'https://example.com/new-location';
  const statusCodes = [
    { code: 301, name: 'Moved Permanently', desc: '永久重定向，SEO 友好，会缓存' },
    { code: 302, name: 'Found', desc: '临时重定向，不一定缓存' },
    { code: 303, name: 'See Other', desc: '强制转换为 GET 请求' },
    { code: 307, name: 'Temporary Redirect', desc: '临时重定向，保持请求方法' },
    { code: 308, name: 'Permanent Redirect', desc: '永久重定向，保持请求方法' }
  ];
  
  statusCodes.forEach(({ code, name, desc }) => {
    const redirect = Response.redirect(targetUrl, code);
    console.log(`\n${code} ${name}:`);
    console.log(`  状态码: ${redirect.status}`);
    console.log(`  状态文本: ${redirect.statusText}`);
    console.log(`  描述: ${desc}`);
    console.log(`  Location: ${redirect.headers.get('Location')}`);
  });
  
  return statusCodes.map(({ code }) => Response.redirect(targetUrl, code));
}

// ============================================================================
// 运行所有示例
// ============================================================================

console.log('========================================');
console.log('Response.redirect() 方法示例');
console.log('========================================\n');

// 示例 1: 基本用法
basicRedirect();

// 示例 2: 永久重定向
permanentRedirect();

// 示例 3: 307 临时重定向
temporaryRedirect307();

// 示例 4: 303 重定向
seeOtherRedirect();

// 示例 5: 相对路径
relativePathRedirect();

// 示例 6: Service Worker 示例
serviceWorkerRedirectExample();

// 示例 7: 错误处理
invalidStatusError();

// 示例 8: 实际应用
urlAliasRedirect();

// 示例 9: 状态码对比
compareRedirectStatus();

console.log('\n========================================');
console.log('所有示例执行完成');
console.log('========================================');
