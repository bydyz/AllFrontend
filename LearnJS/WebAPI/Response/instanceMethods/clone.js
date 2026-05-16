/**
 * @file clone.js
 * @description Response.clone() 方法文档 - 克隆响应对象
 * @author 前端学习
 */

/**
 * clone() - 克隆响应对象
 * 
 * 创建一个 Response 对象的副本，允许你对同一个响应进行多次读取操作。
 * 原始响应和克隆响应都可以独立使用。
 * 
 * 注意：克隆操作必须在读取 body 之前进行，否则会报错。
 * 因为 body 只能被读取一次（是一次性流）。
 * 
 * @returns {Response} 返回一个新的 Response 对象，是原始响应的浅拷贝
 * 
 * @example
 * // 基础用法 - 克隆响应以进行多次读取
 * async function fetchAndClone() {
 *   try {
 *     const response = await fetch('\''https://api.example.com/data'\'');
 *     
 *     // 克隆响应对象
 *     const clonedResponse = response.clone();
 *     
 *     // 原始响应用于读取文本
 *     const text = await response.text();
 *     console.log('\''原始响应文本:'\'', text);
 *     
 *     // 克隆响应用于读取 JSON（不会影响原始响应）
 *     const json = await clonedResponse.json();
 *     console.log('\''克隆响应JSON:'\'', json);
 *     
 *   } catch (error) {
 *     console.error('\''请求失败:'\'', error);
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 缓存响应数据
 * async function fetchWithCache() {
 *   const response = await fetch('\''/api/data'\'');
 *   
 *   // 克隆用于缓存
 *   const cacheResponse = response.clone();
 *   
 *   // 存入缓存
 *   const cacheData = await cacheResponse.text();
 *   sessionStorage.setItem('\''api_cache'\'', cacheData);
 *   
 *   // 原始响应继续处理
 *   const data = await response.json();
 *   return data;
 * }
 * 
 * @example
 * // 实际应用场景 - 同时获取多种格式数据
 * async function fetchMultipleFormats() {
 *   const response = await fetch('\''/api/data'\'');
 *   
 *   // 克隆响应以获取不同格式
 *   const textResponse = response.clone();
 *   const jsonResponse = response.clone();
 *   
 *   // 并行处理
 *   const [text, json] = await Promise.all([
 *     textResponse.text(),
 *     jsonResponse.json()
 *   ]);
 *   
 *   console.log('\''文本:'\'', text);
 *   console.log('\''JSON:'\'', json);
 * }
 * 
 * @example
 * // 错误处理 - Body 已被读取后不能克隆
 * async function errorExample() {
 *   const response = await fetch('\''/api/data'\'');
 *   
 *   // 先读取 body
 *   await response.text();
 *   
 *   // 尝试克隆会报错：Body has already been consumed
 *   try {
 *     const cloned = response.clone();
 *   } catch (error) {
 *     console.error('\''克隆失败:'\'', error.message);
 *   }
 * }
 * 
 * @example
 * // 高级用法 - 修改克隆响应的 headers
 * async function modifyClonedResponse() {
 *   const response = await fetch('\''/api/data'\'');
 *   
 *   // 克隆响应
 *   const cloned = response.clone();
 *   
 *   // 创建新的 Headers 并添加自定义数据
 *   const newHeaders = new Headers(cloned.headers);
 *   newHeaders.append('\''X-Custom-Header'\'', '\''custom-value'\'');
 *   
 *   console.log('\''原始 headers:'\'', response.headers.get('\''content-type'\''));
 *   console.log('\''自定义 headers:'\'', newHeaders.get('\''X-Custom-Header'\''));
 *   
 *   return cloned;
 * }
 */

// 导出模块说明
if (typeof module !== '\''undefined'\'' && module.exports) {
  module.exports = {
    description: '\''Response.clone() - 克隆响应对象，允许对同一个响应进行多次读取'\'',
    usage: `
      // 基本用法
      const clone = response.clone();
      const data1 = await response.json();
      const data2 = await clone.json();
      
      // 应用场景
      // 1. 缓存响应数据
      // 2. 同时获取多种格式数据
      // 3. 修改 headers 而不影响原始响应
    `
  };
}

console.log('\''=== Response.clone() 方法说明 ==='\'');
console.log('\''用途: 克隆响应对象，允许对同一个响应进行多次读取'\'');
console.log('\''参数: 无'\'');
console.log('\''返回值: Response - 新的响应对象副本'\'');
console.log('\''使用场景:'\'');
console.log('\''  1. 需要对响应进行多次不同格式的读取'\'');
console.log('\''  2. 需要缓存响应数据'\'');
console.log('\''  3. 需要在读取的同时修改 headers'\'');
console.log('\''注意: 必须在读取 body 之前克隆，否则会报错'\'');
