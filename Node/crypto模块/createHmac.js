// crypto的目的是提供通用的加密和哈希算法，javascript可以实现，但速度很慢，node使用了c/c++实现这些算法后，通过crypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。



// hmac也是一种哈希算法，它可以利用md5和sha1等哈希算法，不同的是，hmac还需要一个密钥

const crypto = require('crypto');

const hmac = crypto.createHmac('sha256', key);

// 可任意多次调用update():
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex')); // 80f7e22570...

// 只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。