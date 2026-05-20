 // Base64
    //   定义
    //   Base64是一种编码格式，在前端经常会碰到，格式是 data:[<mediatype>][;base64],<data> 。
    //   除了使用工具进行Base64编码外，js还内置了两个方法能进行字符串的Base64的编码和解码。
    const str1 = "hello randy";

    // 编码
    const b1 = window.btoa(str1);
    console.log(b1); // aGVsbG8gcmFuZHk=
    console.log('')

    // 解码
    const str2 = window.atob(b1);
    console.log(str2); // hello randy
    console.log('')


    // 优点

    // 可以将二进制数据（比如图片）转化为可打印字符，方便传输数据。
    // 对数据进行简单的加密，肉眼是安全的。
    // 如果是在html或者css处理图片，可以减少http请求。

    // 缺点

    // 内容编码后体积变大， 至少大1/3。因为是三字节变成四个字节，当只有一个字节的时候，也至少会变成三个字节。
    // 编码和解码需要额外工作量。