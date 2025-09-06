// 如果你希望保留文件的原始名称和后缀名，你可以通过自定义 multer 的存储引擎（storage 选项）来实现。

const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');






// 这段代码使用 multer 中间件的 diskStorage 引擎来自定义文件上传时的存储路径和文件名。diskStorage 是 multer 提供的一个存储引擎，用于将上传的文件保存到磁盘上。下面是对这段代码的详细解释：

// multer.diskStorage(...)
// 这是 multer 的 diskStorage 函数调用，它接收一个配置对象，该对象定义了文件存储时的行为。

    // destination
    // destination 是一个函数，它决定了文件应该被保存到哪个目录下。这个函数接收三个参数：req（请求对象）、file（文件对象）和 cb（回调函数）。当确定好存储路径后，通过调用 cb(null, 'path') 来指定路径，其中 'path' 是文件应该被保存的目录。

    // 在这段代码中，destination 函数设置所有上传的文件都被保存在服务器的 uploads/ 目录下。


    // filename
    // filename 也是一个函数，它定义了上传文件的文件名。这个函数同样接收 req、file 和 cb 三个参数。通过调用 cb(null, 'filename') 来指定文件名，其中 'filename' 是你希望保存的文件名。

    // 在这段代码中，filename 函数使用 file.originalname，这是上传文件在客户端机器上的原始文件名，因此上传的文件将保留它们的原始名称和后缀名。


  // cb 回调函数
  // cb 是一个必须的回调函数，它告诉 multer 你已经指定了存储路径和文件名。调用 cb 时，第一个参数是错误对象（如果没有错误则为 null），第二个参数是存储路径或文件名。

// multer({ storage: ... })
// 最后，通过将 diskStorage 配置对象传递给 multer 函数，创建了一个 multer 中间件实例，这个实例可以被用在 Express.js 的路由处理中来处理文件上传。


// 完整的 multer 中间件实例

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // 指定文件应该保存在哪个文件夹
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname); // 使用文件的原始名称作为文件名
//     }
//   })
// });

// 创建的 upload 中间件可以这样使用：

// app.post('/upload', upload.single('fieldname'), (req, res) => {
//   // 'fieldname' 是前端表单中文件输入字段的名称
//   // req.file 是上传的文件对象，包含了文件的完整路径
//   res.send('文件上传成功');
// });

// 在这个例子中，upload.single('fieldname') 表示 multer 将会处理单个文件上传，文件信息可以通过 req.file 访问。


// 配置 Multer 使用磁盘存储，并保留原始文件名
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // 指定文件应该保存在哪个文件夹
    },
    filename: function (req, file, cb) {
      // 保留文件原始名称和后缀名
      cb(null, file.originalname);
    }
  })
});

app.post('/upload', upload.single('file'), (req, res) => {
  // 'file' 是前端表单中文件输入字段的名称
  // req.file 是上传的文件对象，包含了文件的完整路径
  res.send('文件上传成功');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});