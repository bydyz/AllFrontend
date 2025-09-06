const http = require('http')

// 创建一个http对应的服务器
//！！   request对象本质是上一个readable可读流      response对象 => Writable可写流
const server = http.createServer((request, response) => {
  // request对象中包含本次客户端请求的所有信息
    // 请求的url  服务器需要根据不同的URL进行不同的处理；
    // 请求的method，比如GET、POST请求传入的参数和处理的方式是不同的；
    // 请求的headers携带的数据  比如客户端信息、接受数据的格式、支持的编码格式等；

    // Node会帮助我们封装到一个request的对象中，我们可以直接来处理这个request对象：

    // http://localhost:8000/login                                       则 request.url === '/login'
    // http://localhost:8000/login?name=why&password=123                 则 request.url === '/login?name=why&password=123'



    // ◼ 在Restful规范（设计风格）中，我们对于数据的增删改查应该通过不同的请求方式：
    //    GET：查询数据；
    //    POST：新建数据；
    //    PATCH：更新数据；
    //    DELETE：删除数据；

    const { method, url, headers } = request;
    console.log(`接收到请求：method=${method}, url=${url}`);
  


    // 在Node.js的http模块中，当客户端发送的是分块数据（chunked data）时，request对象的data事件会在客户端发送的每一块数据到达时被触发。每一块数据在data事件的回调函数中作为参数提供，这个参数就是我们所说的chunk（数据块）。

    // 在HTTP协议中，数据块可以是任何大小，它们会在客户端和服务器之间传输。服务器端需要逐块地接收并正确地处理这些数据块。

    // 对于每个触发的data事件，服务器会接收到一个chunk（数据块），并将这些数据块累加到body变量中。这里，chunk是一个Buffer或String对象，具体取决于你设置的编码方式。
    // 当所有数据块都被接收完毕，end事件被触发。此时，我们可以访问完整的请求体body，然后向客户端发送响应。

    // 如果你知道请求体的编码方式，你可以在接收到数据块时指定这个编码，以正确地将Buffer转换为String。例如，如果请求体是用UTF-8编码的，你可以使用chunk.toString('utf8')进行转换。


    // 在Node.js的http模块中，data事件会在以下情况下被触发：

    //   分块传输编码：
    //   当客户端使用HTTP分块传输编码（chunked transfer encoding）发送请求体时，服务器端的request对象会触发多次data事件，每次触发都携带了一部分请求体数据，即一个数据块（chunk）。

    //   非分块请求体：
    //   对于非分块的请求体（如Content-Length已知的请求），data事件同样会被触发，每次携带一部分请求体，直到整个请求体被传输完毕。

    //   流式数据处理：
    //   当处理大型文件或流式数据时，使用data事件可以有效地分块处理数据，而不需要将整个请求体完整加载到内存中。

    //   请求体编码：
    //   如果请求体的编码方式与http模块默认的编码方式不一致，你可能需要在接收到每个chunk后手动进行编码转换。

    //   管道传输：
    //   当客户端通过管道（pipe）发送请求体时，每个管道过来的数据块都会触发data事件。

    //   升级后的连接：
    //   在某些情况下，比如WebSocket握手之后，连接被升级，此时使用data事件来接收后续的数据。

    // 读取请求体，这取决于请求的Content-Type
    let data = '';
    request.on('data', chunk => {
      console.log(`Received chunk of data (String): ${chunk.toString()}`);
      data += chunk;
    });

    // 在request对象的header中也包含很多有用的信息，客户端会默认传递过来一些信息：
    //   ◼ content-type是这次请求携带的数据的类型：
    //      application/x-www-form-urlencoded：表示数据被编码成以 '&' 分隔的键 - 值对，同时以 '=' 分隔键和值
    //      application/json：表示是一个json类型；
    //      text/plain：表示是文本类型；
    //      application/xml：表示是xml类型；
    //      multipart/form-data：表示是上传文件；
    //   ◼ content-length：文件的大小长度
    //   ◼ keep-alive：
    //      http是基于TCP协议的，但是通常在进行一次请求和响应结束后会立刻中断；
    //      在http1.0中，如果想要继续保持连接：
    //       ✓ 浏览器需要在请求头中添加 connection: keep-alive；
    //       ✓ 服务器需要在响应头中添加 connection:keey-alive；
    //       ✓ 当客户端再次放请求时，就会使用同一个连接，直接一方中断连接；
    //      在http1.1中，所有连接默认是 connection: keep-alive的；
    //       ✓ 不同的Web服务器会有不同的保持 keep-alive的时间；
    //       ✓ Node中默认是5s中；
    //   ◼ accept-encoding：告知服务器，客户端支持的文件压缩格式，比如js文件可以使用gzip编码，对应 .gz文件；
    //   ◼ accept：告知服务器，客户端可接受文件的格式类型；
    //   ◼ user-agent：客户端相关的信息；





    // 返回响应结果

    // ◼ 如果我们希望给客户端响应的结果数据，可以通过两种方式：
    //    Write方法：这种方式是直接写出数据，但是并没有关闭流；     如：response.write("this is what i send to you")
    //    end方法：这种方式是写出最后的数据，并且写出后会关闭流；    如：response.end("this is what i send to you")

    // ◼ 如果我们没有调用 end和close，客户端将会一直等待结果：
    //    所以客户端在发送网络请求时，都会设置超时时间。

    // ◼ Http状态码（Http Status Code）是用来表示Http响应状态的数字代码：
    //    Http状态码非常多，可以根据不同的情况，给客户端返回不同的状态码；
    //    MDN响应码解析地址：https://developer.mozilla.org/zh-CN/docs/web/http/status
    //   设置Http状态码  response.statusCode = 200   response.writeHead(200)

    // ◼ 返回头部信息，主要有两种方式：
    //    res.setHeader：一次写入一个头部信息；
    //    res.writeHead：同时写入header和status；
    //   如：res.setHeader("Content-Type", "application/json;charset=utf8")
    //       res.writeHead(200, {
    //         "Content-Type": "application/json;charset=utf8"
    //       })

    // ◼ Header设置 Content-Type有什么作用呢？
    //    默认客户端接收到的是字符串，客户端会按照自己默认的方式进行处理；即直接将字符串展示在界面上

    // !!  异步
    request.on('end', () => {
      console.log(`请求体数据：${data}`);
      
      // 响应客户端
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('Hello, World!\n');
    });


  // response对象用于给客户端返回结果的
  // response.end("Hello World")
})

// 开启对应的服务器, 并且告知需要监听的端口
// 监听端口时, 监听1024以上的端口, 666535以下的端口
// 1025~65535之间的端口
// 2个字节 => 256*256 => 65536 => 0~65535
server.listen(3000, () => {
  console.log('服务器已经开启成功了~')
})


// ◼ Server通过listen方法来开启服务器，并且在某一个主机和端口上监听网络请求：
//  也就是当我们通过 ip:port的方式发送到我们监听的Web服务器上时；
//  我们就可以对其进行相关的处理；

// ◼ listen函数有三个参数：

// ◼ 端口port: 可以不传, 系统会默认分配端, 后续项目中我们会写入到环境变量中；

// ◼ 主机host: 通常可以传入localhost、ip地址127.0.0.1、或者ip地址0.0.0.0，默认是0.0.0.0；
//  localhost：本质上是一个域名，通常情况下会被解析成127.0.0.1；
//  127.0.0.1：回环地址（Loop Back Address），表达的意思其实是我们主机自己发出去的包，直接被自己接收；
// ✓ 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ；
// ✓ 而回环地址，是在网络层直接就被获取到了，是不会经常数据链路层和物理层的；
// ✓ 比如我们监听 127.0.0.1时，在同一个网段下的主机中，通过ip地址是不能访问的；
//  0.0.0.0：
// ✓ 监听IPV4上所有的地址，再根据端口找到不同的应用程序；
// ✓ 比如我们监听 0.0.0.0时，在同一个网段下的主机中，通过ip地址是可以访问的；

// ◼ 回调函数：服务器启动成功时的回调函数；







//！！！ 2.创建第二个服务器     创建多个服务器时，需要用 http.createServer 生成多个实例
// 创建服务器
const server2 = http.createServer((req, res) => {
  res.end("3000端口服务器返回的结果~")
})
// 开启服务器
server2.listen(3000, () => {
  console.log('3000端口对应的服务器启动成功~')
})