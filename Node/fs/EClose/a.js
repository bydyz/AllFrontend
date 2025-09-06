// 在 Node.js 中，fs.close() 方法用于关闭一个打开的文件。它接受两个参数：

// 文件描述符（File Descriptor）：要关闭的文件的文件描述符。
// 回调函数：关闭文件后要执行的回调函数，接受一个可能的错误参数。

// 以下是 fs.close() 方法的基本用法示例：

const fs = require('fs');
const path = require("path")

// 打开文件
fs.open(path.resolve(__dirname, "close.txt"), 'r', (err, fd) => {
  if (err) {
    console.error('Failed to open file:', err);
    return;
  }

  console.log('File opened successfully. File descriptor:', fd);

  // 关闭文件
  fs.close(fd, (err) => {
    if (err) {
      console.error('Failed to close file:', err);
      return;
    }
    console.log('File closed successfully.');
  });
});

// 在上面的示例中，首先使用 fs.open() 打开文件，获得文件描述符 fd，然后在回调函数中使用 fs.close() 关闭文件，传入文件描述符 fd。在关闭文件后，会执行相应的回调函数，通常用于处理关闭文件后的操作，比如清理资源等。