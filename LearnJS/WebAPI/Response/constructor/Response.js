/**
 * Response 构造函数详细示例
 * 
 * 文件说明:
 * 本文件详细介绍了 Web API 中 Response 构造函数的用法
 * Response 是 Fetch API 的核心组成部分，用于创建 HTTP 响应对象
 * 
 * 用途:
 * 1. 在 Service Worker 中手动创建响应
 * 2. 模拟 API 响应进行测试
 * 3. 创建自定义的响应对象
 * 4. 处理流式数据响应
 * 
 * 浏览器支持:
 * - Chrome 42+
 * - Firefox 39+
 * - Edge 14+
 * - Safari 10+
 * 
 * @author 前端学习资料
 * @version 1.0.0
 */

console.log('========================================');
console.log('Response 构造函数详细示例');
console.log('========================================');

/**
 * ========================================
 * 第一部分：基本语法和最简用法
 * ========================================
 */

// 1.1 创建最基本的 Response 对象
// 不传入任何参数，使用默认值
// 默认状态码: 200, 状态文本: 空字符串, body: null
const basicResponse = new Response();

console.log('\n--- 1.1 最简 Response ---');
console.log('状态码:', basicResponse.status);           // 输出: 200
console.log('状态文本:', basicResponse.statusText);      // 输出: (空字符串)
console.log('body 内容:', basicResponse.body);           // 输出: null
console.log('ok 属性:', basicResponse.ok);              // 输出: true (状态码在 200-299 之间)

// 1.2 创建一个空 body 的响应，常用于 204 No Content
const noContentResponse = new Response(null, {
  status: 204,
  statusText: 'No Content'
});

console.log('\n--- 1.2 空 body 响应 (204) ---');
console.log('状态码:', noContentResponse.status);        // 输出: 204
console.log('状态文本:', noContentResponse.statusText); // 输出: No Content


/**
 * ========================================
 * 第二部分：body 参数的各种类型
 * ========================================
 */

// 2.1 字符串类型 body
// 最常用的方式，类似服务端返回的文本内容
const stringBodyResponse = new Response('Hello World', {
  status: 200,
  statusText: 'OK',
  headers: {
    'Content-Type': 'text/plain; charset=utf-8'
  }
});

console.log('\n--- 2.1 字符串 body ---');
console.log('状态:', stringBodyResponse.status);

// 异步读取 body 内容
stringBodyResponse.text().then(text => {
  console.log('内容:', text);  // 输出: Hello World
});

// 2.2 Blob 类型 body
// 用于二进制数据，如图片、文件等
const blob = new Blob(['这是一段文本内容'], { 
  type: 'text/plain; charset=utf-8' 
});
const blobResponse = new Response(blob, {
  status: 200,
  headers: {
    'Content-Type': 'text/plain',
    'Content-Length': blob.size
  }
});

console.log('\n--- 2.2 Blob body ---');
blobResponse.blob().then(bl => {
  console.log('Blob 大小:', bl.size);
  console.log('Blob 类型:', bl.type);
});

// 2.3 FormData 类型 body
// 用于表单数据提交场景
const formData = new FormData();
formData.append('username', '张三');
formData.append('email', 'zhangsan@example.com');
formData.append('age', '25');

const formDataResponse = new Response(formData, {
  status: 200,
  headers: {
    'Content-Type': 'multipart/form-data'  // 浏览器会自动设置此 header
  }
});

console.log('\n--- 2.3 FormData body ---');
formDataResponse.formData().then(fd => {
  console.log('FormData 内容:', fd.get('username'));
  console.log('FormData email:', fd.get('email'));
});

// 2.4 URLSearchParams 类型 body
// 用于 URL 查询参数，常用于 GET 请求
const searchParams = new URLSearchParams();
searchParams.append('id', '12345');
searchParams.append('action', 'update');
searchParams.append('token', 'abc123xyz');

const urlSearchParamsResponse = new Response(searchParams.toString(), {
  status: 200,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

console.log('\n--- 2.4 URLSearchParams body ---');
urlSearchParamsResponse.text().then(text => {
  console.log('URL 编码内容:', text);
});

// 2.5 ArrayBuffer 类型 body
// 用于处理二进制数据，如自定义协议
const buffer = new ArrayBuffer(8);  // 创建一个 8 字节的缓冲区
const view = new Uint8Array(buffer);
view[0] = 72;  // 'H'
view[1] = 101; // 'e'
view[2] = 108; // 'l'
view[3] = 108; // 'l'
view[4] = 111; // 'o'

const arrayBufferResponse = new Response(buffer, {
  status: 200,
  headers: {
    'Content-Type': 'application/octet-stream'
  }
});

console.log('\n--- 2.5 ArrayBuffer body ---');
arrayBufferResponse.arrayBuffer().then(ab => {
  console.log('ArrayBuffer 长度:', ab.byteLength);
});

// 2.6 ReadableStream 类型 body
// 用于流式数据处理，常用于大文件或实时数据
const stream = new ReadableStream({
  start(controller) {
    // 推送数据到流中
    controller.enqueue('第一部分数据\n');
    controller.enqueue('第二部分数据\n');
    controller.enqueue('第三部分数据');
    // 关闭流
    controller.close();
  }
});

const streamResponse = new Response(stream, {
  status: 200,
  headers: {
    'Content-Type': 'text/plain; charset=utf-8'
  }
});

console.log('\n--- 2.6 ReadableStream body ---');
streamResponse.text().then(text => {
  console.log('流内容:', text);
});

// 2.7 使用 null 作为 body（默认值）
// 等同于不传 body 参数
const nullBodyResponse = new Response(null, {
  status: 200,
  statusText: 'OK'
});

console.log('\n--- 2.7 null body ---');
console.log('body 是否为 null:', nullBodyResponse.body === null);  // true


/**
 * ========================================
 * 第三部分：headers 参数详解
 * ========================================
 */

// 3.1 使用普通对象设置 headers
// 适合简单的键值对场景
const objectHeadersResponse = new Response('JSON Data', {
  status: 200,
  statusText: 'Success',
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'custom-value',
    'X-Request-Id': '123456',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  }
});

console.log('\n--- 3.1 对象形式 headers ---');
console.log('Content-Type:', objectHeadersResponse.headers.get('Content-Type'));
console.log('X-Custom-Header:', objectHeadersResponse.headers.get('X-Custom-Header'));

// 3.2 使用 Headers 对象设置 headers
// 适合需要动态操作 headers 的场景
const headers = new Headers();
// 添加单个 header
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
headers.append('X-Api-Version', 'v2');

// 也可以使用 set 方法（会覆盖已有的同名 header）
headers.set('Accept', 'application/json');

const headersObjectResponse = new Response('API Response Data', {
  status: 200,
  statusText: 'OK',
  headers: headers
});

console.log('\n--- 3.2 Headers 对象 headers ---');
console.log('Authorization:', headersObjectResponse.headers.get('Authorization'));
console.log('Accept:', headersObjectResponse.headers.get('Accept'));


/**
 * ========================================
 * 第四部分：实际应用场景示例
 * ========================================
 */

// 场景 1: 模拟 API 响应
// 在测试环境或开发阶段，可以手动创建 Response 来模拟服务器响应
function createMockApiResponse(data, status = 200, statusText = 'OK') {
  return new Response(JSON.stringify(data), {
    status: status,
    statusText: statusText,
    headers: {
      'Content-Type': 'application/json',
      'X-Response-Time': Date.now().toString(),
      'X-Total-Count': Array.isArray(data) ? data.length.toString() : '1'
    }
  });
}

// 使用示例：模拟成功响应
const mockSuccessResponse = createMockApiResponse({
  success: true,
  data: [
    { id: 1, name: '产品A', price: 100 },
    { id: 2, name: '产品B', price: 200 },
    { id: 3, name: '产品C', price: 300 }
  ]
}, 200, 'OK');

console.log('\n--- 场景 1: 模拟 API 成功响应 ---');
mockSuccessResponse.json().then(data => {
  console.log('响应数据:', JSON.stringify(data, null, 2));
});

// 使用示例：模拟错误响应
const mockErrorResponse = createMockApiResponse({
  success: false,
  error: {
    code: 'UNAUTHORIZED',
    message: '用户未授权，请重新登录'
  }
}, 401, 'Unauthorized');

console.log('\n--- 场景 1: 模拟 API 错误响应 ---');
mockErrorResponse.json().then(data => {
  console.log('错误信息:', JSON.stringify(data, null, 2));
});


// 场景 2: Service Worker 中的响应处理
// 在 Service Worker 中，需要手动创建响应返回给客户端
function handleServiceWorkerRequest(request) {
  const url = new URL(request.url);
  
  // 根据请求路径返回不同的响应
  if (url.pathname.startsWith('/api/')) {
    // API 请求返回 JSON 数据
    return new Response(
      JSON.stringify({ 
        message: '来自 Service Worker 的响应',
        timestamp: Date.now() 
      }),
      {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } else if (url.pathname.startsWith('/static/')) {
    // 静态资源返回缓存内容
    return new Response('静态资源内容', {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } else {
    // 其他请求返回 404
    return new Response('Not Found', {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}

// 模拟一个 Service Worker 请求
console.log('\n--- 场景 2: Service Worker 请求处理 ---');
const mockRequest = new Request('https://example.com/api/data');
handleServiceWorkerRequest(mockRequest).then(response => {
  console.log('响应状态:', response.status);
  console.log('响应状态文本:', response.statusText);
});


// 场景 3: 创建错误响应
// 用于统一的错误处理场景
function createErrorResponse(message, statusCode, errorCode = 'ERROR') {
  const errorBody = {
    success: false,
    error: {
      code: errorCode,
      message: message,
      timestamp: new Date().toISOString()
    }
  };
  
  return new Response(JSON.stringify(errorBody), {
    status: statusCode,
    statusText: getStatusText(statusCode),
    headers: {
      'Content-Type': 'application/json',
      'X-Error-Code': errorCode
    }
  });
}

// 辅助函数：获取状态码对应的文本
function getStatusText(code) {
  const statusTexts = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable'
  };
  return statusTexts[code] || 'Unknown Error';
}

// 使用示例：创建 400 错误
const badRequestResponse = createErrorResponse('请求参数无效', 400, 'INVALID_PARAMS');

console.log('\n--- 场景 3: 创建错误响应 ---');
badRequestResponse.json().then(data => {
  console.log('错误响应:', JSON.stringify(data, null, 2));
});


// 场景 4: 文件下载响应
// 用于创建文件下载的响应对象
function createFileDownloadResponse(fileName, content, mimeType = 'application/octet-stream') {
  // 根据文件名推断 MIME 类型
  if (fileName.endsWith('.pdf')) {
    mimeType = 'application/pdf';
  } else if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
    mimeType = 'image/jpeg';
  } else if (fileName.endsWith('.png')) {
    mimeType = 'image/png';
  } else if (fileName.endsWith('.json')) {
    mimeType = 'application/json';
  }
  
  const blob = new Blob([content], { type: mimeType });
  
  return new Response(blob, {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': blob.size.toString()
    }
  });
}

// 使用示例：创建 JSON 文件下载
const jsonDownloadResponse = createFileDownloadResponse(
  'data.json',
  JSON.stringify({ users: [{ name: '张三' }, { name: '李四' }] }, null, 2),
  'application/json'
);

console.log('\n--- 场景 4: 文件下载响应 ---');
console.log('Content-Disposition:', jsonDownloadResponse.headers.get('Content-Disposition'));


// 场景 5: 图像响应
// 用于生成或处理图像数据的响应
function createImageResponse(imageBuffer, width, height) {
  // 假设 imageBuffer 是图像的原始数据
  return new Response(imageBuffer, {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': imageBuffer.byteLength,
      'Cache-Control': 'public, max-age=31536000',  // 缓存 1 年
      'X-Image-Width': width.toString(),
      'X-Image-Height': height.toString()
    }
  });
}

// 模拟创建图像响应
const mockImageBuffer = new ArrayBuffer(1024);  // 模拟图像数据
const imageResponse = createImageResponse(mockImageBuffer, 800, 600);

console.log('\n--- 场景 5: 图像响应 ---');
console.log('图像宽度:', imageResponse.headers.get('X-Image-Width'));


/**
 * ========================================
 * 第五部分：响应属性验证
 * ========================================
 */

// 验证 Response 对象的各种属性
function analyzeResponse(response) {
  console.log('\n--- Response 属性分析 ---');
  console.log('OK (200-299):', response.ok);
  console.log('状态码:', response.status);
  console.log('状态文本:', response.statusText);
  console.log('URL:', response.url || '(空 - 直接创建的响应)');
  console.log('响应类型:', response.type);  // basic, cors, default, error, opaque
  console.log('body 是否为 null:', response.body === null);
  console.log('bodyUsed:', response.bodyUsed);  // body 是否已被读取
  
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    type: response.type,
    url: response.url
  };
}

// 分析一个自定义响应
const analyzedResponse = analyzeResponse(new Response('Test Content', {
  status: 201,
  statusText: 'Created',
  headers: { 'X-Custom': 'value' }
}));


/**
 * ========================================
 * 第六部分：完整示例 - 封装自定义 Fetch 函数
 * ========================================
 */

// 完整的自定义 fetch 实现，演示 Response 构造函数的实际应用
class MockFetch {
  /**
   * 模拟 fetch 函数
   * @param {string} url - 请求 URL
   * @param {Object} options - 请求选项
   * @returns {Promise<Response>} 响应对象
   */
  static async fetch(url, options = {}) {
    const {
      method = 'GET',
      body = null,
      headers = {},
      status = 200,
      statusText = 'OK',
      delay = 0  // 模拟网络延迟（毫秒）
    } = options;

    // 模拟网络延迟
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    // 处理请求体
    let requestBody = null;
    if (body && method !== 'GET') {
      if (typeof body === 'string') {
        requestBody = body;
      } else if (body instanceof FormData) {
        // 模拟 FormData 转换
        requestBody = 'FormData (模拟)';
      } else {
        requestBody = JSON.stringify(body);
      }
    }

    console.log('\n--- 自定义 Fetch 请求 ---');
    console.log('URL:', url);
    console.log('方法:', method);
    console.log('请求体:', requestBody || '(无)');

    // 创建响应对象
    let responseBody;
    let contentType = 'text/plain';

    if (status >= 200 && status < 300) {
      // 成功响应
      if (requestBody) {
        responseBody = JSON.stringify({
          success: true,
          message: '请求成功',
          data: { received: requestBody },
          timestamp: Date.now()
        });
        contentType = 'application/json';
      } else {
        responseBody = JSON.stringify({
          success: true,
          message: 'GET 请求成功',
          timestamp: Date.now()
        });
        contentType = 'application/json';
      }
    } else {
      // 错误响应
      responseBody = JSON.stringify({
        success: false,
        error: {
          code: status.toString(),
          message: statusText
        },
        timestamp: Date.now()
      });
      contentType = 'application/json';
    }

    return new Response(responseBody, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-Type': contentType,
        'X-Response-Time': Date.now().toString(),
        ...headers
      }
    });
  }

  /**
   * 便捷方法：GET 请求
   */
  static async get(url, options = {}) {
    return this.fetch(url, { ...options, method: 'GET' });
  }

  /**
   * 便捷方法：POST 请求
   */
  static async post(url, data, options = {}) {
    return this.fetch(url, { 
      ...options, 
      method: 'POST', 
      body: typeof data === 'string' ? data : JSON.stringify(data)
    });
  }

  /**
   * 便捷方法：PUT 请求
   */
  static async put(url, data, options = {}) {
    return this.fetch(url, { 
      ...options, 
      method: 'PUT', 
      body: typeof data === 'string' ? data : JSON.stringify(data)
    });
  }

  /**
   * 便捷方法：DELETE 请求
   */
  static async delete(url, options = {}) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }
}

// 使用自定义 fetch 的示例
async function demoCustomFetch() {
  console.log('\n========== 自定义 Fetch 示例 ==========');

  // 1. GET 请求
  const getResponse = await MockFetch.get('/api/users', { delay: 100 });
  console.log('\nGET 响应状态:', getResponse.status);
  const getData = await getResponse.json();
  console.log('GET 响应数据:', JSON.stringify(getData, null, 2));

  // 2. POST 请求
  const postResponse = await MockFetch.post('/api/users', 
    { name: '张三', email: 'zhangsan@example.com' },
    { delay: 150 }
  );
  console.log('\nPOST 响应状态:', postResponse.status);
  const postData = await postResponse.json();
  console.log('POST 响应数据:', JSON.stringify(postData, null, 2));

  // 3. 模拟 404 错误
  const errorResponse = await MockFetch.get('/api/nonexistent', { 
    status: 404, 
    statusText: 'Not Found' 
  });
  console.log('\n404 响应状态:', errorResponse.status);
  const errorData = await errorResponse.json();
  console.log('404 响应数据:', JSON.stringify(errorData, null, 2));

  // 4. 模拟 500 服务器错误
  const serverErrorResponse = await MockFetch.post('/api/error', 
    { test: 'data' },
    { status: 500, statusText: 'Internal Server Error' }
  );
  console.log('\n500 响应状态:', serverErrorResponse.status);
  const serverErrorData = await serverErrorResponse.json();
  console.log('500 响应数据:', JSON.stringify(serverErrorData, null, 2));
}

// 执行示例
demoCustomFetch().then(() => {
  console.log('\n========== 所有示例执行完毕 ==========');
}).catch(error => {
  console.error('执行错误:', error);
});
