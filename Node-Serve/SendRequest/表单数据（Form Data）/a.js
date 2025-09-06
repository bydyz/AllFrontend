// Node.js 的 http 模块可以发送表单数据（通常指的是 application/x-www-form-urlencoded 格式的数据）。为了发送表单数据，你需要构建一个包含键值对的请求体，并设置适当的 Content-Type 请求头。下面是一个使用 http 模块发送表单数据的例子：

const http = require('http');
const querystring = require('querystring');

// 表单数据
const formData = {
  username: 'johndoe',
  password: 'secret',
  remember: true
};

//！ 将表单数据转换为 URL 编码的查询字符串
const body = querystring.stringify(formData);

// 请求选项
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(body)
  }
};

// 创建一个 HTTP 请求
const req = http.request(options, res => {
  // 处理响应
  console.log(`状态码: ${res.statusCode}`);
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    console.log(rawData);
  });
});

// 发送请求体
req.write(body);

// 处理请求错误
req.on('error', e => {
  console.error(`问题: ${e.message}`);
});

// 必须调用 req.end() 来发送请求
req.end();



// 在这个例子中，我们首先使用 querystring.stringify() 方法将 JavaScript 对象转换为 URL 编码的字符串。然后，我们设置了请求选项，包括请求方法为 'POST'，以及适当的 Content-Type 和 Content-Length 头信息。

// 接下来，我们使用 http.request() 方法创建了一个 HTTP 请求，并通过 req.write() 方法发送了请求体。最后，我们调用 req.end() 方法来结束请求。

// 请注意，虽然 http 模块可以用于发送表单数据，但在处理复杂的请求（如文件上传或需要发送 JSON 数据）时，使用更高级别的库（如 axios、superagent 或 node-fetch）可能会更方便。此外，对于 HTTPS 请求，你需要使用 https 模块而不是 http 模块，并确保正确处理 SSL 证书。