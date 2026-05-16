/**
 * @file blob.js
 * @description Response.blob() 方法文档 - 将响应 body 转换为 Blob
 * @author 前端学习
 */

/**
 * blob() - 将响应 body 转换为 Blob
 * 
 * 读取响应 body 并将其转换为 Blob（二进制大对象）。
 * Blob 是浏览器中处理二进制数据的常用方式，特别适合文件操作。
 * 
 * Blob 对象包含一个 immutable（不可变）的原始数据数组，
 * 可以用于文件上传、图片显示、文件下载等多种场景。
 * 
 * @returns {Promise<Blob>} 返回一个 Promise，解析为 Blob 对象
 * 
 * @example
 * // 基础用法 - 获取 Blob 数据
 * async function fetchBlobData() {
 *   try {
 *     const response = await fetch('\''https://api.example.com/data'\'');
 *     
 *     if (!response.ok) {
 *       throw new Error(`'\'HTTP error! status: ${response.status}'\''`);
 *     }
 *     
 *     // 转换为 Blob
 *     const blob = await response.blob();
 *     
 *     console.log('\''Blob 大小:'\'', blob.size, '\''字节'\'');
 *     console.log('\''Blob 类型:'\'', blob.type);
 *     
 *     return blob;
 *   } catch (error) {
 *     console.error('\''获取 Blob 失败:'\'', error);
 *   }
 * }
 * 
 * @example
 * // 实际应用场景 - 显示图片
 * async function displayImage() {
 *   const response = await fetch('\''/api/user-avatar'\'');
 *   const blob = await response.blob();
 *   
 *   // 从 Blob 创建对象 URL
 *   const imageUrl = URL.createObjectURL(blob);
 *   
 *   // 显示图片
 *   const img = document.createElement('\''img'\'');
 *   img.src = imageUrl;
 *   img.alt = '\''用户头像'\'';
 *   img.style.maxWidth = '\''200px'\'';
 *   document.body.appendChild(img);
 *   
 *   // 清理：不再需要时释放内存
 *   // URL.revokeObjectURL(imageUrl); // 适当时候调用
 *   
 *   return imageUrl;
 * }
 * 
 * @example
 * // 实际应用场景 - 文件下载
 * async function downloadFile() {
 *   const response = await fetch('\''/api/download/report.pdf'\'');
 *   const blob = await response.blob();
 *   
 *   // 创建下载链接
 *   const url = URL.createObjectURL(blob);
 *   const link = document.createElement('\''a'\'');
 *   link.href = url;
 *   link.download = '\''report.pdf'\''; // 指定下载文件名
 *   link.click();
 *   
 *   // 清理
 *   setTimeout(() => URL.revokeObjectURL(url), 1000);
 * }
 * 
 * @example
 * // 实际应用场景 - 上传文件到服务器
 * async function uploadBlob() {
 *   // 假设已有 Blob 数据（例如从其他 API 获取）
 *   const sourceResponse = await fetch('\''/api/image-source'\'');
 *   const blob = await sourceResponse.blob();
 *   
 *   // 创建 FormData 并添加 Blob
 *   const formData = new FormData();
 *   formData.append('\''file'\'', blob, '\''image.png'\'');
 *   formData.append('\''description'\'', '\''上传的图片'\'');
 *   
 *   // 上传到服务器
 *   const uploadResponse = await fetch('\''/api/upload'\'', {
 *     method: '\''POST'\'',
 *     body: formData
 *   });
 *   
 *   const result = await uploadResponse.json();
 *   console.log('\''上传结果:'\'', result);
 * }
 * 
 * @example
 * // 实际应用场景 - 视频播放
 * async function playVideo() {
 *   const response = await fetch('\''/api/video'\'');
 *   const blob = await response.blob();
 *   
 *   const videoUrl = URL.createObjectURL(blob);
 *   
 *   const video = document.createElement('\''video'\'');
 *   video.src = videoUrl;
 *   video.controls = true;
 *   video.style.width = '\''100%'\'';
 *   document.body.appendChild(video);
 * }
 * 
 * @example
 * // 实际应用场景 - 根据 Content-Type 动态处理
 * async function handleBlobByType() {
 *   const response = await fetch('\''/api/document'\'');
 *   const blob = await response.blob();
 *   
 *   const contentType = blob.type;
 *   
 *   switch (true) {
 *     case contentType.startsWith('\''image/'\''):
 *       // 处理图片
 *       const img = document.createElement('\''img'\'');
 *       img.src = URL.createObjectURL(blob);
 *       document.body.appendChild(img);
 *       break;
 *       
 *     case contentType.startsWith('\''video/'\''):
 *       // 处理视频
 *       const video = document.createElement('\''video'\'');
 *       video.src = URL.createObjectURL(blob);
 *       video.controls = true;
 *       document.body.appendChild(video);
 *       break;
 *       
 *     case contentType.startsWith('\''application/pdf'\''):
 *       // 处理 PDF - 可以嵌入 iframe
 *       const pdfUrl = URL.createObjectURL(blob);
 *       window.open(pdfUrl);
 *       break;
 *       
 *     default:
 *       console.log('\''未知类型:'\'', contentType);
 *   }
 * }
 * 
 * @example
 * // 高级用法 - 将 Blob 转换为其他格式
 * async function convertBlob() {
 *   const response = await fetch('\''/api/data'\'');
 *   const blob = await response.blob();
 *   
 *   // Blob -> ArrayBuffer
 *   const arrayBuffer = await blob.arrayBuffer();
 *   
 *   // Blob -> Text
 *   const text = await blob.text();
 *   
 *   // Blob -> Data URL (Base64)
 *   const reader = new FileReader();
 *   const dataUrl = await new Promise((resolve) => {
 *     reader.onload = () => resolve(reader.result);
 *     reader.readAsDataURL(blob);
 *   });
 *   
 *   console.log('\''ArrayBuffer 长度:'\'', arrayBuffer.byteLength);
 *   console.log('\''Text 长度:'\'', text.length);
 *   console.log('\''Data URL:'\'', dataUrl.substring(0, 50) + '\''...'\'');
 * }
 * 
 * @example
 * // 与 fetch 一起使用 - 设置 responseType
 * async function fetchAsBlob() {
 *   // 使用 fetch 获取 Blob
 *   const response = await fetch('\''/api/binary'\'', {
 *     // 注意：fetch 默认会处理，不需要设置 mode
 *   });
 *   
 *   if (response.headers.get('\''Content-Type'\'').includes('\''application/json'\'')) {
 *     console.log('\''这是 JSON，不应该用 blob()'\'');
 *     return null;
 *   }
 *   
 *   return await response.blob();
 * }
 * 
 * @example
 * // 错误处理 - 验证 Blob 有效性
 * async function validateBlob() {
 *   const response = await fetch('\''/api/data'\'');
 *   const blob = await response.blob();
 *   
 *   if (blob.size === 0) {
 *     throw new Error('\''Blob 为空，可能获取失败'\'');
 *   }
 *   
 *   if (!blob.type) {
 *     console.warn('\''警告: Blob 没有 MIME 类型'\'');
 *   }
 *   
 *   return blob;
 * }
 * 
 * @example
 * // 实际应用场景 - 本地存储 Blob
 * async function storeBlobLocally() {
 *   const response = await fetch('\''/api/user-avatar'\'');
 *   const blob = await response.blob();
 *   
 *   // 存入 IndexedDB
 *   const dbRequest = indexedDB.open('\''MyAppDB'\'', 1);
 *   
 *   dbRequest.onupgradeneeded = (event) => {
 *     const db = event.target.result;
 *     if (!db.objectStoreNames.contains('\''images'\'')) {
 *       db.createObjectStore('\''images'\'', { keyPath: '\''id'\'' });
 *     }
 *   };
 *   
 *   dbRequest.onsuccess = (event) => {
 *     const db = event.target.result;
 *     const transaction = db.transaction(['\'\images'\''], '\''readwrite'\'');
 *     const store = transaction.objectStore('\''images'\'');
 *     store.put({ id: '\''avatar'\'', blob: blob });
 *   };
 *   
 *   return blob;
 * }
 */

// 导出模块说明
if (typeof module !== '\''undefined'\'' && module.exports) {
  module.exports = {
    description: '\''Response.blob() - 将响应 body 转换为 Blob'\'',
    usage: `
      // 基本用法
      const blob = await response.blob();
      
      // 应用场景
      // 1. 图片、音视频文件显示和播放
      // 2. 文件下载
      // 3. 文件上传
      // 4. 跨标签页/窗口传递数据
      // 5. 本地存储二进制数据
      
      // 注意事项
      // - Blob 是 immutable 的，不能修改其内容
      // - 可以通过 URL.createObjectURL 创建临时 URL
      // - 读取后 body 会被消耗，不能再次读取
    `
  };
}

console.log('\''=== Response.blob() 方法说明 ==='\'');
console.log('\''用途: 将响应 body 转换为 Blob（二进制大对象）'\'');
console.log('\''参数: 无'\'');
console.log('\''返回值: Promise<Blob> - 二进制大对象'\'');
console.log('\''使用场景:'\'');
console.log('\''  1. 图片、音视频文件显示和播放'\'');
console.log('\''  2. 文件下载功能实现'\'');
console.log('\''  3. 文件上传前的数据准备'\'');
console.log('\''  4. 跨标签页/窗口传递数据'\'');
console.log('\''  5. 本地存储二进制数据'\'');
console.log('\''注意: 读取后 body 会被消耗，不能再次读取'\'');
