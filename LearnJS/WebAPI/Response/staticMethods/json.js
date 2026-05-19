/**
 * @file json.js
 * @description Response.json() 静态方法文档 - 创建一个 JSON 响应对象的便捷方法
 * @author 前端学习者
 * @date 2024
 * 
 * ===================================================================
 * Response.json() 方法详解
 * ===================================================================
 * 
 * 【用途】
 * Response.json() 是一个静态方法，用于便捷地创建一个 JSON 响应的 Response 对象。
 * 这个方法是对 new Response(JSON.stringify(data), init) 的封装，专门用于返回 JSON 数据。
 * 它自动设置 Content-Type 为 application/json，并会将传入的数据序列化为 JSON 字符串。
 * 
 * 【语法】
 * Response.json(data, init)
 * 
 * 【参数】
 * @param {any} data - 要转换为 JSON 并作为响应体的数据（必填）
 *   - 可以是任何可序列化的 JavaScript 值（对象、数组、字符串、数字、布尔值、null）
 *   - 如果传入 undefined，响应体将为字符串 \"undefined\"
 * @param {ResponseInit} init - 可选的响应配置对象（可选）
 *   - status: HTTP 状态码（默认 200）
 *   - statusText: HTTP 状态文本（默认 \"OK\"）
 *   - headers: 响应头对象，可以是 Headers 实例或普通对象
 * 
 * 【返回值】
 * - 返回一个 Response 对象
 * - 自动设置 Content-Type 为 application/json
 * - 响应体为序列化后的 JSON 字符串
 * - 默认状态码为 200，状态文本为 \"OK\"
 * 
 * 【使用场景】
 * 1. 在 Service Worker 中返回 JSON API 响应
 * 2. 创建 RESTful API 的 JSON 响应
 * 3. 模拟 API 返回测试数据
 * 4. 在中间件中处理并返回 JSON 格式的错误信息
 * 
 * 【注意事项】
 * - Response.json() 内部使用 JSON.stringify() 转换数据，因此 undefined 和函数会被忽略
 * - 循环引用的对象会抛出 TypeError
 * - 若要返回其他内容类型（如 XML），需使用 new Response() 构造函数
 * 
 * ===================================================================
 */

// ============================================================================
// 示例代码
// ============================================================================

/**
 * 示例 1：基本用法 - 创建一个简单的 JSON 响应
 * 说明：使用 Response.json() 创建一个基础的 JSON 响应
 */
function basicJsonResponse() {
  console.log('=== 示例 1: 基本用法 - 简单 JSON 响应 ===');
  
  // 创建一个简单的 JSON 响应
  const jsonResponse = Response.json({ message: 'Hello World' });
  
  // 查看响应的属性
  console.log('ok:', jsonResponse.ok);                           // true
  console.log('status:', jsonResponse.status);                   // 200
  console.log('statusText:', jsonResponse.statusText);           // \"OK\"
  console.log('type:', jsonResponse.type);                       // \"default\"
  console.log('Content-Type:', jsonResponse.headers.get('Content-Type')); // \"application/json\"
  
  // 读取响应体
  jsonResponse.clone().json().then(data => {
    console.log('解析后的数据:', data);
  });
  
  return jsonResponse;
}

/**
 * 示例 2：创建带有复杂数据的 JSON 响应
 * 说明：展示如何返回对象、数组等复杂数据结构
 */
function complexJsonResponse() {
  console.log('\n=== 示例 2: 复杂数据结构 ===');
  
  // 创建包含多种数据类型的 JSON 响应
  const complexData = {
    user: {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      roles: ['admin', 'user']
    },
    metadata: {
      total: 100,
      page: 1,
      pageSize: 20
    },
    timestamp: new Date().toISOString(),
    success: true
  };
  
  const jsonResponse = Response.json(complexData);
  
  // 打印响应信息
  console.log('状态码:', jsonResponse.status);
  console.log('Content-Type:', jsonResponse.headers.get('Content-Type'));
  
  // 读取响应体
  jsonResponse.clone().json().then(data => {
    console.log('解析后的数据:');
    console.log(JSON.stringify(data, null, 2));
  });
  
  return jsonResponse;
}

/**
 * 示例 3：自定义状态码 - 创建错误响应的 JSON
 * 说明：使用 init 参数自定义 HTTP 状态码
 */
function customStatusJsonResponse() {
  console.log('\n示例 3: 自定义状态码 ===');
  
  // 创建一个 404 未找到的 JSON 响应
  const notFoundResponse = Response.json(
    { error: '资源不存在', code: 'NOT_FOUND' },
    { status: 404 }
  );
  
  console.log('404 响应:');
  console.log('  status:', notFoundResponse.status);        // 404
  console.log('  statusText:', notFoundResponse.statusText); // \"Not Found\"
  
  // 创建一个 500 服务器错误的 JSON 响应
  const serverErrorResponse = Response.json(
    { error: '服务器内部错误', message: '请稍后重试' },
    { status: 500, statusText: 'Internal Server Error' }
  );
  
  console.log('\n500 响应:');
  console.log('  status:', serverErrorResponse.status);      // 500
  
  return { notFoundResponse, serverErrorResponse };
}

/**
 * 示例 4：添加自定义响应头
 * 说明：展示如何在响应中添加额外的响应头
 */
function customHeadersJsonResponse() {
  console.log('\n=== 示例 4: 自定义响应头 ===');
  
  // 创建带有自定义头的 JSON 响应
  const jsonResponse = Response.json(
    { data: 'test data' },
    {
      headers: {
        'X-Request-Id': 'abc123',
        'X-Rate-Limit': '100',
        'Cache-Control': 'no-cache'
      }
    }
  );
  
  // 读取自定义头
  console.log('X-Request-Id:', jsonResponse.headers.get('X-Request-Id'));
  console.log('X-Rate-Limit:', jsonResponse.headers.get('X-Rate-Limit'));
  console.log('Cache-Control:', jsonResponse.headers.get('Cache-Control'));
  console.log('Content-Type:', jsonResponse.headers.get('Content-Type'));
  
  return jsonResponse;
}

/**
 * 示例 5：在 Service Worker 中使用
 * 说明：展示如何在 Service Worker 中使用 Response.json() 返回 API 响应
 */
function serviceWorkerJsonExample() {
  console.log('\n=== 示例 5: Service Worker 示例 ===');
  
  // 模拟 Service Worker 中的 API 响应处理
  const handleApiRequest = (request) => {
    const url = new URL(request.url);
    
    // 模拟不同的 API 端点
    if (url.pathname === '/api/users') {
      // 返回用户列表
      return Response.json(
        {
          users: [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' }
          ],
          total: 2
        },
        { status: 200 }
      );
    } else if (url.pathname === '/api/user') {
      // 返回单个用户
      return Response.json(
        { id: 1, name: '张三', email: 'zhangsan@example.com' },
        { status: 200 }
      );
    } else {
      // 未找到端点
      return Response.json(
        { error: 'API 端点不存在' },
        { status: 404 }
      );
    }
  };
  
  // 模拟请求
  const mockRequest = new Request('https://example.com/api/users');
  const response = handleApiRequest(mockRequest);
  
  console.log('处理结果:');
  console.log('  status:', response.status);
  console.log('  Content-Type:', response.headers.get('Content-Type'));
  
  response.clone().json().then(data => {
    console.log('  响应数据:', JSON.stringify(data, null, 2));
  });
  
  return handleApiRequest;
}

/**
 * 示例 6：模拟 RESTful API 响应
 * 说明：展示如何创建符合 RESTful 风格的 API 响应
 */
function restfulApiResponse() {
  console.log('\n=== 示例 6: RESTful API 响应模式 ===');
  
  // RESTful 响应工厂函数
  const api = {
    // 成功响应
    success: (data, message = '操作成功') => {
      return Response.json(
        { success: true, message, data },
        { status: 200 }
      );
    },
    
    // 创建成功响应 (201 Created)
    created: (data, message = '创建成功') => {
      return Response.json(
        { success: true, message, data },
        { status: 201 }
      );
    },
    
    // 错误响应
    error: (message, code = 400) => {
      return Response.json(
        { success: false, error: message },
        { status: code }
      );
    },
    
    // 无内容响应 (204 No Content)
    noContent: () => {
      return new Response(null, { status: 204 });
    }
  };
  
  // 测试不同的响应类型
  console.log('测试成功响应:');
  api.success({ id: 1, name: '测试' }).clone().json().then(console.log);
  
  console.log('\n测试创建成功响应:');
  api.created({ id: 2, name: '新数据' }).clone().json().then(console.log);
  
  console.log('\n测试错误响应:');
  api.error('请求参数错误', 400).clone().json().then(console.log);
  
  return api;
}

/**
 * 示例 7：JSON 序列化注意事项
 * 说明：展示 JSON.stringify() 的行为差异
 */
function jsonSerializationNotes() {
  console.log('\n=== 示例 7: JSON 序列化注意事项 ===');
  
  // 1. undefined 会被忽略
  const undefinedData = Response.json({ a: 1, b: undefined, c: null });
  undefinedData.clone().text().then(text => {
    console.log('undefined 行为:');
    console.log('  原始: { a: 1, b: undefined, c: null }');
    console.log('  结果:', text);
  });
  
  // 2. 函数会被忽略
  const functionData = Response.json({ 
    name: 'test', 
    getName: function() { return this.name; } 
  });
  functionData.clone().text().then(text => {
    console.log('\n函数行为:');
    console.log('  原始: { name: \"test\", getName: function() {...} }');
    console.log('  结果:', text);
  });
  
  // 3. Symbol 会被忽略
  const symbolData = Response.json({ 
    name: 'test', 
    symbol: Symbol('desc') 
  });
  symbolData.clone().text().then(text => {
    console.log('\nSymbol 行为:');
    console.log('  原始: { name: \"test\", symbol: Symbol(\"desc\") }');
    console.log('  结果:', text);
  });
  
  // 4. 循环引用会抛出错误
  try {
    const circular = { name: 'circular' };
    circular.self = circular;
    Response.json(circular);
  } catch (error) {
    console.log('\n循环引用错误:');
    console.log('  错误:', error.message);
  }
  
  return { undefinedData, functionData, symbolData };
}

/**
 * 示例 8：与 fetch 结合使用
 * 说明：展示如何在实际应用中结合 fetch 使用 Response.json()
 */
function fetchIntegrationExample() {
  console.log('\n=== 示例 8: 与 fetch 结合 ===');
  
  // 创建一个简单的 fetch 封装函数
  async function fetchJson(url, options = {}) {
    // 注意：这里只是演示 Response.json() 的用法
    // 实际应用中，服务器返回 Response，我们可以直接使用
    console.log(`请求 URL: ${url}`);
    return { url, options };
  }
  
  // 模拟服务器端使用 Response.json()
  // 在实际场景中，这通常在服务器端或 Service Worker 中
  const mockServerResponse = () => {
    // 模拟服务器返回 JSON 响应
    return Response.json(
      { message: '这是服务器返回的 JSON 数据' },
      { 
        status: 200,
        headers: { 'X-Powered-By': 'Demo Server' }
      }
    );
  };
  
  // 获取响应并处理
  const response = mockServerResponse();
  console.log('服务器响应状态:', response.status);
  console.log('Content-Type:', response.headers.get('Content-Type'));
  
  response.clone().json().then(data => {
    console.log('解析后的数据:', data);
  });
  
  return { fetchJson, mockServerResponse };
}

/**
 * 示例 9：比较 Response.json() 和 new Response()
 * 说明：展示两种创建 JSON 响应方式的区别
 */
function compareWithNewResponse() {
  console.log('\n=== 示例 9: 两种方式对比 ===');
  
  const data = { message: 'Hello' };
  
  // 方式 1: 使用 Response.json()（简洁）
  const response1 = Response.json(data);
  
  // 方式 2: 使用 new Response()（更灵活）
  const response2 = new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
  
  console.log('Response.json():');
  console.log('  状态:', response1.status);
  console.log('  Content-Type:', response1.headers.get('Content-Type'));
  
  console.log('\nnew Response():');
  console.log('  状态:', response2.status);
  console.log('  Content-Type:', response2.headers.get('Content-Type'));
  
  // 两者都可以正确解析
  response1.clone().json().then(d => console.log('\nResponse.json() 解析:', d));
  response2.clone().json().then(d => console.log('new Response() 解析:', d));
  
  return { response1, response2 };
}

/**
 * 示例 10：实际应用场景 - 错误处理中间件
 * 说明：展示一个完整的错误处理响应创建函数
 */
function errorHandlingMiddleware() {
  console.log('\n=== 示例 10: 错误处理中间件 ===');
  
  // 错误响应工厂
  const errorResponse = (status, message, details = null) => {
    const body = {
      error: {
        status,
        message,
        timestamp: new Date().toISOString()
      }
    };
    
    if (details) {
      body.error.details = details;
    }
    
    return Response.json(body, { status });
  };
  
  // 成功响应工厂
  const successResponse = (data, message = '成功') => {
    return Response.json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    }, { status: 200 });
  };
  
  // 测试各种错误场景
  const errors = [
    errorResponse(400, '请求参数错误', { field: 'email', reason: '格式不正确' }),
    errorResponse(401, '未授权', '请登录后再试'),
    errorResponse(403, '禁止访问', '权限不足'),
    errorResponse(404, '资源不存在'),
    errorResponse(500, '服务器错误')
  ];
  
  console.log('错误响应示例:');
  errors.forEach((res, i) => {
    console.log(`\n错误 ${i + 1} - 状态码 ${res.status}:`);
    res.clone().json().then(data => console.log(JSON.stringify(data, null, 2)));
  });
  
  // 测试成功响应
  console.log('\n成功响应:');
  successResponse({ id: 1, name: '测试' }).clone().json().then(data => {
    console.log(JSON.stringify(data, null, 2));
  });
  
  return { errorResponse, successResponse };
}

// ============================================================================
// 运行所有示例
// ============================================================================

console.log('========================================');
console.log('Response.json() 方法示例');
console.log('========================================\n');

// 示例 1: 基本用法
basicJsonResponse();

// 示例 2: 复杂数据
setTimeout(() => complexJsonResponse(), 100);

// 示例 3: 自定义状态码
setTimeout(() => customStatusJsonResponse(), 200);

// 示例 4: 自定义头
setTimeout(() => customHeadersJsonResponse(), 300);

// 示例 5: Service Worker
setTimeout(() => serviceWorkerJsonExample(), 400);

// 示例 6: RESTful API
setTimeout(() => restfulApiResponse(), 500);

// 示例 7: 序列化注意事项
setTimeout(() => jsonSerializationNotes(), 600);

// 示例 8: fetch 结合
setTimeout(() => fetchIntegrationExample(), 700);

// 示例 9: 两种方式对比
setTimeout(() => compareWithNewResponse(), 800);

// 示例 10: 错误处理
setTimeout(() => errorHandlingMiddleware(), 900);

setTimeout(() => {
  console.log('\n========================================');
  console.log('所有示例执行完成');
  console.log('========================================');
}, 1000);
