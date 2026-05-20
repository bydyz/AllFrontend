/**
 * @file error.js
 * @description Response.error() 静态方法文档 - 返回一个关联网络错误的 Response 对象
 * @author 前端学习者
 * @date 2024
 * 
 * ===================================================================
 * Response.error() 方法详解
 * ===================================================================
 * 
 * 【用途】
 * Response.error() 是一个静态方法，用于创建一个关联网络错误的 Response 对象。
 * 这个方法通常用于 fetch 请求失败时返回一个错误响应，以便在 fetch 的 catch 捕获之前
 * 进行一些错误处理或重试逻辑。
 * 
 * 【语法】
 * Response.error()
 * 
 * 【参数】
 * - 无参数
 * 
 * 【返回值】
 * - 返回一个 Response 对象，该对象的 ok 属性为 false，status 属性为 0
 * - 响应体的类型为 "error"
 * - 响应的 URL 为 "about:blank"
 * 
 * 【使用场景】
 * 1. 在 Service Worker 中拦截 fetch 请求并返回错误响应
 * 2. 在自定义 fetch 包装器中处理网络错误
 * 3. 模拟网络错误进行测试
 * 4. 在缓存策略中处理错误响应
 * 
 * 【注意事项】
 * - 返回的 Response 对象的 body 是不可以读取的（ReadableStream 状态为 errored）
 * - 此方法创建的是网络级别错误，而非 HTTP 错误状态码
 * - 主要用于 fetch API 的错误处理流程中
 * 
 * ===================================================================
 */

// ============================================================================
// 示例代码
// ============================================================================

/**
 * 示例 1：基本用法 - 创建一个错误响应
 * 说明：直接调用 Response.error() 创建错误响应
 */
function basicErrorResponse() {
  // 创建错误响应对象
  const errorResponse = Response.error();
  
  // 查看错误响应的属性
  console.log('=== 示例 1: 基本用法 ===');
  console.log('ok:', errorResponse.ok);           // false
  console.log('status:', errorResponse.status);   // 0
  console.log('statusText:', errorResponse.statusText); // ""
  console.log('url:', errorResponse.url);         // "about:blank"
  console.log('type:', errorResponse.type);       // "error"
  console.log('bodyUsed:', errorResponse.bodyUsed); // false
  
  return errorResponse;
}

/**
 * 示例 2：在 fetch 中使用 - 处理网络错误
 * 说明：模拟 fetch 请求失败时返回错误响应
 */
function fetchWithError() {
  console.log('\n=== 示例 2: 在 fetch 中使用 ===');
  
  // 模拟一个会失败的 fetch 请求
  // 实际上 Response.error() 常用于 Service Worker 或自定义 fetch 逻辑中
  const fetchWithErrorHandling = () => {
    return fetch('https://invalid-domain-that-does-not-exist.com/api/data')
      .then(response => {
        if (!response.ok) {
          // HTTP 错误状态（4xx, 5xx）
          console.log('HTTP 错误:', response.status, response.statusText);
          return response;
        }
        return response;
      })
      .catch(error => {
        // 网络错误（如 DNS 解析失败、连接超时等）
        // 注意：fetch 不会因为 HTTP 错误状态而进入 catch
        // 只有网络错误才会进入 catch
        console.log('网络错误发生:', error.message);
        
        // 在某些场景下，你可能需要返回一个错误响应而不是抛出异常
        // 此时可以使用 Response.error()
        return Response.error();
      });
  };
  
  return fetchWithErrorHandling().catch(() => Response.error());
}

/**
 * 示例 3：在 Service Worker 中的使用
 * 说明：Service Worker 拦截 fetch 请求并返回错误响应
 */
function serviceWorkerErrorExample() {
  console.log('\n=== 示例 3: Service Worker 示例（模拟） ===');
  
  // 模拟 Service Worker 错误处理逻辑
  const handleFetchInServiceWorker = (request) => {
    // 尝试发起请求
    const tryFetch = () => fetch(request);
    
    // 模拟请求失败的场景
    return tryFetch()
      .then(response => {
        // 请求成功，检查响应状态
        if (!response.ok) {
          console.log(`请求返回错误状态: ${response.status}`);
        }
        return response;
      })
      .catch(error => {
        // 网络错误 - 返回错误响应
        console.log('Service Worker 捕获到网络错误:', error.message);
        return Response.error();
      });
  };
  
  return handleFetchInServiceWorker;
}

/**
 * 示例 4：模拟网络错误进行测试
 * 说明：在测试环境中模拟各种网络错误场景
 */
function testingErrorScenario() {
  console.log('\n=== 示例 4: 测试场景 ===');
  
  // 创建错误响应的工厂函数
  const createNetworkError = () => Response.error();
  
  // 测试：验证错误响应的属性
  const testErrorResponse = () => {
    const errorResponse = createNetworkError();
    
    // 断言检查
    const assertions = [
      { name: 'ok 应该是 false', check: errorResponse.ok === false },
      { name: 'status 应该是 0', check: errorResponse.status === 0 },
      { name: 'type 应该是 error', check: errorResponse.type === 'error' },
      { name: 'url 应该是 about:blank', check: errorResponse.url === 'about:blank' },
      { name: 'bodyUsed 应该是 false', check: errorResponse.bodyUsed === false }
    ];
    
    console.log('测试结果:');
    assertions.forEach(({ name, check }) => {
      console.log(`  ${check ? '✓' : '✗'} ${name}`);
    });
    
    return assertions.every(a => a.check);
  };
  
  const passed = testErrorResponse();
  console.log(`\n所有测试 ${passed ? '通过' : '失败'}`);
  
  return passed;
}

/**
 * 示例 5：与 fetch 的 ok 检查结合使用
 * 说明：展示如何正确检查和处理错误响应
 */
function combinedOkCheck() {
  console.log('\n=== 示例 5: 结合 ok 检查 ===');
  
  // 完整的响应处理函数
  const handleResponse = (response) => {
    // 检查响应是否成功
    if (!response.ok) {
      console.log(`HTTP 错误: ${response.status} ${response.statusText}`);
      // 注意：Response.error() 创建的响应 ok 为 false
      // 但 type 为 "error"，可以通过 type 属性进一步区分
      if (response.type === 'error') {
        console.log('这是网络错误（通过 Response.error() 创建）');
      }
      return null;
    }
    
    // 处理成功响应
    return response.json().catch(() => null);
  };
  
  // 创建模拟的响应对象来测试
  const mockOkResponse = new Response(JSON.stringify({ data: 'test' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  
  const mockErrorResponse = Response.error();
  
  console.log('测试 OK 响应:');
  handleResponse(mockOkResponse);
  
  console.log('\n测试错误响应:');
  handleResponse(mockErrorResponse);
  
  return { mockOkResponse, mockErrorResponse };
}

/**
 * 示例 6：比较不同响应类型
 * 说明：展示 Response.error() 与普通响应的区别
 */
function compareResponseTypes() {
  console.log('\n=== 示例 6: 比较不同响应类型 ===');
  
  // 创建不同类型的响应
  const responses = {
    // 正常成功响应
    success: new Response('Hello', { status: 200 }),
    
    // HTTP 错误响应
    httpError: new Response('Not Found', { status: 404 }),
    
    // 网络错误响应（通过静态方法创建）
    networkError: Response.error(),
    
    // 重定向响应（通过静态方法创建）
    redirect: Response.redirect('https://example.com', 301)
  };
  
  // 遍历并打印每种响应的属性
  Object.entries(responses).forEach(([name, response]) => {
    console.log(`\n--- ${name} ---`);
    console.log(`  ok: ${response.ok}`);
    console.log(`  status: ${response.status}`);
    console.log(`  statusText: "${response.statusText}"`);
    console.log(`  type: ${response.type}`);
    console.log(`  url: ${response.url}`);
    console.log(`  bodyUsed: ${response.bodyUsed}`);
  });
  
  return responses;
}

// ============================================================================
// 运行所有示例
// ============================================================================

console.log('========================================');
console.log('Response.error() 方法示例');
console.log('========================================\n');

// 示例 1: 基本用法
basicErrorResponse();

// 示例 3: Service Worker 示例
const swHandler = serviceWorkerErrorExample();
console.log('Service Worker 处理器已创建');

// 示例 4: 测试场景
testingErrorScenario();

// 示例 5: 结合 ok 检查
combinedOkCheck();

// 示例 6: 比较不同响应类型
compareResponseTypes();

console.log('\n========================================');
console.log('所有示例执行完成');
console.log('========================================');
