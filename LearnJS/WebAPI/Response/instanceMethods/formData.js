/**
 * @file formData.js
 * @description Response.formData() 方法文档 - 将响应 body 转换为 FormData
 * @author 前端学习
 */

/**
 * formData() - 将响应 body 转换为 FormData
 * 
 * 读取响应 body 并将其解析为 FormData 对象。
 * FormData 对象用于构建表单数据，常用于文件上传和多部分数据传输。
 * 
 * 注意：此方法要求响应的 Content-Type 头为 multipart/form-data。
 * 如果响应不是多部分表单数据，此方法会抛出错误。
 * 
 * @returns {Promise<FormData>} 返回一个 Promise，解析为 FormData 对象
 * 
 * @example
 * // 基础用法 - 获取 FormData
 * async function fetchFormData() {
 *   try {
 *     // 注意：服务器需要返回 multipart/form-data 格式
 *     const response = await fetch('\''https://api.example.com/form-data-endpoint'\'');
 *     
 *     if (!response.ok) {
 *       throw new Error(`'\'HTTP error! status: ${response.status}'\''`);
 *     }
 *     
 *     // 转换为 FormData
 *     const formData = await response.formData();
 *     
 *     console.log('\''FormData 类型:'\'', formData.constructor.name);
 *     console.log('\''是否为空:'\'', formData.entries().next().done);
 *     
 *     return formData;
 *   } catch (error) {
 *     console.error('\''获取 FormData 失败:'\'', error);
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 解析上传的表单数据
 * async function parseUploadedFormData() {
 *   const response = await fetch('\''/api/upload-form'\'');
 *   const formData = await response.formData();
 *   
 *   // 遍历所有字段
 *   for (const [key, value] of formData.entries()) {
 *     if (value instanceof File) {
 *       console.log(`'\'字段: ${key}, 文件名: ${value.name}, 大小: ${value.size}'\'');
 *     } else {
 *       console.log(`'\'字段: ${key}, 值: ${value}'\'');
 *     }
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 提取表单字段值
 * async function extractFormFields() {
 *   const response = await fetch('\''/api/form-submission'\'');
 *   const formData = await response.formData();
 *   
 *   // 获取特定字段
 *   const username = formData.get('\''username'\'');
 *   const email = formData.get('\''email'\'');
 *   const avatar = formData.get('\''avatar'\''); // File 对象
 *   
 *   console.log('\''用户名:'\'', username);
 *   console.log('\''邮箱:'\'', email);
 *   console.log('\''头像:'\'', avatar ? avatar.name : '\''无'\'');
 *   
 *   // 检查字段是否存在
 *   if (formData.has('\''phone'\'')) {
 *     console.log('\''手机号:'\'', formData.get('\''phone'\''));
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 处理文件上传后的响应
 * async function handleFileUploadResponse() {
 *   // 模拟：假设服务器返回 multipart/form-data 包含文件信息
 *   const mockResponse = new Response(
 *     new Blob([JSON.stringify({ file: '\''test.png'\'' })], { 
 *       type: '\''multipart/form-data; boundary=----FormBoundary'\'' 
 *     })
 *   );
 *   
 *   // 注意：实际使用时服务器必须返回正确的 Content-Type
 *   // 这里仅演示结构
 *   try {
 *     const formData = await mockResponse.formData();
 *     console.log('\''FormData 获取成功'\'');
 *   } catch (e) {
 *     console.log('\''需要服务器返回正确的 multipart/form-data'\'');
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 遍历 FormData 的所有键
 * async function iterateFormData() {
 *   const response = await fetch('\''/api/data-form'\'');
 *   const formData = await response.formData();
 *   
 *   // 方法1: 使用 entries()
 *   console.log('\''--- 使用 entries() ---'\'');
 *   for (const [key, value] of formData.entries()) {
 *     console.log(`'\'${key}: ${value}'\'');
 *   }
 *   
 *   // 方法2: 使用 keys()
 *   console.log('\''--- 使用 keys() ---'\'');
 *   for (const key of formData.keys()) {
 *     console.log('\''键:'\'', key);
 *   }
 *   
 *   // 方法3: 使用 values()
 *   console.log('\''--- 使用 values() ---'\'');
 *   for (const value of formData.values()) {
 *     console.log('\''值:'\'', value);
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 转发 FormData 到另一个服务器
 * async function forwardFormData() {
 *   // 获取原始 FormData
 *   const originalResponse = await fetch('\''/api/source'\'');
 *   const originalFormData = await originalResponse.formData();
 *   
 *   // 转发到另一个服务器
 *   const forwardResponse = await fetch('\''/api/destination'\'', {
 *     method: '\''POST'\'',
 *     body: originalFormData // 直接传递 FormData
 *   });
 *   
 *   const result = await forwardResponse.json();
 *   console.log('\''转发结果:'\'', result);
 * }
 * 
 * @example
 * // 高级用法 - 验证 Content-Type
 * async function validateContentType() {
 *   const response = await fetch('\''/api/data'\'');
 *   
 *   const contentType = response.headers.get('\''content-type'\'');
 *   
 *   if (!contentType || !contentType.includes('\''multipart/form-data'\'')) {
 *     throw new Error(`'\'不是有效的 FormData 响应，Content-Type: ${contentType}'\'');
 *   }
 *   
 *   const formData = await response.formData();
 *   console.log('\''成功解析 FormData'\'');
 *   return formData;
 * }
 * 
 * @example
 * // 错误处理 - 非 FormData 响应
 * async function handleNonFormData() {
 *   const response = await fetch('\''/api/json'\'');
 *   
 *   try {
 *     const formData = await response.formData();
 *   } catch (error) {
 *     console.error('\''解析失败:'\'', error.message);
 *     console.log('\''这是正常的，因为响应不是 multipart/form-data 格式'\'');
 *     
 *     // 回退：使用其他方法解析
 *     if (response.headers.get('\''content-type'\'').includes('\''application/json'\'')) {
 *       const json = await response.json();
 *       console.log('\''回退使用 JSON:'\'', json);
 *     }
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 处理 FormData 中的多个同名字段
 * async function handleMultipleFields() {
 *   const response = await fetch('\''/api/multi-file-upload'\'');
 *   const formData = await response.formData();
 *   
 *   // 获取所有同名文件
 *   const files = formData.getAll('\''attachments'\'');
 *   console.log('\''文件数量:'\'', files.length);
 *   
 *   files.forEach((file, index) => {
 *     console.log(`'\'文件 ${index + 1}: ${file.name} (${file.size} bytes)'\'');
 *   });
 *   
 *   // 获取第一个
 *   const firstFile = formData.get('\''attachments'\'');
 *   console.log('\''第一个文件:'\'', firstFile.name);
 * }
 * 
 * @example
 * // 高级用法 - 将 FormData 转换为其他格式
 * async function convertFormData() {
 *   const response = await fetch('\''/api/form-data'\'');
 *   const formData = await response.formData();
 *   
 *   // FormData -> 普通对象
 *   const obj = {};
 *   for (const [key, value] of formData.entries()) {
 *     obj[key] = value;
 *   }
 *   console.log('\''转换为对象:'\'', obj);
 *   
 *   // FormData -> JSON 字符串
 *   const jsonString = JSON.stringify(obj);
 *   console.log('\''JSON 字符串:'\'', jsonString);
 * }
 * 
 * @example
 * // 实际应用场景 - 模拟服务器返回 FormData（仅用于测试）
 * async function mockFormDataResponse() {
 *   // 手动构建 multipart/form-data 响应
 *   const boundary = '\''----FormBoundary123456789'\'';
 *   const body = [
 *     `--${boundary}`,
 *     '\''Content-Disposition: form-data; name="username"'\' + '\''\\r\\n\\r\\n'\'',
 *     '\''testuser'\'',
 *     `--${boundary}`,
 *     '\''Content-Disposition: form-data; name="email"'\' + '\''\\r\\n\\r\\n'\'',
 *     '\''test@example.com'\'',
 *     `--${boundary}--'\''
 *   ].join('\''\\r\\n'\'');
 *   
 *   const blob = new Blob([body], { 
 *     type: `\'\'multipart/form-data; boundary=${boundary}'\'` 
 *   });
 *   
 *   const response = new Response(blob);
 *   const formData = await response.formData();
 *   
 *   console.log('\''用户名:'\'', formData.get('\''username'\''));
 *   console.log('\''邮箱:'\'', formData.get('\''email'\''));
 * }
 * 
 * @example
 * // 实际应用场景 - 处理带有文件和高字段的表单数据
 * async function handleComplexFormData() {
 *   const response = await fetch('\''/api/complex-form'\'');
 *   const formData = await response.formData();
 *   
 *   // 获取普通字段
 *   const name = formData.get('\''name'\'') || '\'''\'';
 *   const description = formData.get('\''description'\'') || '\'''\'';
 *   
 *   // 获取文件
 *   const files = formData.getAll('\''files'\'');
 *   const hasFiles = files.length > 0 && files[0] instanceof File;
 *   
 *   // 获取布尔值字段
 *   const isPublic = formData.get('\''isPublic'\'') === '\''true'\'';
 *   
 *   console.log({
 *     name,
 *     description,
 *     fileCount: hasFiles ? files.length : 0,
 *     isPublic
 *   });
 * }
 * 
 * // 补充说明：通常与 FormData 配合使用的是 POST 请求
 * // 服务器返回的 multipart/form-data 通常来自表单提交
 * 
 * // 示例：客户端上传表单 -> 服务器返回 FormData
 * // 这种场景在 REST API 中较少见，更常见的是服务器返回 JSON
 * 
 * // 典型使用场景：
 * // 1. 处理第三方服务返回的多部分表单数据
 * // 2. 解析 multipart/form-data 格式的 API 响应
 * // 3. 在微服务架构中转发表单数据
 * 
 * // 常见 Content-Type：
 * // - multipart/form-data; boundary=----WebKitFormBoundary...
 * // - multipart/form-data
 * 
 * // 与其他方法的对比：
 * // - json(): 解析 application/json
 * // - text(): 解析 text/plain 或其他文本
 * // - blob(): 解析二进制数据
 * // - arrayBuffer(): 解析为 ArrayBuffer
 * // - formData(): 解析 multipart/form-data
 * 
 * // 使用注意事项：
 * // 1. 只有 Content-Type 包含 multipart/form-data 时才能使用
 * // 2. FormData 中的值可能是字符串或 File 对象
 * // 3. 一个字段名可能有多个值（使用 getAll() 获取数组）
 * // 4. 读取后 body 会被消耗，不能再次读取
 */

// 导出模块说明
if (typeof module !== '\''undefined'\'' && module.exports) {
  module.exports = {
    description: '\''Response.formData() - 将响应 body 转换为 FormData'\'',
    usage: `
      // 基本用法
      const formData = await response.formData();
      
      // 应用场景
      // 1. 解析 multipart/form-data 格式的响应
      // 2. 处理第三方 API 返回的表单数据
      // 3. 转发表单数据到其他服务
      
      // 注意事项
      // - 必须确保响应的 Content-Type 是 multipart/form-data
      // - FormData 值可能是字符串或 File 对象
      // - 一个字段名可能有多个值
      // - 读取后 body 会被消耗，不能再次读取
    `
  };
}

console.log('\''=== Response.formData() 方法说明 ==='\'');
console.log('\''用途: 将响应 body 转换为 FormData 对象'\'');
console.log('\''参数: 无'\'');
console.log('\''返回值: Promise<FormData> - 表单数据对象'\'');
console.log('\''使用场景:'\'');
console.log('\''  1. 解析 multipart/form-data 格式的响应'\'');
console.log('\''  2. 处理第三方 API 返回的表单数据'\'');
console.log('\''  3. 转发表单数据到其他服务'\'');
console.log('\''注意: 响应必须是 multipart/form-data 格式，否则会报错'\'');
