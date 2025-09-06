const express = require('express')

// Multer 是一个用于 Node.js，特别是与 Express.js 框架配合使用的中间件，它专门用于处理 multipart/form-data 类型的表单数据，这在文件上传场景中非常常见。
const multer = require('multer')

// 创建app对象
const app = express()





// 应用一个express编写第三方的中间件

// 在 Express.js 应用程序中使用 multer 中间件时，const upload = multer({ dest: 'uploads/' }); 这行代码配置了 multer 的存储行为。具体来说，它的作用如下：

  // 创建中间件实例：multer 函数调用后返回一个中间件实例，这个实例可以被 Express.js 应用程序中的路由使用。

  // 设置默认存储路径：{ dest: 'uploads/' } 是传递给 multer 的选项对象，它指定了上传文件的默认存储路径。在这个例子中，所有上传的文件将会被保存在服务器项目的根目录下的 uploads 文件夹中。

  // 简化文件操作：通过指定 dest 属性，multer 会自动将上传的文件存储到指定的文件夹中，开发者无需手动处理文件的存储逻辑。

  // 避免内存溢出：如果不指定存储路径，multer 会将文件内容存储在内存中，这可能会导致内存溢出，特别是当上传的文件非常大时。

  // 安全性：使用文件系统存储文件而不是内存，可以避免一些安全风险，如暴露敏感信息。

  // 方便管理：将文件存储在文件系统中，方便了对已上传文件的管理，包括列出、删除、组织文件等操作。



// 在实际部署时，你可能还需要考虑以下因素：

// 权限：确保应用程序有权限写入指定的 uploads 文件夹。
// 安全性：对上传的文件进行适当的安全检查，以防止恶意文件上传。
// 清理：如果需要，实现逻辑来清理不再需要的上传文件。
// 配置：根据应用程序的需求，可能还需要配置 multer 的其他选项，如文件大小限制、文件类型限制等。
// 总的来说，const upload = multer({ dest: 'uploads/' }); 这行代码是 multer 的基本配置，它定义了上传文件的默认存储位置，使得文件上传变得简单和直接。



//! 默认情况下上传的文件会被赋予一个随机生成的文件名，并且不包含文件的原始后缀名。

const upload = multer({
  dest: './uploads'
})





// 在提供的 Express.js 代码示例中，app.post('/upload', upload.single('file'), (req, res) => { ... }); 这一部分定义了一个 POST 路由处理程序，专门用于处理文件上传请求。下面是这一部分代码的详细解释：

    // '/upload'
    // 这是路由的路径，表示当客户端向服务器的 /upload 端点发送 POST 请求时，Express 将会调用后面的处理函数。这个路径可以自定义，但它是你希望客户端发送文件上传请求的 URL。

    // upload.single('file')
    // 这是 multer 中间件的使用方式之一。upload.single('file') 表示 multer 将会处理单个文件上传，其中 'file' 是前端表单中文件输入字段的名称。当表单提交时，multer 将会查找名称为 'file' 的文件字段，并将其存储在指定的位置（在这个例子中是 'uploads/' 目录）。

        // upload 是之前通过 multer({ dest: 'uploads/' }) 创建的中间件实例。
        // .single 是 multer 提供的一个方法，用于处理单个文件上传的场景。
        // 'file' 参数告诉 multer 期待一个名为 'file' 的文件字段。

    // (req, res) => { ... }
    // 这是一个箭头函数，用作 Express 路由的请求处理程序。当路由被触发时，这个函数会被调用，并且它接收两个参数：

        // req (请求): 表示客户端的请求，包含了请求信息，如查询参数、表单数据、上传的文件等。
        // res (响应): 表示服务器的响应对象，用于发送响应回客户端。
    
    // 在这个箭头函数内部：

        // req.file 是由 multer 填充的属性，它包含了上传文件的信息，如文件名、路径、大小等。
        // res.send('文件上传成功'); 表示向客户端发送一个响应，告知文件上传成功。


// 总结

// 整个 app.post('/upload', upload.single('file'), (req, res) => { ... }); 这部分代码的作用是设置了一个文件上传的端点，当客户端向 /upload 发送带有文件的 POST 请求时，multer 将会处理该文件，将其保存到服务器的文件系统中，然后请求处理程序向客户端发送一个成功的响应。

// 这种方式允许开发者以一种声明式和结构化的方式来处理文件上传，同时保持了代码的清晰和易于维护。


// 编写中间件
// 上传单文件: singer方法
app.post('/avatar', upload.single('avatar') , (req, res, next) => {
  console.log(req.file)
  res.end('文件上传成功~')
})






// 启动服务器
app.listen(3000, () => {
  console.log('express服务器启动成功~')
})






// Multer 的一些关键特性：

//   内存存储与磁盘存储：Multer 可以配置为将上传的文件存储在内存中或磁盘上。默认情况下，文件存储在内存中，但可以通过 storage 选项进行配置。

//   文件大小限制：通过 limits 选项，可以限制上传文件的大小。

//   文件过滤：使用 fileFilter 选项，可以自定义文件过滤逻辑，决定哪些文件可以被上传。

//   字段名和文件名：Multer 允许你自定义字段名和文件名。字段名是表单中文件输入字段的名称，而文件名是服务器上文件的名称。

//   单文件上传与多文件上传：使用 .single('fieldName') 处理单个文件上传，而 .array('fieldName', maxCount) 可以处理指定字段名的多个文件上传。

//   错误处理：Multer 提供了 MulterError 类，可以用于错误处理，区分 Multer 相关错误和普通的 Express 错误。

//   自定义存储引擎：通过 diskStorage 和 memoryStorage，可以自定义文件的存储路径和文件名。

//   表单数据：Multer 不仅可以处理文件上传，还可以获取表单中其他文本字段的数据，这些数据可以通过 req.body 访问。


// 示例配置

// 以下是一些 Multer 的配置示例：

// 单文件上传：

// upload.single('photo')



// 限制文件大小：

// multer({ limits: { fileSize: 5120 } })
// 自定义文件存储路径和文件名：

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now());
//   }
// });
// multer({ storage: storage })



// 文件过滤器：

// function fileFilter(req, file, cb) {
//   if (file.mimetype === 'image/jpeg') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }
// multer({ fileFilter: fileFilter })



// 注意事项
// 安全性：在生产环境中，应该对上传的文件进行严格的安全检查，以防止恶意文件上传。
// 性能：对于大型文件或高流量的文件上传，应考虑使用流式上传和分片上传等策略，以优化性能。
// 错误处理：应该妥善处理文件上传过程中可能出现的错误，并向用户提供清晰的反馈。