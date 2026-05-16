/**
 * @file arrayBuffer.js
 * @description Response.arrayBuffer() 方法文档 - 将响应 body 转换为 ArrayBuffer
 * @author 前端学习
 */

/**
 * arrayBuffer() - 将响应 body 转换为 ArrayBuffer
 * 
 * 读取响应 body 并将其转换为 ArrayBuffer（二进制数据缓冲区）。
 * 常用于处理二进制数据，如图片、音频、文件下载等场景。
 * 
 * ArrayBuffer 是一个固定长度的二进制数据缓冲区，不能直接读写，
 * 需要通过 TypedArray（如 Uint8Array、Int16Array 等）来操作。
 * 
 * @returns {Promise<ArrayBuffer>} 返回一个 Promise，解析为 ArrayBuffer 对象
 * 
 * @example
 * // 基础用法 - 获取二进制数据
 * async function fetchBinaryData() {
 *   try {
 *     const response = await fetch('\''https://api.example.com/image.png'\'');
 *     
 *     if (!response.ok) {
 *       throw new Error(`'\'HTTP error! status: ${response.status}'\''`);
 *     }
 *     
 *     // 转换为 ArrayBuffer
 *     const arrayBuffer = await response.arrayBuffer();
 *     
 *     console.log('\''ArrayBuffer 长度:'\'', arrayBuffer.byteLength);
 *     console.log('\''数据类型:'\'', arrayBuffer.constructor.name);
 *     
 *     return arrayBuffer;
 *   } catch (error) {
 *     console.error('\''获取二进制数据失败:'\'', error);
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 下载图片并显示
 * async function downloadImage() {
 *   const response = await fetch('\''/api/image'\'');
 *   const arrayBuffer = await response.arrayBuffer();
 *   
 *   // 将 ArrayBuffer 转换为 Blob
 *   const blob = new Blob([arrayBuffer], { type: '\''image/png'\'' });
 *   const imageUrl = URL.createObjectURL(blob);
 *   
 *   // 创建图片元素并显示
 *   const img = document.createElement('\''img'\'');
 *   img.src = imageUrl;
 *   document.body.appendChild(img);
 *   
 *   return imageUrl;
 * }
 * 
 * @example
 * // 实际应用场景 - 处理音频数据
 * async function fetchAudioData() {
 *   const response = await fetch('\''/api/audio'\'');
 *   const arrayBuffer = await response.arrayBuffer();
 *   
 *   // 使用 AudioContext 解码音频
 *   const audioContext = new AudioContext();
 *   const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
 *   
 *   console.log('\''音频时长:'\'', audioBuffer.duration, '\''秒'\'');
 *   console.log('\''声道数:'\'', audioBuffer.numberOfChannels);
 *   
 *   return audioBuffer;
 * }
 * 
 * @example
 * // 使用 TypedArray 操作 ArrayBuffer
 * async function manipulateArrayBuffer() {
 *   const response = await fetch('\''/api/binary-data'\'');
 *   const arrayBuffer = await response.arrayBuffer();
 *   
 *   // 创建 Uint8Array 来读取数据
 *   const uint8Array = new Uint8Array(arrayBuffer);
 *   
 *   // 遍历前 10 个字节
 *   for (let i = 0; i < Math.min(10, uint8Array.length); i++) {
 *     console.log(`'\'字节 ${i}: ${uint8Array[i]}'\'');
 *   }
 *   
 *   // 创建 Int16Array 读取 16 位整数
 *   const int16Array = new Int16Array(arrayBuffer);
 *   console.log('\''第一个 16 位整数:'\'', int16Array[0]);
 *   
 *   return arrayBuffer;
 * }
 * 
 * @example
 * // 实际应用场景 - 文件下载保存
 * async function downloadFile() {
 *   const response = await fetch('\''/api/download/file.pdf'\'');
 *   const arrayBuffer = await response.arrayBuffer();
 *   
 *   // 将 ArrayBuffer 转为 Blob
 *   const blob = new Blob([arrayBuffer], { 
 *     type: '\''application/pdf'\'' 
 *   });
 *   
 * // 创建下载链接并触发下载
 *   const url = URL.createObjectURL(blob);
 *   const a = document.createElement('\''a'\'');
 *   a.href = url;
 *   a.download = '\''file.pdf'\'';
 *   a.click();
 *   
 *   // 清理
 *   URL.revokeObjectURL(url);
 * }
 * 
 * @example
 * // 错误处理 - 检查 Content-Type
 * async function safeFetchBinary() {
 *   const response = await fetch('\''/api/data'\'');
 *   
 *   // 检查是否为二进制内容
 *   const contentType = response.headers.get('\''content-type'\'');
 *   
 *   if (contentType && contentType.startsWith('\''image/'\'')) {
 *     const arrayBuffer = await response.arrayBuffer();
 *     console.log('\''获取到图片数据，长度:'\'', arrayBuffer.byteLength);
 *     return arrayBuffer;
 *   } else {
 *     throw new Error('\''不是有效的二进制数据'\'');
 *   }
 * }
 */

// 导出模块说明
if (typeof module !== '\''undefined'\'' && module.exports) {
  module.exports = {
    description: '\''Response.arrayBuffer() - 将响应 body 转换为 ArrayBuffer'\'',
    usage: `
      // 基本用法
      const arrayBuffer = await response.arrayBuffer();
      
      // 应用场景
      // 1. 处理图片、音频、视频等二进制数据
      // 2. 文件下载和保存
      // 3. 与 Web Audio API 配合处理音频
      // 4. 低级二进制数据处理
      
      // 注意事项
      // - ArrayBuffer 是固定长度的二进制缓冲区
      // - 需要使用 TypedArray 来读写数据
      // - 读取后 body 会被消耗，不能再次读取
    `
  };
}

console.log('\''=== Response.arrayBuffer() 方法说明 ==='\'');
console.log('\''用途: 将响应 body 转换为 ArrayBuffer（二进制数据缓冲区）'\'');
console.log('\''参数: 无'\'');
console.log('\''返回值: Promise<ArrayBuffer> - 二进制数据缓冲区'\'');
console.log('\''使用场景:'\'');
console.log('\''  1. 处理图片、音频、视频等二进制数据'\'');
console.log('\''  2. 文件下载和保存'\'');
console.log('\''  3. 与 Web Audio API 配合处理音频'\'');
console.log('\''  4. 低级二进制数据处理'\'');
console.log('\''注意: 读取后 body 会被消耗，不能再次读取'\'');
