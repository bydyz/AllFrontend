// fs.mkdirSync() 是 Node.js 中用于同步创建目录的方法。它的作用是在指定的路径下创建一个新的目录。


const fs = require('fs');
const path = require('path')

// 创建一个新的目录
// fs.mkdirSync('/path/to/new/directory');
// 如果父目录不存在，fs.mkdirSync() 会抛出一个异常。如果要递归创建目录，可以设置 recursive 参数为 true。



// 递归创建目录
// fs.mkdirSync('/path/to/new/directory', { recursive: true });
// 直接在所在盘的 根目录下 创建 四层文件夹



// 没有 { recursive: true } 无法递归创建 文件夹，但是建一个没问题
// fs.mkdirSync(path.resolve(__dirname, '../path'));



// 没有 { recursive: true } 无法递归创建 文件夹
fs.mkdirSync(path.resolve(__dirname, '../path/to/new/directory'), { recursive: true });


// 值得注意的是，由于 fs.mkdirSync() 是同步方法，它会阻塞代码执行直到目录创建完成或发生错误