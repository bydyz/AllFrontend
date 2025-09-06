const http = require("http");
const fs = require('fs')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  // 在 Node.js 的 http 模块中，request 对象代表了一个 HTTP 请求。默认情况下，当请求体（body）被传输时，如果请求体是流的形式，那么每个通过 data 事件提供的数据块（chunk）都是以 Buffer 对象的形式提供的。这意味着在没有指定编码的情况下，你不能直接读取包含非二进制数据的请求体，比如当请求体是一段文本时。

  // request.setEncoding('binary') 方法的作用是设置请求体解码的编码。当你调用这个方法并传递 'binary' 作为参数时，Node.js 将尝试将接收到的每个数据块（chunk）作为一个二进制字符串来解码，而不是默认的 Buffer 对象。这在某些情况下是有用的，特别是当你需要以字符串形式处理请求体时。

  // 通过调用 request.setEncoding('binary')，我们告诉 Node.js 服务器，我们希望将请求体作为二进制字符串来处理。这样，当请求体的 data 事件触发时，累加的 body 变量将包含的是二进制字符串，而不是 Buffer 对象。

  // 请注意，使用 'binary' 编码会将字节数据解释为二进制字符串，这可能不适用于所有类型的文本数据，特别是当文本数据使用特定的字符编码（如 UTF-8）时。如果你需要处理特定编码的文本数据，可能需要在接收完整个请求体后，将二进制字符串转换为适当的字符串编码。

  //！ 此处设定为 binary 是为了便于后面的一系列操作
  req.setEncoding('binary')

  // ！！！  拿到binary中的boundary，以便于后面的去掉
  const boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '')
  console.log(boundary)

  // 客户端传递的数据是表单数据(请求体)
  let formData = ''
  req.on("data", (data) => {
    formData += data
  });

  req.on("end", () => {
    console.log(formData)

    // 1.截取从image/jpeg位置开始后面所有的数据
    const imgType = 'image/jpeg'
    // !!!   找到 字符串'image/jpeg' 首次出现的位置后，  还需要加上 字符串的长度
    const imageTypePosition = formData.indexOf(imgType) + imgType.length
    let imageData = formData.substring(imageTypePosition)

    // 2.imageData开始位置会有两个空格  去掉最前面的  "\r\n\r\n"
    // !!!  window环境下  \r\n 就是一个空格
    imageData = imageData.replace(/^\s\s*/, '')

    // 3.替换最后的boundary
    // ！！   boundary的前后 均会加上 --
    imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`))

    // 4.将imageData的数据存储到文件中
    // ！！！  图片的写入编码方式是 binary
    fs.writeFile('./bar.png', imageData, 'binary', () => {
      console.log('文件存储成功')
      res.end("文件上传成功~");
    })
  });
});

// 2.开启server服务器
server.listen(3000, () => {
  console.log("服务器开启成功~");
});
