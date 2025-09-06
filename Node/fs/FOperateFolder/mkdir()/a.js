// fs.mkdir() 方法用于创建一个新的目录。它接受三个参数：路径（path）、选项（options）和回调函数（callback）。

const fs = require('fs');
const path = require('path')

fs.mkdir(
  // !  ../ 可使得 在当前文件的上一层新建一个文件夹     若已存在，则不会再创建
  // !  ../test1 建一层文件夹
  // ！ ../test1/test2/test3  建三层文件夹
  // ！ /test1/test2/test3  在所在盘的根目录下创建三层文件夹
  path.resolve(__dirname, '../test1/test2/test3'), 
  { recursive: true }, 
  (err) => {
    if (err) {
      console.error('Failed to create directory:', err);
      return;
    }
    console.log('Directory created successfully.');
  }
);

console.log("证明异步")   // 同步方法

// 在上面的示例中，我们调用了 fs.mkdir() 方法来创建一个名为 "new-directory" 的新目录。第一个参数是要创建的目录的路径，第二个参数是一个可选的选项对象，其中 { recursive: true } 表示如果父目录不存在，也会创建它。第三个参数是一个回调函数，用于处理创建目录的结果。如果创建成功，则回调函数中的 err 参数为 null；如果创建失败，则 err 参数会包含错误信息。

// 没有 { recursive: true } 无法递归创建 文件夹