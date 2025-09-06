// FileReader
      // FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容。使用 File 或 Blob 对象指定要读取的文件或数据。

      // 其中 File 对象可以是来自用户在一个<input>元素上选择文件后返回的FileList对象，也可以来自拖放操作生成的 DataTransfer对象，还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。

      // 重要提示：FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。要在 JavaScript 中按路径名读取文件，应使用标准 Ajax 解决方案进行服务器端文件读取，如果读取跨域，则使用 CORS 权限。

      // 属性
      // FileReader.error   	      一个DOMException，表示在读取文件时发生的错误 。
      // FileReader.result	        返回文件的内容。只有在读取操作完成后，此属性才有效，返回的数据的格式取决于是使用哪种读取方法来执行读取操作的。
      // FileReader.readyState    	表示FileReader状态的数字。0 还没有加载任何数据。1 数据正在被加载。2 已完成全部的读取请求。


      // 方法
      // 需要注意的是 ，无论读取成功或失败，方法并不会返回读取结果，这一结果存储在 result属性中。
      // FileReader.abort()    中止读取操作。在返回时，readyState 属性为 DONE。
      // FileReader.readAsArrayBuffer()      将读取的内容转成ArrayBuffer。
      // FileReader.readAsBinaryString()     将读取的内容转成二进制数据。
      // FileReader.readAsDataURL()      将读取的内容转成并将其编码为 base64 的 data url。 格式是 data:[<mediatype>][;base64],<data>
      // FileReader.readAsText()     将数据读取为给定编码（默认为 utf-8 编码）的文本字符串。


      // 事件
      // FileReader.onabort     处理 abort 事件。该事件在读取操作被中断时触发。
      // FileReader.onerror     处理 error 事件。该事件在读取操作发生错误时触发。
      // FileReader.onload      处理 load 事件。该事件在读取操作完成时触发。
      // FileReader.onloadstart     处理 loadstart 事件。该事件在读取操作开始时触发。
      // FileReader.onloadend     处理 loadend 事件。该事件在读取操作结束时（要么成功，要么失败）触发。
      // FileReader.onprogress      处理 progress 事件。该事件在读取Blob时触发。


      