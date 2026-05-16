/**
 * @file json.js
 * @description Response.json() 方法文档 - 将响应 body 解析为 JSON
 * @author 前端学习
 */

/**
 * json() - 将响应 body 解析为 JSON
 * 
 * 读取响应 body 并将其解析为 JavaScript 对象（JSON 格式）。
 * 这是处理 REST API 响应最常用的方法，因为它能自动将 JSON 字符串转换为 JS 对象。
 * 
 * 注意：
 * 1. 此方法要求响应的 body 是有效的 JSON 格式
 * 2. 如果响应不是 JSON，会抛出语法错误
 * 3. 等同于 response.text() 后再调用 JSON.parse()
 * 
 * @returns {Promise<any>} 返回一个 Promise，解析为 JavaScript 对象
 * 
 * @example
 * // 基础用法 - 解析 JSON 响应
 * async function fetchJsonData() {
 *   try {
 *     const response = await fetch('\''https://api.example.com/users'\'');
 *     
 *     if (!response.ok) {
 *       throw new Error(`'\'HTTP error! status: ${response.status}'\'');
 *     }
 *     
 *     // 解析为 JSON 对象
 *     const data = await response.json();
 *     
 *     console.log('\''获取到的数据:'\'', data);
 *     console.log('\''数据类型:'\'', typeof data);
 *     
 *     return data;
 *   } catch (error) {
 *     console.error('\''获取 JSON 失败:'\'', error);
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 获取用户列表
 * async function fetchUserList() {
 *   const response = await fetch('\''/api/users'\'');
 *   
 *   // 检查响应状态
 *   if (!response.ok) {
 *     throw new Error(`'\'请求失败: ${response.status}'\'');
 *   }
 *   
 *   const users = await response.json();
 *   
 *   // 处理用户列表
 *   users.forEach(user => {
 *     console.log(`'\'用户: ${user.name}, 邮箱: ${user.email}'\'');
 *   });
 *   
 *   return users;
 * }
 * 
 * @example
 * // 实际应用场景 - 获取嵌套的 JSON 数据
 * async function fetchNestedData() {
 *   const response = await fetch('\''/api/complex-data'\'');
 *   const data = await response.json();
 *   
 *   // 访问嵌套数据
 *   console.log('\''结果总数:'\'', data.result.total);
 *   console.log('\''第一条记录:'\'', data.result.items[0]);
 *   
 *   // 解构赋值
 *   const { result: { items, page } } = data;
 *   console.log('\''当前页:'\'', page);
 *   console.log('\''数据项:'\'', items);
 * }
 * 
 * @example
 * // 实际应用场景 - 处理分页数据
 * async function fetchPaginatedData() {
 *   const page = 1;
 *   const pageSize = 10;
 *   
 *   const response = await fetch(`/api/products?page=${page}&size=${pageSize}`);
 *   const data = await response.json();
 *   
 *   // 检查分页信息
 *   const { items, pagination } = data;
 *   
 *   console.log(`'\'第 ${pagination.currentPage} / ${pagination.totalPages} 页'\'');
 *   console.log(`'\'共 ${pagination.totalCount} 条记录'\'');
 *   
 *   // 渲染列表
 *   items.forEach(item => {
 *     console.log(`'\'- ${item.name}: ¥${item.price}'\'');
 *   });
 * }
 * 
 * @example
 * // 实际应用场景 - 处理错误响应
 * async function handleErrorResponse() {
 *   try {
 *     const response = await fetch('\''/api/protected-resource'\'');
 *     
 *     if (!response.ok) {
 *       // 尝试解析错误信息（很多 API 会返回 JSON 格式的错误）
 *       const errorData = await response.json().catch(() => null);
 *       
 *       if (errorData) {
 *         throw new Error(errorData.message || '\''请求失败'\'');
 *       }
 *       
 *       throw new Error(`'\'HTTP 错误: ${response.status}'\'');
 *     }
 *     
 *     return await response.json();
 *   } catch (error) {
 *     console.error('\''错误:'\'', error.message);
 *     return null;
 *   }
 * }
 * 
 * @example
 * // 错误处理 - 无效的 JSON
 * async function handleInvalidJson() {
 *   const response = await fetch('\''/api/not-json'\'');
 *   
 *   try {
 *     const data = await response.json();
 *   } catch (error) {
 *     console.error('\''JSON 解析失败:'\'', error.message);
 *     
 *     // 回退到文本模式
 *     response.text().then(text => {
 *       console.log('\''原始响应:'\'', text);
 *     });
 *   }
 * }
 * 
 * @example
 * // 高级用法 - 使用 async/await 和解构
 * async function fetchWithDestructuring() {
 *   const response = await fetch('\''/api/user-profile'\'');
 *   
 *   // 使用解构获取数据
 *   const { 
 *     user: { name, email, avatar }, 
 *     settings: { theme, language },
 *     token 
 *   } = await response.json();
 *   
 *   console.log('\''用户:'\'', name, email);
 *   console.log('\''主题:'\'', theme);
 *   console.log('\''语言:'\'', language);
 *   console.log('\''Token:'\'', token);
 * }
 * 
 * @example
 * // 实际应用场景 - 处理空响应
 * async function handleEmptyResponse() {
 *   const response = await fetch('\''/api/no-content'\'');
 *   
 *   // 检查 Content-Length 或状态码
 *   const contentLength = response.headers.get('\''content-length'\'');
 *   
 *   if (contentLength === '\''0'\'') {
 *     console.log('\''响应为空'\'');
 *     return null;
 *   }
 *   
 *   // 或者检查状态码
 *   if (response.status === 204) {
 *     console.log('\''无内容（204）'\'');
 *     return null;
 *   }
 *   
 *   return await response.json();
 * }
 * 
 * @example
 * // 实际应用场景 - 处理数组类型 JSON
 * async function fetchArrayData() {
 *   const response = await fetch('\''/api/tags'\'');
 *   const tags = await response.json();
 *   
 *   // 确保是数组
 *   if (!Array.isArray(tags)) {
 *     throw new Error('\''响应不是数组格式'\'');
 *   }
 *   
 *   // 数组操作
 *   const tagNames = tags.map(tag => tag.name);
 *   const activeTags = tags.filter(tag => tag.isActive);
 *   
 *   console.log('\''所有标签:'\'', tagNames);
 *   console.log('\''活跃标签:'\'', activeTags);
 * }
 * 
 * @example
 * // 实际应用场景 - 处理日期格式
 * async function handleDateFields() {
 *   const response = await fetch('\''/api/events'\'');
 *   const data = await response.json();
 *   
 *   // JSON 中的日期通常是 ISO 字符串
 *   data.events.forEach(event => {
 *     const date = new Date(event.date);
 *     console.log(`'\'${event.title}: ${date.toLocaleDateString()}'\'');
 *   });
 * }
 * 
 * @example
 * // 高级用法 - 验证 JSON 结构
 * async function validateJsonStructure() {
 *   const response = await fetch('\''/api/data'\'');
 *   const data = await response.json();
 *   
 *   // 简单的结构验证
 *   const requiredFields = ['\''id'\'', '\''name'\'', '\''status'\''];
 *   const missingFields = requiredFields.filter(field => !(field in data));
 *   
 *   if (missingFields.length > 0) {
 *     throw new Error(`'\'缺少必需字段: ${missingFields.join('\'', '\'')}'\'');
 *   }
 *   
 *   console.log('\''JSON 结构验证通过'\'');
 *   return data;
 * }
 * 
 * @example
 * // 实际应用场景 - 缓存 JSON 数据
 * async function fetchWithCache() {
 *   const cacheKey = '\''api_users_list'\'';
 *   const cached = localStorage.getItem(cacheKey);
 *   
 *   // 检查缓存是否存在且未过期
 *   if (cached) {
 *     const { data, timestamp } = JSON.parse(cached);
 *     const cacheAge = Date.now() - timestamp;
 *     
 *     // 缓存有效期 5 分钟
 *     if (cacheAge < 5 * 60 * 1000) {
 *       console.log('\''使用缓存数据'\'');
 *       return data;
 *     }
 *   }
 *   
 *   // 重新获取
 *   const response = await fetch('\''/api/users'\'');
 *   const data = await response.json();
 *   
 *   // 存入缓存
 *   localStorage.setItem(cacheKey, JSON.stringify({
 *     data,
 *     timestamp: Date.now()
 *   }));
 *   
 *   console.log('\''获取新数据并缓存'\'');
 *   return data;
 * }
 * 
 * @example
 * // 高级用法 - 链式调用
 * async function chainedJsonCalls() {
 *   // 依次获取多个 API 数据
 *   const [userRes, postsRes] = await Promise.all([
 *     fetch('\''/api/user'\''),
 *     fetch('\''/api/posts'\'')
 *   ]);
 *   
 *   const [user, posts] = await Promise.all([
 *     userRes.json(),
 *     postsRes.json()
 *   ]);
 *   
 *   console.log('\''用户:'\'', user.name);
 *   console.log('\''文章数:'\'', posts.length);
 * }
 * 
 * @example
 * // 实际应用场景 - 同时获取并处理多个 JSON 响应
 * async function fetchMultipleJson() {
 *   const endpoints = [
 *     '\''/api/users'\'',
 *     '\''/api/products'\'',
 *     '\''/api/orders'\''
 *   ];
 *   
 *   // 并行请求并解析 JSON
 *   const responses = await Promise.all(
 *     endpoints.map(url => fetch(url))
 *   );
 *   
 *   // 检查所有响应是否成功
 *   responses.forEach((res, index) => {
 *     if (!res.ok) {
 *       console.error(`'\'端点 ${index} 失败: ${res.status}'\'');
 *     }
 *   });
 *   
 *   // 解析所有 JSON
 *   const [users, products, orders] = await Promise.all(
 *     responses.map(res => res.json())
 *   );
 *   
 *   console.log('\''用户数:'\'', users.length);
 *   console.log('\''商品数:'\'', products.length);
 *   console.log('\''订单数:'\'', orders.length);
 * }
 * 
 * @example
 * // 与 axios 等库对比 - fetch 的 json() 类似于 axios 的 data
 * // axios: const { data } = await axios.get('\''/api/user'\'')
 * // fetch: const data = await (await fetch('\''/api/user'\'')).json()
 * 
 * async function compareWithAxios() {
 *   // 使用 fetch（需要两步）
 *   const fetchResponse = await fetch('\''/api/user'\'');
 *   const fetchData = await fetchResponse.json();
 *   
 *   // 注意：fetch 不会自动抛出 4xx/5xx 错误，需要手动检查
 *   if (!fetchResponse.ok) {
 *     throw new Error(`'\'请求失败: ${fetchResponse.status}'\'');
 *   }
 *   
 *   console.log('\''Fetch 数据:'\'', fetchData);
 * }
 * 
 * // 常见 JSON API 响应格式示例
 * // 
 * // 1. 单一对象
 * // { "id": 1, "name": "张三", "email": "zhangsan@example.com" }
 * //
 * // 2. 对象列表
 * // [{ "id": 1, "name": "张三" }, { "id": 2, "name": "李四" }]
 * //
 * // 3. 带分页的响应
 * // {
 * //   "data": [...],
 * //   "pagination": { "page": 1, "total": 100 }
 * // }
 * //
 * // 4. 错误响应
 * // { "error": { "code": 1001, "message": "参数错误" } }
 * //
 * // 5. 带元数据的响应
 * // {
 * //   "result": [...],
 * //   "meta": { "took": 50, "total": 1000 }
 * // }
 * 
 * // 与其他方法的对比：
 * // - text(): 返回原始字符串，需要手动 JSON.parse()
 * // - json(): 自动解析为 JS 对象，最方便
 * // - blob(): 处理二进制数据
 * // - arrayBuffer(): 处理二进制缓冲区
 * // - formData(): 处理 multipart/form-data
 * 
 * // 使用注意事项：
 * // 1. 响应必须是有效的 JSON 格式
 * // 2. fetch 不会自动抛出 HTTP 错误，需要检查 response.ok
 * // 3. 读取后 body 会被消耗，不能再次读取
 * // 4. 空响应会抛出错误，需要先检查
 */

// 导出模块说明
if (typeof module !== '\''undefined'\'' && module.exports) {
  module.exports = {
    description: '\''Response.json() - 将响应 body 解析为 JSON 对象'\'',
    usage: `
      // 基本用法
      const data = await response.json();
      
      // 应用场景
      // 1. 处理 REST API 的 JSON 响应
      // 2. 解析嵌套的数据结构
      // 3. 处理分页数据
      
      // 注意事项
      // - 响应必须是有效的 JSON 格式
      // - fetch 不会自动抛出 4xx/5xx 错误
      // - 读取后 body 会被消耗，不能再次读取
    `
  };
}

console.log('\''=== Response.json() 方法说明 ==='\'');
console.log('\''用途: 将响应 body 解析为 JavaScript 对象（JSON 格式）'\'');
console.log('\''参数: 无'\'');
console.log('\''返回值: Promise<any> - 解析后的 JavaScript 对象'\'');
console.log('\''使用场景:'\'');
console.log('\''  1. 处理 REST API 的 JSON 响应（最常用）'\'');
console.log('\''  2. 解析嵌套的数据结构'\'');
console.log('\''  3. 处理分页和带元数据的响应'\'');
console.log('\''  4. 缓存 JSON 数据到本地存储'\'');
console.log('\''注意: 响应必须是有效 JSON 格式，否则会抛出错误'\'');
