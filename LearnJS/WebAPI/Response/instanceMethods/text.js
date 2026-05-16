/**
 * @file text.js
 * @description Response.text() 方法文档 - 将响应 body 转换为文本
 * @author 前端学习
 */

/**
 * text() - 将响应 body 转换为文本
 * 
 * 读取响应 body 并将其转换为字符串（纯文本）。
 * 这是最基础的 body 读取方法，适用于任何文本格式的内容。
 * 
 * 可以处理的 Content-Type：
 * - text/plain（纯文本）
 * - text/html（HTML）
 * - text/css（CSS）
 * - text/javascript / application/javascript（JS）
 * - application/xml、text/xml（XML）
 * - 以及其他任何文本格式
 * 
 * @returns {Promise<string>} 返回一个 Promise，解析为字符串
 * 
 * @example
 * // 基础用法 - 获取文本内容
 * async function fetchTextData() {
 *   try {
 *     const response = await fetch('\''https://api.example.com/status'\'');
 *     
 *     if (!response.ok) {
 *       throw new Error(`'\'HTTP error! status: ${response.status}'\'');
 *     }
 *     
 *     // 转换为文本
 *     const text = await response.text();
 *     
 *     console.log('\''获取到的文本:'\'', text);
 *     console.log('\''文本长度:'\'', text.length);
 *     console.log('\''文本类型:'\'', typeof text);
 *     
 *     return text;
 *   } catch (error) {
 *     console.error('\''获取文本失败:'\'', error);
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 获取 HTML 页面
 * async function fetchHtmlPage() {
 *   const response = await fetch('\''https://example.com'\'');
 *   const html = await response.text();
 *   
 *   console.log('\''页面标题长度:'\'', html.length);
 *   
 *   // 可以进一步解析 HTML
 *   // 注意：这只是示例，实际应使用 DOM 解析器
 *   if (html.includes('\''<title>'\'')) {
 *     const titleMatch = html.match(/<title>(.*?)<\/title>/);
 *     console.log('\''页面标题:'\'', titleMatch ? titleMatch[1] : '\''无'\'');
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 获取纯文本配置
 * async function fetchConfig() {
 *   const response = await fetch('\''/api/config.txt'\'');
 *   const configText = await response.text();
 *   
 *   // 解析简单的键值对配置
 *   const config = {};
 *   configText.split('\''\\n'\'').forEach(line => {
 *     line = line.trim();
 *     if (line && !line.startsWith('\''#'\'')) { // 跳过空行和注释
 *       const [key, value] = line.split('\''='\'');
 *       if (key && value) {
 *         config[key.trim()] = value.trim();
 *       }
 *     }
 *   });
 *   
 *   console.log('\''解析的配置:'\'', config);
 * }
 * 
 * @example
 * // 实际应用场景 - 获取 JSON（作为文本）
 * async function fetchJsonAsText() {
 *   const response = await fetch('\''/api/data.json'\'');
 *   const text = await response.text();
 *   
 *   console.log('\''原始文本:'\'', text.substring(0, 100) + '\''...'\'');
 *   
 *   // 手动解析为 JSON
 *   const data = JSON.parse(text);
 *   console.log('\''解析后:'\'', data);
 * }
 * 
 * @example
 * // 实际应用场景 - 获取 CSV 数据
 * async function fetchCsvData() {
 *   const response = await fetch('\''/api/data.csv'\'');
 *   const csvText = await response.text();
 *   
 *   // 解析 CSV（简单实现）
 *   const rows = csvText.trim().split('\''\\n'\'');
 *   const headers = rows[0].split('\'','\'');
 *   
 *   console.log('\''列标题:'\'', headers);
 *   console.log('\''行数:'\'', rows.length - 1);
 *   
 *   // 解析数据行
 *   const data = rows.slice(1).map(row => {
 *     const values = row.split('\'','\'');
 *     const obj = {};
 *     headers.forEach((header, i) => {
 *       obj[header.trim()] = values[i]?.trim();
 *     });
 *     return obj;
 *   });
 *   
 *   console.log('\''第一行数据:'\'', data[0]);
 * }
 * 
 * @example
 * // 实际应用场景 - 获取 XML 数据
 * async function fetchXmlData() {
 *   const response = await fetch('\''/api/data.xml'\'');
 *   const xmlText = await response.text();
 *   
 *   console.log('\''XML 内容:'\'', xmlText.substring(0, 100) + '\''...'\'');
 *   
 *   // 使用 DOMParser 解析 XML
 *   const parser = new DOMParser();
 *   const xmlDoc = parser.parseFromString(xmlText, '\''application/xml'\'');
 *   
 *   // 检查解析错误
 *   const parserError = xmlDoc.querySelector('\''parsererror'\'');
 *   if (parserError) {
 *     console.error('\''XML 解析错误:'\'', parserError.textContent);
 *     return null;
 *   }
 *   
 *   console.log('\''XML 解析成功'\'');
 *   return xmlDoc;
 * }
 * 
 * @example
 * // 错误处理 - 非文本内容的响应
 * async function handleNonTextContent() {
 *   // 尝试获取图片（实际上是二进制数据）
 *   const response = await fetch('\''/api/image.png'\'');
 *   
 *   // 如果强制使用 text()，会得到乱码
 *   const text = await response.text();
 *   console.log('\''强制获取文本（乱码）:'\'', text.substring(0, 50));
 *   
 *   // 正确的做法是先检查 Content-Type
 *   const contentType = response.headers.get('\''content-type'\'');
 *   console.log('\''Content-Type:'\'', contentType);
 *   
 *   // 应该使用 blob() 或 arrayBuffer()
 *   if (contentType && contentType.startsWith('\''image/'\'')) {
 *     const blob = await response.blob();
 *     console.log('\''正确使用 blob():'\'', blob.size, '\''bytes'\'');
 *   }
 * }
 * 
 * @example
 * // 高级用法 - 处理大文本文件
 * async function handleLargeText() {
 *   const response = await fetch('\''/api/large-file.txt'\'');
 *   
 *   // 检查文件大小
 *   const contentLength = response.headers.get('\''content-length'\'');
 *   console.log('\''文件大小:'\'', contentLength, '\''bytes'\'');
 *   
 *   // 大文件建议流式处理，这里先获取全部
 *   // 实际应用中可能需要流式读取或分片处理
 *   const text = await response.text();
 *   console.log('\''文本总长度:'\'', text.length);
 *   
 *   // 处理大文本时的内存考虑
 *   // 对于超大文件，应该使用 ReadableStream
 * }
 * 
 * @example
 * // 实际应用场景 - 动态判断 Content-Type 并处理
 * async function smartContentHandling() {
 *   const response = await fetch('\''/api/unknown'\'');
 *   const contentType = response.headers.get('\''content-type'\'');
 *   
 *   let result;
 *   
 *   if (contentType) {
 *     if (contentType.includes('\''application/json'\'')) {
 *       // JSON：直接解析
 *       result = await response.json();
 *       console.log('\''处理方式: JSON 解析'\'');
 *     } else if (contentType.includes('\''text/'\'')) {
 *       // 文本：获取文本
 *       result = await response.text();
 *       console.log('\''处理方式: 文本读取'\'');
 *     } else if (contentType.includes('\''image/'\'')) {
 *       // 图片：获取 Blob
 *       result = await response.blob();
 *       console.log('\''处理方式: Blob 获取'\'');
 *     } else {
 *       // 其他：尝试文本
 *       result = await response.text();
 *       console.log('\''处理方式: 尝试文本'\'');
 *     }
 *   } else {
 *     // 无 Content-Type，默认尝试文本
 *     result = await response.text();
 *     console.log('\''处理方式: 默认文本'\'');
 *   }
 *   
 *   console.log('\''结果:'\'', typeof result, result);
 * }
 * 
 * @example
 * // 实际应用场景 - 提取文本中的特定内容
 * async function extractTextContent() {
 *   const response = await fetch('\''/api/page'\'');
 *   const html = await response.text();
 *   
 *   // 提取所有链接
 *   const links = html.match(/href=["\'](.*?)["\']/g);
 *   console.log('\''链接数量:'\'', links ? links.length : 0);
 *   
 *   // 提取所有图片
 *   const images = html.match(/src=["\'](.*?)["\']/g);
 *   console.log('\''图片数量:'\'', images ? images.length : 0);
 *   
 *   // 提取特定元素
 *   const metaDescription = html.match(/<meta name="description" content="(.*?)"/);
 *   console.log('\''Meta 描述:'\'', metaDescription ? metaDescription[1] : '\''无'\'');
 * }
 * 
 * @example
 * // 高级用法 - 手动解析自定义格式
 * async function parseCustomFormat() {
 *   const response = await fetch('\''/api/custom-data'\'');
 *   const text = await response.text();
 *   
 *   // 假设是自定义格式：name|email|age
 *   const lines = text.trim().split('\''\\n'\'');
 *   const data = lines.map(line => {
 *     const [name, email, age] = line.split('\''|'\'');
 *     return { name, email, age };
 *   });
 *   
 *   console.log('\''解析的数据:'\'', data);
 * }
 * 
 * @example
 * // 实际应用场景 - 处理空格和缩进
 * async function handleWhitespace() {
 *   const response = await fetch('\''/api/indented'\'');
 *   const text = await response.text();
 *   
 *   console.log('\''原始长度:'\'', text.length);
 *   
 *   // 去除首尾空白
 *   const trimmed = text.trim();
 *   console.log('\''去除空白后:'\'', trimmed.length);
 *   
 *   // 规范化空白（将多个空格合并为一个）
 *   const normalized = trimmed.replace(/\\s+/g, '\'' '\'');
 *   console.log('\''规范化后:'\'', normalized);
 * }
 * 
 * @example
 * // 实际应用场景 - 检测编码
 * async function detectEncoding() {
 *   const response = await fetch('\''/api/text'\'');
 *   const text = await response.text();
 *   
 *   // 注意：fetch API 默认使用 UTF-8
 *   // 如果需要处理其他编码，需要使用 TextDecoder
 *   
 *   // 获取二进制内容
 *   const buffer = await response.clone().arrayBuffer();
 *   const decoder = new TextDecoder('\''utf-8'\''); // 可以改为 '\''gbk'\'', '\''gb2312'\'' 等
 *   const decoded = decoder.decode(buffer);
 *   
 *   console.log('\''默认 UTF-8 解析:'\'', text.substring(0, 50));
 *   console.log('\''手动解码:'\'', decoded.substring(0, 50));
 * }
 * 
 * @example
 * // 实际应用场景 - 获取并显示服务器状态消息
 * async function fetchStatusMessage() {
 *   const response = await fetch('\''/api/status'\'');
 *   const message = await response.text();
 *   
 *   console.log('\''服务器状态:'\'', message);
 *   
 *   // 显示给用户
 *   document.getElementById('\''status'\'').textContent = message;
 * }
 * 
 * @example
 * // 与其他方法的对比和选择
 * async function chooseRightMethod() {
 *   const response = await fetch('\''/api/data'\'');
 *   const contentType = response.headers.get('\''content-type'\'') || '\'''\'';
 *   
 *   let data;
 *   
 *   if (contentType.includes('\''application/json'\'')) {
 *     data = await response.json(); // JSON 解析
 *   } else if (contentType.includes('\''text/'\'')) {
 *     data = await response.text(); // 纯文本
 *   } else if (contentType.includes('\''application/xml'\'') || contentType.includes('\''text/xml'\'')) {
 *     data = await response.text(); // XML（后续用 DOM 解析）
 *   } else {
 *     data = await response.blob(); // 二进制
 *   }
 *   
 *   console.log('\''数据:'\'', data);
 * }
 * 
 * @example
 * // 常见使用场景总结
 * async function commonUseCases() {
 *   // 1. 获取 HTML 页面
 *   const html = await (await fetch('\''https://example.com'\'')).text();
 *   
 *   // 2. 获取纯文本配置
 *   const config = await (await fetch('\''/config.ini'\'')).text();
 *   
 *   // 3. 获取并手动解析 JSON（比 json() 更灵活）
 *   const jsonText = await (await fetch('\''/data.json'\'')).text();
 *   const data = JSON.parse(jsonText);
 *   
 *   // 4. 获取源代码
 *   const jsCode = await (await fetch('\''/script.js'\'')).text();
 *   
 *   // 5. 获取 CSS
 *   const css = await (await fetch('\''/style.css'\'')).text();
 * }
 * 
 * // 与其他方法的对比：
 * // - json(): 自动解析 JSON，适合 application/json
 * // - blob(): 处理二进制数据（如图片、文件）
 * // - arrayBuffer(): 处理二进制缓冲区
 * // - formData(): 处理 multipart/form-data
 * // - text(): 最通用，返回原始字符串
 * 
 * // text() 的内部原理：
 * // 等同于：await new Response(response.body).text()
 * // 本质是读取 ReadableStream 并解码为字符串
 * 
 * // 使用注意事项：
 * // 1. 适用于任何文本格式，包括 HTML、XML、JSON、CSS、JS 等
 * // 2. 对于二进制数据会返回乱码，应根据 Content-Type 选择正确方法
 * // 3. 读取后 body 会被消耗，不能再次读取
 * // 4. 默认使用 UTF-8 编码，如需其他编码使用 TextDecoder
 * // 5. fetch 不会自动抛出 HTTP 错误，需要检查 response.ok
 */

// 导出模块说明
if (typeof module !== '\''undefined'\'' && module.exports) {
  module.exports = {
    description: '\''Response.text() - 将响应 body 转换为文本字符串'\'',
    usage: `
      // 基本用法
      const text = await response.text();
      
      // 应用场景
      // 1. 获取 HTML 页面内容
      // 2. 获取纯文本、配置文件
      // 3. 获取源代码（JS、CSS）
      // 4. 获取 XML 数据
      // 5. 手动解析 JSON（比 json() 更灵活）
      
      // 注意事项
      // - 适用于任何文本格式
      // - 二进制数据会返回乱码
      // - 默认 UTF-8 编码
      // - 读取后 body 会被消耗
    `
  };
}

console.log('\''=== Response.text() 方法说明 ==='\'');
console.log('\''用途: 将响应 body 转换为文本字符串'\'');
console.log('\''参数: 无'\'');
console.log('\''返回值: Promise<string> - 文本内容'\'');
console.log('\''使用场景:'\'');
console.log('\''  1. 获取 HTML 页面内容'\'');
console.log('\''  2. 获取纯文本、配置文件'\'');
console.log('\''  3. 获取源代码（JS、CSS）'\'');
console.log('\''  4. 获取 XML 数据'\'');
console.log('\''  5. 手动解析 JSON（比 json() 更灵活）'\'');
console.log('\''注意: 二进制数据会返回乱码，应根据 Content-Type 选择正确方法'\'');
