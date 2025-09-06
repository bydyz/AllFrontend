// fs.fstat() 方法用于获取文件的状态信息，例如文件大小、创建时间等。它是通过文件描述符（File Descriptor）来操作的，因此需要先打开文件，获得文件描述符，然后再调用 fs.fstat()。

const fs = require('fs');
const path = require('path')

// 打开文件
fs.open(path.resolve(__dirname, 'Fstat.txt'), 'r', (err, fd) => {
  if (err) {
    console.error('Failed to open file:', err);
    return;
  }

  // 获取文件状态信息
  fs.fstat(fd, (err, stats) => {
    if (err) {
      console.error('Failed to get file stats:', err);
      return;
    }

    console.log('File stats:', stats);

    // 关闭文件
    fs.close(fd, (err) => {
      if (err) {
        console.error('Failed to close file:', err);
        return;
      }
      console.log('File closed successfully.');
    });
  });
});

// 在上面的示例中，首先使用 fs.open() 打开文件，获得文件描述符 fd，然后使用 fs.fstat() 获取文件状态信息。在回调函数中，可以访问 stats 对象，它包含了文件的各种状态信息，如文件大小、创建时间等。最后，使用 fs.close() 关闭文件。

// 需要注意的是，fs.fstat() 方法是异步的，需要在回调函数中处理文件状态信息。